# 📊 Project Architecture Overview

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     RootLayout (layout.tsx)                 │
│  • Provides HTML structure                                  │
│  • Loads global CSS                                         │
│  • Sets metadata (title, description)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    HomePage (page.tsx)                       │
│  Main client component with three sections:                 │
├─────────────────────────────────────────────────────────────┤
│  1. HERO SECTION                                            │
│     • Animated background particles                         │
│     • Title and description                                 │
│     • Navigation buttons                                    │
│     • Scroll indicator                                      │
├─────────────────────────────────────────────────────────────┤
│  2. EDUCATION SECTION                                       │
│     • What is Chaos Theory?                                 │
│     • Three key concepts cards                              │
│     • Glass morphism design                                 │
├─────────────────────────────────────────────────────────────┤
│  3. VISUALIZATION SECTION                                   │
│     • Attractor toggle buttons                              │
│     • Dynamic component rendering:                          │
│       ├─ LorenzAttractor (when selected)                   │
│       └─ RosslerAttractor (when selected)                  │
└─────────────────────────────────────────────────────────────┘

```

## Component Deep Dive

### LorenzAttractor.tsx & RosslerAttractor.tsx

```
┌─────────────────────────────────────────────────────────┐
│            Attractor Component Structure                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATE MANAGEMENT                                       │
│  • isPlaying: boolean (play/pause animation)            │
│  • showInfo: boolean (toggle info panel)                │
│  • params: object (mathematical parameters)             │
│                                                         │
│  REFS                                                   │
│  • canvasRef: Canvas element reference                  │
│  • animationRef: Animation frame ID                     │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  useEffect Hook (Main Logic)                            │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 1. Setup Canvas                                   │ │
│  │    • Get canvas element                           │ │
│  │    • Get 2D context                               │ │
│  │    • Set up resize handler                        │ │
│  │                                                    │ │
│  │ 2. Initialize Variables                           │ │
│  │    • Starting position (x, y, z)                  │ │
│  │    • Time step (dt)                               │ │
│  │    • Points array for trail                       │ │
│  │    • Rotation angles                              │ │
│  │                                                    │ │
│  │ 3. Define Helper Functions                        │ │
│  │    • project(x,y,z): 3D → 2D conversion          │ │
│  │                                                    │ │
│  │ 4. Animation Loop (animate function)              │ │
│  │    ┌──────────────────────────────────────────┐  │ │
│  │    │ a. Clear/Fade canvas                     │  │ │
│  │    │ b. Calculate physics (5-6 steps)         │  │ │
│  │    │    • Apply differential equations        │  │ │
│  │    │    • Update x, y, z coordinates          │  │ │
│  │    │    • Project to 2D                        │  │ │
│  │    │    • Store point in array                │  │ │
│  │    │ c. Draw trail                             │  │ │
│  │    │    • Iterate through points              │  │ │
│  │    │    • Apply gradient colors               │  │ │
│  │    │    • Draw line segments                  │  │ │
│  │    │ d. Update rotation                        │  │ │
│  │    │ e. Request next frame                     │  │ │
│  │    └──────────────────────────────────────────┘  │ │
│  │                                                    │ │
│  │ 5. Cleanup Function                               │ │
│  │    • Cancel animation frame                       │ │
│  │    • Remove event listeners                       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  EVENT HANDLERS                                         │
│  • handleReset(): Clear canvas and reset simulation    │
│  • Play/Pause button: Toggle isPlaying state           │
│  • Info button: Toggle showInfo state                  │
│                                                         │
│  RENDER (JSX)                                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │ {showInfo && <InfoPanel />}                       │ │
│  │ <canvas ref={canvasRef} />                        │ │
│  │ <ControlButtons />                                │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Interaction
      │
      ▼
┌─────────────────┐
│  Click Button   │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│  Event Handler Triggered │
│  (e.g., onClick)         │
└──────────┬───────────────┘
           │
           ▼
┌────────────────────────────┐
│  Update State              │
│  setIsPlaying(!isPlaying)  │
└──────────┬─────────────────┘
           │
           ▼
