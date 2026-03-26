import { Project, ProjectStatus } from '../types'

interface DashboardProps {
  onProjectSelect: (project: Project) => void
}

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: 'HTI-9921',
    name: 'Summer Collection 2026',
    sku: 'SUM-2026-001',
    brand: 'HTI Toys',
    targetMarkets: ['EU', 'US', 'UK'],
    deadline: '2026-06-15',
    status: 'In Progress',
    assignedDesigners: ['Sarah M.', 'John D.'],
    artworkFiles: [
      { id: '1', filename: 'main_artwork_v2.ai', url: '#', uploadedAt: '2026-03-20', uploadedBy: 'Sarah M.' },
    ],
    complianceStatus: 'Needs Review',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-25',
  },
  {
    id: 'HTI-9922',
    name: 'Educational Puzzle Set',
    sku: 'EDU-PUZ-042',
    brand: 'HTI Learning',
    targetMarkets: ['EU', 'US'],
    deadline: '2026-04-30',
    status: 'Pending Review',
    assignedDesigners: ['Mike R.'],
    artworkFiles: [
      { id: '2', filename: 'puzzle_box_front.pdf', url: '#', uploadedAt: '2026-03-22', uploadedBy: 'Mike R.' },
    ],
    complianceStatus: 'Compliant',
    createdAt: '2026-02-15',
    updatedAt: '2026-03-24',
  },
  {
    id: 'HTI-9923',
    name: 'Action Figure Series 5',
    sku: 'ACT-S5-007',
    brand: 'HTI Heroes',
    targetMarkets: ['US', 'CA', 'MX'],
    deadline: '2026-05-20',
    status: 'Approved',
    assignedDesigners: ['Lisa K.', 'Tom B.'],
    artworkFiles: [
      { id: '3', filename: 'packaging_final.ai', url: '#', uploadedAt: '2026-03-18', uploadedBy: 'Lisa K.' },
    ],
    complianceStatus: 'Compliant',
    createdAt: '2026-01-20',
    updatedAt: '2026-03-20',
  },
  {
    id: 'HTI-9924',
    name: 'Plush Toy - Dino Friends',
    sku: 'PLU-DINO-012',
    brand: 'HTI Soft',
    targetMarkets: ['EU', 'UK', 'AU'],
    deadline: '2026-07-10',
    status: 'In Progress',
    assignedDesigners: ['Emma W.'],
    artworkFiles: [],
    complianceStatus: 'Needs Review',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-26',
  },
  {
    id: 'HTI-9925',
    name: 'Board Game Adventure',
    sku: 'BRD-ADV-003',
    brand: 'HTI Games',
    targetMarkets: ['US', 'EU'],
    deadline: '2026-08-01',
    status: 'On Hold',
    assignedDesigners: ['Chris P.', 'Anna S.'],
    artworkFiles: [
      { id: '4', filename: 'board_layout_v1.psd', url: '#', uploadedAt: '2026-02-28', uploadedBy: 'Chris P.' },
    ],
    complianceStatus: 'Non-Compliant',
    createdAt: '2026-02-01',
    updatedAt: '2026-03-15',
  },
  {
    id: 'HTI-9926',
    name: 'Remote Control Car',
    sku: 'RC-CAR-089',
    brand: 'HTI Motors',
    targetMarkets: ['US', 'CA'],
    deadline: '2026-05-05',
    status: 'Pending Review',
    assignedDesigners: ['David L.'],
    artworkFiles: [
      { id: '5', filename: 'box_artwork.ai', url: '#', uploadedAt: '2026-03-21', uploadedBy: 'David L.' },
    ],
    complianceStatus: 'Needs Review',
    createdAt: '2026-02-20',
    updatedAt: '2026-03-26',
  },
]

const getStatusGradient = (status: ProjectStatus): string => {
  switch (status) {
    case 'In Progress': return 'from-cyan-400 to-blue-500 shadow-cyan-500/25'
    case 'Pending Review': return 'from-amber-400 to-orange-500 shadow-amber-500/25'
    case 'Approved': return 'from-emerald-400 to-green-500 shadow-emerald-500/25'
    case 'On Hold': return 'from-rose-400 to-red-500 shadow-rose-500/25'
    default: return 'from-slate-400 to-gray-500 shadow-slate-500/25'
  }
}

const getComplianceColor = (status: string): string => {
  switch (status) {
    case 'Compliant': return 'text-emerald-400'
    case 'Needs Review': return 'text-amber-400'
    case 'Non-Compliant': return 'text-rose-400'
    default: return 'text-slate-400'
  }
}

const getComplianceBg = (status: string): string => {
  switch (status) {
    case 'Compliant': return 'bg-emerald-500/10 border-emerald-500/20'
    case 'Needs Review': return 'bg-amber-500/10 border-amber-500/20'
    case 'Non-Compliant': return 'bg-rose-500/10 border-rose-500/20'
    default: return 'bg-slate-500/10 border-slate-500/20'
  }
}

export default function Dashboard({ onProjectSelect }: DashboardProps) {
  return (
    <div className="space-y-6 page-enter">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Projects</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                {mockProjects.length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-cyan-400">folder</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">In Progress</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                {mockProjects.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-cyan-400">progress_activity</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Review</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mt-2">
                {mockProjects.filter(p => p.status === 'Pending Review').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-amber-400">review</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Approved</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mt-2">
                {mockProjects.filter(p => p.status === 'Approved').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-emerald-400">check_circle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400">grid_view</span>
          Active Projects
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {mockProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className="card text-left group hover-lift accent-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400">{project.id} • {project.sku}</p>
                </div>
                <span className={`status-badge bg-gradient-to-r ${getStatusGradient(project.status)} shadow-lg`}>
                  {project.status}
                </span>
              </div>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="material-symbols-outlined text-cyan-400 text-base">branding_watermark</span>
                  <span>{project.brand}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="material-symbols-outlined text-cyan-400 text-base">public</span>
                  <span>{project.targetMarkets.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <span className="material-symbols-outlined text-cyan-400 text-base">event</span>
                  <span>Deadline: {project.deadline}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getComplianceBg(project.complianceStatus)}`}>
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span className={`text-sm font-medium ${getComplianceColor(project.complianceStatus)}`}>
                    {project.complianceStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-sm">attach_file</span>
                  <span className="text-sm">{project.artworkFiles.length} files</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
