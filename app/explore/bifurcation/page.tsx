'use client'

import { useEffect, useRef, useState } from 'react'

export default function LogisticBifurcationDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [resolution, setResolution] = useState(800)
  const [iterations, setIterations] = useState(1000)
  const [plotPoints, setPlotPoints] = useState(300)
  const [rMin, setRMin] = useState(2.5)
  const [rMax, setRMax] = useState(4.0)
  const [isRendering, setIsRendering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsRendering(true)

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      renderBifurcationDiagram(canvas)
      setIsRendering(false)
    }, 50)
  }, [resolution, iterations, plotPoints, rMin, rMax])

  const logisticMap = (r: number, x: number) => {
    return r * x * (1 - x)
  }

  const renderBifurcationDiagram = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)

    const rRange = rMax - rMin
    const rStep = rRange / resolution

    // Draw grid
    ctx.strokeStyle = 'rgba(136, 135, 128, 0.1)'
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Calculate and plot bifurcation diagram
    for (let i = 0; i < resolution; i++) {
      const r = rMin + i * rStep
      let x = 0.5 // Starting population

      // Run iterations to reach attractor (discard transients)
      for (let j = 0; j < iterations; j++) {
        x = logisticMap(r, x)
      }

      // Collect points on the attractor
      const points: number[] = []
      for (let j = 0; j < plotPoints; j++) {
        x = logisticMap(r, x)
        points.push(x)
      }

      // Remove duplicates for stable points
      const uniquePoints = [...new Set(points.map(p => Math.round(p * 1000) / 1000))]

      // Determine color based on behavior
      let color: string
      if (r < 1) {
        color = 'rgba(156, 163, 175, 0.4)' // gray - extinction
      } else if (r < 3) {
        color = 'rgba(55, 138, 221, 0.6)' // blue - stable
      } else if (r < 3.57) {
        color = 'rgba(168, 85, 247, 0.5)' // purple - period doubling
      } else {
        color = 'rgba(236, 72, 153, 0.3)' // pink - chaos
      }

      // Plot points
      ctx.fillStyle = color
      for (const point of uniquePoints) {
        const px = ((r - rMin) / rRange) * width
        const py = height - (point * height)

        // Draw small circle for each point
        ctx.beginPath()
        ctx.arc(px, py, 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw axes labels and borders
    ctx.strokeStyle = 'rgba(136, 135, 128, 0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, width, height)

    // Add scale markers
    ctx.fillStyle = '#9ca3af'
    ctx.font = '12px system-ui'
    ctx.textAlign = 'center'

    // R-axis labels (bottom)
    for (let i = 0; i <= 10; i++) {
      const r = rMin + (rRange * i / 10)
      const x = (i / 10) * width
      ctx.fillText(r.toFixed(1), x, height - 5)
    }

    // Population axis labels (left)
    ctx.textAlign = 'right'
    for (let i = 0; i <= 10; i++) {
      const pop = i / 10
      const y = height - (i / 10) * height
      ctx.fillText(pop.toFixed(1), -5, y + 4)
    }
  }

  return (
    <div className="glass-card p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Bifurcation Diagram
        </h2>
        <p className="text-sm text-gray-400">
          Visualizing the onset of chaos in the logistic map: x<sub>t+1</sub> = r · x<sub>t</sub> · (1 - x<sub>t</sub>)
        </p>
      </div>

      {/* Main Canvas */}
      <div className="relative">
        <div className="glass-card p-6 bg-black/40 border border-gray-700/30">
          <div className="relative w-full" style={{ height: '400px' }}>
            {isRendering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <div className="text-chaos-blue animate-pulse">Rendering...</div>
              </div>
            )}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8">
              <div className="text-sm font-semibold text-gray-300 -rotate-90 whitespace-nowrap">
                Population (x)
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={1200}
              height={600}
              className="w-full h-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8">
              <div className="text-sm font-semibold text-gray-300">
                Growth rate (r)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card p-3 bg-gray-700/10 border border-gray-700/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div>
              <div className="text-xs text-gray-400">r &lt; 1</div>
              <div className="text-sm font-semibold text-gray-300">Extinction</div>
            </div>
          </div>
        </div>
        <div className="glass-card p-3 bg-chaos-blue/10 border border-chaos-blue/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chaos-blue"></div>
            <div>
              <div className="text-xs text-gray-400">1 &lt; r &lt; 3</div>
              <div className="text-sm font-semibold text-chaos-blue">Stable</div>
            </div>
          </div>
        </div>
        <div className="glass-card p-3 bg-chaos-purple/10 border border-chaos-purple/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chaos-purple"></div>
            <div>
              <div className="text-xs text-gray-400">3 &lt; r &lt; 3.57</div>
              <div className="text-sm font-semibold text-chaos-purple">Periodic</div>
            </div>
          </div>
        </div>
        <div className="glass-card p-3 bg-chaos-pink/10 border border-chaos-pink/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chaos-pink"></div>
            <div>
              <div className="text-xs text-gray-400">r &gt; 3.57</div>
              <div className="text-sm font-semibold text-chaos-pink">Chaos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card p-5 bg-black/20 space-y-4">
        <h3 className="text-lg font-bold text-white mb-3">Rendering Settings</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* R Range */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">
              R Range: [{rMin.toFixed(2)}, {rMax.toFixed(2)}]
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="3.5"
                  step="0.1"
                  value={rMin}
                  onChange={(e) => setRMin(Math.min(parseFloat(e.target.value), rMax - 0.1))}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-blue"
                />
                <div className="text-xs text-gray-500 mt-1">Min: {rMin.toFixed(1)}</div>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="2.5"
                  max="4"
                  step="0.1"
                  value={rMax}
                  onChange={(e) => setRMax(Math.max(parseFloat(e.target.value), rMin + 0.1))}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-pink"
                />
                <div className="text-xs text-gray-500 mt-1">Max: {rMax.toFixed(1)}</div>
              </div>
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">
              Resolution: {resolution} r-values
            </label>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={resolution}
              onChange={(e) => setResolution(parseInt(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-purple"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>200</span>
              <span>1100</span>
              <span>2000</span>
            </div>
          </div>

          {/* Iterations */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">
              Transient iterations: {iterations}
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-blue"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100</span>
              <span>1050</span>
              <span>2000</span>
            </div>
          </div>

          {/* Plot Points */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">
              Plot points: {plotPoints}
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={plotPoints}
              onChange={(e) => setPlotPoints(parseInt(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-pink"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>50</span>
              <span>275</span>
              <span>500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="glass-card p-5 bg-black/20">
        <h3 className="text-lg font-bold text-white mb-3">Understanding the Diagram</h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>
            This bifurcation diagram reveals the route to chaos in the logistic map. Each vertical slice represents
            a specific growth rate <span className="text-white font-mono">r</span>, with dots showing the long-term population values.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <span className="text-chaos-blue font-semibold">Stable region (r &lt; 3):</span> Single dots show the population
              converges to one fixed value
            </li>
            <li>
              <span className="text-chaos-purple font-semibold">Period-doubling cascade (3 &lt; r &lt; 3.57):</span> The
              number of stable points doubles repeatedly: 2, 4, 8, 16...
            </li>
            <li>
              <span className="text-chaos-pink font-semibold">Chaotic region (r &gt; 3.57):</span> Dense vertical bands
              indicate the population never settles, bouncing unpredictably
            </li>
            <li>
              Notice the narrow <span className="text-white">white "windows"</span> in the chaotic region—brief moments
              of order amid chaos
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}