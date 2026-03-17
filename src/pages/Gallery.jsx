import React, { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ikSrc } from '../utils/imageKit'
import { fetchGalleryImages } from '../utils/api'
import heroImage from '../assets/DSC_1859.JPG'
import img1 from '../assets/DSC_1837.JPG'
import img2 from '../assets/DSC03980.JPG'
import img3 from '../assets/DSC03969.JPG'
import img4 from '../assets/DSC03966.JPG'
import img5 from '../assets/DSC03987.JPG'
import img6 from '../assets/DSC03984.JPG'
import img7 from '../assets/DSC_1845.JPG'
import img8 from '../assets/DSC_1848.JPG'
import img9 from '../assets/DSC_1856.JPG'
import img10 from '../assets/DSC_1862.JPG'

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null)
  const [activeCategory, setActiveCategory] = useState('wedding')
  const [serverImages, setServerImages] = useState([])

  const images = useMemo(
    () => [
      { src: img1, key: 'DSC_1837.JPG' },
      { src: img2, key: 'DSC03980.JPG' },
      { src: img3, key: 'DSC03969.JPG' },
      { src: img4, key: 'DSC03966.JPG' },
      { src: img5, key: 'DSC03987.JPG' },
      { src: img6, key: 'DSC03984.JPG' },
      { src: img7, key: 'DSC_1845.JPG' },
      { src: img8, key: 'DSC_1848.JPG' },
      { src: img9, key: 'DSC_1856.JPG' },
      { src: img10, key: 'DSC_1862.JPG' },
    ],
    []
  )

  useEffect(() => {
    fetchGalleryImages(activeCategory)
      .then(setServerImages)
      .catch(() => setServerImages([]))
  }, [activeCategory])

  const galleryImages = serverImages.length
    ? serverImages.map((image) => ({ src: image.imageUrl, key: image._id }))
    : images

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src={ikSrc(heroImage, 'DSC_1859.JPG', 'tr=w-2200,q-82')}
          alt="Tarunai Banquets gallery"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto flex min-h-[50vh] w-full max-w-6xl items-center px-6 py-20 text-white">
          <div className="max-w-2xl space-y-6">
            <p className="eyebrow text-[var(--color-gold)]">Gallery</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              A luminous archive of real celebrations and curated moments.
            </h1>
            <p className="text-sm text-white/75">
              Every frame captures the warmth, elegance, and cinematic glow of
              Tarunai Banquets.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap gap-3">
            {['wedding', 'birthday', 'corporate', 'general'].map((category) => (
              <button
                key={category}
                className={`tab-btn ${activeCategory === category ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image.key}-${index}`}
                className="group relative w-full overflow-hidden rounded-3xl"
                onClick={() => setLightbox(image)}
              >
                <img
                  src={image.src}
                  alt="Wedding highlight"
                  className="w-full transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              </button>
            ))}
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
              src={lightbox.src}
              alt="Gallery enlarged"
              className="max-h-[85vh] w-full max-w-5xl rounded-3xl object-cover"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Gallery
