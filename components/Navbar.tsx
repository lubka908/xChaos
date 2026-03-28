'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Menu, X, Orbit, BookOpen, Compass, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false)
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false)
  const [isMobileLearnOpen, setIsMobileLearnOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const learnDropdownRef = useRef<HTMLDivElement>(null)
  const exploreDropdownRef = useRef<HTMLDivElement>(null)

  // Track if component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsLearnDropdownOpen(false)
    setIsExploreDropdownOpen(false)
    setIsMobileExploreOpen(false)
    setIsMobileLearnOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (learnDropdownRef.current && !learnDropdownRef.current.contains(event.target as Node)) {
        setIsLearnDropdownOpen(false)
      }
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target as Node)) {
        setIsExploreDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home', icon: Sparkles },
  ]

  const exploreDropdownItems = [
    { href: '/explore/logistic-map', label: 'Logistic Map' },
    { href: '/explore/point-attractors', label: 'Point Attractors' },
    { href: '/explore/period-doubling', label: 'Route to Chaos' },
    { href: '/explore/bifurcation', label: 'Bifurcation Diagram'},
    { href: '/explore/lorenz-attractor', label: 'Lorenz Attractor' },
    { href: '/explore/rossler-attractor', label: 'Rössler Attractor' },
  ]

  const theoryDropdownItems = [
    { href: '/learn/logistic-equation', label: 'Logistic Equation' },
    { href: '/learn/arising-of-chaos', label: 'Arising of Chaos' },
    { href: '/learn/attractors', label: 'Attractors' },

  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const isExploreActive = exploreDropdownItems.some(item => pathname.startsWith(item.href))
  const isLearnActive = theoryDropdownItems.some(item => pathname.startsWith(item.href))

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card border-b backdrop-blur-xl bg-chaos-darker/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <div className="relative">
                <Compass className="w-8 h-8 text-chaos-blue group-hover:rotate-180 transition-transform duration-500" />
                <div className="absolute inset-0 blur-xl bg-chaos-blue/30 group-hover:bg-chaos-blue/50 transition-all" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg gradient-text">Chaos Theory</span>
                <span className="text-xs text-chaos-blue font-mono tracking-wider hidden sm:block">
                  Interactive Explorer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 group ${
                      active ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-chaos-blue/20 to-chaos-purple/20 rounded-lg border border-chaos-blue/30" />
                    )}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
                    <Icon className={`w-4 h-4 relative z-10 transition-colors ${
                      active ? 'text-chaos-blue' : 'text-gray-400 group-hover:text-chaos-purple'
                    }`} />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}

              {/* Desktop Explore Dropdown */}
              <div className="relative" ref={exploreDropdownRef}>
                <button
                  onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 group ${
                    isExploreActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isExploreActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-chaos-blue/20 to-chaos-purple/20 rounded-lg border border-chaos-blue/30" />
                  )}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
                  <Orbit className={`w-4 h-4 relative z-10 transition-colors ${
                    isExploreActive ? 'text-chaos-blue' : 'text-gray-400 group-hover:text-chaos-purple'
                  }`} />
                  <span className="relative z-10">Explore</span>
                  <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
                    isExploreDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full mt-2 right-0 w-56 transition-all duration-300 origin-top ${
                    isExploreDropdownOpen
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="glass-card border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                    {exploreDropdownItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition-all duration-200 ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-chaos-blue/20 to-chaos-purple/20 text-white border-l-2 border-chaos-blue'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        } ${index !== exploreDropdownItems.length - 1 ? 'border-b border-white/5' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            pathname === item.href ? 'bg-chaos-blue animate-pulse' : 'bg-gray-500'
                          }`} />
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Learn Theory Dropdown */}
              <div className="relative" ref={learnDropdownRef}>
                <button
                  onClick={() => setIsLearnDropdownOpen(!isLearnDropdownOpen)}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 group ${
                    isLearnActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isLearnActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-chaos-blue/20 to-chaos-purple/20 rounded-lg border border-chaos-blue/30" />
                  )}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
                  <BookOpen className={`w-4 h-4 relative z-10 transition-colors ${
                    isLearnActive ? 'text-chaos-blue' : 'text-gray-400 group-hover:text-chaos-purple'
                  }`} />
                  <span className="relative z-10">Learn Theory</span>
                  <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
                    isLearnDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full mt-2 right-0 w-56 transition-all duration-300 origin-top ${
                    isLearnDropdownOpen
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="glass-card border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                    {theoryDropdownItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition-all duration-200 ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-chaos-blue/20 to-chaos-purple/20 text-white border-l-2 border-chaos-blue'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        } ${index !== theoryDropdownItems.length - 1 ? 'border-b border-white/5' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            pathname === item.href ? 'bg-chaos-blue animate-pulse' : 'bg-gray-500'
                          }`} />
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-chaos-pink" />
              ) : (
                <Menu className="w-5 h-5 text-chaos-blue" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-chaos-darker/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative h-full flex flex-col pt-20 px-6">
          {/* Animated particles in background - only render on client */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-chaos-blue rounded-full animate-particle opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Navigation links */}
          <nav className="relative flex flex-col gap-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative overflow-hidden ${
                    isMobileMenuOpen ? 'animate-slide-in' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`relative px-6 py-5 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                      active
                        ? 'glass-card border-l-4 border-chaos-blue bg-gradient-to-r from-chaos-blue/10 to-transparent'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className={`relative ${active ? 'text-chaos-blue' : 'text-gray-400 group-hover:text-chaos-purple'}`}>
                      <Icon className="w-6 h-6 relative z-10" />
                      {active && (
                        <div className="absolute inset-0 blur-xl bg-chaos-blue/50" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-lg font-semibold ${
                        active ? 'gradient-text' : 'text-white'
                      }`}>
                        {link.label}
                      </span>
                    </div>
                    {active && (
                      <div className="w-2 h-2 rounded-full bg-chaos-blue animate-pulse" />
                    )}
                  </div>
                </Link>
              )
            })}

            {/* Mobile Explore Section */}
            <div
              className={`group relative overflow-hidden ${
                isMobileMenuOpen ? 'animate-slide-in' : ''
              }`}
              style={{
                animationDelay: `${navLinks.length * 100}ms`,
              }}
            >
              <div className="glass-card rounded-xl overflow-hidden">
                {/* Header - Clickable */}
                <button
                  onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                  className={`w-full px-6 py-5 flex items-center gap-4 border-b border-white/10 ${
                    isExploreActive ? 'bg-gradient-to-r from-chaos-blue/10 to-transparent' : ''
                  }`}
                >
                  <Orbit className={`w-6 h-6 ${isExploreActive ? 'text-chaos-blue' : 'text-gray-400'}`} />
                  <span className={`text-lg font-semibold flex-1 text-left ${
                    isExploreActive ? 'gradient-text' : 'text-white'
                  }`}>
                    Explore
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                    isMobileExploreOpen ? 'rotate-180' : ''
                  } ${isExploreActive ? 'text-chaos-blue' : 'text-gray-400'}`} />
                </button>

                {/* Submenu items - Collapsible */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isMobileExploreOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {exploreDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-6 py-4 pl-16 transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-chaos-purple/20 to-transparent text-white border-l-4 border-chaos-purple'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          pathname === item.href ? 'bg-chaos-purple animate-pulse' : 'bg-gray-600'
                        }`} />
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Learn Theory Section */}
            <div
              className={`group relative overflow-hidden ${
                isMobileMenuOpen ? 'animate-slide-in' : ''
              }`}
              style={{
                animationDelay: `${(navLinks.length + 1) * 100}ms`,
              }}
            >
              <div className="glass-card rounded-xl overflow-hidden">
                {/* Header - Clickable */}
                <button
                  onClick={() => setIsMobileLearnOpen(!isMobileLearnOpen)}
                  className={`w-full px-6 py-5 flex items-center gap-4 border-b border-white/10 ${
                    isLearnActive ? 'bg-gradient-to-r from-chaos-blue/10 to-transparent' : ''
                  }`}
                >
                  <BookOpen className={`w-6 h-6 ${isLearnActive ? 'text-chaos-blue' : 'text-gray-400'}`} />
                  <span className={`text-lg font-semibold flex-1 text-left ${
                    isLearnActive ? 'gradient-text' : 'text-white'
                  }`}>
                    Learn Theory
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                    isMobileLearnOpen ? 'rotate-180' : ''
                  } ${isLearnActive ? 'text-chaos-blue' : 'text-gray-400'}`} />
                </button>

                {/* Submenu items - Collapsible */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isMobileLearnOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {theoryDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-6 py-4 pl-16 transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-chaos-purple/20 to-transparent text-white border-l-4 border-chaos-purple'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          pathname === item.href ? 'bg-chaos-purple animate-pulse' : 'bg-gray-600'
                        }`} />
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Footer info in mobile menu */}
          <div className="mt-auto pb-8 text-center">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-gray-400 font-mono">
                Exploring the beauty of mathematical chaos
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-chaos-blue animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-chaos-purple animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-chaos-pink animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for slide-in animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}