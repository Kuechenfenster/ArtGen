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
    <div className="max-w-3xl mx-auto page-enter">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project Name & SKU */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card group">
            <label className="block text-sm font-medium mb-2.5">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="material-symbols-outlined text-cyan-400 text-sm">label</span>
                Project Name
              </span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field focus:border-cyan-500/50"
              placeholder="e.g., Summer Collection 2026"
              required
            />
          </div>
          <div className="card group">
            <label className="block text-sm font-medium mb-2.5">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="material-symbols-outlined text-purple-400 text-sm">barcode</span>
                SKU
              </span>
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="input-field focus:border-purple-500/50"
              placeholder="e.g., SUM-2026-001"
              required
            />
          </div>
        </div>

        {/* Brand Selection */}
        <div className="card">
          <label className="block text-sm font-medium mb-3">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-cyan-400 text-sm">branding_watermark</span>
              Brand
            </span>
          </label>
          <div className="relative">
            <select
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="input-field appearance-none cursor-pointer pr-10 focus:border-cyan-500/50"
            >
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Target Markets */}
        <div className="card">
          <label className="block text-sm font-medium mb-3">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-cyan-400 text-sm">public</span>
              Target Markets
            </span>
          </label>
          <p className="text-xs text-slate-400 mb-3">Select all regions where this product will be sold</p>
          <div className="flex flex-wrap gap-2">
            {availableMarkets.map((market) => (
              <button
                key={market}
                type="button"
                onClick={() => handleMarketToggle(market)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border ${
                  formData.targetMarkets.includes(market)
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-slate-300'
                }`}
              >
                {formData.targetMarkets.includes(market) && (
                  <span className="material-symbols-outlined text-xs mr-1 align-middle">check</span>
                )}
                {market}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div className="card">
          <label className="block text-sm font-medium mb-2.5">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-amber-400 text-sm">event</span>
              Deadline
            </span>
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="input-field focus:border-amber-500/50"
            required
          />
        </div>

        {/* Assigned Designers */}
        <div className="card">
          <label className="block text-sm font-medium mb-2.5">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-purple-400 text-sm">people</span>
              Assigned Designers
            </span>
          </label>
          <input
            type="text"
            value={formData.assignedDesigners}
            onChange={(e) => setFormData({ ...formData, assignedDesigners: e.target.value })}
            className="input-field focus:border-purple-500/50"
            placeholder="e.g., Sarah M., John D."
          />
          <p className="text-xs text-slate-400 mt-2.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">info</span>
            Separate multiple names with commas
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
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
