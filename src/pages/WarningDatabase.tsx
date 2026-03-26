import React from 'react'
import { useState } from 'react'
import { WarningTemplate } from '../types'

// Mock data for warning templates
const mockWarnings: WarningTemplate[] = [
  {
    id: 'W001',
    code: 'CHOK-001',
    title: 'Choking Hazard - Small Parts',
    description: 'Warning for toys containing small parts that may be swallowed.',
    vectorSymbol: 'choking_hazard',
    translations: [
      { language: 'English', languageCode: 'en', text: 'WARNING: CHOKING HAZARD - Small parts. Not for children under 3 years.' },
      { language: 'German', languageCode: 'de', text: 'WARNUNG: ERSTICKUNGSGEFAHR - Kleinteile. Nicht für Kinder unter 3 Jahren.' },
      { language: 'French', languageCode: 'fr', text: 'AVERTISSEMENT : RISQUE D\'ÉTOUFFEMENT - Petites pièces. Ne convient pas aux enfants de moins de 3 ans.' },
      { language: 'Spanish', languageCode: 'es', text: 'ADVERTENCIA: PELIGRO DE ASFIXIA - Piezas pequeñas. No apto para niños menores de 3 años.' },
    ],
    createdAt: '2025-01-15',
    updatedAt: '2026-02-20',
  },
  {
    id: 'W002',
    code: 'AGE-003',
    title: 'Age Restriction Warning',
    description: 'General age restriction warning for toys.',
    vectorSymbol: 'age_warning',
    translations: [
      { language: 'English', languageCode: 'en', text: 'Not suitable for children under 36 months.' },
      { language: 'German', languageCode: 'de', text: 'Nicht geeignet für Kinder unter 36 Monaten.' },
      { language: 'French', languageCode: 'fr', text: 'Ne convient pas aux enfants de moins de 36 mois.' },
    ],
    createdAt: '2025-02-10',
    updatedAt: '2026-01-15',
  },
  {
    id: 'W003',
    code: 'MAG-001',
    title: 'Magnet Warning',
    description: 'Warning for toys containing magnets.',
    vectorSymbol: 'magnet_warning',
    translations: [
      { language: 'English', languageCode: 'en', text: 'WARNING: Contains magnets. Swallowed magnets can cause serious injuries.' },
      { language: 'German', languageCode: 'de', text: 'WARNUNG: Enthält Magnete. Verschluckte Magnete können schwere Verletzungen verursachen.' },
      { language: 'French', languageCode: 'fr', text: 'AVERTISSEMENT : Contient des aimants. Les aimants avalés peuvent causer des blessures graves.' },
    ],
    createdAt: '2025-03-05',
    updatedAt: '2026-03-10',
  },
  {
    id: 'W004',
    code: 'BALL-001',
    title: 'Ball Warning',
    description: 'Warning for toys containing balls.',
    vectorSymbol: 'ball_warning',
    translations: [
      { language: 'English', languageCode: 'en', text: 'WARNING: This toy contains a ball. Not for children under 3 years.' },
      { language: 'Spanish', languageCode: 'es', text: 'ADVERTENCIA: Este juguete contiene una pelota. No apto para niños menores de 3 años.' },
    ],
    createdAt: '2025-04-20',
    updatedAt: '2026-02-28',
  },
  {
    id: 'W005',
    code: 'FUNC-001',
    title: 'Functional Sharp Point',
    description: 'Warning for toys with functional sharp points.',
    vectorSymbol: 'sharp_point',
    translations: [
      { language: 'English', languageCode: 'en', text: 'WARNING: Contains functional sharp points. Handle with care.' },
      { language: 'German', languageCode: 'de', text: 'WARNUNG: Enthält funktionale spitze Punkte. Vorsichtig handhaben.' },
    ],
    createdAt: '2025-05-12',
    updatedAt: '2026-01-20',
  },
]

export default function WarningDatabase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [expandedWarning, setExpandedWarning] = useState<string | null>(null)

  const filteredWarnings = mockWarnings.filter((warning) => {
    const matchesSearch = warning.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warning.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warning.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLanguage = selectedLanguage === 'all' ||
      warning.translations.some(t => t.languageCode === selectedLanguage)
    
    return matchesSearch && matchesLanguage
  })

  return (
    <div className="space-y-6 page-enter">
      {/* Search & Filter Bar */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search warnings by title, code, or description..."
              className="input-field pl-12 focus:border-cyan-500/50"
            />
          </div>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="input-field w-44 appearance-none pr-10 focus:border-cyan-500/50"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="de">German</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg">
            <span className="material-symbols-outlined text-cyan-400 text-sm">database</span>
            <span className="text-sm text-slate-400">{filteredWarnings.length} results</span>
          </div>
        </div>
      </div>

      {/* Warnings Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left p-4 font-semibold text-slate-300 text-sm uppercase tracking-wider">Code</th>
                <th className="text-left p-4 font-semibold text-slate-300 text-sm uppercase tracking-wider">Title</th>
                <th className="text-left p-4 font-semibold text-slate-300 text-sm uppercase tracking-wider">Description</th>
                <th className="text-left p-4 font-semibold text-slate-300 text-sm uppercase tracking-wider">Languages</th>
                <th className="text-right p-4 font-semibold text-slate-300 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWarnings.map((warning) => (
                <React.Fragment key={warning.id}>
                  <tr className="border-b border-white/5 hover:bg-white/[0.05] transition-colors group">
                    <td className="p-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-lg font-mono text-sm border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                        {warning.code}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">{warning.title}</span>
                    </td>
                    <td className="p-4 text-slate-400 max-w-md truncate">{warning.description}</td>
                    <td className="p-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {warning.translations.map((t) => (
                          <span key={t.languageCode} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:border-cyan-500/30 transition-colors">
                            {t.languageCode.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setExpandedWarning(expandedWarning === warning.id ? null : warning.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-cyan-400"
                          title="View translations"
                        >
                          <span className={`material-symbols-outlined transition-transform ${expandedWarning === warning.id ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-cyan-400" title="Edit">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-rose-400" title="Delete">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedWarning === warning.id && (
                    <tr>
                      <td colSpan={5} className="bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
                        <div className="px-4 py-4">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-cyan-400 text-sm">translate</span>
                            <h4 className="font-semibold text-cyan-400">Translations</h4>
                          </div>
                          <div className="space-y-2">
                            {warning.translations.map((translation) => (
                              <div key={translation.languageCode} className="group flex gap-4 p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors">
                                <div className="w-16 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                                  <span className="font-bold text-cyan-400 text-sm">{translation.languageCode.toUpperCase()}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm text-slate-300 mb-1">{translation.language}</p>
                                  <p className="text-slate-400 text-sm leading-relaxed">{translation.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {filteredWarnings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-slate-500">search_off</span>
            </div>
            <p className="text-slate-400 mb-2">No warnings found matching your criteria</p>
            <p className="text-sm text-slate-500">Try adjusting your search or filter settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
