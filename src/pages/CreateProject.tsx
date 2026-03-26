import { useState } from 'react'

interface CreateProjectProps {
  onCancel: () => void
}

export default function CreateProject({ onCancel }: CreateProjectProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    brand: 'HTI Toys',
    targetMarkets: [] as string[],
    deadline: '',
    assignedDesigners: '',
  })

  const availableBrands = ['HTI Toys', 'HTI Learning', 'HTI Heroes', 'HTI Soft', 'HTI Games', 'HTI Motors']
  const availableMarkets = ['EU', 'US', 'UK', 'CA', 'AU', 'MX', 'JP', 'CN']

  const handleMarketToggle = (market: string) => {
    setFormData(prev => ({
      ...prev,
      targetMarkets: prev.targetMarkets.includes(market)
        ? prev.targetMarkets.filter(m => m !== market)
        : [...prev.targetMarkets, market]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating project:', formData)
    // TODO: Implement actual project creation
    onCancel()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name & SKU */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <label className="block text-sm font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-hti-accent text-sm">label</span>
                Project Name
              </span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g., Summer Collection 2026"
              required
            />
          </div>
          <div className="card">
            <label className="block text-sm font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-hti-accent text-sm">barcode</span>
                SKU
              </span>
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="input-field"
              placeholder="e.g., SUM-2026-001"
              required
            />
          </div>
        </div>

        {/* Brand Selection */}
        <div className="card">
          <label className="block text-sm font-medium mb-2">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-hti-accent text-sm">branding_watermark</span>
              Brand
            </span>
          </label>
          <select
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="input-field"
          >
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Target Markets */}
        <div className="card">
          <label className="block text-sm font-medium mb-3">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-hti-accent text-sm">public</span>
              Target Markets
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableMarkets.map((market) => (
              <button
                key={market}
                type="button"
                onClick={() => handleMarketToggle(market)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.targetMarkets.includes(market)
                    ? 'bg-hti-accent text-white'
                    : 'bg-hti-bg-dark text-gray-400 hover:bg-hti-panel-dark'
                }`}
              >
                {market}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div className="card">
          <label className="block text-sm font-medium mb-2">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-hti-accent text-sm">event</span>
              Deadline
            </span>
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="input-field"
            required
          />
        </div>

        {/* Assigned Designers */}
        <div className="card">
          <label className="block text-sm font-medium mb-2">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-hti-accent text-sm">people</span>
              Assigned Designers
            </span>
          </label>
          <input
            type="text"
            value={formData.assignedDesigners}
            onChange={(e) => setFormData({ ...formData, assignedDesigners: e.target.value })}
            className="input-field"
            placeholder="e.g., Sarah M., John D."
          />
          <p className="text-xs text-gray-400 mt-2">Separate multiple names with commas</p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="btn-secondary">
            <span className="material-symbols-outlined">close</span>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <span className="material-symbols-outlined">check</span>
            Create Project
          </button>
        </div>
      </form>
    </div>
  )
}
