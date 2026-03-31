import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ikSrc } from '../utils/imageKit'
import heroImage from '../assets/DSC_1862.JPG'
import packageWedding from '../assets/DSC_1862.JPG'
import packageBirthday from '../assets/DSC03962.JPG'
import packageCorporate from '../assets/DSC03980.JPG'

const Packages = () => {
  const [activePackage, setActivePackage] = useState('wedding')

  const packageTabs = useMemo(
    () => ({
      wedding: {
        label: 'Weddings',
        image: packageWedding,
        key: 'DSC_1862.JPG',
        description:
          'Grand wedding celebrations with beautiful decor, smooth guest flow, and royal hospitality.',
        features: [
          'Wedding concierge',
          'Floral and stage styling',
          'Customized menus',
          'Luxury bridal suite',
          'Grand mandap decoration',
          'Wedding photography',
        ],
      },
      birthday: {
        label: 'Birthday',
        image: packageBirthday,
        key: 'DSC03962.JPG',
        description:
          'Fun birthday celebrations with beautiful themes, great lighting, and amazing food.',
        features: [
          'Personalized themes',
          'Interactive dessert bar',
          'Photo-ready lighting',
          'Family lounge areas',
          'Balloon decorations',
          'Party favors',
        ],
      },
      anniversary: {
        label: 'Anniversary',
        image: packageWedding,
        key: 'DSC_1862.JPG',
        description:
          'Special anniversary celebrations with romantic decor, couple specials, and memorable experiences.',
        features: [
          'Romantic setup',
          'Couple dinner arrangement',
          'Photo session',
          'Special anniversary cake',
          'Flower decorations',
          'Love story display',
        ],
      },
      corporate: {
        label: 'Corporate',
        image: packageCorporate,
        key: 'DSC03980.JPG',
        description:
          'Professional corporate events with great AV setup, branding, and executive hospitality.',
        features: [
          'Executive welcome zone',
          'Stage and AV setup',
          'Meeting rooms',
          'Dedicated service staff',
          'Brand setup',
          'Executive lounge',
        ],
      },
    }),
    []
  )

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src={ikSrc(heroImage, 'DSC_1862.JPG', 'tr=w-2200,q-82')}
          alt="Luxury wedding packages"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-6xl items-center px-6 py-20 text-white">
          <div className="max-w-2xl space-y-6">
            <button className="text-black/80  rounded-2xl border px-4 py-3 bg-[var(--color-gold)]">Packages</button>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Grand experiences for every celebration.
            </h1>
            <p className="text-sm text-white/75">
              Choose a beautiful package and customize every detail with our
              expert event team and hospitality staff.
            </p>
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Start Planning
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-beige)]">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap gap-3">
            {Object.keys(packageTabs).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activePackage === key ? 'tab-btn-active' : ''}`}
                onClick={() => setActivePackage(key)}
              >
                {packageTabs[key].label}
              </button>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_-60px_rgba(0,0,0,0.4)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePackage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="space-y-5">
                  <h2 className="text-3xl font-semibold">
                    {packageTabs[activePackage].label} Collection
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {packageTabs[activePackage].description}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {packageTabs[activePackage].features.map((feature) => (
                      <span key={feature} className="pill">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact" className="lux-btn lux-btn-solid">
                    Request Proposal
                  </Link>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={ikSrc(
                      packageTabs[activePackage].image,
                      packageTabs[activePackage].key,
                      'tr=w-1100,q-82'
                    )}
                    alt={packageTabs[activePackage].label}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Packages
