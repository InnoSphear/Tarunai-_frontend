import React, { useEffect, useMemo, useState } from 'react'
import {
  createGalleryImage,
  fetchAdminInquiries,
  fetchGalleryImages,
  loginAdmin,
  uploadImageKit,
} from '../utils/api'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('inquiries')
  const [inquiries, setInquiries] = useState([])
  const [images, setImages] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [authStatus, setAuthStatus] = useState({
    isLoggedIn: Boolean(localStorage.getItem('tarunai_admin_token')),
    message: '',
  })
  const [loginForm, setLoginForm] = useState({
    email: 'tarunai@gmail.com',
    password: '',
  })
  const [imageForm, setImageForm] = useState({
    title: '',
    category: 'wedding',
    imageUrl: '',
    file: null,
  })

  const categoryOptions = useMemo(
    () => ['wedding', 'birthday', 'corporate', 'general'],
    []
  )

  useEffect(() => {
    if (!authStatus.isLoggedIn) {
      return
    }
    fetchAdminInquiries()
      .then(setInquiries)
      .catch(() => {})
    fetchGalleryImages()
      .then(setImages)
      .catch(() => {})
  }, [authStatus.isLoggedIn])

  const handleLoginChange = (event) => {
    const { name, value } = event.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setAuthStatus((prev) => ({ ...prev, message: 'Signing in...' }))
    try {
      const response = await loginAdmin({
        email: loginForm.email,
        password: loginForm.password,
      })
      localStorage.setItem('tarunai_admin_token', response.token)
      setAuthStatus({ isLoggedIn: true, message: '' })
    } catch (error) {
      setAuthStatus({
        isLoggedIn: false,
        message: 'Invalid login. Please try again.',
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('tarunai_admin_token')
    setAuthStatus({ isLoggedIn: false, message: '' })
  }

  const handleImageChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'file') {
      setImageForm((prev) => ({ ...prev, file: files?.[0] || null }))
      return
    }
    setImageForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Uploading image...' })
    try {
      let finalUrl = imageForm.imageUrl

      if (!finalUrl && imageForm.file) {
        const reader = new FileReader()
        const fileData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(new Error('Failed to read file.'))
          reader.readAsDataURL(imageForm.file)
        })

        const uploadResult = await uploadImageKit({
          file: fileData,
          fileName: imageForm.file.name,
          folder: `/tarunai-banquets/${imageForm.category}`,
        })
        finalUrl = uploadResult.url
      }

      if (!finalUrl) {
        throw new Error('Provide an image URL or upload a file.')
      }

      const created = await createGalleryImage({
        imageUrl: finalUrl,
        title: imageForm.title,
        category: imageForm.category,
      })

      setImages((prev) => [created, ...prev])
      setStatus({ type: 'success', message: 'Image added successfully.' })
      setImageForm({
        title: '',
        category: 'wedding',
        imageUrl: '',
        file: null,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to add image.',
      })
    }
  }

  return (
    <main className="section-shell">
      <div className="mx-auto w-full max-w-6xl px-6">
        {!authStatus.isLoggedIn ? (
          <div className="mx-auto grid max-w-4xl gap-10 rounded-[36px] border border-black/10 bg-white p-10 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.45)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <p className="eyebrow">Admin Access</p>
              <h1 className="text-3xl font-semibold">
                Tarunai Banquets Administration
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Securely manage inquiries, curated galleries, and event assets
                from a single professional console.
              </p>
              <div className="rounded-3xl bg-[var(--color-beige)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                  Secure Access
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Use your administrator credentials to access the dashboard.
                </p>
              </div>
            </div>
            <form
              className="rounded-3xl border border-black/10 bg-[var(--color-ivory)] p-6"
              onSubmit={handleLoginSubmit}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Email
                  </label>
                  <input
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Password
                  </label>
                  <input
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    type="password"
                    required
                  />
                </div>
                {authStatus.message ? (
                  <p className="text-sm text-red-500">{authStatus.message}</p>
                ) : null}
                <button className="lux-btn lux-btn-solid w-full">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
            <aside className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_25px_80px_-60px_rgba(0,0,0,0.4)]">
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Admin Console</p>
                  <h2 className="text-2xl font-semibold">Tarunai Banquets</h2>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    Bhagwat Nagar, Patna, Bihar
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    className={`admin-link ${
                      activeTab === 'inquiries' ? 'admin-link-active' : ''
                    }`}
                    onClick={() => setActiveTab('inquiries')}
                  >
                    Inquiries
                  </button>
                  <button
                    className={`admin-link ${
                      activeTab === 'gallery' ? 'admin-link-active' : ''
                    }`}
                    onClick={() => setActiveTab('gallery')}
                  >
                    Gallery
                  </button>
                </div>
                <button className="lux-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </aside>

            <section className="space-y-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-[var(--color-beige)] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    New Inquiries
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {inquiries.length}
                  </p>
                </div>
                <div className="rounded-3xl bg-[var(--color-ivory)] p-5 border border-black/5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                    Gallery Assets
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {images.length}
                  </p>
                </div>
                <div className="rounded-3xl bg-[var(--color-dark)] p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Status
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Live</p>
                </div>
              </div>

              {activeTab === 'inquiries' ? (
                <div className="grid gap-6">
                  {inquiries.length === 0 ? (
                    <div className="rounded-3xl border border-black/10 bg-white p-8 text-sm text-[var(--color-text-secondary)]">
                      No inquiries yet.
                    </div>
                  ) : (
                    inquiries.map((inquiry) => (
                      <div
                        key={inquiry._id}
                        className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.4)]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold">
                            {inquiry.name}
                          </h3>
                          <span className="pill">
                            {inquiry.eventType || 'Event'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                          {inquiry.email}
                        </p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                          Preferred date: {inquiry.eventDate || 'Not provided'}
                        </p>
                        {inquiry.message ? (
                          <p className="mt-3 text-sm">{inquiry.message}</p>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <form
                    className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.4)]"
                    onSubmit={handleImageSubmit}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                          Title
                        </label>
                        <input
                          className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                          name="title"
                          value={imageForm.title}
                          onChange={handleImageChange}
                          placeholder="Optional image title"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                          Category
                        </label>
                        <select
                          className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                          name="category"
                          value={imageForm.category}
                          onChange={handleImageChange}
                        >
                          {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                          Image URL
                        </label>
                        <input
                          className="mt-3 w-full rounded-2xl border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                          name="imageUrl"
                          value={imageForm.imageUrl}
                          onChange={handleImageChange}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                          Or Upload File (ImageKit)
                        </label>
                        <input
                          type="file"
                          name="file"
                          accept="image/*"
                          className="mt-3 w-full text-sm text-[var(--color-text-secondary)]"
                          onChange={handleImageChange}
                        />
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
                          ? 'Uploading...'
                          : 'Add Image'}
                      </button>
                    </div>
                  </form>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {images.map((image) => (
                      <div
                        key={image._id}
                        className="overflow-hidden rounded-3xl border border-black/10 bg-white"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title || 'Gallery image'}
                          className="h-48 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-4 text-sm">
                          <p className="font-semibold">
                            {image.title || 'Untitled'}
                          </p>
                          <p className="text-[var(--color-text-secondary)]">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  )
}

export default Admin
