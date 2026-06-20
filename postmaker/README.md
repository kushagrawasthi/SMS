# Social Loom — Social Media Post Maker

A browser-based tool for generating styled social media graphics, built with p5.js. Design posts with custom frames, marginalia, colour palettes, and background images, then export at full resolution.

---

## Features

### Canvas Formats
| Format | Dimensions | Use case |
|---|---|---|
| Post (Default) | 1080 × 1440 | Standard portrait post |
| Post (Square) | 1080 × 1080 | Square feed post |
| Post (Landscape) | 1920 × 1440 | Landscape post |
| Reel / Story | 1080 × 1920 | Vertical full-screen |

### Background
- Upload any image as a background
- Pan (horizontal/vertical offset) and zoom controls
- Optional dark overlay (multiply blend) to improve text legibility
- **Auto colour palette selection** — on image load, average pixel brightness is sampled and a matching palette is recommended automatically (overrideable)

### Frames & Margins

#### Frames
Five frame styles, toggled on/off:

| Style | Description |
|---|---|
| Simple | 5px stroke rectangle inset 50px from each edge |
| Thick | 50px stroke rectangle, flush to the edge |
| Dashed | 5px dashed stroke, same inset as Simple |
| Corner | L-shaped corner marks at each corner |
| Tabs | Solid filled triangles at each corner |

#### Cornices
Decorative elements placed at the four frame corners, independent of the frame style. Availability varies by frame type:

| Cornice | Available with |
|---|---|
| Line | All frames |
| Triangle | Simple, Dashed |
| Square | Simple, Dashed, Thick |
| Corner | Simple, Dashed |

#### Marginalia
Toggle-activated text placed in the 50px canvas margins. Two modes:

- **Manual** — four independent text inputs (top, bottom, left, right). Left and right text is rotated 90° to read inward. All text is rendered uppercase in Begum 20px with 0.3em letter spacing.
- **Text on Path** — a single text input that repeats continuously around a rectangle inset 42px from the canvas edge (8px outside the frame margin line). Characters are individually placed and rotated to follow the path clockwise.

### Colour Palettes
Seven palettes built from three base colours — **Syaahi** (dark `#272011`), **Halda** (light `#d3cdc4`), and **Suvarna** (gold `#9f8d6a`):

| # | Name | Background | Foreground |
|---|---|---|---|
| 1 | Dark-1 | Syaahi | Suvarna |
| 2 | Dark-2 | Syaahi | Suvarna |
| 3 | Light-1 | Halda | Syaahi |
| 4 | Light-2 | Halda | Syaahi |
| 5 | Light-3 | Halda | Suvarna |
| 6 | Medium-1 | Suvarna | Syaahi |
| 7 | Medium-2 | Suvarna | Halda |

Auto-selection logic:
- **Dark image** (avg brightness < 85) → palette 1 or 2
- **Medium image** (avg brightness 85–170) → palette 6 or 7
- **Bright image** (avg brightness > 170) → palette 3, 4, or 5

### Export
- Set a custom filename prefix
- Exports at full canvas resolution (e.g. 1080 × 1440) as a `.png`
- Filename is suffixed with dimensions and the current date (`DDMMYYYY`)

---

## Project Structure

```
SMS/
└── postmaker/
    ├── index.html      # Layout and control panel markup
    ├── style.css       # Styling, accordion controls, responsive layout
    ├── sketch.js       # p5.js sketch — canvas, drawing, all UI logic
    └── assets/
        └── social loom logo.png
```

---

## Running Locally

No build step required. Open `postmaker/index.html` directly in a browser, or serve the folder with any static file server:

```bash
npx serve postmaker
# or
python3 -m http.server --directory postmaker
```

Dependencies are loaded from CDN:
- [p5.js](https://p5js.org/) v1.11.11
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound)
- [Begum](https://fonts.adobe.com/fonts/begum) typeface via Adobe Fonts (`xcg6vkv`)

---

## Technical Notes

- The main canvas is a `p5.Graphics` buffer (`pg`) rendered at export resolution; the on-screen preview is a scaled-down `p5.Canvas`
- `p5.Graphics` uses radians regardless of `angleMode(DEGREES)` on the main sketch — rotations within `pg` use `Math.PI / 4` etc.
- `drawingContext` (native Canvas 2D API) is used directly for `setLineDash`, `lineCap`, and `letterSpacing` — none of these are managed by p5's `push()`/`pop()` and must be reset manually
- Image brightness is sampled by drawing `bgImg.canvas` into a throwaway 50×50 native canvas — this avoids modifying p5's internal image state via `loadPixels()`
- Text-on-path is implemented by walking characters one by one around the rectangle, computing position and tangent angle at each step via `posOnRect()` — p5 has no native path-text API
- `CanvasRenderingContext2D.letterSpacing` (Chrome 99+, Firefox 117+) is used for manual marginalia; path-mode text handles spacing manually to avoid double-counting during per-character layout
