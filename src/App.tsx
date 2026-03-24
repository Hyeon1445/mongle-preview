import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IconButton, Typography } from 'mongle-ui'
import { Menu } from 'lucide-react'
import Sidebar from './layouts/Sidebar'
import ComingSoon from './components/common/ComingSoon'
import TeamDashboard from './pages/TeamDashboard'
import SocialFeed from './pages/SocialFeed'
import ProfileSettings from './pages/ProfileSettings'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`relative h-full transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 md:hidden">
          <IconButton icon={Menu} variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} />
          <Typography variant="subtitle1">mongle</Typography>
        </div>

        <Routes>
          <Route path="/" element={<TeamDashboard />} />
          <Route path="/social" element={<SocialFeed />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/kanban" element={<ComingSoon />} />
          <Route path="/catalog" element={<ComingSoon />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
