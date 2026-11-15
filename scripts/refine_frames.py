# Refine hand-picked crop keyframes with YuNet: every 0.25 s in each clip's source ranges, detect faces and take the one CLOSEST to the
# hand-picked speaker position (so the speaker choice stays manual, the position becomes exact). No face → keep the hand value.
# Holds the crop unless the face moves > 110 px (no jitter); snaps on jumps (cuts).
# Usage: python3 scripts/refine_frames.py <video> <in.json {name: {segs, frames}}> <out.json>
import sys, json, cv2, numpy as np, subprocess
vid, inp, outp = sys.argv[1:4]
cfg = json.load(open(inp))
det = cv2.FaceDetectorYN.create('/home/user/Me-editing/models/yunet.onnx', '', (960, 540), 0.5)
def frame(t):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', vid, '-frames:v', '1', '-vf', 'scale=960:540', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(540, 960, 3) if len(raw) == 960 * 540 * 3 else None
res = {}
for name, c in cfg.items():
    kf = sorted(c['frames'])
    hand = lambda t: [k for k in kf if k[0] <= t + 1e-6][-1] if any(k[0] <= t + 1e-6 for k in kf) else kf[0]
    out, cur = [], None
    for a, b in c['segs']:
        t = a
        while t <= b + 1e-6:
            h = hand(t); fr = frame(t); pick = None
            if fr is not None:
                _, faces = det.detect(fr)
                if faces is not None and len(faces):
                    cand = [((f[0] + f[2] / 2) * 2, (f[1] + f[3] / 2) * 2, f[3] * 2) for f in faces]
                    best = min(cand, key=lambda p: abs(p[0] - h[1]) + 0.5 * abs(p[1] - h[2]))
                    if abs(best[0] - h[1]) < 520: pick = best
            x, y = (pick[0], pick[1]) if pick else (h[1], h[2])
            if cur is None or abs(x - cur[0]) > 110 or abs(y - cur[1]) > 110: cur = (x, y)
            out.append([round(t, 2), int(cur[0]), int(cur[1])])
            t += 0.25
    res[name] = out
    print(name, len(out), 'samples')
json.dump(res, open(outp, 'w'))
