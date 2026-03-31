import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ikSrc } from '../utils/imageKit'
import heroImage from '../assets/DSC_1837.JPG'
import heroVideo from '../assets/Tarunai.mov'
import journeyLandscape from '../assets/DSC03980.JPG'
import journeyCouple from '../assets/DSC03969.JPG'
import spaceBanquet from '../assets/DSC03966.JPG'
import spaceLawn from '../assets/DSC03987.JPG'
import spaceStage from '../assets/DSC03984.JPG'
import spaceEntry from '../assets/DSC_1845.JPG'
import spaceDining from '../assets/DSC_1866.JPG'
import highlightBallroom from '../assets/DSC_1848.JPG'
import highlightPavilion from '../assets/DSC_1856.JPG'
import highlightLawn from '../assets/DSC_1859.JPG'
import packageWedding from '../assets/DSC_1862.JPG'
import packageBirthday from '../assets/DSC03962.JPG'
import packageCorporate from '../assets/DSC03980.JPG'
import ctaImage from '../assets/DSC_1848.JPG'
import suite1 from '../assets/DSC_1845.JPG'
import suite2 from '../assets/DSC_1856.JPG'
import suite3 from '../assets/DSC_1859.JPG'
import suite4 from '../assets/DSC_1862.JPG'
import suite5 from '../assets/DSC_1866.JPG'
import suite6 from '../assets/DSC_1848.JPG'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const heroImageRef = useRef(null)
  const [activePackage, setActivePackage] = useState('wedding')
  const [lightbox, setLightbox] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef(null)

  const signatureSuite = useMemo(
    () => [
      {
        image: suite1,
        key: 'DSC_1845.JPG',
        title: 'Grand Entry Experience',
        description: 'Beautiful entrance that welcomes your guests with elegance',
      },
      {
        image: suite2,
        key: 'DSC_1856.JPG',
        title: 'Premium Pavilion Setup',
        description: 'Perfect outdoor space for ceremonies and celebrations',
      },
      {
        image: suite3,
        key: 'DSC_1859.JPG',
        title: 'Grand Lawn Area',
        description: 'Spacious green area for grand outdoor events',
      },
      {
        image: suite4,
        key: 'DSC_1862.JPG',
        title: 'Luxury Wedding Decor',
        description: 'Stunning wedding setup with royal decorations',
      },
      {
        image: suite5,
        key: 'DSC_1866.JPG',
        title: 'Elegant Dining Space',
        description: 'Beautiful dining area for grand celebrations',
      },
      {
        image: suite6,
        key: 'DSC_1848.JPG',
        title: 'Ballroom Elegance',
        description: 'Magnificent ballroom for grand receptions',
      },
    ],
    []
  )

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % signatureSuite.length)
    }, 4000)
  }

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [signatureSuite.length])

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index)
    stopAutoSlide()
    startAutoSlide()
  }

  const timelessSpaces = useMemo(
    () => [
      {
        title: 'Grand Banquet Hall',
        image: spaceBanquet,
        key: 'DSC03966.JPG',
      },
      {
        title: 'Grand Lawn Area',
        image: spaceLawn,
        key: 'DSC03987.JPG',
      },
      {
        title: 'Stage Setup',
        image: spaceStage,
        key: 'DSC03984.JPG',
      },
      {
        title: 'Entry Arch',
        image: spaceEntry,
        key: 'DSC_1845.JPG',
      },
      {
        title: 'Dining Area',
        image: spaceDining,
        key: 'DSC_1866.JPG',
      },
      {
        title: 'Valley Parking',
        image: spaceLawn,
        key: 'DSC03987.JPG',
      },
    ],
    []
  )

  const highlightCards = useMemo(
    () => [
      {
        title: 'Grand Ballroom',
        description:
          'A beautiful chandelier-lit ballroom for royal wedding entrances and grand receptions.',
        image: highlightBallroom,
        key: 'DSC_1848.JPG',
      },
      {
        title: 'Covered Pavilion',
        description:
          'Open-air beauty with comfortable weather-friendly setup for sunset ceremonies and evening parties.',
        image: highlightPavilion,
        key: 'DSC_1856.JPG',
      },
      {
        title: 'Grand Open Lawn',
        description:
          'A wide green space for grand wedding ceremonies, festive celebrations, and beautiful dinner setups.',
        image: highlightLawn,
        key: 'DSC_1859.JPG',
      },
    ],
    []
  )

  const packageTabs = useMemo(
    () => ({
      wedding: {
        label: 'Weddings',
        image: packageWedding,
        key: 'DSC_1862.JPG',
        description:
          'Beautiful grand wedding celebrations with stunning decor, special rituals, and royal hospitality.',
        features: ['Bridal suite access', 'Stage styling', 'Custom gourmet menu', 'Wedding decor setup', 'Grand mandap decoration'],
      },
      birthday: {
        label: 'Birthday',
        image: packageBirthday,
        key: 'DSC03962.JPG',
        description:
          'Fun birthday celebrations with beautiful themes, great food, and photo-ready lighting.',
        features: ['Theme-led decor', 'Kids and family zones', 'Custom dessert bar', 'Party setup', 'Balloon decorations'],
      },
      anniversary: {
        label: 'Anniversary',
        image: packageWedding,
        key: 'DSC_1862.JPG',
        description:
          'Special anniversary celebrations with romantic decor, couple specials, and memorable experiences.',
        features: ['Romantic setup', 'Couple dinner', 'Photo session', 'Special cake', 'Flower decorations'],
      },
      corporate: {
        label: 'Corporate',
        image: packageCorporate,
        key: 'DSC03980.JPG',
        description:
          'Professional corporate events with great AV setup, branding, and executive hospitality.',
        features: ['Stage and AV setup', 'Meeting rooms', 'Dedicated service', 'Brand setup', 'Executive lounge'],
      },
    }),
    []
  )

  const galleryImages = useMemo(
    () => [
      { src: heroImage, key: 'DSC_1837.JPG' },
      { src: journeyLandscape, key: 'DSC03980.JPG' },
      { src: journeyCouple, key: 'DSC03969.JPG' },
      { src: spaceBanquet, key: 'DSC03966.JPG' },
      { src: spaceStage, key: 'DSC03984.JPG' },
      { src: highlightBallroom, key: 'DSC_1848.JPG' },
    ],
    []
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 2.6, ease: 'power2.out' }
      )

      gsap.to(heroImageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          }
        )
      })

      gsap.utils.toArray('.parallax-image').forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.utils.toArray('.stagger-card').forEach((group) => {
        const cards = group.querySelectorAll('.stagger-item')
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 75%',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[88vh] items-center overflow-hidden"
      >
        <video
          ref={heroImageRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover"
          style={{ 
            minWidth: '100%',
            minHeight: '100%',
            // width: 'auto',
            // height: 'auto',
            transform: 'rotate(-90deg) scale(1.78)',
            transformOrigin: 'center center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-ivory)] to-transparent"></div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 text-white">
          <motion.p
            className="mb-6 text-xs uppercase tracking-[0.45em] text-[var(--color-gold)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
          </motion.p>
          <motion.h1
            className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Grand Moments That Last Forever
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-base text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            A beautiful grand destination for weddings, receptions, birthdays, anniversaries, and celebrations
            with royal hospitality, curated experiences, and elegant
            spaces that shine from morning ceremonies to starlit evening parties.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Book a Tour
            </Link>
            <Link to="/spaces" className="lux-btn lux-btn-ghost">
              Explore Venue
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="reveal-up">
              <p className="eyebrow">The Grand Journey of Tarunai Grand Banquet</p>
              <h2 className="section-title">
                A beautiful legacy of celebrations for every special moment.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="floating-card parallax-image">
                <img
                  src={ikSrc(journeyLandscape, 'DSC03980.JPG', 'tr=w-1100,q-82')}
                  alt="Lawn and banquet view"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="floating-card parallax-image md:translate-y-10">
                <img
                  src={ikSrc(journeyCouple, 'DSC03969.JPG', 'tr=w-900,q-82')}
                  alt="Wedding couple celebration"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="reveal-up text-sm leading-relaxed text-[var(--color-text-secondary)]">
              From beautiful mehendi ceremonies to grand ballroom receptions, our
              team creates amazing wedding celebrations with stunning decor,
              great food, and magical experiences that feel like a dream come true.
              We make every moment special with our royal hospitality and attention to detail.
            </p>
            <Link to="/contact" className="lux-btn lux-btn-solid w-fit reveal-up">
              Block Your Date
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-beige)]">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="reveal-up">
            <p className="eyebrow">Timeless Spaces</p>
            <h2 className="section-title">
              Timeless Spaces, Unforgettable Memories
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-card">
            {timelessSpaces.map((space) => (
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="stagger-item group relative overflow-hidden rounded-3xl"
                key={space.title}
              >
                <img
                  src={ikSrc(space.image, space.key, 'tr=w-900,q-80')}
                  alt={space.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="rounded-2xl bg-black/55 px-4 py-3 text-white backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-gold)]">
                      {space.title}
                    </p>
                    <p className="mt-2 text-xs text-white/70 opacity-0 transition duration-500 group-hover:opacity-100">
                      Discover grand experiences crafted for ceremonies,
                      weddings, dinners, and unforgettable celebrations.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex">
            <Link to="/spaces" className="lux-link">
              Explore Event Spaces
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-dark)] py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center mb-10">
            <p className="eyebrow text-[var(--color-gold)]">Premium Collection</p>
            <h2 className="section-title text-white">
              Our Signature Suite
            </h2>
            <p className="mt-4 text-sm text-white/70 max-w-2xl mx-auto">
              Experience the finest venues and decorations at Tarunai Grand Banquet. 
              Each space is designed to make your special moments truly memorable.
            </p>
          </div>

          <div className="mt-8">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="aspect-[16/9] md:aspect-[21/9] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={ikSrc(signatureSuite[currentSlide].image, signatureSuite[currentSlide].key, 'tr=w-1800,q-85')}
                      alt={signatureSuite[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                      <h3 className="text-xl md:text-2xl font-semibold">{signatureSuite[currentSlide].title}</h3>
                      <p className="mt-2 text-sm text-white/80">{signatureSuite[currentSlide].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              {signatureSuite.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                    currentSlide === index
                      ? 'ring-2 ring-[var(--color-gold)] scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={ikSrc(item.image, item.key, 'tr=w-300,q-70')}
                    alt={item.title}
                    className="w-20 h-16 md:w-28 md:h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/gallery" className="lux-btn lux-btn-solid">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
            <div className="reveal-up">
            <p className="eyebrow">Venue Highlights</p>
            <h2 className="section-title">
              Crafted for grand ceremonies and premium hospitality.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3 stagger-card">
            {highlightCards.map((card) => (
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                key={card.title}
                className="stagger-item flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.4)]"
              >
                <img
                  src={ikSrc(card.image, card.key, 'tr=w-900,q-82')}
                  alt={card.title}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                      {card.description}
                    </p>
                  </div>
                  <Link to="/spaces" className="lux-link">
                    Explore Event Spaces
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-beige)]">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="reveal-up">
            <p className="eyebrow">Signature Packages</p>
            <h2 className="section-title">
              Grand celebrations for weddings, birthdays, anniversaries, and corporate
              events.
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
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
                  <h3 className="text-2xl font-semibold">
                    {packageTabs[activePackage].label} Experiences
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {packageTabs[activePackage].description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {packageTabs[activePackage].features.map((feature) => (
                      <span key={feature} className="pill">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link to="/packages" className="lux-btn lux-btn-solid">
                    Request Package
                  </Link>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={ikSrc(
                      packageTabs[activePackage].image,
                      packageTabs[activePackage].key,
                      'tr=w-1000,q-82'
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

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
            <div className="reveal-up">
            <p className="eyebrow">Gallery Preview</p>
            <h2 className="section-title">
              Real weddings, anniversaries, and celebrations. Real joy. Beautiful memories.
            </h2>
          </div>

          <div className="mt-10 columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image.key}-${index}`}
                className="group relative w-full overflow-hidden rounded-3xl"
                onClick={() => setLightbox(image)}
              >
                <img
                  src={ikSrc(image.src, image.key, 'tr=w-900,q-80')}
                  alt="Wedding gallery"
                  className="w-full transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex">
            <Link to="/gallery" className="lux-link">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-[var(--color-dark)]">
            <img
              src={ikSrc(ctaImage, 'DSC_1848.JPG', 'tr=w-1800,q-80')}
              alt="Celebrate at Tarunai Grand Banquet"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="relative z-10 grid gap-6 p-10 text-white md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-16">
              <div className="space-y-4">
                <p className="eyebrow text-[var(--color-gold)]">
                  Celebrate With Us
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Celebrate Your Special Day With Us
                </h2>
                <p className="text-sm text-white/70">
                  Connect with our grand wedding team to design a beautiful
                  experience tailored to your vision.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link to="/contact" className="lux-btn lux-btn-solid">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={ikSrc(lightbox.src, lightbox.key, 'tr=w-2000,q-85')}
              alt="Gallery enlarged"
              className="max-h-[85vh] w-full max-w-5xl rounded-3xl object-cover"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Home
