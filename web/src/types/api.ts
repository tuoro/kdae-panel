export interface User {
  id: number
  username: string
  createdAt: string
}

export interface AuthStatus {
  initialized: boolean
  authenticated: boolean
  user?: User
  csrfToken?: string
  expiresAt?: string
  bootstrapRequired?: boolean
  bootstrapAuthorized?: boolean
}

export interface DaeReport {
  binary: string
  available: boolean
  version?: string
  commands: Record<string, boolean>
  outlineSupported: boolean
  outlineVersion?: string
  problem?: string
  detectedAt: string
}

export interface OutlineElement {
  name?: string
  mapping?: string
  isArray?: boolean
  defaultValue?: string
  required?: boolean
  type?: string
  desc?: string
  structure?: OutlineElement[]
}

export interface DaeOutline {
  version: string
  leaves: string[]
  structure: OutlineElement[]
}

export interface ServiceStatus {
  name: string
  description?: string
  loadState?: string
  activeState?: string
  subState?: string
  unitFileState?: string
  mainPid?: number
  execMainStatus?: number
  activeSince?: string
  startedAt?: string
  memoryBytes?: number
  cpuUsageNanoseconds?: number
  tasks?: number
  restarts?: number
  unitPath?: string
}

export interface ConfigDocument {
  path: string
  content: string
  hash: string
  size: number
  mode: string
  modifiedAt: string
}

export interface ConfigSaveResult {
  hash: string
  backupId?: string
  applied: boolean
  savedAt: string
  rolledBack: boolean
}

export interface ConfigBackup {
  id: string
  hash: string
  size: number
  createdAt: string
  sourcePath: string
}

export interface LogEntry {
  timestamp: string
  priority: number
  level: string
  message: string
  unit?: string
  pid?: string
}
