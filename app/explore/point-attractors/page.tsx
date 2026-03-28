'use client'

import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import type { ChartConfiguration } from 'chart.js'

export default function LogisticCobwebDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [r, setR] = useState(0.95)
  const [iterations, setIterations] = useState(15)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)

  const x0_1 = 0.4
  const x0_2 = 0.9

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

  const animate = () => {
    setIsAnimating(true)
    setCurrentIteration(0)
  }

  useEffect(() => {
    if (isAnimating && currentIteration < iterations) {
      const timer = setTimeout(() => {
        setCurrentIteration(prev => prev + 1)
      }, 400)
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
    const cobweb1 = generateCobwebPath(x0_1, r, displayIter)
    const cobweb2 = generateCobwebPath(x0_2, r, displayIter)

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
            order: 3,
          },
          {
            label: 'y = x',
            data: generateDiagonalData(),
            borderColor: '#888780',
            borderWidth: 1.5,
            borderDash: [8, 4] as [number, number],
            pointRadius: 0,
            fill: false,
            order: 2,
          },
          {
            label: `x₀ = ${x0_1}`,
            data: cobweb1,
            borderColor: '#AFA9EC',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 1,
            segment: {
              borderDash: (ctx) => {
                // Alternate between solid and dashed for vertical/horizontal
                return ctx.p0DataIndex % 2 === 0 ? [] : [0]
              }
            }
          },
          {
            label: `x₀ = ${x0_2}`,
            data: cobweb2,
            borderColor: '#ED93B1',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 0,
            segment: {
              borderDash: (ctx) => {
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
              filter: (item) => {
                // Show all legend items
                return true
              }
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

  const fixedPoint = r > 1 ? (r - 1) / r : 0
  const convergingTo = r < 1 ? 'extinction (0)' : `fixed point (${fixedPoint.toFixed(3)})`

  return (
    <div className="glass-card p-1 space-y-1">
      <div>
        <h3 className="text-xl font-bold text-white mb-0.5">Graphical Iteration</h3>
        {/* <p className="text-sm text-gray-400">
          Cobweb diagram showing convergence to a point attractor
        </p> */}
      </div>

      {/* Controls */}
      <div className="space-y-0">
        <div className="space-y-0">
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
            min="0.5"
            max="2.9"
            step="0.05"
            value={r}
            onChange={(e) => {
              setR(parseFloat(e.target.value))
              setCurrentIteration(0)
              setIsAnimating(false)
            }}
            className="w-full h-0.5 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-blue"
          />
        </div>

        <div className="space-y-2">
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
            min="5"
            max="30"
            step="1"
            value={iterations}
            onChange={(e) => {
              setIterations(parseInt(e.target.value))
              setCurrentIteration(0)
              setIsAnimating(false)
            }}
            className="w-full h-0.5 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-purple"
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
      <div className="glass-card p-1 bg-chaos-purple/10 border border-chaos-purple/20">
              <span className="text-xs text-gray-400 mb-1">Converging to </span>
        <span className="text-lg font-bold text-chaos-purple">
          {convergingTo}
        </span>
        <span className="text-xs text-gray-400 mt-2">
          ; Initial conditions: <span className="text-chaos-purple">x₀ = {x0_1}</span> and{' '}
          <span className="text-chaos-pink">x₀ = {x0_2}</span>
        </span>
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
          <span className="text-chaos-blue font-semibold">Tip:</span> For r {'<'} 1, both trajectories
          converge to extinction. For 1 {'<'} r {'<'} 3, they converge to a stable non-zero fixed point.
        </p>
      </div>
    </div>
  )
}