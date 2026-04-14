'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectImage } from '@/types'

interface ProjectCarouselProps {
  title:       string
  description: string
  images:      ProjectImage[]
  tags?:       string[]
  year?:       number
}

export function ProjectCarousel({
  title,
  description,
  images,
  tags,
  year,
}: ProjectCarouselProps) {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (index: number, dir: number) => {
    setDirection(dir)
    setCurrent(index)
  }

  const prev = () => goTo((current - 1 + images.length) % images.length, -1)
  const next = () => goTo((current + 1) % images.length, 1)

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative">
        <div
          className="relative overflow-hidden rounded-3xl aspect-[4/3]"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) next()
                if (info.offset.x >  40) prev()
              }}
            >
              {images[current]?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[current].src}
                  alt={images[current].alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg,
                      hsl(${(current * 47) % 360}, 20%, 14%) 0%,
                      hsl(${(current * 47 + 60) % 360}, 18%, 18%) 100%)`,
                  }}
                >
                  <div className="text-center">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto mb-3 opacity-30"
                      style={{ color: 'var(--gold)' }}
                    >
                      <rect x="2" y="6" width="20" height="15" rx="3" />
                      <circle cx="12" cy="13" r="3.5" />
                      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                    </svg>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {images[current]?.alt || 'Image du projet'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  color: '#F5F5F5',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                aria-label="Image précédente"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  color: '#F5F5F5',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                aria-label="Image suivante"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div
              className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                color: '#F5F5F5',
              }}
            >
              {current + 1} / {images.length}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Image ${i + 1}`}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  i === current
                    ? 'w-6 h-2 bg-gold'
                    : 'w-2 h-2 opacity-30 hover:opacity-60',
                )}
                style={i !== current ? { background: 'var(--text)' } : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: 'rgba(200,169,110,0.12)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(200,169,110,0.2)',
                }}
              >
                {tag}
              </span>
            ))}
            {year && (
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: 'var(--surface-2)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                {year}
              </span>
            )}
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
          {title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
