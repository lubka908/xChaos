'use client'

import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import type { ChartConfiguration } from 'chart.js'

export default function PeriodicCobwebDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [r, setR] = useState(3.2)
  const [iterations, setIterations] = useState(50)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)

  const x0 = 0.4

  const generateParabolaData = (rValue: number) => {
    const data = []
    for (let x = 0; x <= 1; x += 0.005) {
      const y = rValue * x * (1 - x)
      data.push({ x, y })
    }
    return data
  }

  const generateDiagonalData = () => {
    const data = []
    for (let x = 0; x <= 1; x += 0.1) {
      data.push({ x, y: x })
    }
    return data
  }

  const generateCobwebPath = (x0: number, rValue: number, maxIter: number) => {
    const path = []
    let x = x0

    // Start point
    path.push({ x: x, y: 0 })

    for (let i = 0; i < maxIter; i++) {
      // Vertical line to parabola
      const y = rValue * x * (1 - x)
      path.push({ x: x, y: y })

      // Horizontal line to diagonal
      path.push({ x: y, y: y })

      x = y
    }

    return path
  }

  const detectPeriod = (rValue: number, x0: number, maxIter: number = 200) => {
    let x = x0
    const trajectory = []

    // Skip transient
    for (let i = 0; i < 100; i++) {
      x = rValue * x * (1 - x)
    }

    // Collect points
    for (let i = 0; i < maxIter; i++) {
      trajectory.push(x)
      x = rValue * x * (1 - x)
    }

    // Find unique points (with tolerance)
    const tolerance = 0.001
    const uniquePoints = []

    for (const point of trajectory.slice(-50)) {
      let isUnique = true
      for (const unique of uniquePoints) {
        if (Math.abs(point - unique) < tolerance) {
          isUnique = false
          break
        }
      }
      if (isUnique) {
        uniquePoints.push(point)
      }
    }

    return uniquePoints.length
  }

  const animate = () => {
    setIsAnimating(true)
    setCurrentIteration(0)
  }

  useEffect(() => {
    if (isAnimating && currentIteration < iterations) {
      const timer = setTimeout(() => {
        setCurrentIteration(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    } else if (currentIteration >= iterations) {
      setIsAnimating(false)
    }
  }, [isAnimating, currentIteration, iterations])

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const displayIter = isAnimating ? currentIteration : iterations
    const cobweb = generateCobwebPath(x0, r, displayIter)

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'x(t+1) = r·x(t)·(1-x(t))',
            data: generateParabolaData(r),
            borderColor: '#378ADD',
            backgroundColor: 'rgba(55, 138, 221, 0.1)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 2,
          },
          {
            label: 'y = x',
            data: generateDiagonalData(),
            borderColor: '#888780',
            borderWidth: 1.5,
            borderDash: [8, 4] as [number, number],
            pointRadius: 0,
            fill: false,
            order: 1,
          },
          {
            label: `x₀ = ${x0}`,
            data: cobweb,
            borderColor: '#AFA9EC',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 0,
            segment: {
              borderDash: (ctx) => {
                // Alternate between solid and dashed for vertical/horizontal
                return ctx.p0DataIndex % 2 === 0 ? [] : [0]
              }
            }
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { size: 13 },
              usePointStyle: false,
              boxWidth: 24,
              boxHeight: 3,
              padding: 16,
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 1,
            title: {
              display: true,
              text: 'x(t)',
              font: { size: 14, weight: 'bold' as const },
            },
            ticks: {
              stepSize: 0.2,
              font: { size: 12 },
            },
            grid: {
              color: 'rgba(136, 135, 128, 0.1)',
            },
          },
          y: {
            type: 'linear',
            min: 0,
            max: 1,
            title: {
              display: true,
              text: 'x(t+1)',
              font: { size: 14, weight: 'bold' as const },
            },
            ticks: {
              stepSize: 0.2,
              font: { size: 12 },
            },
            grid: {
              color: 'rgba(136, 135, 128, 0.1)',
            },
          },
        },
      },
    }

    chartRef.current = new Chart(ctx, config)

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [r, iterations, isAnimating, currentIteration])

  const period = detectPeriod(r, x0)

  const getAttractorDescription = () => {
    if (r < 1) {
      return { type: 'extinction (0)', color: 'text-gray-400' }
    } else if (r < 3) {
      const fixedPoint = (r - 1) / r
      return { type: `fixed point (${fixedPoint.toFixed(3)})`, color: 'text-chaos-blue' }
    } else if (period === 2) {
      return { type: '2-point cycle', color: 'text-chaos-purple' }
    } else if (period === 4) {
      return { type: '4-point cycle', color: 'text-chaos-pink' }
    } else if (period === 8) {
      return { type: '8-point cycle', color: 'text-orange-400' }
    } else if (period > 8 && period < 20) {
      return { type: `${period}-point cycle`, color: 'text-yellow-400' }
    } else {
      return { type: 'chaotic attractor', color: 'text-red-400' }
    }
  }

  const attractorInfo = getAttractorDescription()

  return (
    <div className="glass-card p-2 space-y-1">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Period Doubling Route to Chaos</h3>

      </div>

      {/* Controls */}
      <div className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-300">
              Growth rate (r)
            </label>
            <span className="text-xl font-bold text-chaos-blue tabular-nums">
              {r.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="2.8"
            max="4.0"
            step="0.01"
            value={r}
            onChange={(e) => {
              setR(parseFloat(e.target.value))
              setCurrentIteration(0)
              setIsAnimating(false)
            }}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-blue"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2.8</span>
            <span className="text-chaos-purple">~3.0 (period-2)</span>
            <span className="text-chaos-pink">~3.45 (period-4)</span>
            <span className="text-orange-400">~3.54 (period-8)</span>
            <span className="text-red-400">~3.57+ (chaos)</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-300">
              Iterations
            </label>
            <span className="text-xl font-bold text-chaos-purple tabular-nums">
              {iterations}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={iterations}
            onChange={(e) => {
              setIterations(parseInt(e.target.value))
              setCurrentIteration(0)
              setIsAnimating(false)
            }}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-purple"
          />
        </div>

        <button
          onClick={animate}
          disabled={isAnimating}
          className="w-full glass-card p-1 bg-chaos-blue/10 border border-chaos-blue/30 text-chaos-blue font-semibold rounded-lg hover:bg-chaos-blue/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? `Animating... (${currentIteration}/${iterations})` : 'Animate Iteration'}
        </button>
      </div>

      {/* Info Card */}
      <div className="glass-card p-2 bg-chaos-purple/10 border border-chaos-purple/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Converging to</span>
          <span className={`text-lg font-bold ${attractorInfo.color}`}>
            {attractorInfo.type}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Detected period: <span className={`font-semibold ${attractorInfo.color}`}>{period}</span>
          {' | '}Initial condition: <span className="text-chaos-purple">x₀ = {x0}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[400px] glass-card p-4 bg-black/20">
        <canvas ref={canvasRef} />
      </div>

      {/* Explanation */}
      <div className="text-sm text-gray-400 space-y-2">
        <p>
          The graphical iteration process: starting from x₀ on the x-axis,
          move vertically to the parabola to find x₁, then horizontally to the diagonal,
          then vertically again to find x₂, and so on.
        </p>
        <p>
          <span className="text-chaos-blue font-semibold">Period Doubling:</span> As r increases,
          the system undergoes bifurcations: fixed point → 2-point cycle → 4-point cycle → 8-point cycle → chaos.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="glass-card p-2 bg-chaos-purple/5">
            <span className="text-chaos-purple font-semibold">r ≈ 3.0:</span> Period-2 bifurcation
          </div>
          <div className="glass-card p-2 bg-chaos-pink/5">
            <span className="text-chaos-pink font-semibold">r ≈ 3.45:</span> Period-4 bifurcation
          </div>
          <div className="glass-card p-2 bg-orange-400/5">
            <span className="text-orange-400 font-semibold">r ≈ 3.54:</span> Period-8 bifurcation
          </div>
          <div className="glass-card p-2 bg-red-400/5">
            <span className="text-red-400 font-semibold">r ≈ 3.57:</span> Onset of chaos
          </div>
        </div>
      </div>
    </div>
  )
}