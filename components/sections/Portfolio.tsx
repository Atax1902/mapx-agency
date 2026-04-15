'use client'

import { motion } from 'framer-motion'

type GalleryImage = { src: string; alt: string }

const ROW_1: GalleryImage[] = [
  { src: '/assets/portfolio/map1/ScreenShot00023.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00038.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_222517.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00050.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map1/ScreenShot00032.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00041.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_222853.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00053.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map1/ScreenShot00035.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00044.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_223152.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00047.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map1/ScreenShot00030.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00036.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_221829.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00055.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map10.png',                              alt: 'Map 10' },
]

const ROW_2: GalleryImage[] = [
  { src: '/assets/portfolio/map3/ScreenShot00191.png',               alt: 'Map 3' },
  { src: '/assets/portfolio/map7/ScreenShot00048.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map5/Casino_plan1.png',                  alt: 'Map 5' },
  { src: '/assets/portfolio/map1/ScreenShot00024.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00039.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map3/ScreenShot00193.png',               alt: 'Map 3' },
  { src: '/assets/portfolio/map7/ScreenShot00051.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map5/Stadefoot_plan1.png',               alt: 'Map 5' },
  { src: '/assets/portfolio/map2/image.png',                         alt: 'Map 2' },
  { src: '/assets/portfolio/map6/ScreenShot00042.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map3/ScreenShot00190.png',               alt: 'Map 3' },
  { src: '/assets/portfolio/map7/ScreenShot00054.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map5/Centreville_plan8.png',             alt: 'Map 5' },
  { src: '/assets/portfolio/map1/ScreenShot00036.png',               alt: 'Map 1' },
  { src: '/assets/portfolio/map6/ScreenShot00045.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map11.png',                              alt: 'Map 11' },
]

const ROW_3: GalleryImage[] = [
  { src: '/assets/portfolio/map5/Airport_plan1.png',                 alt: 'Map 5' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_221915.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00049.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map3/ScreenShot00192.png',               alt: 'Map 3' },
  { src: '/assets/portfolio/map6/ScreenShot00037.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map5/BDN_batiments.png',                 alt: 'Map 5' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_222637.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00052.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map5/Global_plan3.png',                  alt: 'Map 5' },
  { src: '/assets/portfolio/map6/ScreenShot00040.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map5/Villas_plan1.png',                  alt: 'Map 5' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_222704.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map7/ScreenShot00056.png',               alt: 'Map 7' },
  { src: '/assets/portfolio/map5/Stadefoot_plan2.png',               alt: 'Map 5' },
  { src: '/assets/portfolio/map6/ScreenShot00043.png',               alt: 'Map 6' },
  { src: '/assets/portfolio/map4/Capture_decran_2026-02-18_223020.png', alt: 'Map 4' },
  { src: '/assets/portfolio/map12.png',                              alt: 'Map 12' },
]

const ease = [0.16, 1, 0.3, 1] as const

function MarqueeRow({
  images,
  direction = 'left',
  duration,
  heightClass,
}: {
  images: GalleryImage[]
  direction?: 'left' | 'right'
  duration: number
  heightClass: string
}) {
  const doubled = [...images, ...images]

  return (
    <div
      className="overflow-hidden marquee-row"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}
    >
      <div
        className={`marquee-track flex gap-3 ${heightClass}`}
        style={{
          width: 'max-content',
          animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              height: '100%',
              aspectRatio: '16/9',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative section-alt overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 75% 0%, rgba(200,169,110,0.045) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 30% at 20% 100%, rgba(200,169,110,0.025) 0%, transparent 55%)',
        }}
      />

      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <motion.h2
          className="section-heading mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
        >
          Notre Portfolio
        </motion.h2>
        <motion.p
          className="section-subheading max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
        >
          {"Des créations qui parlent d'elles-mêmes."}
        </motion.p>
      </div>

      {/* Gallery rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col gap-3"
      >
        {/* Row 1 — left, 208px */}
        <MarqueeRow
          images={ROW_1}
          direction="left"
          duration={90}
          heightClass="h-52"
        />

        {/* Row 2 — right, 176px */}
        <MarqueeRow
          images={ROW_2}
          direction="right"
          duration={75}
          heightClass="h-44"
        />

        {/* Row 3 — left, 224px */}
        <MarqueeRow
          images={ROW_3}
          direction="left"
          duration={110}
          heightClass="h-56"
        />
      </motion.div>
    </section>
  )
}
