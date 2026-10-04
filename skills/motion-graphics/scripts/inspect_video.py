#!/usr/bin/env python3
"""Probe a video and build contact sheets that cover its whole duration.

Standard library only; needs ffmpeg and ffprobe on PATH. Use it on a reference
video before writing a style guide, and on a render before critiquing it.

    python3 inspect_video.py REF.mp4 -o out/            # whole-duration sheets
    python3 inspect_video.py REF.mp4 -o out/ --strip 4.2   # 12 frames around 4.2s

Why not `fps=2,tile=6x5`: that is 30 tiles = 15s of coverage, so on a 105s video
it silently shows the first 14% and nothing warns you.
"""
import argparse, json, pathlib, shutil, subprocess, sys

WINDOW = 30.0            # seconds per sheet; past this, sampling gets too coarse
COLS, ROWS = 6, 5


def need(binary):
    if shutil.which(binary) is None:
        sys.exit(f"{binary} not found on PATH. Install ffmpeg to use this tool.")


def probe(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries",
         "format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate",
         "-of", "json", str(path)],
        capture_output=True, text=True, check=True).stdout
    d = json.loads(out)
    streams = d.get("streams", [])
    video = next((s for s in streams if s.get("codec_type") == "video"), {})
    audio = next((s for s in streams if s.get("codec_type") == "audio"), None)
    num, _, den = (video.get("r_frame_rate") or "0/1").partition("/")
    fps = float(num) / float(den) if den and float(den) else 0.0
    return {
        "file": str(path),
        "duration": round(float(d["format"]["duration"]), 3),
        "size_bytes": int(d["format"].get("size", 0)),
        "width": video.get("width"),
        "height": video.get("height"),
        "fps": round(fps, 3),
        "video_codec": video.get("codec_name"),
        # Presence only. This says nothing about how the audio sounds.
        "audio_stream": bool(audio),
        "audio_codec": (audio or {}).get("codec_name"),
    }


def decodes(path):
    """A file can report a duration and still be truncated. Decode it fully."""
    r = subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"],
                       capture_output=True, text=True)
    return {"ok": r.returncode == 0, "error": (r.stderr or "").strip()[:400] or None}


def sheets(path, info, outdir, width):
    dur, made, n = info["duration"], [], COLS * ROWS
    windows = max(1, int(-(-dur // WINDOW)))        # ceil
    for i in range(windows):
        start = i * WINDOW
        span = min(WINDOW, dur - start)
        if span <= 0:
            break
        dst = outdir / (f"contact_{i:02d}.png" if windows > 1 else "contact.png")
        rate = n / span
        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-ss", f"{start:.3f}", "-t", f"{span:.3f}",
             "-i", str(path), "-vf", f"fps={rate:.6f},scale={width}:-1,tile={COLS}x{ROWS}",
             "-frames:v", "1", str(dst)], check=True)
        # Cell -> timestamp, reading order. Lets a defect be named by its real timecode.
        cells = [{"cell": k + 1, "row": k // COLS + 1, "col": k % COLS + 1,
                  "t": round(start + (k + 0.5) / rate, 3)} for k in range(n)]
        made.append({"path": str(dst), "covers": [round(start, 2), round(start + span, 2)],
                     "grid": f"{COLS}x{ROWS}", "tiles": n,
                     "every": round(span / n, 3), "cells": cells})
    return made


def strip(path, at, outdir, width):
    dst = outdir / f"strip_{at:.2f}.png".replace(".", "_", 1)
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0, at - 0.1):.3f}", "-i", str(path),
         "-vf", f"scale={width}:-1,tile=12x1", "-frames:v", "1", str(dst)], check=True)
    return str(dst)


def main():
    ap = argparse.ArgumentParser(description="Probe a video and build full-duration contact sheets.")
    ap.add_argument("video")
    ap.add_argument("-o", "--out", default="inspect")
    ap.add_argument("--width", type=int, default=270, help="tile width in px")
    ap.add_argument("--strip", type=float, action="append", default=[],
                    help="also emit 12 consecutive frames around this timestamp; repeatable")
    a = ap.parse_args()

    need("ffmpeg"); need("ffprobe")
    src = pathlib.Path(a.video)
    if not src.exists():
        sys.exit(f"No such file: {src}")
    outdir = pathlib.Path(a.out); outdir.mkdir(parents=True, exist_ok=True)

    info = probe(src)
    info["full_decode"] = decodes(src)
    info["contact_sheets"] = sheets(src, info, outdir, a.width)
    info["strips"] = [strip(src, t, outdir, a.width) for t in a.strip]
    info["note"] = ("Audio presence is reported, not reviewed; listen before claiming it is right. "
                    "Trailing cells on the last page may be padding. Open every page.")

    manifest = outdir / "manifest.json"
    manifest.write_text(json.dumps(info, indent=2))
    print(json.dumps(info, indent=2))          # stdout is pure JSON; safe to pipe
    print(f"\nWrote {manifest}. Open every sheet in {outdir}/ and look at it "
          f"before judging the video.", file=sys.stderr)


if __name__ == "__main__":
    main()
