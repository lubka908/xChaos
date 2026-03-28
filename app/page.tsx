//'use client'

//import { useState, useEffect } from 'react'
import { Sparkles, Orbit, Zap, BookOpen } from 'lucide-react'
import Link from 'next/link'
//import App from './learn/page'
export default function Home() {


  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


        {/* Hero content */}
        <div className="absolute z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-chaos-purple animate-pulse" />
            <span className="text-chaos-purple font-mono text-sm tracking-wider uppercase">
              Interactive Mathematics
            </span>
            </div>

          <h1 className="text-4xl md:text-6xl mb-6 gradient-text animate-float">
            Chaos & Attractors
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            Explore thе amazing world of <span className="text-chaos-purple font-semibold">chaos theory</span> and{' '}
            <span className="text-chaos-purple font-semibold">strange attractors</span> through interactive visualizations
          </p>
          <p className='text-gray-300 md:text-2xl mb-8 max-w-3xl mx-auto'>
                <span className="text-chaos-purple font-semibold">Chaos theory</span> is the study of systems that appear random but are actually governed by underlying patterns and deterministic laws. These systems are highly sensitive to initial conditions - a phenomenon often called the{' '}
                <span className="text-chaos-pink font-semibold">"butterfly effect"</span>.
          </p>
          <p className='text-gray-300 md:text-2xl mb-8 max-w-3xl mx-auto'>

                Even tiny differences in starting conditions can lead to vastly different outcomes, making long-term prediction impossible even though the system follows precise mathematical rules.
          </p>

        </div>
          </section>

      <footer className="py-2 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="text-sm">Exploring the beauty of mathematical chaos</p>
        </div>
      </footer>
    </main>
  )
}
