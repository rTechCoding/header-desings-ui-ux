# rTechCoding Animated Background Headers Generator

> **Animated Background Headers - Generate animated background headers for any website.**  
> Inspired by Stripe, replacing and upgrading `finisher.co/lab/header` with the **rTechCoding** brand engine.

---

## 🚀 Features

- **100% Drop-In Replacement for Finisher Header**:
  - Supports both `new RTechCodingHeader({...})` and `new FinisherHeader({...})`.
  - Same parameter schema (`count`, `size`, `speed`, `colors`, `blending`, `opacity`, `skew`, `shapes`).
- **Interactive Visual Studio**:
  - Live 60 FPS Canvas rendering with Retina / High-DPI support.
  - Real-time adjustment of count, min/max particle sizes, pulse, independent X & Y speeds, background color, particle colors array, blend modes, opacities, shapes (`c`, `s`, `t`), and skew angle.
  - 12 Built-in Presets:
    1. **rTechCoding Cyber** (Flagship neon cyan/purple/blue glow)
    2. **Vibrant Classic** (Finisher original style)
    3. **Night Sky**
    4. **Subtle Dark**
    5. **Smooth Pastel**
    6. **Bubbles Particle**
    7. **Professional Enterprise**
    8. **Summer Glow**
    9. **Parallax Drift**
    10. **Universe Nebula**
    11. **Emerald Aurora**
    12. **Stripe Classic**
- **Code Export in 5 Formats**:
  - HTML & Vanilla JavaScript snippet
  - Standalone JavaScript configuration
  - React / Next.js Component (`useEffect` lifecycle with automatic teardown)
  - Vue 3 Component (`<script setup>` Composition API)
  - Raw JSON configuration
- **Zero Heavy Dependencies**:
  - Pure Vanilla JavaScript + HTML5 Canvas (`requestAnimationFrame`).
  - Ultra-lightweight footprint (~2KB gzipped).

---

## 📂 Project Structure

```
UI-UX Degine/
└── header-desinge/
    ├── index.html           # Main visual generator application & interactive studio
    ├── styles.css           # Modern glassmorphism UI & responsive styles
    ├── app.js               # Generator controller & code exporter
    ├── rtechcoding-header.js # Standalone animated header canvas library
    ├── demo-minimal.html    # Quick standalone example
    ├── demo-presets.html    # Gallery of all 12 presets
    └── README.md            # Documentation & integration guide
```

---

## ⚡ Quick Start (Vanilla HTML / JS)

### 1. Add Container
Add a container element with the class `rtechcoding-header` or `finisher-header` and specify dimensions:

```html
<div class="header rtechcoding-header finisher-header" style="width: 100%; height: 480px;">
  <!-- Your Logo, Navigation, or Hero Content -->
</div>
```

### 2. Include Script
```html
<script src="rtechcoding-header.js" type="text/javascript"></script>
```

### 3. Initialize
```html
<script type="text/javascript">
  new RTechCodingHeader({
    "count": 7,
    "size": {
      "min": 1000,
      "max": 1400,
      "pulse": 0.25
    },
    "speed": {
      "x": { "min": 0.15, "max": 0.35 },
      "y": { "min": 0.15, "max": 0.35 }
    },
    "colors": {
      "background": "#050918",
      "particles": [
        "#00E5FF",
        "#2878FF",
        "#B323FF",
        "#00FFA3"
      ]
    },
    "blending": "screen",
    "opacity": {
      "center": 0.9,
      "edge": 0.05
    },
    "skew": -2,
    "shapes": ["c"]
  });
</script>
```

---

## ⚛️ React & Next.js Integration

```tsx
"use client";
import React, { useEffect, useRef } from "react";
// Load rtechcoding-header.js or install via npm

export default function HeroHeader() {
  const containerRef = useRef(null);

  useEffect(() => {
    let headerInstance = null;
    if (typeof window !== "undefined" && window.RTechCodingHeader) {
      headerInstance = new window.RTechCodingHeader({
        element: containerRef.current,
        count: 7,
        size: { min: 1000, max: 1400, pulse: 0.25 },
        speed: { x: { min: 0.15, max: 0.35 }, y: { min: 0.15, max: 0.35 } },
        colors: {
          background: "#050918",
          particles: ["#00E5FF", "#2878FF", "#B323FF", "#00FFA3"]
        },
        blending: "screen",
        opacity: { center: 0.9, edge: 0.05 },
        skew: -2,
        shapes: ["c"]
      });
    }

    return () => {
      if (headerInstance) headerInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rtechcoding-header"
      style={{ width: "100%", height: "480px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "relative", zIndex: 2, padding: "40px", color: "#fff" }}>
        <h1>Welcome to rTechCoding</h1>
      </div>
    </div>
  );
}
```

---

## 🛠 Configuration Reference

| Parameter | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | `6` | Total count of moving shapes / ambient blobs |
| `size.min` | `number` | `1000` | Minimum particle diameter (in px) |
| `size.max` | `number` | `1400` | Maximum particle diameter (in px) |
| `size.pulse` | `number` | `0` | Pulse wave oscillation amplitude (0 to 1) |
| `speed.x.min` / `max` | `number` | `0.1` / `0.3` | Horizontal drift speed range |
| `speed.y.min` / `max` | `number` | `0.1` / `0.3` | Vertical drift speed range |
| `colors.background` | `string` | `"#050918"` | Canvas base background color (hex/rgb) |
| `colors.particles` | `string[]` | `[...]` | Hex color palette for floating particles |
| `blending` | `string` | `"overlay"` | Canvas composite mode: `overlay`, `screen`, `lighten`, etc. |
| `opacity.center` | `number` | `1.0` | Radial fill opacity at the particle center |
| `opacity.edge` | `number` | `0.1` | Radial falloff opacity at the outer particle boundary |
| `skew` | `number` | `-2` | Skew angle in degrees applied to the canvas |
| `shapes` | `string[]` | `["c"]` | Geometric particle shapes: `"c"` (circle), `"s"` (square), `"t"` (triangle) |

---

## 🏷️ Finisher Header Compatibility

This package is completely compatible with code generated from `finisher.co/lab/header`:
```javascript
// Existing FinisherHeader code continues to work seamlessly!
new FinisherHeader({
  count: 6,
  size: { min: 1100, max: 1300, pulse: 0 },
  speed: { x: { min: 0.1, max: 0.3 }, y: { min: 0.1, max: 0.3 } },
  colors: { background: "#9138e5", particles: ["#6bd6ff", "#ffcb57", "#ff333d"] },
  blending: "overlay",
  opacity: { center: 1, edge: 0.1 },
  skew: -2,
  shapes: ["c"]
});
```

---
© rTechCoding. All rights reserved.