┌─────────────────────────┐
│  React Re-renders       │
│  Component              │
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────────────┐
│  useEffect Triggered         │
│  (dependency: [isPlaying])   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Animation Starts/Stops      │
│  • Start: requestAnimFrame   │
│  • Stop: cancelAnimFrame     │
└──────────────────────────────┘
```

## Canvas Animation Loop

```
        ┌──────────────────────────────────┐
        │   requestAnimationFrame(animate) │
        │                                  │
        │   Browser schedules next frame   │
        │   (~60fps = every 16.67ms)       │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │   animate() Function Called │
        └────────────┬────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  1. Clear/Fade Canvas            │
        │     ctx.fillRect(...)            │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  2. Update Physics (5-6 steps)   │
        │     x += dx                       │
        │     y += dy                       │
        │     z += dz                       │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  3. Project 3D → 2D              │
        │     Apply rotation matrices       │
        │     Scale and center              │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  4. Store Point                  │
        │     points.push({x, y, alpha})   │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  5. Draw Trail                   │
        │     Loop through points          │
        │     Draw colored line segments   │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  6. Update Rotation Angle        │
        │     rotationX += rotationSpeed   │
        └────────────┬─────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────────┐
        │  7. Schedule Next Frame          │
        │     requestAnimationFrame(animate)│
        └──────────────────────────────────┘
                     │
                     └───────────┐
                                 │
                            (loop continues)
```

## Styling Architecture

```
┌────────────────────────────────────────────────────┐
│            Tailwind CSS Configuration              │
├────────────────────────────────────────────────────┤
│  tailwind.config.js                                │
│  • Custom colors (chaos palette)                   │
│  • Custom fonts                                    │
│  • Custom animations                               │
│  • Extended theme                                  │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│            Global CSS (globals.css)                │
├────────────────────────────────────────────────────┤
│  @layer base                                       │
│  • Body background gradient                        │
│  • Smooth scrolling                                │
│                                                    │
│  @layer components                                 │
│  • .text-glow (glowing text effect)               │
│  • .gradient-text (gradient text)                 │
│  • .glass-card (glassmorphism)                    │
│  • .chaos-button (interactive button)             │
│  • .canvas-container (radial gradient bg)         │
│                                                    │
│  @layer utilities                                  │
│  • Custom keyframe animations                      │
│  • Particle float animation                        │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│          Component-Level Styling                   │
├────────────────────────────────────────────────────┤
│  Inline Tailwind Classes                           │
│  className="glass-card p-8 md:p-12"               │
│                                                    │
│  Conditional Classes                               │
│  className={`base ${active ? 'active' : ''}`}     │
│                                                    │
│  Dynamic Inline Styles                             │
│  style={{ left: `${x}%`, top: `${y}%` }}          │
└────────────────────────────────────────────────────┘
```

## TypeScript Type Flow

```
Component Props
      │
      ▼
┌──────────────────────┐
│  Type Definitions    │
│  interface Props { } │
└──────┬───────────────┘
       │
       ▼
┌────────────────────────────┐
│  Function Parameters       │
│  function MyComp(props: Props) │
└──────┬─────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  State with Types          │
│  useState<boolean>(true)   │
│  useRef<HTMLElement>(null) │
└──────┬─────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  Type-Safe Operations      │
│  TypeScript validates:     │
│  • Function calls          │
│  • Object properties       │
│  • Array operations        │
└────────────────────────────┘
```

## Key Concepts Summary

### React Hooks Used
1. **useState** - UI state (playing, showInfo, activeAttractor)
2. **useRef** - DOM references (canvas) and persistent values (animationId)
3. **useEffect** - Side effects (canvas setup, animation lifecycle)

### Canvas API Methods
- `getContext('2d')` - Get drawing context
- `fillRect()` - Draw rectangle (for clearing/fading)
- `beginPath()` - Start new path
- `moveTo()` / `lineTo()` - Define line
- `stroke()` - Draw the line
- `requestAnimationFrame()` - Schedule next frame

### Next.js Features
- App Router structure (`app/` directory)
- Server vs Client components (`'use client'`)
- Automatic routing (folders become routes)
- Metadata API (SEO optimization)

### Tailwind Patterns
- Utility classes (`flex`, `gap-4`, `text-center`)
- Custom classes (defined in globals.css)
- Responsive prefixes (`md:`, `lg:`)
- Dynamic classes (template literals)

---

This architecture enables:
✓ Smooth 60fps animations
✓ Responsive design
✓ Type-safe code
✓ Modular components
✓ Easy maintenance
✓ Great learning experience!
