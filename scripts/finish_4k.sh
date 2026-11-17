#!/bin/bash
# "CapCut 4K" finishing pass (user 2026-11-15): NOT real 4K — the look the 4K preset fakes on a phone screen:
#   light denoise → CLARITY (big-radius low-amount unsharp = local contrast) → saturation + contrast → S-curve (deeper shadows,
#   brighter highlights = punchy HDR look) → subtle SOFT-LIGHT GLOW (blurred copy, 18 %) to smooth skin → HEAVY edge SHARPENING last.
# Usage: scripts/finish_4k.sh in.mp4 [out.mp4]   (in place when out is omitted)
in=$1; out=${2:-$1}; tmp="${out%.mp4}.__4k.mp4"
ffmpeg -v error -y -i "$in" -filter_complex "[0:v]hqdn3d=1:1:3:3,unsharp=13:13:0.35:13:13:0,eq=contrast=1.06:saturation=1.28,curves=all='0/0 0.25/0.2 0.75/0.81 1/1',split[a][b];[b]gblur=sigma=14[g];[a][g]blend=all_mode=softlight:all_opacity=0.18,unsharp=5:5:1.15:5:5:0,format=yuv420p[v]" \
  -map "[v]" -map 0:a? -c:v libx264 -crf 16 -preset medium -af "dynaudnorm=f=200:g=11:m=6" -c:a aac -b:a 192k "$tmp" && mv "$tmp" "$out"
