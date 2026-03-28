# React & Next.js Learning Guide

This guide explains the key concepts and patterns used in the Chaos & Attractors project, designed for developers with basic React knowledge.

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [React Hooks Explained](#react-hooks-explained)
3. [Canvas Animation Pattern](#canvas-animation-pattern)
4. [Component Structure](#component-structure)
5. [TypeScript Basics](#typescript-basics)
6. [Common Patterns](#common-patterns)

---

## Project Architecture

### Next.js App Router Structure

```
app/
├── layout.tsx    → Root layout (wraps all pages)
├── page.tsx      → Homepage (what you see at /)
└── globals.css   → Global styles
```

**Key Concept**: In Next.js 14 with the App Router:
- `layout.tsx` provides the HTML shell and metadata for all pages
- `page.tsx` is the actual content for the route
- Each folder in `app/` can have its own `page.tsx` for different routes

### Why 'use client'?

You'll see `'use client'` at the top of some files:

```typescript
'use client'

import { useState } from 'react'
```

**Explanation**: Next.js has two types of components:
- **Server Components** (default) - Run only on the server, can't use hooks or browser APIs
- **Client Components** - Run in the browser, can use hooks, event handlers, Canvas API, etc.

We need `'use client'` because our components:
- Use React hooks (useState, useEffect, useRef)
- Access the browser's Canvas API
- Handle user interactions (button clicks)

---

## React Hooks Explained

### 1. useState - Managing State

```typescript
const [isPlaying, setIsPlaying] = useState(true)
```

**What it does**: Creates a piece of state that React tracks
- `isPlaying` - Current value
- `setIsPlaying` - Function to update the value
- `true` - Initial value

**When to use**: Any data that changes over time and should trigger a re-render
- User input
- Toggle states (playing/paused)
- Active selections

**Example in our code**:
```typescript
const [activeAttractor, setActiveAttractor] = useState<'lorenz' | 'rossler'>('lorenz')

// Later, when user clicks button:
setActiveAttractor('rossler') // This triggers a re-render
```

### 2. useRef - Persistent References

```typescript
const canvasRef = useRef<HTMLCanvasElement>(null)
const animationRef = useRef<number>()
```

**What it does**: Creates a mutable reference that persists between renders
- Doesn't trigger re-renders when changed
- Perfect for DOM elements and animation IDs

**Common uses**:
1. **DOM References**: Access HTML elements directly
   ```typescript
   const canvasRef = useRef<HTMLCanvasElement>(null)
   
   // Later in code:
   const canvas = canvasRef.current // The actual <canvas> element
   ```

2. **Storing Values**: Hold values that don't need to trigger renders
   ```typescript
   const animationRef = useRef<number>()
   
   // Store animation frame ID
   animationRef.current = requestAnimationFrame(animate)
   
   // Cancel it later
   cancelAnimationFrame(animationRef.current)
   ```

### 3. useEffect - Side Effects

```typescript
useEffect(() => {
  // Setup code (runs when component mounts or dependencies change)
  
  return () => {
    // Cleanup code (runs before component unmounts)
  }
}, [dependencies])
```

**What it does**: Runs side effects in response to component lifecycle
- After component renders
- When dependencies change
- Before component unmounts (cleanup)

**The dependency array**:
```typescript
useEffect(() => { }, [])        // Runs once on mount
useEffect(() => { }, [isPlaying]) // Runs when isPlaying changes
useEffect(() => { })            // Runs after every render (rarely needed)
```

**Example in our attractor components**:
```typescript
useEffect(() => {
  // Setup: Create canvas context, start animation
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  
  const animate = () => {
    // Draw frame
    requestAnimationFrame(animate)
  }
  
  animate() // Start animation
  
  // Cleanup: Stop animation when component unmounts
  return () => {
    cancelAnimationFrame(animationRef.current)
  }
}, [isPlaying]) // Re-run when play/pause changes
```

---

## Canvas Animation Pattern

Our attractors use the HTML5 Canvas API. Here's the pattern:

### Step 1: Get Canvas Reference

```typescript
const canvasRef = useRef<HTMLCanvasElement>(null)

// In JSX:
<canvas ref={canvasRef} />

// In useEffect:
const canvas = canvasRef.current
const ctx = canvas.getContext('2d')
```

### Step 2: Animation Loop

```typescript
const animate = () => {
  // 1. Clear or fade the canvas
  ctx.fillStyle = 'rgba(5, 8, 20, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 2. Update physics/math
  x += dx
  y += dy
  z += dz
  
  // 3. Draw
  ctx.strokeStyle = 'blue'
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  
  // 4. Request next frame
  requestAnimationFrame(animate)
}

animate() // Start
```

### Step 3: Cleanup

```typescript
return () => {
  cancelAnimationFrame(animationRef.current)
}
```

**Why cleanup?**: Without it, animations continue running even after the component is removed, causing memory leaks!

---

## Component Structure

### Anatomy of Our Attractor Components

```typescript
export default function LorenzAttractor() {
  // 1. STATE HOOKS - Component data that changes
  const [isPlaying, setIsPlaying] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  
  // 2. REFS - Persistent references
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  // 3. CONSTANTS - Configuration
  const [params] = useState({ sigma: 10, rho: 28, beta: 8/3 })
  
  // 4. EFFECTS - Side effects and lifecycle
  useEffect(() => {
    // Canvas setup and animation
  }, [isPlaying])
  
  // 5. EVENT HANDLERS - User interactions
  const handleReset = () => { /* ... */ }
  
  // 6. RENDER - JSX returned to display
  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
```

---

## TypeScript Basics

### Type Annotations

```typescript
// Variable types
const canvas: HTMLCanvasElement | null = canvasRef.current
const points: { x: number; y: number; alpha: number }[] = []

// Function parameter types
const project = (x: number, y: number, z: number) => {
  return { x: number, y: number }
}

// Component props
interface Props {
  title: string
  count?: number  // Optional
}

function MyComponent({ title, count = 0 }: Props) { }
```

### Generic Types

```typescript
// useRef with type parameter
const canvasRef = useRef<HTMLCanvasElement>(null)
//                      ^^^^^^^^^^^^^^^^^^
//                      This ref holds a canvas element

const animationRef = useRef<number>()
//                          ^^^^^^
//                          This ref holds a number
```

---

## Common Patterns

### 1. Conditional Rendering

```typescript
{showInfo && (
  <div>This only shows when showInfo is true</div>
)}

{isPlaying ? <Pause /> : <Play />}
```

### 2. Conditional Styling

```typescript
<button
  className={`base-classes ${
    isActive
      ? 'active-classes'
      : 'inactive-classes'
  }`}
>
```

### 3. Event Handlers

```typescript
// Inline arrow function
<button onClick={() => setIsPlaying(!isPlaying)}>

// Defined function
const handleReset = () => {
  // Reset logic
}
<button onClick={handleReset}>
```

### 4. Array Mapping

```typescript
{[...Array(20)].map((_, i) => (
  <div key={i}>Particle {i}</div>
))}
```

**Note**: Always include a `key` prop when mapping!

### 5. Scroll to Element

```typescript
document.getElementById('section')?.scrollIntoView({ 
  behavior: 'smooth' 
})
```

---

## Understanding the Math

### Lorenz System

The Lorenz attractor simulates atmospheric convection:

```typescript
// The equations
const dx = sigma * (y - x) * dt
const dy = (x * (rho - z) - y) * dt
const dz = (x * y - beta * z) * dt

// Update position
x += dx
y += dy
z += dz
```

**dt (delta time)**: Time step size
- Smaller = more accurate but slower
- Larger = faster but less accurate
- 0.01 is a good balance

### 3D to 2D Projection

We rotate and scale 3D coordinates to draw on 2D canvas:

```typescript
// Rotation matrices
const rotatedX = x * cos(angle) - z * sin(angle)
const rotatedY = y

// Scale and center
const screenX = centerX + rotatedX * scale
const screenY = centerY - rotatedY * scale
```

---

## Tips for Beginners

### 1. Start Small
- Run the project first: `npm install && npm run dev`
- Change one small thing at a time
- See what breaks (that's learning!)

### 2. Use Console Logging

```typescript
useEffect(() => {
  console.log('Component mounted!')
  console.log('isPlaying:', isPlaying)
  
  return () => {
    console.log('Component unmounting!')
  }
}, [isPlaying])
```

### 3. Experiment

Try modifying:
- Colors in `tailwind.config.js`
- Parameters in attractor components (sigma, rho, beta)
- Animation speeds and trail lengths
- Text content

### 4. React DevTools

Install the React Developer Tools browser extension to:
- Inspect component state
- See prop values
- Track re-renders

### 5. Common Errors

**"Cannot read property of null"**
→ Element hasn't rendered yet, add null check:
```typescript
if (!canvas) return
```

**"Too many re-renders"**
→ Infinite loop in useEffect or wrong dependency array

**"Memory leak"**
→ Forgot cleanup in useEffect

---

## Next Steps

1. **Add Parameter Controls**: Create sliders to adjust sigma, rho, beta in real-time
2. **More Attractors**: Implement Duffing, Chua, or Aizawa attractors
3. **Touch Controls**: Add drag to rotate the 3D view
4. **Performance**: Optimize with requestIdleCallback or Web Workers
5. **Styling**: Customize the color scheme and animations

---

Happy coding! Remember: The best way to learn is by experimenting and breaking things. Every error message is a learning opportunity! 🚀
