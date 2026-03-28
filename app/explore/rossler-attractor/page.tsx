'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

/**
 * RÖSSLER ATTRACTOR COMPONENT
 *
 * The Rössler attractor is another chaotic system, discovered by Otto Rössler in 1976.
 * It's simpler than the Lorenz system but still produces complex chaotic behavior.
 *
 * The Rössler system equations:
 * dx/dt = -y - z
 * dy/dt = x + ay
 * dz/dt = b + z(x - c)
 *
 * Where a, b, and c are parameters that control the system's behavior.
 */

export default function RosslerAttractor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [isPlaying, setIsPlaying] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  // Rössler parameters (classic chaotic values)
  const [params] = useState({
    a: 0.2,
    b: 0.2,
    c: 5.7
  })

  // Simulation state stored in refs to persist across renders
  const simulationState = useRef({
    x: 1,
    y: 1,
    z: 1,
    points: [] as { x: number; y: number; alpha: number }[],
    rotationX: 0.5,
    rotationY: 0
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const dt = 0.02
    const maxPoints = 2500
    const rotationSpeed = 0.004

    /**
     * PROJECT 3D TO 2D
     * Similar to Lorenz but with different scaling for the Rössler shape
     */
    const project = (x: number, y: number, z: number) => {
      const cosX = Math.cos(simulationState.current.rotationX)
      const sinX = Math.sin(simulationState.current.rotationX)
      const cosY = Math.cos(simulationState.current.rotationY)
      const sinY = Math.sin(simulationState.current.rotationY)

      let x1 = x * cosY - z * sinY
      let z1 = x * sinY + z * cosY

      let y1 = y * cosX - z1 * sinX

      // Different scale for Rössler (it has a different size/shape)
      const scale = 15
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

        const fadeRatio = i / simulationState.current.points.length

        // Pink to orange gradient
        const hue = 330 + fadeRatio * 30
        const saturation = 85 + fadeRatio * 15
        const lightness = 45 + fadeRatio * 25

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${fadeRatio})`
        ctx.lineWidth = 1 + fadeRatio * 2

        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }
    }

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(5, 8, 20, 0.08)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Calculate multiple steps per frame
      for (let i = 0; i < 6; i++) {
        // Rössler equations
        const dx = (-simulationState.current.y - simulationState.current.z) * dt
        const dy = (simulationState.current.x + params.a * simulationState.current.y) * dt
        const dz = (params.b + simulationState.current.z * (simulationState.current.x - params.c)) * dt

        simulationState.current.x += dx
        simulationState.current.y += dy
        simulationState.current.z += dz

        const projected = project(simulationState.current.x, simulationState.current.y, simulationState.current.z)
        simulationState.current.points.push({ ...projected, alpha: 1 })

        if (simulationState.current.points.length > maxPoints) {
          simulationState.current.points.shift()
        }
      }

      // Draw with different color scheme (pink to orange)
      for (let i = 1; i < simulationState.current.points.length; i++) {
        const point = simulationState.current.points[i]
        const prevPoint = simulationState.current.points[i - 1]

        const fadeRatio = i / simulationState.current.points.length
        point.alpha = fadeRatio

        // Pink to orange gradient
        const hue = 330 + fadeRatio * 30 // From pink through red to orange
        const saturation = 85 + fadeRatio * 15
        const lightness = 45 + fadeRatio * 25

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${point.alpha})`
        ctx.lineWidth = 1 + fadeRatio * 2

        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }

      simulationState.current.rotationX += rotationSpeed
      simulationState.current.rotationY += rotationSpeed * 0.5

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animate()
    } else {
      // When paused, redraw the frozen state
      redraw()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, params])

  const handleReset = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Reset simulation state to initial values
    simulationState.current = {
      x: 1,
      y: 1,
      z: 1,
      points: [],
      rotationX: 0.5,
      rotationY: 0
    }

    // Clear the canvas
    ctx.fillStyle = 'rgba(5, 8, 20, 1)'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  }

  return (
    <div className="space-y-6">
      {showInfo && (
        <div className="glass-card p-6 border-l-4 border-chaos-pink">
          <h3 className="text-xl font-semibold text-chaos-pink mb-3">Rössler Attractor</h3>
          <p className="text-gray-300 mb-4">
            Introduced by Otto Rössler in 1976, this system exhibits continuous chaotic dynamics.
            It creates a spiral pattern that folds back on itself, never repeating but staying
            within bounds.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-chaos-pink font-mono">a = {params.a}</span>
              <p className="text-gray-400 text-xs mt-1">Control parameter</p>
            </div>
            <div>
              <span className="text-chaos-orange font-mono">b = {params.b}</span>
              <p className="text-gray-400 text-xs mt-1">Control parameter</p>
            </div>
            <div>
              <span className="text-chaos-pink font-mono">c = {params.c}</span>
              <p className="text-gray-400 text-xs mt-1">Control parameter</p>
            </div>
          </div>
        </div>
      )}

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="w-full h-[420px] rounded-xl"
          style={{ background: 'rgba(5, 8, 20, 1)' }}
        />
      </div>

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
              ? 'bg-gradient-to-r from-chaos-pink to-chaos-orange'
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