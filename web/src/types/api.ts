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

export type DiagnosticLevel = 'ok' | 'warning' | 'error' | 'unknown'

export interface DiagnosticItem {
  id: string
  category: string
  title: string
  level: DiagnosticLevel
  summary: string
  details?: string[]
  suggestion?: string
}

export interface DiagnosticReport {
  generatedAt: string
  overall: DiagnosticLevel
  counts: Record<DiagnosticLevel, number>
  items: DiagnosticItem[]
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
  tasks?: number
  restarts?: number
  unitPath?: string
  suspended?: boolean
}

export interface NetworkInterface {
  name: string
  addresses?: string[]
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
  deferred?: boolean
  savedAt: string
  rolledBack: boolean
}

export interface ConfigBackup {
  id: string
  hash: string
  size: number
  createdAt: string
  sourcePath: string
  name?: string
  note?: string
}

export interface ConfigDiffLine {
  kind: 'context' | 'add' | 'remove' | 'skip'
  oldLine?: number
  newLine?: number
  text: string
  skipCount?: number
}

export interface ConfigBackupPreview {
  backup: ConfigBackup
  currentHash: string
  currentPresent: boolean
  same: boolean
  valid: boolean
  validationError?: string
  diff: ConfigDiffLine[]
  diffTruncated?: boolean
}

export type UpstreamSource = 'official' | 'kdae'

export interface UpstreamVersion {
  source: UpstreamSource
  ref: string
  label: string
  description?: string
  publishedAt: string
  prerelease?: boolean
  installable: boolean
  note?: string
  expiresAt?: string
  cached?: boolean
  cachedOnly?: boolean
  cachedAt?: string
  cachedBytes?: number
}

export interface InstalledState {
  source?: UpstreamSource
  ref?: string
  label?: string
  platform?: string
  version?: string
  installedAt?: string
  sha256?: string
}

export interface InstallStatus {
  binaryPath?: string
  /** @deprecated 兼容旧客户端的首选构建标识。 */
  platform: string
  architecture?: string
  preferredPlatform?: string
  ready: boolean
  present: boolean
  version?: string
  managed?: InstalledState
  drifted?: boolean
  rollbackAvailable: boolean
  serviceActive: boolean
  warnings?: string[]
  problem?: string
}

export interface InstallProvision {
  possible: boolean
  installed: boolean
  binaryPath: string
  configPath: string
  unitPath: string
  blockers?: string[]
  notes?: string[]
}

export type InstallPhase = 'idle' | 'downloading' | 'applying' | 'done' | 'failed'

export interface InstallJob {
  phase: InstallPhase
  source?: string
  ref?: string
  label?: string
  cached?: boolean
  startedAt?: string
  endedAt?: string
  error?: string
}

export interface DaeCompatibility {
  compatible: boolean
  version?: string
  outlineSupported: boolean
  configPresent: boolean
  unsupportedFeatures?: string[]
  validationError?: string
  problem?: string
}

export interface CompatibilityJob extends InstallJob {
  result?: DaeCompatibility
}

export interface GeoFile {
  name: string
  path?: string
  present: boolean
  size?: number
  modTime?: string
  /** 被 path 遮蔽的同名副本；dae 只读优先级最高的那一份。 */
  shadowed?: string[]
  /** 下一次更新时该文件的落盘位置。 */
  targetPath: string
}

export interface GeoResidual {
  path: string
  kind: 'temporary' | 'rollback'
  size: number
  modTime: string
  targetPath?: string
  restorable: boolean
  deletable: boolean
}

export type GeoSource = 'loyalsoldier' | 'v2fly' | `custom:${string}`

export interface GeoSourceInfo {
  source: GeoSource
  label: string
  /** 如实列出全部信任根；同一来源可能横跨多个仓库。 */
  repositories: string[]
  note: string
  custom?: boolean
}

export interface CustomGeoSource {
  id: string
  source: `custom:${string}`
  label: string
  geoipUrl: string
  geoipSha256Url: string
  geositeUrl: string
  geositeSha256Url: string
}

export type CustomGeoSourceInput = Omit<CustomGeoSource, 'id' | 'source'>

