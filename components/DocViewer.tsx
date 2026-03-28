'use client'

import { ReactNode } from 'react'
import { Book, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DocViewerProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
}

export default function DocViewer({ title, subtitle, icon, children }: DocViewerProps) {
  return (
    <main className="min-h-screen py-6 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        {/* <Link
          href="/"
          className="inline-flex items-center gap-2 text-chaos-blue hover:text-chaos-purple transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Home</span>
        </Link> */}

        {/* Document header */}
        <div className="glass-card p-8 md:p-12 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              {icon || <Book className="w-10 h-10 text-chaos-blue" />}
              <div className="absolute inset-0 blur-xl bg-chaos-blue/30" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg text-gray-400 font-light">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Decorative divider */}
          <div className="h-px bg-gradient-to-r from-chaos-blue via-chaos-purple to-chaos-pink opacity-30 mb-8" />

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-6">
              {children}
            </div>
          </div>
        </div>

        {/* Navigation footer */}
        <div className="glass-card p-6 text-center">
          <p className="text-sm text-gray-400 mb-3">Continue exploring</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/learn/logistic-equation"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold transition-all"
            >
              Logistic Equation
            </Link>
            <Link
              href="/learn/arising-of-chaos"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold transition-all"
            >
              Arising of Chaos
            </Link>
            <Link
              href="/learn/attractors"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold transition-all"
            >
              Attractors
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}