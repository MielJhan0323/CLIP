# Main-face track for MULTI-CAM sources (already-cut shows, not a static podcast wide shot): for every 200 ms take the
# largest detected face (YuNet), reset smoothing on scene cuts, and write a Jorho track where seat M = that face
# (L and R = the same, so any seat works). Usage: python3 scripts/main_face_track.py <video> <out.json> [step_ms]
import json, sys, cv2, numpy as np
src, out = sys.argv[1], sys.argv[2]
step = int(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].isdigit() else 200
import subprocess
W, H = map(int, subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src],
    capture_output=True, text=True).stdout.strip().split(','))
w2, h2 = W // 2, H // 2
proc = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-vf', f'fps={1000 / step},scale={w2}:{h2}', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'],
    stdout=subprocess.PIPE)  # one sequential decode (seeking per sample was far too slow)
det = cv2.FaceDetectorYN.create('/home/user/Me-editing/models/yunet.onnx', '', (w2, h2), 0.6)
pts, prev_hist, last = [], None, None
raw, cuts = [], []  # for --static: raw largest face per sample + scene-cut flags
while True:
    buf = proc.stdout.read(w2 * h2 * 3)
    if len(buf) < w2 * h2 * 3: break
    small = np.frombuffer(buf, np.uint8).reshape(h2, w2, 3)
    hist = cv2.calcHist([cv2.cvtColor(small, cv2.COLOR_BGR2HSV)], [0, 1], None, [16, 16], [0, 180, 0, 256]); cv2.normalize(hist, hist)
    cut = prev_hist is not None and cv2.compareHist(prev_hist, hist, cv2.HISTCMP_CORREL) < 0.6
    prev_hist = hist
    _, faces = det.detect(small)
    if faces is not None and len(faces):
        f = max(faces, key=lambda q: q[2] * q[3] - (0 if last is None or cut else 0.002 * ((q[0] * 2 - last[0]) ** 2 + (q[1] * 2 - last[1]) ** 2)))
        cx, cy, s = (f[0] + f[2] / 2) * 2, (f[1] + f[3] / 2) * 2, f[3] * 2
        cur = [cx, cy, s] if last is None or cut else [last[0] * 0.6 + cx * 0.4, last[1] * 0.6 + cy * 0.4, last[2] * 0.6 + s * 0.4]
    else:
        cur = last or [W / 2, H * 0.4, 200]
    last = cur
    pts.append([int(cur[0]), int(cur[1]), int(cur[2])])
    raw.append(None if faces is None or not len(faces) else [(f[0] + f[2] / 2) * 2, (f[1] + f[3] / 2) * 2, f[3] * 2])
    cuts.append(cut)
if '--static' in sys.argv:
    # user 2026-11-14: "the camera keeps moving" → one LOCKED framing per shot (median face of the shot), re-frame only on a cut
    shots, start = [], 0
    for i in range(1, len(cuts) + 1):
        if i == len(cuts) or cuts[i]: shots.append((start, i)); start = i
    for a, b in shots:
        fs = [r for r in raw[a:b] if r]
        if not fs: continue
        med = [int(np.median([f[k] for f in fs])) for k in range(3)]
        for i in range(a, b): pts[i] = med
json.dump({'stepMs': step, 'fromMs': 0, 'L': pts, 'M': pts, 'R': pts}, open(out, 'w'))
print('points', len(pts))
