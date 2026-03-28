import DocViewer from '@/components/DocViewer'
import { Orbit } from 'lucide-react'

export default function AttractorsPage() {
  return (
    <DocViewer
      title="Strange Attractors"
      subtitle="The beautiful geometry of chaos"
      icon={<Orbit className="w-10 h-10 text-chaos-pink" />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is an Attractor?</h2>
          <p>
            An <span className="text-chaos-blue font-semibold">attractor</span> is a set of states toward which a dynamical system tends to evolve over time. Think of it as the system's "destiny" - no matter where you start (within a certain region), you'll eventually end up on or near the attractor.
          </p>
          <p className="mt-4">
            In chaos theory, we're particularly interested in <span className="text-chaos-pink font-semibold">strange attractors</span> - attractors with fractal structure that govern chaotic dynamics.
          </p>
        </section>

        {/* Types of Attractors */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Types of Attractors</h2>

          <div className="space-y-4">
            <div className="glass-card p-4 border-l-4 border-chaos-blue/50">
              <h3 className="text-lg font-semibold text-chaos-blue mb-2">Fixed Point Attractor</h3>
              <p className="text-sm mb-2">The simplest type - the system settles to a single equilibrium point.</p>
              <p className="text-xs text-gray-400">Example: A pendulum with friction comes to rest at the bottom.</p>
            </div>

            <div className="glass-card p-4 border-l-4 border-chaos-purple/50">
              <h3 className="text-lg font-semibold text-chaos-purple mb-2">Limit Cycle</h3>
              <p className="text-sm mb-2">The system repeats the same trajectory in a periodic loop.</p>
              <p className="text-xs text-gray-400">Example: A clock pendulum oscillating at constant amplitude.</p>
            </div>

            <div className="glass-card p-4 border-l-4 border-chaos-pink/50">
              <h3 className="text-lg font-semibold text-chaos-pink mb-2">Strange Attractor</h3>
              <p className="text-sm mb-2">A fractal structure with infinite complexity - the hallmark of chaos.</p>
              <p className="text-xs text-gray-400">Example: The Lorenz attractor governing atmospheric convection.</p>
            </div>
          </div>
        </section>

        {/* The Lorenz Attractor */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Lorenz Attractor</h2>
          <p className="mb-4">
            Discovered by meteorologist <span className="text-chaos-blue font-semibold">Edward Lorenz</span> in 1963, the Lorenz attractor is perhaps the most famous strange attractor. It arises from a simplified model of atmospheric convection with three coupled differential equations:
          </p>

          <div className="glass-card p-6 bg-chaos-blue/5 border-l-4 border-chaos-blue">
            <div className="font-mono text-sm space-y-1">
              <p className="text-chaos-blue">dx/dt = σ(y - x)</p>
              <p className="text-chaos-purple">dy/dt = x(ρ - z) - y</p>
              <p className="text-chaos-pink">dz/dt = xy - βz</p>
            </div>
          </div>

          <p className="mt-4">
            The resulting attractor has a distinctive <span className="text-chaos-purple font-semibold">butterfly shape</span>, with trajectories that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
            <li>Never exactly repeat</li>
            <li>Never intersect themselves</li>
            <li>Spiral around two lobes unpredictably</li>
            <li>Stay bounded in space despite infinite complexity</li>
          </ul>
        </section>

        {/* The Rössler Attractor */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Rössler Attractor</h2>
          <p className="mb-4">
            Created by <span className="text-chaos-orange font-semibold">Otto Rössler</span> in 1976, this attractor was designed to be one of the simplest continuous systems exhibiting chaotic behavior:
          </p>

          <div className="glass-card p-6 bg-chaos-orange/5 border-l-4 border-chaos-orange">
            <div className="font-mono text-sm space-y-1">
              <p className="text-chaos-blue">dx/dt = -y - z</p>
              <p className="text-chaos-purple">dy/dt = x + ay</p>
              <p className="text-chaos-pink">dz/dt = b + z(x - c)</p>
            </div>
          </div>

          <p className="mt-4">
            The Rössler attractor forms a <span className="text-chaos-pink font-semibold">twisted ribbon</span> in 3D space, with trajectories that loop around in an increasingly complex spiral pattern.
          </p>
        </section>

        {/* Properties of Strange Attractors */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Properties of Strange Attractors</h2>

          <div className="space-y-3">
            <div className="glass-card p-4 bg-chaos-blue/5">
              <h3 className="font-semibold text-chaos-blue mb-2">Fractal Dimension</h3>
              <p className="text-sm">Strange attractors have non-integer dimensions. The Lorenz attractor has a dimension of approximately 2.06 - more than a surface but less than a volume.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-purple/5">
              <h3 className="font-semibold text-chaos-purple mb-2">Sensitive Dependence</h3>
              <p className="text-sm">Nearby trajectories on the attractor diverge exponentially, making long-term prediction impossible.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-pink/5">
              <h3 className="font-semibold text-chaos-pink mb-2">Topological Mixing</h3>
              <p className="text-sm">Any region of the attractor will eventually spread out and intersect with any other region, thoroughly mixing the system's states.</p>
            </div>

            <div className="glass-card p-4 bg-chaos-orange/5">
              <h3 className="font-semibold text-chaos-orange mb-2">Dense Periodic Orbits</h3>
              <p className="text-sm">Within the chaotic attractor exist infinitely many unstable periodic orbits, though typical trajectories never settle into them.</p>
            </div>
          </div>
        </section>

        {/* Physical Significance */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Attractors Matter</h2>
          <p>
            Strange attractors aren't just mathematical curiosities - they appear throughout nature and technology:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li><span className="text-chaos-blue font-semibold">Weather systems</span> - The Lorenz attractor models atmospheric convection</li>
            <li><span className="text-chaos-purple font-semibold">Heart rhythms</span> - Cardiac dynamics can be chaotic, with attractors governing healthy vs. pathological states</li>
            <li><span className="text-chaos-pink font-semibold">Chemical reactions</span> - Oscillating reactions like the Belousov-Zhabotinsky reaction follow strange attractors</li>
            <li><span className="text-chaos-orange font-semibold">Neural networks</span> - Brain activity may be governed by high-dimensional chaotic attractors</li>
          </ul>
        </section>

        {/* The Beauty of Chaos */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Beauty of Chaos</h2>
          <p>
            Strange attractors reveal that <span className="gradient-text font-semibold">deterministic chaos has intricate structure</span>. What appears random at first glance follows geometric patterns of stunning complexity. They bridge the gap between order and disorder, showing us that nature's apparent randomness often conceals deep mathematical beauty.
          </p>
          <div className="glass-card p-6 bg-gradient-to-r from-chaos-blue/10 via-chaos-purple/10 to-chaos-pink/10 border border-chaos-blue/30 mt-6">
            <p className="text-sm italic text-center">
              "Clouds are not spheres, mountains are not cones, coastlines are not circles, and bark is not smooth, nor does lightning travel in a straight line."
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              — Benoit Mandelbrot, on the fractal geometry of nature
            </p>
          </div>
        </section>
      </div>
    </DocViewer>
  )
}