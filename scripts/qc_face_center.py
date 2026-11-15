# QC: sample a rendered 9:16 video at 4 fps, detect faces (YuNet), report frames with NO face whose centre is in the middle 60 % of
# the width (= the crop is on the background). Graphics/cards can legitimately have no face; the times are listed to check.
# Usage: python3 scripts/qc_face_center.py out.mp4
import sys, cv2, numpy as np, subprocess
v = sys.argv[1]
det = cv2.FaceDetectorYN.create('/home/user/Me-editing/models/yunet.onnx', '', (540, 960), 0.45)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', v, '-vf', 'fps=4,scale=540:960', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], capture_output=True).stdout
n = len(raw) // (540 * 960 * 3); bad = []
for i in range(n):
    fr = np.frombuffer(raw[i * 540 * 960 * 3:(i + 1) * 540 * 960 * 3], np.uint8).reshape(960, 540, 3)
    _, faces = det.detect(fr)
    ok = faces is not None and any(108 <= f[0] + f[2] / 2 <= 432 for f in faces)
    if not ok: bad.append(i / 4)
print(f'{v}: {n} frames, {len(bad)} without a centred face ({100*len(bad)/max(n,1):.0f}%):', ' '.join(f'{t:.2f}' for t in bad))
