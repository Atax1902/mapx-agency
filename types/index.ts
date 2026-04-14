// ─── Project & Portfolio ──────────────────────────────────────────
export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  id: string
  title: string
  category: 'Fortnite UEFN' | 'Roblox' | 'Graphisme'
  description: string
  images: ProjectImage[]
  tags?: string[]
  year?: number
}

// ─── Testimonials ─────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  initials: string
  rating: number
  quote: string
}

// ─── Services ─────────────────────────────────────────────────────
export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features?: string[]
  colSpan?: number
}

// ─── Method Steps ─────────────────────────────────────────────────
export interface MethodStep {
  number: string
  title: string
  description: string
  icon: string
}

// ─── Navigation ───────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
}

// ─── Forms ────────────────────────────────────────────────────────
export interface ProjectFormData {
  firstName: string
  lastName: string
  email: string
  discord: string
  projectType: 'Fortnite UEFN' | 'Roblox' | 'Graphisme' | 'Autre'
  description: string
  budget: string
  deadline: string
  website?: string // honeypot
}

export interface DevRecruitFormData {
  firstName: string
  lastName: string
  email: string
  discord: string
  specialty: 'Fortnite UEFN' | 'Roblox' | 'Les deux'
  experience: string
  portfolioUrl: string
  motivation: string
  website?: string // honeypot
}

export interface DesignerRecruitFormData {
  firstName: string
  lastName: string
  email: string
  discord: string
  software: string[]
  portfolioUrl: string
  message: string
  website?: string // honeypot
}

// ─── Submissions (stored) ─────────────────────────────────────────
export interface SubmissionEntry {
  id: string
  type: 'project' | 'recruit-dev' | 'recruit-designer'
  timestamp: string
  ip: string
  data: ProjectFormData | DevRecruitFormData | DesignerRecruitFormData
}

export interface FormSubmission {
  entries: SubmissionEntry[]
}

// ─── API Responses ────────────────────────────────────────────────
export interface ApiResponse<T = null> {
  success: boolean
  message: string
  data?: T
}

export interface PaginatedSubmissions {
  entries: SubmissionEntry[]
  total: number
  page: number
  perPage: number
}
