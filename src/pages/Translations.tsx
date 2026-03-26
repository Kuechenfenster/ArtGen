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

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Requested': return 'bg-gray-500'
    case 'In Progress': return 'bg-blue-500'
    case 'Delivered': return 'bg-yellow-500'
    case 'Approved': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case 'packaging': return 'bg-purple-500/20 text-purple-400 border-purple-500'
    case 'manual': return 'bg-blue-500/20 text-blue-400 border-blue-500'
    case 'label': return 'bg-green-500/20 text-green-400 border-green-500'
    case 'other': return 'bg-gray-500/20 text-gray-400 border-gray-500'
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500'
  }
}

export default function Translations() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredOrders = mockOrders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  )

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-hti-accent mt-1">{mockOrders.length}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-gray-500">request_quote</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">
                {mockOrders.filter(o => o.status === 'In Progress').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-blue-500">sync</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivered</p>
              <p className="text-3xl font-bold text-yellow-400 mt-1">
                {mockOrders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-yellow-500">local_shipping</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-3xl font-bold text-green-400 mt-1">
                {mockOrders.filter(o => o.status === 'Approved').length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-green-500">task_alt</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Filter by status:</span>
          <div className="flex gap-2">
            {['all', 'Requested', 'In Progress', 'Delivered', 'Approved'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-hti-accent text-white'
                    : 'bg-hti-bg-dark text-gray-400 hover:bg-hti-panel-dark'
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
          <div key={order.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{order.projectName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{order.id} • {order.projectId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Agency</p>
                <p className="font-medium">{order.agency}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Target Languages</p>
                <div className="flex flex-wrap gap-1">
                  {order.targetLanguages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-hti-panel-dark rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Requested</p>
                <p className="font-medium">{order.requestedDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Delivery Date</p>
                <p className="font-medium">{order.deliveryDate}</p>
              </div>
            </div>

            <div className="border-t border-hti-border-dark pt-4">
              <p className="text-xs text-gray-400 mb-2">Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-hti-bg-dark rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs border ${getTypeBadgeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <span className="text-sm">{item.description}</span>
                    </div>
                    <span className="text-sm text-gray-400">{item.wordCount} words</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-hti-border-dark">
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
      </div>
    </div>
  )
}
