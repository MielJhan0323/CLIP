#!/bin/bash
# usage: scripts/render_pack.sh jobs.txt [--pack-only]   (jobs lines: Comp:outname) → render + 4K finish + review pack per clip
cd "$(dirname "$0")/.."
while IFS=: read comp out <&3; do
  [ -z "$comp" ] && continue
  if [ "$2" != "--pack-only" ]; then
    /home/user/scratch/render.sh $comp $out < /dev/null > /dev/null 2>&1 && bash scripts/finish_4k.sh out/$out.mp4 out/${out}_4k.mp4 < /dev/null > /dev/null 2>&1 || { echo "FAIL $out"; continue; }
  fi
  python3 scripts/review_pack.py out/${out}_4k.mp4 review/$out < /dev/null > /dev/null 2>&1 && echo "OK $out $(ffprobe -v error -show_entries format=duration -of csv=p=0 out/$out.mp4 < /dev/null)" || echo "PACKFAIL $out"
done 3< "$1"
for d in /tmp/remotion-webpack-bundle-*; do [ -f "$d/public/Montserrat-Black.woff2" ] && [ -d "$d/public/cards2" ] && rm -rf "$d"; done
echo ALLDONE
