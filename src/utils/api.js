const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000"

const getToken = () => localStorage.getItem("tarunai_admin_token")

export const createInquiry = async (payload) => {
  const response = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error("Failed to submit inquiry.")
  }
  return response.json()
}

export const fetchInquiries = async () => {
  const response = await fetch(`${API_BASE}/api/inquiries`)
  if (!response.ok) {
    throw new Error("Failed to fetch inquiries.")
  }
  return response.json()
}

export const fetchGalleryImages = async (category) => {
  const query = category ? `?category=${category}` : ""
  const response = await fetch(`${API_BASE}/api/images${query}`)
  if (!response.ok) {
    throw new Error("Failed to fetch images.")
  }
  return response.json()
}

export const loginAdmin = async (payload) => {
  const response = await fetch(`${API_BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error("Invalid credentials.")
  }
  return response.json()
}

export const createGalleryImage = async (payload) => {
  const response = await fetch(`${API_BASE}/api/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken() || ""}`,
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error("Failed to add image.")
  }
  return response.json()
}

export const uploadImageKit = async (payload) => {
  const response = await fetch(`${API_BASE}/api/images/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken() || ""}`,
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || "ImageKit upload failed.")
  }
  return response.json()
}

export const fetchAdminInquiries = async () => {
  const response = await fetch(`${API_BASE}/api/inquiries`, {
    headers: { Authorization: `Bearer ${getToken() || ""}` },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch inquiries.")
  }
  return response.json()
}
