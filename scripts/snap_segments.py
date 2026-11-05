# Snap edit segments to real speech boundaries so no word is clipped at a cut (user 2026-11-05: "his sentences are cut off
# before every cut"). For each [a, b]: END = where the last word's audio actually decays (RMS below the floor for 90 ms) + 120 ms
# tail, but never into the next word; START = 80 ms before the first word, never into the previous word.
# Usage: python3 scripts/snap_segments.py <video> <words.json> '[[a,b],[a,b],...]'
import json, subprocess, sys
import numpy as np
src, wpath, segs = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
words = sorted(json.load(open(wpath)), key=lambda w: w['startMs'])
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout
a = np.frombuffer(pcm, np.float32)
hop = 160  # 10 ms
rms = np.array([np.sqrt(np.mean(a[i:i + 320] ** 2)) for i in range(0, len(a) - 320, hop)])
db = 20 * np.log10(rms + 1e-9)
floor = np.percentile(db, 20) + 8  # speech-off threshold relative to the room
out = []
for s0, s1 in [(s[0], s[1]) for s in segs]:
    inside = [w for w in words if s0 <= w['startMs'] < s1]
    if not inside: out.append([s0, s1]); continue
    first, last = inside[0], inside[-1]
    nxt = next((w for w in words if w['startMs'] > last['startMs']), None)
    prv = next((w for w in reversed(words) if w['startMs'] < first['startMs']), None)
    # end: scan from the last word start for 90 ms of quiet
    i = last['startMs'] // 10 + 8; quiet = 0
    while i < len(db) and quiet < 9:
        quiet = quiet + 1 if db[i] < floor else 0; i += 1
    end = (i - quiet) * 10 + 120
    if nxt: end = min(end, nxt['startMs'] - 40)
    end = max(end, s1 if not nxt or s1 <= nxt['startMs'] - 40 else 0, last['startMs'] + 250)
    start = first['startMs'] - 80
    if prv: start = max(start, prv['startMs'] + 200)
    start = min(start, s0) if s0 - start < 400 else s0
    out.append([int(start), int(end)])
for (s0, s1), (n0, n1) in zip(segs, out):
    print(f'[{s0},{s1}] -> [{n0},{n1}]  (+{n1 - s1} ms end)')
print(json.dumps(out))
