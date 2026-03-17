import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  // 🔥 Prevent background scroll when menu opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-30 border-b bg-white ">
      
      {/* CONTAINER */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em]"
        >
          <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[var(--color-gold)]"></span>
          Tarunai Banquets
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
          {[
            { to: "/", label: "Home" },
            { to: "/spaces", label: "Spaces" },
            { to: "/packages", label: "Packages" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contact", label: "Contact" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/contact" className="lux-btn">
            Book a Tour
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-[var(--color-dark)]"></span>
            <span className="h-0.5 w-5 bg-[var(--color-dark)]"></span>
            <span className="h-0.5 w-5 bg-[var(--color-dark)]"></span>
          </span>
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* OVERLAY */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute  right-0 top-0 h-full w-[80%] max-w-sm p-6 
          transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }
          
          bg-white
          shadow-[-40px_0_100px_-20px_rgba(0,0,0,0.5)]
          `}
        >
          
          {/* HEADER */}
          <div className="flex items-center bg-white justify-between ">
            <p className="text-md font-bold uppercase tracking-[0.3em] ">
              Menu
            </p>
            
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10"
              onClick={closeMenu}
            >
              <span className="text-lg">×</span>
            </button>
          </div>
            <hr />
          {/* NAV LINKS */}
          <div className="mt-5 flex flex-col bg-white gap-6 text-sm uppercase tracking-[0.3em]">
            {[
              { to: "/", label: "Home" },
              { to: "/spaces", label: "Spaces" },
              { to: "/packages", label: "Packages" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
            
            ].map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                onClick={closeMenu}
                className="hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="lux-btn lux-btn-solid w-full text-center"
            >
              Book a Tour
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header