import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark)] py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Tarunai Grand Banquet
          </p>
          <p className="mt-2 text-xs text-white/70">
            Bhagwat Nagar, Patna, Bihar - Grand Weddings - Receptions - Birthdays - Anniversaries - Corporate Events
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-white/70 md:flex-row md:gap-6">
          <span>+91 00000 00000</span>
          <span>hello@tarunai.com</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
