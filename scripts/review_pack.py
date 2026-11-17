#!/usr/bin/env python3
"""Build a REVIEW PACK for the shorts-reviewer agent (simulated viewer panel).

usage: python3 scripts/review_pack.py out/<clip>.mp4 [outdir]

Writes to outdir (default review/<clip>/):
  · frames/t<sec>.jpg   — 0.0, 0.3, 0.6, 1.0, 1.5, 2.0, 3.0 s, then every 1.5 s, + the last frame
  · sheet.jpg           — all frames on one contact sheet, timestamped
  · loop.jpg            — last frame next to frame 0 (does the replay flow back into the hook?)
  · pack.json           — duration, word timings, silent gaps, static stretches, cut times, loudness per second
The agent reads these files instead of "watching" the video.
"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw

vid = sys.argv[1]
name = os.path.splitext(os.path.basename(vid))[0]
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join('review', name)
os.makedirs(os.path.join(out, 'frames'), exist_ok=True)
for old in os.listdir(os.path.join(out, 'frames')): os.remove(os.path.join(out, 'frames', old))  # no stale frames from earlier rounds

dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', vid], capture_output=True, text=True).stdout)
times = [0.0, 0.3, 0.6, 1.0, 1.5, 2.0, 3.0]
t = 4.5
while t < dur - 0.4:
    times.append(round(t, 1)); t += 1.5
times.append(round(max(0, dur - 0.05), 2))

paths = []
for tt in times:
    p = os.path.join(out, 'frames', f't{tt:05.2f}.jpg')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(tt), '-i', vid, '-frames:v', '1', '-vf', 'scale=270:-1', p], stdin=subprocess.DEVNULL)
    paths.append((tt, p))

# contact sheet
ims = [(tt, Image.open(p)) for tt, p in paths if os.path.exists(p)]
w, h = ims[0][1].size
cols = 8
sheet = Image.new('RGB', (w * cols, h * ((len(ims) + cols - 1) // cols)), 'black')
for i, (tt, im) in enumerate(ims):
    d = ImageDraw.Draw(im); d.rectangle([0, 0, 70, 22], fill='black'); d.text((4, 4), f'{tt:.1f}s', fill='yellow')
    sheet.paste(im, ((i % cols) * w, (i // cols) * h))
sheet.save(os.path.join(out, 'sheet.jpg'), quality=85)
loop = Image.new('RGB', (w * 2, h)); loop.paste(ims[-1][1], (0, 0)); loop.paste(ims[0][1], (w, 0)); loop.save(os.path.join(out, 'loop.jpg'))

# low-res video signal: cuts + static stretches
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', 'fps=10,scale=64:114,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, 114, 64).astype(np.float32)
diff = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)) if len(fr) > 1 else np.zeros(0)
cuts = [round((i + 1) / 10, 1) for i, d in enumerate(diff) if d > 18]
static, run = [], 0
for i, d in enumerate(diff):
    run = run + 1 if d < 1.2 else 0
    if run == 25: static.append(round((i - 24) / 10, 1))  # ≥ 2.5 s with almost no motion

# audio loudness per second + silent gaps
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
rms = [float(20 * np.log10(np.sqrt(np.mean(a[i:i + 16000] ** 2)) + 1e-6)) for i in range(0, len(a), 16000)]
win = 1600
r10 = [float(np.sqrt(np.mean(a[i:i + win] ** 2))) for i in range(0, len(a), win)]
gaps, s0 = [], None
for i, r in enumerate(r10 + [1]):
    if r < 0.01 and s0 is None: s0 = i
    if r >= 0.01 and s0 is not None:
        if i - s0 >= 6: gaps.append([round(s0 / 10, 1), round(i / 10, 1)])
        s0 = None

# words
words = []
try:
    from faster_whisper import WhisperModel
    m = WhisperModel('small.en', device='cpu', compute_type='int8')
    segs, _ = m.transcribe(a, word_timestamps=True, vad_filter=False)
    for sg in segs:
        for wd in sg.words or []:
            words.append({'t': round(wd.start, 2), 'w': wd.word.strip()})
except Exception as e:  # transcript is helpful, not required
    words = [{'error': str(e)}]

pack = {'clip': name, 'duration': round(dur, 2), 'frames': [os.path.relpath(p, out) for _, p in paths],
        'cuts_s': cuts, 'static_from_s': static, 'silent_gaps_s': gaps, 'loudness_db_per_s': [round(x, 1) for x in rms],
        'first_words': ' '.join(x.get('w', '') for x in words if x.get('t', 99) < 3), 'words': words}
json.dump(pack, open(os.path.join(out, 'pack.json'), 'w'), indent=1)
print(os.path.abspath(out))
