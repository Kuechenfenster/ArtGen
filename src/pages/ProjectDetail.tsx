import { Project } from '../types'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const getStatusGradient = (status: string): string => {
    switch (status) {
      case 'In Progress': return 'from-cyan-400 to-blue-500 shadow-cyan-500/25'
      case 'Pending Review': return 'from-amber-400 to-orange-500 shadow-amber-500/25'
      case 'Approved': return 'from-emerald-400 to-green-500 shadow-emerald-500/25'
      case 'On Hold': return 'from-rose-400 to-red-500 shadow-rose-500/25'
      default: return 'from-slate-400 to-gray-500 shadow-slate-500/25'
    }
  }

  const getComplianceStyle = (status: string): { bg: string; border: string; text: string; icon: string } => {
    switch (status) {
      case 'Compliant': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'check_circle' }
      case 'Needs Review': return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'warning' }
      case 'Non-Compliant': return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', icon: 'error' }
      default: return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', icon: 'help' }
    }
  }

  const complianceStyle = getComplianceStyle(project.complianceStatus)

  return (
    <div className="space-y-6 page-enter">
      {/* Project Header Card */}
      <div className="glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-3xl font-bold text-white">{project.name}</h2>
              <span className={`status-badge bg-gradient-to-r ${getStatusGradient(project.status)} shadow-lg`}>
                {project.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">tag</span>
              <span className="font-mono text-sm">{project.id}</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-sm">{project.sku}</span>
              <span className="text-slate-600">•</span>
              <span>{project.brand}</span>
            </div>
          </div>
          
          <div className={`px-5 py-3 rounded-xl border backdrop-blur-sm ${complianceStyle.bg} ${complianceStyle.border}`}>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${complianceStyle.text}`}>{complianceStyle.icon}</span>
              <span className={`font-semibold ${complianceStyle.text}`}>{project.complianceStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card group hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-cyan-400">calendar_today</span>
            </div>
            <h3 className="font-semibold text-slate-300">Deadline</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{project.deadline}</p>
          <p className="text-sm text-slate-400">Target completion date</p>
        </div>

        <div className="card group hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-purple-400">public</span>
            </div>
            <h3 className="font-semibold text-slate-300">Target Markets</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.targetMarkets.map((market) => (
              <span key={market} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:border-cyan-500/50 transition-colors cursor-default">
                {market}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-400">{project.targetMarkets.length} regions</p>
        </div>

        <div className="card group hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-amber-400">folder</span>
            </div>
            <h3 className="font-semibold text-slate-300">Artwork Files</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{project.artworkFiles.length}</p>
          <p className="text-sm text-slate-400">Files uploaded</p>
        </div>
      </div>

      {/* Assigned Designers */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-cyan-400">people</span>
          </div>
          <h3 className="font-semibold text-lg text-white">Assigned Designers</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.assignedDesigners.map((designer, index) => (
            <div key={index} className="group flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                {designer.charAt(0)}
              </div>
              <span className="font-medium text-slate-300">{designer}</span>
            </div>
          ))}
          <button className="group flex items-center gap-2 px-4 py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
            <span>Add Designer</span>
          </button>
        </div>
      </div>

      {/* Artwork Files */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-400">attach_file</span>
            </div>
            <h3 className="font-semibold text-lg text-white">Artwork Files</h3>
          </div>
          <button className="btn-secondary">
            <span className="material-symbols-outlined">upload</span>
            <span>Upload File</span>
          </button>
        </div>
        
        {project.artworkFiles.length > 0 ? (
          <div className="space-y-2">
            {project.artworkFiles.map((file) => (
              <div key={file.id} className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-cyan-400 text-2xl">description</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{file.filename}</p>
                    <p className="text-sm text-slate-400">
                      Uploaded by <span className="text-slate-300">{file.uploadedBy}</span> on <span className="text-slate-300">{file.uploadedAt}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-cyan-400" title="View">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-cyan-400" title="Download">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-rose-400" title="Delete">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-slate-500">folder_open</span>
            </div>
            <p className="text-slate-400 mb-2">No artwork files uploaded yet</p>
            <p className="text-sm text-slate-500">Upload your first design file to get started</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-400">history</span>
          </div>
          <h3 className="font-semibold text-lg text-white">Project Timeline</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-slate-400 font-medium">Created</div>
            <div className="relative flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"></div>
              <div className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-slate-300">{project.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-slate-400 font-medium">Last Updated</div>
            <div className="relative flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"></div>
              <div className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-slate-300">{project.updatedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-slate-400 font-medium">Deadline</div>
            <div className="relative flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/50"></div>
              <div className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-slate-300">{project.deadline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
