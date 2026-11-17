#!/usr/bin/env python3
"""Find micro-shots (whip/flash transition pieces shorter than MAX ms) in a source video → JSON list of [startMs, endMs].
usage: python3 scripts/micro_shots.py public/neon/r3born_ep2.mp4 src/plans/data/r3born_ep2_micro.json"""
import json, subprocess, sys
import numpy as np
src, outp = sys.argv[1], sys.argv[2]
MAX = 450
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', 'fps=30,scale=48:27,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, 27, 48).astype(np.float32)
d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))
cuts = [i + 1 for i, v in enumerate(d) if v > 22]
micro = []
for a, b in zip(cuts, cuts[1:]):
    if (b - a) * 1000 / 30 < MAX: micro.append([round(a * 1000 / 30), round(b * 1000 / 30)])
# merge touching pieces
m = []
for a, b in micro:
    if m and a - m[-1][1] < 40: m[-1][1] = b
    else: m.append([a, b])
json.dump(m, open(outp, 'w'))
print(len(cuts), 'cuts,', len(m), 'micro ranges')
