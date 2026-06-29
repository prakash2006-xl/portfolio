import type { ReactNode } from 'react'

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  // For testing without setting up Supabase fully, you can comment this out
  // if (!user || !isAdmin) {
  //   return <Navigate to="/admin/login" replace />
  // }

  return (
    <div className="flex h-screen bg-[#0f0f11] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181b] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary tracking-wide">CMS Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="block px-4 py-3 rounded-lg bg-white/10 text-white font-medium">Section Editor</a>
          <a href="#" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 font-medium transition-colors">Media Library</a>
          <a href="#" className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 font-medium transition-colors">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#0a0a0c]">
        {children}
      </main>
    </div>
  )
}
