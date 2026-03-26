import { useState } from 'react'
import { WarningTemplate } from '../types'

// Mock data for warning templates
const mockWarnings: WarningTemplate[] = [
  {
    id: 'W001',
    code: 'CHOK-001',
    title: 'Choking Hazard - Small Parts',
    description: 'Warning for toys containing small parts that may be swallowed.',
    vectorSymbol: ' choking_hazard',
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

  const allLanguages = ['all', 'en', 'de', 'fr', 'es']

  const filteredWarnings = mockWarnings.filter((warning) => {
    const matchesSearch = warning.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warning.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warning.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLanguage = selectedLanguage === 'all' ||
      warning.translations.some(t => t.languageCode === selectedLanguage)
    
    return matchesSearch && matchesLanguage
  })

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search warnings by title, code, or description..."
              className="input-field pl-10"
            />
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
          <div className="text-sm text-gray-400">
            {filteredWarnings.length} results
          </div>
        </div>
      </div>

      {/* Warnings Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hti-border-dark">
              <th className="text-left p-4 font-semibold">Code</th>
              <th className="text-left p-4 font-semibold">Title</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-left p-4 font-semibold">Languages</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarnings.map((warning) => (
              <React.Fragment key={warning.id}>
                <tr className="border-b border-hti-border-dark/50 hover:bg-hti-bg-dark/50 transition-colors">
                  <td className="p-4">
                    <span className="px-3 py-1 bg-hti-accent/20 text-hti-accent rounded-lg font-mono text-sm">
                      {warning.code}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{warning.title}</td>
                  <td className="p-4 text-gray-400 max-w-md truncate">{warning.description}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {warning.translations.map((t) => (
                        <span key={t.languageCode} className="px-2 py-1 bg-hti-panel-dark rounded text-xs">
                          {t.languageCode.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setExpandedWarning(expandedWarning === warning.id ? null : warning.id)}
                        className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors"
                        title="View translations"
                      >
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>
                      <button className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors" title="Edit">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-2 hover:bg-hti-panel-dark rounded-lg transition-colors" title="Delete">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedWarning === warning.id && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-hti-bg-dark/50">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-hti-accent mb-2">Translations</h4>
                        {warning.translations.map((translation) => (
                          <div key={translation.languageCode} className="flex gap-4 p-3 bg-hti-panel-dark rounded-lg">
                            <span className="w-12 font-bold text-hti-accent">{translation.languageCode.toUpperCase()}</span>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{translation.language}</p>
                              <p className="text-gray-300 mt-1">{translation.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {filteredWarnings.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p>No warnings found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
