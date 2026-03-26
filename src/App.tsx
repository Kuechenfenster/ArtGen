import { useState } from 'react'
import { PageType, Project, HeaderProps } from './types'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import CreateProject from './pages/CreateProject'
import WarningDatabase from './pages/WarningDatabase'
import Translations from './pages/Translations'

// Sidebar Component
function Sidebar({ currentPage, onNavigate }: { currentPage: PageType; onNavigate: (page: PageType) => void }) {
  const menuItems: { id: PageType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'create', label: 'Create Project', icon: 'add_box' },
    { id: 'database', label: 'Warning Database', icon: 'database' },
    { id: 'translations', label: 'Translations', icon: 'translate' },
  ]

  return (
    <aside className="w-64 bg-opacity-90 backdrop-blur-xl border-r border-white/10 h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="material-symbols-outlined text-white text-xl">palette</span>
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">HTI Artwork</h1>
            <p className="text-xs text-slate-400 mt-0.5">Generator</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
            {currentPage === item.id && (
              <span className="ml-auto material-symbols-outlined text-sm text-cyan-400">chevron_right</span>
            )}
          </button>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400">admin@hti.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Header Component
function Header({ title, primaryAction }: HeaderProps) {
  return (
    <header className="h-16 glass-card border-b border-white/10 rounded-none flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold gradient-text">{title}</h2>
      </div>
      {primaryAction && (
        <button onClick={primaryAction.onClick} className="btn-primary">
          <span className="material-symbols-outlined">{primaryAction.icon}</span>
          {primaryAction.label}
        </button>
      )}
    </header>
  )
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Header configuration based on current page
  const getHeaderConfig = (): { title: string; primaryAction?: { label: string; icon: string; onClick: () => void } } => {
    switch (currentPage) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          primaryAction: {
            label: 'New Project',
            icon: 'add_box',
            onClick: () => setCurrentPage('create'),
          },
        }
      case 'project':
        return {
          title: selectedProject?.name || 'Project Details',
          primaryAction: {
            label: 'Back',
            icon: 'arrow_back',
            onClick: () => setCurrentPage('dashboard'),
          },
        }
      case 'create':
        return {
          title: 'Create New Project',
          primaryAction: {
            label: 'Cancel',
            icon: 'close',
            onClick: () => setCurrentPage('dashboard'),
          },
        }
      case 'database':
        return {
          title: 'Warning Database',
          primaryAction: {
            label: 'New Template',
            icon: 'add_box',
            onClick: () => console.log('Add warning template'),
          },
        }
      case 'translations':
        return {
          title: 'Translation Orders',
          primaryAction: {
            label: 'New Order',
            icon: 'translate',
            onClick: () => console.log('New translation order'),
          },
        }
      default:
        return { title: 'Dashboard' }
    }
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setCurrentPage('project')
  }

  const headerConfig = getHeaderConfig()

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header title={headerConfig.title} primaryAction={headerConfig.primaryAction} />
        
        <main className="flex-1 overflow-auto p-6 page-enter">
          {currentPage === 'dashboard' && (
            <Dashboard onProjectSelect={handleProjectSelect} />
          )}
          {currentPage === 'project' && selectedProject && (
            <ProjectDetail project={selectedProject} />
          )}
          {currentPage === 'create' && (
            <CreateProject onCancel={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'database' && (
            <WarningDatabase />
          )}
          {currentPage === 'translations' && (
            <Translations />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
