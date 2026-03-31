import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ikSrc } from '../utils/imageKit'
import heroImage from '../assets/DSC03966.JPG'
import spaceBanquet from '../assets/DSC03966.JPG'
import spaceLawn from '../assets/DSC03987.JPG'
import spaceStage from '../assets/DSC03984.JPG'
import spaceEntry from '../assets/DSC_1845.JPG'
import spaceDining from '../assets/DSC_1866.JPG'

const spaces = [
  {
    title: 'Grand Banquet Hall',
    description:
      'A beautiful grand indoor hall with elegant lighting, nice acoustics, and ceremonial staging.',
    image: spaceBanquet,
    key: 'DSC03966.JPG',
  },
  {
    title: 'Grand Lawn Area',
    description:
      'Wide open greens perfect for wedding ceremonies, open-air receptions, and beautiful evening celebrations.',
    image: spaceLawn,
    key: 'DSC03987.JPG',
  },
  {
    title: 'Stage Setup',
    description:
      'A beautiful stage setup with flexible styling for wedding entries and performances.',
    image: spaceStage,
    key: 'DSC03984.JPG',
  },
  {
    title: 'Entry Arch',
    description:
      'A grand arrival walkway for beautiful entrances and welcome ceremonies.',
    image: spaceEntry,
    key: 'DSC_1845.JPG',
  },
  {
    title: 'Dining Area',
    description:
      'Elegant dining experience with beautiful lighting, great food, and smooth service.',
    image: spaceDining,
    key: 'DSC_1866.JPG',
  },
  {
    title: 'Valley Parking',
    description:
      'Spacious parking area for all your guests with easy access and security.',
    image: spaceLawn,
    key: 'DSC03987.JPG',
  },
]

const Spaces = () => {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src={ikSrc(heroImage, 'DSC03966.JPG', 'tr=w-2200,q-82')}
          alt="Tarunai Grand Banquet spaces"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-6xl items-center px-6 py-20 text-white">
          <div className="max-w-2xl space-y-6">
            <button className=" text-[var(--color-black)] px-4 py-3 rounded-2xl border bg-[var(--color-gold)]">Event Spaces</button>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Beautiful spaces for every ceremony, celebration, wedding, and corporate
              event.
            </h1>
            <p className="text-sm text-white/75">
              Explore a beautiful mix of indoor grandeur and open-air elegance,
              designed for flexible layouts and amazing celebrations.
            </p>
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Meet US
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {spaces.map((space) => (
              <motion.div
                key={space.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={ikSrc(space.image, space.key, 'tr=w-1200,q-82')}
                    alt={space.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="text-2xl font-semibold">{space.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {space.description}
                  </p>
                  <Link to="/contact" className="lux-link">
                    Reserve this space
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Spaces
