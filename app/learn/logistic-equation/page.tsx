import DocViewer from '@/components/DocViewer'
import { TrendingUp } from 'lucide-react'

export default function LogisticEquationPage() {
  return (
    <DocViewer
      title="Logistic Equation"
      subtitle="The foundation of chaos theory in simple population dynamics"
      icon={<TrendingUp className="w-10 h-10 text-chaos-blue" />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p>
            Chaos is a particular class of how something changes over time.
            Even without measurements the time series can be simulated using some specific rule, usually mathematical equation.
            The <span className="text-chaos-blue font-semibold">logistic equation</span> is one of the simplest mathematical models that exhibits chaotic behavior. Despite its apparent simplicity, it demonstrates how complex, unpredictable patterns can emerge from deterministic rules.
          </p>
        </section>

        {/* The Equation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Equation</h2>
          <p className="mb-4">
            The discrete logistic equation is expressed as:
          </p>
          <div className="glass-card p-6 bg-chaos-blue/5 border-l-4 border-chaos-blue">
            <p className="text-center text-xl font-mono text-chaos-blue">
              x<sub>t+1</sub> = r · x<sub>t</sub> · (1 - x<sub>t</sub>)
            </p>
          </div>
          <p className="mt-4">
            Where:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><span className="text-chaos-purple font-semibold">x<sub>t</sub></span> represents the population during any one year (between 0 and 1)</li>
            <li><span className="text-chaos-pink font-semibold">r</span> is the growth rate parameter (typically between 0 and 4)</li>
            <li><span className="text-chaos-blue font-semibold">x<sub>t+1</sub></span> represents the next population</li>
          </ul>
          <p className='mt-4'>
            The logistic equation plots a parabola x<sub>t+1</sub>(x<sub>t</sub>). The parameter r governs the steepness and height of the parabola.
            The peak's height equals r/4 at x<sub>t</sub>=0.5.
          </p>
        </section>

        {/* Behavior for Different r Values */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Behavior Across Different r Values</h2>

          <div className="space-y-4">
            <div className="glass-card p-4 border-l-4 border-chaos-blue/50">
              <h3 className="text-lg font-semibold text-chaos-blue mb-2">r {"<"} 1: Extinction</h3>
              <p className="text-sm">Iterating the logistic map from any starting point x<sub>t</sub> converges x<sub>t+1</sub> to zero - <strong>fixed point attractor</strong>.
                The population extincts regardless of initial conditions.</p>
            </div>

            <div className="glass-card p-4 border-l-4 border-chaos-purple/50">
              <h3 className="text-lg font-semibold text-chaos-purple mb-2">1 {"<"} r {"<"} 3: Stable Equilibrium</h3>
              <p className="text-sm">The population settles to a single stable value, called <strong>point attractor</strong>.</p>
            </div>

            <div className="glass-card p-4 border-l-4 border-chaos-pink/50">
              <h3 className="text-lg font-semibold text-chaos-pink mb-2">3 {"<"} r {"<"} ~3.57: Period Doubling</h3>
              <p className="text-sm">The population oscillates between 2, then 4, then 8 values as r increases.</p>
            </div>

            <div className="glass-card p-4 border-l-4 border-chaos-orange/50">
              <h3 className="text-lg font-semibold text-chaos-orange mb-2">r {">"} ~3.57: Chaos</h3>
              <p className="text-sm">The population exhibits chaotic, seemingly random behavior despite being completely deterministic.</p>
            </div>
          </div>
        </section>

        {/* The Butterfly Effect */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Butterfly Effect</h2>
          <p>
            In the chaotic regime, the logistic equation exhibits <span className="text-chaos-pink font-semibold">extreme sensitivity to initial conditions</span>. Two starting populations that differ by even a tiny amount (like 0.5000 vs 0.5001) will eventually follow completely different trajectories.
          </p>
          <p className="mt-4">
            This is the essence of the "butterfly effect" - small changes lead to dramatically different outcomes, making long-term prediction impossible even though the system is deterministic.
          </p>
        </section>

        {/* Historical Context */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Historical Context</h2>
          <p>
            The chaotic behavior of the logistic equation was discovered by <span className="text-chaos-blue font-semibold">Robert May</span> in 1976. His work showed that even the simplest nonlinear equations could produce incredibly complex dynamics, fundamentally changing how scientists understood mathematical models in biology, ecology, and beyond.
          </p>
        </section>
      </div>
    </DocViewer>
  )
}