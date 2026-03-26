import { useState } from 'react'
import { TranslationOrder } from '../types'

// Mock data for translation orders
const mockOrders: TranslationOrder[] = [
  {
    id: 'TR-2026-001',
    projectName: 'Summer Collection 2026',
    projectId: 'HTI-9921',
    targetLanguages: ['German', 'French', 'Spanish', 'Italian'],
    agency: 'TranslatePro GmbH',
    status: 'In Progress',
    requestedDate: '2026-03-15',
    deliveryDate: '2026-04-05',
    items: [
      { id: '1', type: 'packaging', description: 'Product box front and back', wordCount: 450 },
      { id: '2', type: 'manual', description: 'User manual - all sections', wordCount: 2300 },
    ],
  },
  {
    id: 'TR-2026-002',
    projectName: 'Educational Puzzle Set',
    projectId: 'HTI-9922',
    targetLanguages: ['German', 'French'],
    agency: 'EuroLingua Services',
    status: 'Delivered',
    requestedDate: '2026-02-20',
    deliveryDate: '2026-03-18',
    items: [
      { id: '3', type: 'packaging', description: 'Puzzle box all sides', wordCount: 320 },
      { id: '4', type: 'label', description: 'Safety labels', wordCount: 80 },
    ],
  },
  {
    id: 'TR-2026-003',
    projectName: 'Action Figure Series 5',
    projectId: 'HTI-9923',
    targetLanguages: ['Spanish', 'Portuguese'],
    agency: 'TranslatePro GmbH',
    status: 'Approved',
    requestedDate: '2026-01-25',
    deliveryDate: '2026-02-28',
    items: [
      { id: '5', type: 'packaging', description: 'Blister card and box', wordCount: 550 },
    ],
  },
  {
    id: 'TR-2026-004',
    projectName: 'Plush Toy - Dino Friends',
    projectId: 'HTI-9924',
    targetLanguages: ['German', 'French', 'Dutch'],
    agency: 'KidsTranslate Ltd',
    status: 'Requested',
    requestedDate: '2026-03-25',
    deliveryDate: '2026-04-20',
    items: [
      { id: '6', type: 'label', description: 'Hang tags and care labels', wordCount: 200 },
      { id: '7', type: 'packaging', description: 'Mesh bag header card', wordCount: 150 },
    ],
  },
  {
    id: 'TR-2026-005',
    projectName: 'Board Game Adventure',
    projectId: 'HTI-9925',
    targetLanguages: ['German', 'French', 'Spanish', 'Italian', 'Polish'],
    agency: 'BoardGameTranslations Inc',
    status: 'In Progress',
    requestedDate: '2026-03-01',
    deliveryDate: '2026-04-15',
    items: [
      { id: '8', type: 'manual', description: 'Game rules full book', wordCount: 4500 },
      { id: '9', type: 'packaging', description: 'Box all sides and inserts', wordCount: 800 },
      { id: '10', type: 'other', description: 'Card texts', wordCount: 600 },
    ],
  },
]

const getStatusGradient = (status: string): string => {
  switch (status) {
    case 'Requested': return 'from-slate-400 to-gray-500 shadow-slate-500/25'
    case 'In Progress': return 'from-cyan-400 to-blue-500 shadow-cyan-500/25'
    case 'Delivered': return 'from-amber-400 to-orange-500 shadow-amber-500/25'
    case 'Approved': return 'from-emerald-400 to-green-500 shadow-emerald-500/25'
    default: return 'from-slate-400 to-gray-500 shadow-slate-500/25'
  }
}

const getTypeStyle = (type: string): { bg: string; border: string; text: string } => {
  switch (type) {
    case 'packaging': return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' }
    case 'manual': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' }
    case 'label': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' }
    case 'other': return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' }
    default: return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' }
  }
}

export default function Translations() {
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredOrders = mockOrders.filter(order =>
    statusFilter === 'all' || order.status === statusFilter
  )

  const totalWords = mockOrders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.wordCount, 0), 0
  )

  return (
    <div className="space-y-6 page-enter">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                {mockOrders.length}
              </p>
              <p className="text-xs text-slate-500 mt-1">{totalWords.toLocaleString()} words</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-cyan-400">request_quote</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">In Progress</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                {mockOrders.filter(o => o.status === 'In Progress').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-cyan-400">sync</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Delivered</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mt-2">
                {mockOrders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-amber-400">local_shipping</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Approved</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mt-2">
                {mockOrders.filter(o => o.status === 'Approved').length}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl text-emerald-400">task_alt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-sm">filter_list</span>
            <span className="text-sm text-slate-300 font-medium">Filter by status:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'Requested', 'In Progress', 'Delivered', 'Approved'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card hover-lift group">
            <div className="flex items-start justify-between mb-5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`status-badge bg-gradient-to-r ${getStatusGradient(order.status)} shadow-lg`}>
                    {order.status}
                  </span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{order.projectName}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-xs">tag</span>
                  <span className="font-mono">{order.id}</span>
                  <span className="text-slate-600">•</span>
                  <span className="font-mono">{order.projectId}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">Agency</p>
                <p className="font-medium text-slate-300">{order.agency}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">language</span>
                  Target Languages
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {order.targetLanguages.map((lang) => (
                    <span key={lang} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:border-cyan-500/30 transition-colors">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  Requested
                </p>
                <p className="font-medium text-slate-300 text-sm">{order.requestedDate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">event</span>
                  Delivery Date
                </p>
                <p className={`font-medium text-sm ${new Date(order.deliveryDate) < new Date() ? 'text-amber-400' : 'text-slate-300'}`}>
                  {order.deliveryDate}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">inventory</span>
                Items
              </p>
              <div className="space-y-2">
                {order.items.map((item) => {
                  const typeStyle = getTypeStyle(item.type)
                  return (
                    <div key={item.id} className="group flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-xs border ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text}`}>
                          {item.type}
                        </span>
                        <span className="text-sm text-slate-300">{item.description}</span>
                      </div>
                      <span className="text-sm text-slate-400 font-mono">{item.wordCount.toLocaleString()} words</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-white/10">
              <button className="btn-secondary">
                <span className="material-symbols-outlined">edit</span>
                Edit
              </button>
              <button className="btn-secondary">
                <span className="material-symbols-outlined">message</span>
                Contact Agency
              </button>
              {order.status === 'Delivered' && (
                <button className="btn-primary">
                  <span className="material-symbols-outlined">check</span>
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-slate-500">filter_list_off</span>
            </div>
            <p className="text-slate-400 mb-2">No translation orders found</p>
            <p className="text-sm text-slate-500">Try adjusting your filter settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
