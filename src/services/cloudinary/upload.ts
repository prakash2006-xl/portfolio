export const uploadToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '')

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}
