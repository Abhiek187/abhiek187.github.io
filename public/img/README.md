# Image Creation

To optimize media content on browsers, Google recommends converting all JPEG/PNG images to AVIF/WebP format and all GIFs to MPEG4/WebM videos. The [webp](https://developers.google.com/speed/webp) and [ffmpeg](https://ffmpeg.org/) commands can take care of the conversions.

## PNG --> WebP

```bash
cwebp -q 50 IMG.png -o IMG.webp
```

## GIF --> MP4

```bash
ffmpeg -i IMG.gif -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -movflags faststart IMG.mp4
```

Note that this command is different from the one provided in the article below to fix playback issues on Windows and Safari.

## GIF --> WebM

```bash
ffmpeg -i IMG.gif -c vp9 -b:v 0 -crf 41 IMG.webm
```

## MP4 --> WebM

```bash
ffmpeg -i IMG.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus IMG.webm
```

Alternatively, you can use [VLC media player](https://www.videolan.org) to convert all the media files.

## Articles

[Serve images in modern formats](https://web.dev/uses-webp-images/?utm_source=lighthouse&utm_medium=devtools)

[Use video formats for animated content](https://web.dev/efficient-animated-content/?utm_source=lighthouse&utm_medium=devtools)
