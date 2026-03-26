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
    <aside className="w-64 bg-hti-bg-dark border-r border-hti-border-dark h-full flex flex-col">
      <div className="p-6 border-b border-hti-border-dark">
        <h1 className="text-2xl font-bold text-hti-accent">HTI Artwork</h1>
        <p className="text-sm text-gray-400 mt-1">Generator</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full sidebar-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-hti-accent">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-hti-border-dark">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-sm">Admin User</span>
        </div>
      </div>
    </aside>
  )
}

// Header Component
function Header({ title, primaryAction }: HeaderProps) {
  return (
    <header className="h-16 bg-hti-panel-dark border-b border-hti-border-dark flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">{title}</h2>
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
    <div className="flex h-screen overflow-hidden bg-hti-bg-dark">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={headerConfig.title} primaryAction={headerConfig.primaryAction} />
        
        <main className="flex-1 overflow-auto p-6">
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
