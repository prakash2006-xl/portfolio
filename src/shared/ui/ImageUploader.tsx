import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { supabase } from '../../services/supabase/client'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  bucket?: string
  accept?: string
}

export const ImageUploader = ({ 
  value, 
  onChange, 
  label = 'Image URL',
  bucket = 'portfolio-assets',
  accept = 'image/*'
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onChange(data.publicUrl)
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`Error uploading file: ${error.message}\n\nPlease make sure the '${bucket}' bucket exists and is public in your Supabase storage.`)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or click upload"
          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
        />
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          accept={accept}
          className="hidden" 
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center justify-center bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Upload to Supabase"
        >
          {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
        </button>
        
        {value && (
          <button
            onClick={() => onChange('')}
            className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg px-3 py-2 transition-colors"
            title="Clear"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {value && accept.includes('image') && (
        <div className="mt-3 relative h-32 w-full sm:w-1/2 rounded-lg overflow-hidden border border-white/10 bg-black/50">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}
