#!/usr/bin/env python3
"""Source-video cut map → JSON {"cuts": [ms...], "skip": [[a,b]...]}
  · cuts  = hard cuts (frame-diff spike)
  · skip  = micro-shots (< 450 ms between two cuts) + whip-pan blur runs (≥ 4 frames of strong motion) — never show these
usage: python3 scripts/micro_shots.py <video> <out.json>"""
import json, subprocess, sys
import numpy as np
src, outp = sys.argv[1], sys.argv[2]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', 'fps=30,scale=48:27,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, 27, 48).astype(np.float32)
d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))
ms = lambda i: round(i * 1000 / 30)
cuts = [i + 1 for i, v in enumerate(d) if v > 22]
skip = [[ms(a), ms(b)] for a, b in zip(cuts, cuts[1:]) if (b - a) * 1000 / 30 < 450]
run = 0
for i, v in enumerate(d):
    run = run + 1 if v > 12 else 0
    if run == 4: skip.append([ms(i - 4), None])
    if run >= 4: skip[-1][1] = ms(i + 2)
skip.sort()
merged = []
for a, b in skip:
    if merged and a - merged[-1][1] < 60: merged[-1][1] = max(merged[-1][1], b)
    else: merged.append([a, b])
json.dump({'cuts': [ms(c) for c in cuts], 'skip': merged}, open(outp, 'w'))
print(len(cuts), 'cuts,', len(merged), 'skip ranges')
