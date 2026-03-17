export const ikSrc = (local, key, params) => {
  const base = import.meta.env.VITE_IMAGEKIT_URL
  return base ? `${base}/${key}?${params}` : local
}
