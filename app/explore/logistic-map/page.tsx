'use client'

import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import type { ChartConfiguration } from 'chart.js'

export default function LogisticParabolaExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [r, setR] = useState(3.2)

  const getBehavior = (rValue: number) => {
    if (rValue < 1) return { name: 'Extinction', color: 'text-gray-400' }
    if (rValue < 3) return { name: 'Stable equilibrium', color: 'text-chaos-blue' }
    if (rValue < 3.57) return { name: 'Period doubling', color: 'text-chaos-purple' }
    return { name: 'Chaos', color: 'text-chaos-pink' }
  }

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

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const peakHeight = r / 4

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'x(t+1) = r·x(t)·(1-x(t))',
            data: generateParabolaData(r),
            borderColor: '#378ADD',
            backgroundColor: 'rgba(55, 138, 221, 0.1)',
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
          {
            label: 'y = x (Fixed points)',
            data: generateDiagonalData(),
            borderColor: '#888780',
            borderWidth: 1.5,
            borderDash: [8, 4] as [number, number],
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
              title: (context:any) => {
                return `x(t) = ${context[0].parsed.x.toFixed(3)}`
              },
              label: (context:any) => {
                if (context.datasetIndex === 0) {
                  return `x(t+1) = ${context.parsed.y.toFixed(3)}`
                }
                return undefined
              },
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 1,
            title: {
              display: true,
              text: 'x(t) - Current population',
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
            max: Math.max(1.1, peakHeight + 0.15),
            title: {
              display: true,
              text: 'x(t+1) - Next population',
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
  }, [r])

  const peakHeight = r / 4
  const behavior = getBehavior(r)

  return (
    <div className="glass-card p-1 space-y-1">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Explore the Logistic Map</h3>
      </div>

      {/* Slider Control */}
      <div className="space-y-0">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-200">
            Growth rate (r)
          </label>
          <span className="text-2xl font-bold text-chaos-blue tabular-nums">
            {r.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="4"
          step="0.01"
          value={r}
          onChange={(e) => setR(parseFloat(e.target.value))}
          className="w-full h-0.5 rounded-lg appearance-none cursor-pointer bg-gray-700/50 accent-chaos-blue"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 bg-chaos-blue/10 border border-chaos-blue/20">
          <div className="text-xs text-gray-400 mb-1">Peak height = r/4 at x<sub>t</sub> = 0.5</div>
          <div className="text-2xl font-bold text-chaos-blue tabular-nums">
            {peakHeight.toFixed(3)}
          </div>
        </div>
        <div className={`glass-card p-4 border ${
          behavior.name === 'Extinction' ? 'bg-gray-700/10 border-gray-700/20' :
          behavior.name === 'Stable equilibrium' ? 'bg-chaos-blue/10 border-chaos-blue/20' :
          behavior.name === 'Period doubling' ? 'bg-chaos-purple/10 border-chaos-purple/20' :
          'bg-chaos-pink/10 border-chaos-pink/20'
        }`}>
          <div className="text-xs text-gray-400 mb-1">Behavior</div>
          <div className={`text-xl font-bold ${behavior.color}`}>
            {behavior.name}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[400px] glass-card p-4 bg-black/20">
        <canvas ref={canvasRef} />
      </div>

      {/* Explanation */}
      <div className="text-sm text-gray-400 space-y-2">
        <p>
          The blue curve shows the logistic map.
          Where this curve intersects the diagonal (y = x), the population reaches a fixed point.
        </p>
        <p>
          <span className="text-chaos-blue font-semibold">Tip:</span> Try different r values to see how the parabola's shape changes and how it affects the system's behavior.
        </p>
      </div>
    </div>
  )
}