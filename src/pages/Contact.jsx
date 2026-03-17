import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createInquiry } from '../utils/api'
import { ikSrc } from '../utils/imageKit'
import heroImage from '../assets/DSC_1848.JPG'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    eventDate: '',
    eventType: 'Wedding',
    message: '',
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Sending your inquiry...' })
    try {
      await createInquiry({
        name: form.name,
        email: form.email,
        eventDate: form.eventDate,
        eventType: form.eventType,
        message: form.message,
      })
      setStatus({
        type: 'success',
        message: 'Inquiry received. Our concierge will reach out soon.',
      })
      setForm({
        name: '',
        email: '',
        eventDate: '',
        eventType: 'Wedding',
        message: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Unable to send inquiry right now. Please try again.',
      })
    }
  }

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src={ikSrc(heroImage, 'DSC_1848.JPG', 'tr=w-2200,q-82')}
          alt="Book Tarunai Banquets"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative mx-auto flex min-h-[55vh] w-full max-w-6xl items-center px-6 py-20 text-white">
          <div className="max-w-2xl space-y-6">
            <p className="eyebrow text-[var(--color-gold)]">Contact</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Begin your celebration story with our concierge team.
            </h1>
            <p className="text-sm text-white/75">
              Share your event date and preferences, and our planners will
              curate a premium proposal for your celebration.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_35px_90px_-60px_rgba(0,0,0,0.4)]"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Full Name
                  </label>
                  <input
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                    placeholder="Your name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Email Address
                  </label>
                  <input
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                    placeholder="you@email.com"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                      Event Date
                    </label>
                    <input
                      className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                      Event Type
                    </label>
                    <select
                      className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                    >
                      <option>Wedding</option>
                      <option>Reception</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Corporate Event</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Event Vision
                  </label>
                  <textarea
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                    rows="4"
                    placeholder="Tell us about your celebration vision."
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {status.message ? (
                  <p
                    className={`text-sm ${
                      status.type === 'error'
                        ? 'text-red-500'
                        : 'text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {status.message}
                  </p>
                ) : null}
                <button
                  className="lux-btn lux-btn-solid w-fit"
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading'
                    ? 'Sending...'
                    : 'Request Consultation'}
                </button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[var(--color-beige)] p-6">
                <p className="eyebrow">Visit Us</p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Tarunai Banquets
                </h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                  Bhagwat Nagar, Patna, Bihar - Premium banquet hall and luxury wedding lawn.
                </p>
                <div className="mt-6 space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <p>Phone: +91 00000 00000</p>
                  <p>Email: hello@tarunai.com</p>
                </div>
              </div>
              <div className="rounded-3xl bg-[var(--color-dark)] p-6 text-white">
                <p className="eyebrow text-[var(--color-gold)]">Next Step</p>
                <p className="mt-3 text-sm text-white/70">
                  Prefer to explore first? Browse our curated spaces and gallery
                  before booking a tour.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link to="/spaces" className="lux-btn lux-btn-ghost">
                    View Spaces
                  </Link>
                  <Link to="/gallery" className="lux-btn lux-btn-solid">
                    View Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
