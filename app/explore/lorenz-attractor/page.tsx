'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

/**
 * LORENZ ATTRACTOR COMPONENT
 *
 * This component visualizes the famous Lorenz attractor - a chaotic system
 * discovered by Edward Lorenz while studying weather patterns in 1963.
 *
 * The Lorenz system is defined by three differential equations:
 * dx/dt = σ(y - x)
 * dy/dt = x(ρ - z) - y
 * dz/dt = xy - βz
 *
 * Where σ (sigma), ρ (rho), and β (beta) are parameters that control the system's behavior.
 */

export default function LorenzAttractor() {
  // Canvas reference - this is how we access the canvas element in React
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation frame reference - needed to cancel animation when component unmounts
  const animationRef = useRef<number>()

  // State management for user controls
  const [isPlaying, setIsPlaying] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  // Lorenz system parameters (classic values that produce the butterfly shape)
  const [params] = useState({
    sigma: 10,    // σ - Prandtl number
    rho: 28,      // ρ - Rayleigh number
    beta: 8/3     // β - geometric factor
  })

  // Simulation state stored in refs to persist across renders
  const simulationState = useRef({
    x: 0.1,
    y: 0,
    z: 0,
    points: [] as { x: number; y: number; alpha: number }[],
    rotationX: 0,
    rotationY: 0
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Time step for numerical integration (smaller = more accurate but slower)
    const dt = 0.01

    // Maximum trail length
    const maxPoints = 3000

    const rotationSpeed = 0.003

    /**
     * PROJECT 3D TO 2D
     * This function converts 3D coordinates to 2D screen coordinates
     * We apply rotation and perspective to create a 3D effect
     */
    const project = (x: number, y: number, z: number) => {
      // Apply rotation
      const cosX = Math.cos(simulationState.current.rotationX)
      const sinX = Math.sin(simulationState.current.rotationX)
      const cosY = Math.cos(simulationState.current.rotationY)
      const sinY = Math.sin(simulationState.current.rotationY)

      // Rotate around Y axis
      let x1 = x * cosY - z * sinY
      let z1 = x * sinY + z * cosY

      // Rotate around X axis
      let y1 = y * cosX - z1 * sinX
      let z2 = y * sinX + z1 * cosX

      // Scale and center on canvas
      const scale = 8
      const centerX = canvas.offsetWidth / 2
      const centerY = canvas.offsetHeight / 2

      return {
        x: centerX + x1 * scale,
        y: centerY - y1 * scale
      }
    }

    /**
     * REDRAW FUNCTION
     * Redraws the current state without animation (for paused state)
     */
    const redraw = () => {
      // Clear canvas completely
      ctx.fillStyle = 'rgba(5, 8, 20, 1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw the trail
      for (let i = 1; i < simulationState.current.points.length; i++) {
        const point = simulationState.current.points[i]
        const prevPoint = simulationState.current.points[i - 1]

        // Fade older points
        const fadeRatio = i / simulationState.current.points.length

        // Create gradient color based on position in trail
        const hue = (fadeRatio * 120 + 180) % 360
        const saturation = 80 + fadeRatio * 20
        const lightness = 50 + fadeRatio * 20

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${fadeRatio})`
        ctx.lineWidth = 1 + fadeRatio * 1.5

        // Draw line segment
        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }
    }

    /**
     * ANIMATION LOOP
     * This function runs repeatedly to update and draw the attractor
     */
    const animate = () => {
      // Clear canvas with a slight fade effect for motion blur
      ctx.fillStyle = 'rgba(5, 8, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Calculate multiple steps per frame for smoother animation
      for (let i = 0; i < 5; i++) {
        // Lorenz equations (using Euler method for numerical integration)
        const dx = params.sigma * (simulationState.current.y - simulationState.current.x) * dt
        const dy = (simulationState.current.x * (params.rho - simulationState.current.z) - simulationState.current.y) * dt
        const dz = (simulationState.current.x * simulationState.current.y - params.beta * simulationState.current.z) * dt

        // Update position
        simulationState.current.x += dx
        simulationState.current.y += dy
        simulationState.current.z += dz

        // Project 3D point to 2D screen coordinates
        const projected = project(simulationState.current.x, simulationState.current.y, simulationState.current.z)

        // Add point to trail
        simulationState.current.points.push({ ...projected, alpha: 1 })

        // Remove old points to maintain max length
        if (simulationState.current.points.length > maxPoints) {
          simulationState.current.points.shift()
        }
      }

      // Draw the trail
      for (let i = 1; i < simulationState.current.points.length; i++) {
        const point = simulationState.current.points[i]
        const prevPoint = simulationState.current.points[i - 1]

        // Fade older points
        const fadeRatio = i / simulationState.current.points.length
        point.alpha = fadeRatio

        // Create gradient color based on position in trail
        const hue = (fadeRatio * 120 + 180) % 360 // Cycle through blue to purple
        const saturation = 80 + fadeRatio * 20
        const lightness = 50 + fadeRatio * 20

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${point.alpha})`
        ctx.lineWidth = 1 + fadeRatio * 1.5

        // Draw line segment
        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }

      // Slowly rotate the view for dynamic 3D effect
      simulationState.current.rotationX += rotationSpeed
      simulationState.current.rotationY += rotationSpeed * 0.7

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start or stop animation based on isPlaying state
    if (isPlaying) {
      animate()
    } else {
      // When paused, redraw the frozen state
      redraw()
    }

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, params])

  /**
   * RESET FUNCTION
   * Clears the canvas and resets the simulation
   */
  const handleReset = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Reset simulation state to initial values
    simulationState.current = {
      x: 0.1,
      y: 0,
      z: 0,
      points: [],
      rotationX: 0,
      rotationY: 0
    }

    // Clear the canvas
    ctx.fillStyle = 'rgba(5, 8, 20, 1)'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  }

  return (
    <div className="space-y-6">
      {/* Info panel */}
      {showInfo && (
        <div className="glass-card p-6 border-l-4 border-chaos-blue">
          <h3 className="text-xl font-semibold text-chaos-blue mb-3">Lorenz Attractor</h3>
          <p className="text-gray-300 mb-4">
            Discovered by meteorologist Edward Lorenz in 1963, this system demonstrates how small changes
            in initial conditions can lead to vastly different outcomes - the essence of chaos theory.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-chaos-blue font-mono">σ = {params.sigma}</span>
              <p className="text-gray-400 text-xs mt-1">Prandtl number</p>
            </div>
            <div>
              <span className="text-chaos-purple font-mono">ρ = {params.rho}</span>
              <p className="text-gray-400 text-xs mt-1">Rayleigh number</p>
            </div>
            <div>
              <span className="text-chaos-pink font-mono">β = {params.beta.toFixed(2)}</span>
              <p className="text-gray-400 text-xs mt-1">Geometric factor</p>
            </div>
          </div>
        </div>
      )}

      {/* Canvas container */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="w-full h-[420px] rounded-xl"
          style={{ background: 'rgba(5, 8, 20, 1)' }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-6 py-1 rounded-lg font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-1" />
              Play
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-1 rounded-lg font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          <RotateCcw className="w-4 h-1" />
          Reset
        </button>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`flex items-center gap-2 px-6 py-1 rounded-lg font-semibold transition-all ${
            showInfo
              ? 'bg-gradient-to-r from-chaos-blue to-chaos-purple'
              : 'bg-white/5 border border-white/10 hover:bg-white/10'
          }`}
        >
          <Info className="w-4 h-1" />
          Info
        </button>
      </div>
    </div>
  )
}