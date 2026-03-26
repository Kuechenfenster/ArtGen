import { Project } from '../types'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500'
      case 'Pending Review': return 'bg-yellow-500'
      case 'Approved': return 'bg-green-500'
      case 'On Hold': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getComplianceBadgeColor = (status: string): string => {
    switch (status) {
      case 'Compliant': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'Needs Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
      case 'Non-Compliant': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium text-white ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-400">{project.id} • {project.sku} • {project.brand}</p>
          </div>
          <div className={`px-6 py-3 rounded-xl border ${getComplianceBadgeColor(project.complianceStatus)}`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">verified</span>
              <span className="font-semibold">{project.complianceStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-hti-accent">calendar_today</span>
            <h3 className="font-semibold">Deadline</h3>
          </div>
          <p className="text-2xl font-bold">{project.deadline}</p>
          <p className="text-sm text-gray-400 mt-1">Target completion date</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-hti-accent">public</span>
            <h3 className="font-semibold">Target Markets</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.targetMarkets.map((market) => (
              <span key={market} className="px-3 py-1 bg-hti-bg-dark rounded-lg text-sm">
                {market}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">{project.targetMarkets.length} regions</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-hti-accent">folder</span>
            <h3 className="font-semibold">Artwork Files</h3>
          </div>
          <p className="text-2xl font-bold">{project.artworkFiles.length}</p>
          <p className="text-sm text-gray-400 mt-1">Files uploaded</p>
        </div>
      </div>

      {/* Assigned Designers */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-hti-accent">people</span>
          <h3 className="font-semibold text-lg">Assigned Designers</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.assignedDesigners.map((designer, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-3 bg-hti-bg-dark rounded-xl">
              <div className="w-10 h-10 rounded-full bg-hti-accent flex items-center justify-center text-white font-semibold">
                {designer.charAt(0)}
              </div>
              <span className="font-medium">{designer}</span>
            </div>
          ))}
          <button className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-hti-border-dark rounded-xl text-gray-400 hover:border-hti-accent hover:text-hti-accent transition-colors">
            <span className="material-symbols-outlined">add</span>
            <span>Add Designer</span>
          </button>
        </div>
      </div>

      {/* Artwork Files */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-hti-accent">attach_file</span>
            <h3 className="font-semibold text-lg">Artwork Files</h3>
          </div>
          <button className="btn-secondary">
            <span className="material-symbols-outlined">upload</span>
            <span>Upload File</span>
          </button>
        </div>
        
        {project.artworkFiles.length > 0 ? (
          <div className="space-y-2">
            {project.artworkFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-hti-bg-dark rounded-xl hover:border-hti-border-dark transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-hti-accent text-3xl">description</span>
                  <div>
                    <p className="font-medium">{file.filename}</p>
                    <p className="text-sm text-gray-400">
                      Uploaded by {file.uploadedBy} on {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4">folder_open</span>
            <p>No artwork files uploaded yet</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-hti-accent">history</span>
          <h3 className="font-semibold text-lg">Project Timeline</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-gray-400">Created</div>
            <div className="w-3 h-3 rounded-full bg-hti-accent"></div>
            <div className="flex-1 p-3 bg-hti-bg-dark rounded-lg">
              <p>{project.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-gray-400">Last Updated</div>
            <div className="w-3 h-3 rounded-full bg-hti-accent"></div>
            <div className="flex-1 p-3 bg-hti-bg-dark rounded-lg">
              <p>{project.updatedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-gray-400">Deadline</div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="flex-1 p-3 bg-hti-bg-dark rounded-lg">
              <p>{project.deadline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
