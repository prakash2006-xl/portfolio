import type { StateStorage } from 'zustand/middleware'
import { supabase } from '../services/supabase/client'

export const supabaseStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const { data, error } = await supabase
      .from('app_state')
      .select('state')
      .eq('id', name)
      .single()
    if (error) {
      console.error(`Supabase Load Error for ${name}:`, error)
      return null
    }
    if (!data) return null
    return JSON.stringify(data.state)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const parsedState = JSON.parse(value)
    const { error } = await supabase
      .from('app_state')
      .upsert({ id: name, state: parsedState })
    
    if (error) {
      console.error(`Supabase Save Error for ${name}:`, error)
      alert("Failed to save to database: " + error.message)
    } else {
      console.log(`Successfully saved ${name} to Supabase!`)
    }
  },
  removeItem: async (name: string): Promise<void> => {
    await supabase
      .from('app_state')
      .delete()
      .eq('id', name)
  }
}