export interface GeoState {
  source: GeoSource
  repositories?: string[]
  tag: string
  updatedAt: string
}

export interface GeoStatus {
  sources: GeoSourceInfo[]
  /** 界面该预选的来源：用过就沿用上次那个，否则用内置默认。 */
  defaultSource: GeoSource
  targetDir: string
  searchPath: string[]
  files: GeoFile[]
  residuals?: GeoResidual[]
  updatable: boolean
  problem?: string
  managed?: GeoState
  warnings?: string[]
  /** active 时立即 reload；inactive 时文件在 dae 下次启动时读取。 */
  serviceState: 'active' | 'inactive' | 'unknown'
}

/** 面板自身的新版本检查结果；dev 构建或检查被关闭时 latest 为空。 */
export interface PanelUpdateCheck {
  current: string
  latest?: string
  updateAvailable: boolean
  checkedAt: string
  error?: string
}

/** 自升级开关与可行性；正式部署始终返回，关闭时仍可从界面重新启用。 */
export interface PanelUpdateStatus {
  current: string
  binaryPath: string
  platform: string
  enabled: boolean
  channel: 'stable' | 'preview'
  updatable: boolean
  problem?: string
  previousPath?: string
}

export interface PanelUpdatePayload {
  check: PanelUpdateCheck
  status?: PanelUpdateStatus
  job?: InstallJob
}

/** GitHub Token 永不回传；前端只知道是否配置以及由谁管理。 */
export interface GitHubCredentialStatus {
  configured: boolean
  source?: 'environment' | 'panel'
}

/** 定时任务（订阅自动刷新 / geo 自动更新）的设置与执行状态，两个端点同构。 */
export interface ScheduleStatus {
  enabled: boolean
  intervalMinutes: number
  lastRunAt?: string
  lastError?: string
  nextRunAt?: string
}

export interface ManagedSubscriptionDefinition {
  tag: string
  url: string
  userAgent: string
}

export interface ManagedSubscription extends ManagedSubscriptionDefinition {
  localUrl: string
  updatedAt?: string
  lastError?: string
}

export interface ManagedSubscriptionsResponse {
  subscriptions: ManagedSubscription[]
}

export interface LatencyTarget {
  host: string
  port: number
}

export interface LatencyResult {
  host: string
  port: number
  reachable: boolean
  latencyMs?: number
  resolvedIp?: string
  method?: 'tcp' | 'icmp'
  error?: string
}

export interface SubscriptionNode {
  name: string
  protocol?: string
  host?: string
  matches: number
}

export interface SubscriptionNodeSource {
  tag: string
  nodes: SubscriptionNode[]
  cachedAt: string
  skipped?: number
  problem?: string
}

export interface LogEntry {
  timestamp: string
  priority: number
  level: string
  message: string
  unit?: string
  pid?: string
}

export interface ConnectionEvent {
  at: string
  network: 'tcp4' | 'tcp6' | 'udp4' | 'udp6'
  src: string
  dst: string
  dstAddr?: string
  sniffed?: string
  outbound?: string
  dialer?: string
  policy?: string
  pname?: string
  mac?: string
  offloaded?: boolean
  approxTime?: boolean
}

export interface ConnectionEndpoint {
  address: string
  count: number
}

export interface ConnectionFacet {
  id: string
  label: string
  count: number
  note?: string
}

export interface ConnectionFacets {
  targets: ConnectionFacet[]
  clients: ConnectionFacet[]
  nodes: ConnectionFacet[]
  groups: ConnectionFacet[]
}

export interface ConnectionsResponse {
  snapshotAt: string
  snapshotOk: boolean
  serviceRunning: boolean
  socketWindowSeconds: number
  logsOk: boolean
  logLevel?: 'error' | 'warn' | 'info' | 'debug' | 'trace'
  dropped?: number
  truncated?: boolean
  facetLimited?: boolean
  summary: {
    outboundTcp: number
    udpSockets: number
    sampledTcpPeak: number
    sampledUdpPeak: number
    windowEvents: number
    windowClients: number
    windowTargets: number
  }
  facets: ConnectionFacets
  endpoints: ConnectionEndpoint[]
  entries: ConnectionEvent[]
}
