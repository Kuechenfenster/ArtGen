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

const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'In Progress': return 'bg-blue-500'
    case 'Pending Review': return 'bg-yellow-500'
    case 'Approved': return 'bg-green-500'
    case 'On Hold': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

const getComplianceColor = (status: string): string => {
  switch (status) {
    case 'Compliant': return 'text-green-400'
    case 'Needs Review': return 'text-yellow-400'
    case 'Non-Compliant': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

export default function Dashboard({ onProjectSelect }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-hti-accent mt-1">{mockProjects.length}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-gray-500">folder</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">
                {mockProjects.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-blue-500">progress_activity</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-400 mt-1">
                {mockProjects.filter(p => p.status === 'Pending Review').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-yellow-500">review</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-3xl font-bold text-green-400 mt-1">
                {mockProjects.filter(p => p.status === 'Approved').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mockProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => onProjectSelect(project)}
            className="card text-left hover:border-hti-accent transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold group-hover:text-hti-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{project.id} • {project.sku}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-sm">branding_watermark</span>
                <span>{project.brand}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-sm">public</span>
                <span>{project.targetMarkets.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-sm">event</span>
                <span>Deadline: {project.deadline}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-hti-border-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className={`text-sm font-medium ${getComplianceColor(project.complianceStatus)}`}>
                  {project.complianceStatus}
                </span>
              </div>
              <span className="text-sm text-gray-500">{project.artworkFiles.length} files</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
