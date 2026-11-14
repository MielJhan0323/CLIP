---
tags: [style, fused, jorho, jorho-v2]
date: 2026-11-14
---
# Fused style: Jorho v1 + v2, minus the excess (trial)

User (2026-11-14): "try to fuse jorho v2 and v1, copy the nice editing style but leave out the excessive editing, try 1 trial edit". Also "the camera zooms are so trippy, chill out" and "stop covering the video with cards".
First trial: `NeonPole` (`src/campaigns/neon_clip/neon.tsx`) → `out/neon_trial_first_pole_class.mp4`.

**Keep (v1):** black-bar headline that says what actually happens · big word-by-word captions (white + black outline, yellow on 3–5 key words, `chunkWords` so nothing flickers) · ONE strobe at the hook→rewind · ONE tint on the peak beat.
**Keep (v2):** at most ONE graphic, and only if it adds meaning (here a typed `*first time on a pole*` label for 2 s). The face-cam explainer only when a line is truly picturable.
**Drop:** SFX on every beat, constant push-ins / drift, multiple punch-ins, cards or pills covering the video, spoiler end-cards, more than one graphic.
**Camera:** steady locked framing per shot (`main_face_track.py --static`); WIDE (`'W'`) when the action is two people or the biggest face isn't the subject; one gentle punch-in (×1.06, smoothstep) on the peak only.
