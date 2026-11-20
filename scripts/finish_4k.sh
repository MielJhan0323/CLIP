#!/bin/bash
# "CapCut 4K" finishing pass (user 2026-11-15): NOT real 4K — the look the 4K preset fakes on a phone screen:
#   light denoise → CLARITY (big-radius low-amount unsharp = local contrast) → saturation + contrast → S-curve (deeper shadows,
#   brighter highlights = punchy HDR look) → subtle SOFT-LIGHT GLOW (blurred copy, 18 %) to smooth skin → HEAVY edge SHARPENING last.
# Usage: scripts/finish_4k.sh in.mp4 [out.mp4]   (in place when out is omitted)
# Gaming clips (user 2026-11-19 "the filter makes the screen too dark, gameplay can barely be seen"): GAME=1 lifts shadows
#   instead of crushing them (no S-curve, mild gamma lift) so night/interior GTA scenes stay readable.
in=$1; out=${2:-$1};
GLOW=0.18
# GAME=1 lighter still (user 2026-11-20 "chill out on the filters"): no saturation/contrast push, no glow, small shadow lift + sharpen
if [ "$GAME" = 1 ]; then GRADE="eq=saturation=1.05:gamma=1.12"; GLOW=0; else GRADE="eq=contrast=1.06:saturation=1.28,curves=all='0/0 0.25/0.2 0.75/0.81 1/1'"; fi
tmp="${out%.mp4}.__4k.mp4"
ffmpeg -v error -y -i "$in" -filter_complex "[0:v]hqdn3d=1:1:3:3,unsharp=13:13:0.35:13:13:0,$GRADE,split[a][b];[b]gblur=sigma=14[g];[a][g]blend=all_mode=softlight:all_opacity=$GLOW,unsharp=5:5:1.15:5:5:0,format=yuv420p[v]" \
  -map "[v]" -map 0:a? -c:v libx264 -crf 16 -preset medium -af "dynaudnorm=f=200:g=11:m=6" -c:a aac -b:a 192k "$tmp" && mv "$tmp" "$out"
