import DocViewer from '@/components/DocViewer'
import { Zap } from 'lucide-react'

export default function ArisingOfChaosPage() {
  return (
    <DocViewer
      title="Arising of Chaos"
      subtitle="How order transforms into unpredictability"
      icon={<Zap className="w-10 h-10 text-chaos-orange" />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">From Order to Chaos</h2>
          <p>
            Chaos doesn't appear suddenly - it <span className="text-chaos-orange font-semibold">emerges gradually</span> as a system's parameters change. Understanding this transition is key to grasping how deterministic systems can produce unpredictable behavior.
          </p>
        </section>

        {/* Period Doubling Route */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Period-Doubling Route to Chaos</h2>
          <p className="mb-4">
            One of the most common paths to chaos is through <span className="text-chaos-purple font-semibold">period doubling</span>, discovered by Mitchell Feigenbaum in 1975.
          </p>

          <div className="space-y-3">
            <div className="glass-card p-4 bg-chaos-blue/5">
              <h3 className="font-semibold text-chaos-blue mb-2">Stage 1: Fixed Point</h3>
              <p className="text-sm">The system settles to a single stable value. Period = 1.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-purple/5">
              <h3 className="font-semibold text-chaos-purple mb-2">Stage 2: Period-2 Oscillation</h3>
              <p className="text-sm">The system alternates between two values. Period = 2.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-pink/5">
              <h3 className="font-semibold text-chaos-pink mb-2">Stage 3: Period-4 Oscillation</h3>
              <p className="text-sm">The system cycles through four values. Period = 4.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-orange/5">
              <h3 className="font-semibold text-chaos-orange mb-2">Stage 4: Period Doubling Cascade</h3>
              <p className="text-sm">Periods continue doubling: 8, 16, 32, 64... faster and faster until...</p>
            </div>

            <div className="glass-card p-4 bg-gradient-to-r from-chaos-blue/10 via-chaos-purple/10 to-chaos-pink/10 border-2 border-chaos-pink/30">
              <h3 className="font-semibold gradient-text mb-2">Stage 5: CHAOS</h3>
              <p className="text-sm">The period becomes infinite - the system never repeats, exhibiting chaotic behavior.</p>
            </div>
          </div>
        </section>

        {/* Feigenbaum Constant */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Feigenbaum Constant</h2>
          <p className="mb-4">
            Mitchell Feigenbaum discovered something remarkable: the <span className="text-chaos-blue font-semibold">rate at which period doublings occur</span> follows a universal constant, now called the Feigenbaum constant:
          </p>
          <div className="glass-card p-6 bg-chaos-purple/5 border-l-4 border-chaos-purple">
            <p className="text-center text-xl font-mono text-chaos-purple">
              δ ≈ 4.669201609...
            </p>
          </div>
          <p className="mt-4">
            This constant appears in <span className="text-chaos-pink font-semibold">all systems</span> that undergo period-doubling routes to chaos, making it a universal feature of chaotic dynamics - much like π appears across many areas of mathematics.
          </p>
          <p>
            For the logistic equation as a parameter <span className='text-chaos-blue font-semibold'> r </span>
            changes, system may move from a stable state, 2-,4-,8-cycle, and so on, with ratio between the intervals
            <span className='text-chaos-blue font-semibold'> [r<sub>i+1</sub> - r<sub>i</sub>] </span>
            tending towards to <span className='text-chaos-purple text-xl'>  δ </span>
            until chaos reached, where i is the period number.
          </p>
        </section>

        {/* Bifurcation Diagram */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Bifurcation Diagram</h2>
          <p>
            The <span className="text-chaos-blue font-semibold">bifurcation diagram</span> is a visual map of how a system's behavior changes as a parameter varies. For the logistic equation, it shows:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>Single lines for stable fixed points</li>
            <li>Splitting (bifurcating) into multiple branches as periods double</li>
            <li>Dense, chaotic regions where the system never settles</li>
            <li>Surprising "windows" of order within chaos</li>
          </ul>
          <p className="mt-4">
            The bifurcation diagram is one of the most iconic images in chaos theory, revealing the intricate structure hidden within simple equations.
          </p>
        </section>

        {/* Sensitive Dependence */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Sensitive Dependence on Initial Conditions</h2>
          <p>
            Once a system enters the chaotic regime, it exhibits the hallmark property of chaos: <span className="text-chaos-pink font-semibold">extreme sensitivity to initial conditions</span>.
          </p>
          <div className="glass-card p-6 bg-chaos-pink/5 border-l-4 border-chaos-pink mt-4">
            <p className="font-semibold text-chaos-pink mb-2">The Butterfly Effect in Action</p>
            <p className="text-sm">
              Two trajectories starting at x₀ = 0.5 and x₀ = 0.500001 (differing by just 0.000001) will initially track closely together, but eventually diverge exponentially, following completely different paths through the system's state space.
            </p>
          </div>
          <p className="mt-4">
            This is why weather prediction is fundamentally limited - tiny measurement errors grow exponentially, making accurate long-term forecasts impossible regardless of computing power.
          </p>
        </section>

        {/* Universality */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Universality in Chaos</h2>
          <p>
            Perhaps the most profound discovery in chaos theory is that <span className="text-chaos-blue font-semibold">many different systems exhibit the same route to chaos</span>. Whether you're studying:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>Population dynamics in ecology</li>
            <li>Electronic circuits</li>
            <li>Fluid turbulence</li>
            <li>Chemical reactions</li>
          </ul>
          <p className="mt-4">
            They all follow similar period-doubling cascades with the same Feigenbaum constant. This universality suggests deep mathematical principles underlying chaos across diverse physical systems.
          </p>
        </section>
      </div>
    </DocViewer>
  )
}