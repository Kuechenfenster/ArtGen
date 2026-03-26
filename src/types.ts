// Project Types
export interface Project {
  id: string;
  name: string;
  sku: string;
  brand: string;
  targetMarkets: string[];
  deadline: string;
  status: ProjectStatus;
  assignedDesigners: string[];
  artworkFiles: ArtworkFile[];
  complianceStatus: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'In Progress' | 'Pending Review' | 'Approved' | 'On Hold';
export type ComplianceStatus = 'Compliant' | 'Needs Review' | 'Non-Compliant';

export interface ArtworkFile {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

// Warning Database Types
export interface WarningTemplate {
  id: string;
  code: string;
  title: string;
  description: string;
  vectorSymbol?: string;
  translations: WarningTranslation[];
  createdAt: string;
  updatedAt: string;
}

export interface WarningTranslation {
  language: string;
  languageCode: string;
  text: string;
}

export interface VectorSymbol {
  id: string;
  name: string;
  svgPath: string;
  category: string;
}

// Translation Order Types
export interface TranslationOrder {
  id: string;
  projectName: string;
  projectId: string;
  targetLanguages: string[];
  agency: string;
  status: TranslationStatus;
  requestedDate: string;
  deliveryDate: string;
  items: TranslationItem[];
}

export type TranslationStatus = 'Requested' | 'In Progress' | 'Delivered' | 'Approved';

export interface TranslationItem {
  id: string;
  type: 'packaging' | 'manual' | 'label' | 'other';
  description: string;
  wordCount: number;
}

// Navigation Types
export type PageType = 'dashboard' | 'project' | 'create' | 'database' | 'translations';

export interface HeaderProps {
  title: string;
  primaryAction?: {
    label: string;
    icon: string;
    onClick: () => void;
  };
}

export interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}
