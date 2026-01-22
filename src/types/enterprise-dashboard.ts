// Enterprise AI Dashboard Types - Strategic Assessment & Implementation
// Based on INT Inc. mandate for TCO, CPRA, LLM benchmarks, and GRC metrics

// ============================================================================
// SECTION 2: Strategic Assessment Types
// ============================================================================

export interface ROIMetrics {
  tangible: TangibleBenefits;
  intangible: IntangibleBenefits;
  timeline: ROITimeline;
}

export interface TangibleBenefits {
  costPerTransactionReduction: number; // percentage
  productivityIncrease: number; // percentage (e.g., 60% for content creation)
  processAcceleration: number; // percentage (30-50% for agentic workflows)
  annualSavings: number; // dollar amount
}

export interface IntangibleBenefits {
  regulatoryComplianceRate: number; // percentage
  customerEngagementScore: number; // NPS or similar
  employeeSatisfactionScore: number; // percentage
  riskEventReduction: number; // percentage (up to 60% in pilot environments)
}

export interface ROITimeline {
  expectedPaybackMonths: number;
  currentMonth: number;
  projectedBreakeven: string; // date
  investmentPhase: 'pilot' | 'scaling' | 'optimization' | 'mature';
}

export interface UseCaseMetric {
  id: string;
  category: string;
  name: string;
  quantifiableMetric: string;
  observedImpact: string;
  impactPercentage: number;
  department: string;
  complexity: 'low' | 'medium' | 'high';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'proposed' | 'pilot' | 'scaling' | 'production';
}

export interface OrganizationalReadiness {
  aiFluencyRate: number; // percentage of staff completing AI training
  adoptionVelocity: number; // rate of adoption over time
  augmentationTimeMetrics: AugmentationMetrics;
  culturalReadinessScore: number; // 0-100
}

export interface AugmentationMetrics {
  lowValueTaskReduction: number; // percentage (25-40%)
  strategicTaskIncrease: number; // percentage
  hoursReclaimed: number; // per employee per week
}

// ============================================================================
// SECTION 3: TCO & Unit Economics Types
// ============================================================================

export interface TCOModel {
  id: string;
  name: string;
  deploymentType: 'self-hosted' | 'saas' | 'hybrid';
  components: TCOComponents;
  totalAnnualCost: number;
  costPerRequest: number;
  cpra: number; // Cost-per-Request-per-Accuracy
}

export interface TCOComponents {
  infrastructure: InfrastructureCost;
  labor: LaborCost;
  integration: IntegrationCost;
  training: number;
  maintenance: number;
  licensing: number;
}

export interface InfrastructureCost {
  hardware: number; // GPU costs (e.g., H100 at $1.89/hour)
  hosting: number;
  networking: number;
  storage: number;
  hourlyRate: number;
  utilizationRate: number;
}

export interface LaborCost {
  aiEngineers: number; // ~$5,000/month per fraction of engineer
  mlOps: number;
  dataEngineers: number;
  businessTranslators: number; // specialists mapping AI to workflows
  totalMonthly: number;
}

export interface IntegrationCost {
  legacyMiddleware: number; // "smart middleware" for legacy systems
  apiDevelopment: number;
  dataConnectors: number;
  testing: number;
}

export interface LLMUnitEconomics {
  modelId: string;
  modelName: string;
  provider: string;
  inputTokenPrice: number; // per million tokens
  outputTokenPrice: number; // per million tokens
  averageRequestTokens: number;
  averageResponseTokens: number;
  accuracy: number; // percentage
  cpra: number; // Cost-per-Request-per-Accuracy
}

export interface DeploymentComparison {
  selfHosted: TCOModel;
  saas: TCOModel;
  breakEvenRequests: number; // monthly requests where self-hosted becomes cheaper
  recommendation: 'self-hosted' | 'saas' | 'hybrid';
  rationale: string;
}

// ============================================================================
// SECTION 4: Technical Performance Types
// ============================================================================

export interface LLMBenchmark {
  modelId: string;
  modelName: string;
  provider: string;
  metrics: InferenceMetrics;
  contextWindow: number;
  timestamp: string;
}

export interface InferenceMetrics {
  rps: number; // Requests Per Second
  throughput: number; // Output Tokens/Second
  errorRate: number; // percentage
  ttft: TTFTMetrics; // Time to First Token
  e2eLatency: LatencyMetrics; // End-to-End
  itl: number; // Inter-Token Latency (ms)
}

export interface TTFTMetrics {
  p50: number; // median (ms)
  p95: number; // 95th percentile (ms)
  p99: number; // 99th percentile (ms)
  avg: number; // average (ms)
}

export interface LatencyMetrics {
  p50: number;
  p95: number;
  p99: number;
  avg: number;
}

export interface TTFTvsISLDataPoint {
  inputSequenceLength: number; // tokens
  ttft: number; // ms
  load: 'low' | 'medium' | 'high';
}

export interface PerformanceSLO {
  metric: string;
  target: number;
  current: number;
  unit: string;
  status: 'met' | 'at-risk' | 'breached';
}

// ============================================================================
// SECTION 5: GRC (Governance, Risk, Compliance) Types
// ============================================================================

export interface AgentGovernance {
  agentId: string;
  agentName: string;
  owner: string; // human manager
  department: string;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  autonomyLevel: number; // 1-10
  permissions: AgentPermissions;
  auditTrail: AuditEntry[];
  status: 'active' | 'paused' | 'under-review' | 'deprecated';
}

export interface AgentPermissions {
  dataAccess: string[];
  maxTransactionValue: number; // threshold requiring approval
  requiresDualControl: boolean;
  sandboxOnly: boolean;
  externalApiAccess: boolean;
}

export interface AuditEntry {
  timestamp: string;
  action: string;
  rationale: string;
  outcome: 'success' | 'failure' | 'escalated';
  humanOverride: boolean;
  reviewerId?: string;
}

export interface RiskTierConfig {
  tier: 'low' | 'medium' | 'high' | 'critical';
  thresholdValue: number;
  requiresApproval: boolean;
  approvalLevel: 'manager' | 'director' | 'executive' | 'dual-control';
  maxAutonomyLevel: number;
  monitoringFrequency: 'realtime' | 'hourly' | 'daily';
}

export interface SecurityRisk {
  id: string;
  type: 'chained-vulnerability' | 'data-leakage' | 'synthetic-identity' | 'privilege-escalation' | 'model-poisoning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedAgents: string[];
  description: string;
  mitigationStatus: 'unmitigated' | 'in-progress' | 'mitigated';
  detectedAt: string;
  lastUpdated: string;
}

export interface ComplianceStatus {
  regulation: string;
  region: string;
  status: 'compliant' | 'non-compliant' | 'pending-review' | 'not-applicable';
  deadline?: string;
  notes: string;
  lastAudit: string;
}

export interface GRCDashboardData {
  agents: AgentGovernance[];
  riskTiers: RiskTierConfig[];
  securityRisks: SecurityRisk[];
  complianceStatuses: ComplianceStatus[];
  humanOversightReadiness: HumanOversightStatus;
}

export interface HumanOversightStatus {
  staffOnDuty: number;
  coveragePercentage: number; // 24/7 coverage
  overrideAuthorityPresent: boolean;
  avgResponseTime: number; // minutes
  escalationsLast24h: number;
}

// ============================================================================
// SECTION 6: UX & Visualization Types
// ============================================================================

export interface RadarChartDataPoint {
  axis: string;
  value: number;
  maxValue: number;
}

export interface HeatMapCell {
  rowId: string;
  columnId: string;
  value: number; // 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  label: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: Record<string, unknown>;
  isDefault: boolean;
  createdBy: string;
}

export interface FacetedFilter {
  id: string;
  label: string;
  type: 'select' | 'multi-select' | 'range' | 'date-range' | 'boolean';
  options?: { value: string; label: string; count?: number }[];
  value: unknown;
  isActive: boolean;
}

// ============================================================================
// Constants
// ============================================================================

export const RISK_TIER_CONFIGS: RiskTierConfig[] = [
  {
    tier: 'low',
    thresholdValue: 100,
    requiresApproval: false,
    approvalLevel: 'manager',
    maxAutonomyLevel: 8,
    monitoringFrequency: 'daily',
  },
  {
    tier: 'medium',
    thresholdValue: 500,
    requiresApproval: true,
    approvalLevel: 'manager',
    maxAutonomyLevel: 6,
    monitoringFrequency: 'hourly',
  },
  {
    tier: 'high',
    thresholdValue: 5000,
    requiresApproval: true,
    approvalLevel: 'director',
    maxAutonomyLevel: 4,
    monitoringFrequency: 'realtime',
  },
  {
    tier: 'critical',
    thresholdValue: 50000,
    requiresApproval: true,
    approvalLevel: 'dual-control',
    maxAutonomyLevel: 2,
    monitoringFrequency: 'realtime',
  },
];

export const SECURITY_RISK_TYPES = [
  'chained-vulnerability',
  'data-leakage',
  'synthetic-identity',
  'privilege-escalation',
  'model-poisoning',
] as const;

export const COMPLIANCE_REGULATIONS = [
  { id: 'gdpr', name: 'GDPR', region: 'EU' },
  { id: 'ccpa', name: 'CCPA', region: 'California' },
  { id: 'hipaa', name: 'HIPAA', region: 'USA' },
  { id: 'sox', name: 'SOX', region: 'USA' },
  { id: 'eu-ai-act', name: 'EU AI Act', region: 'EU', deadline: '2027-12-01' },
  { id: 'iso-27001', name: 'ISO 27001', region: 'Global' },
  { id: 'soc2', name: 'SOC 2 Type II', region: 'Global' },
] as const;

export const BENCHMARK_METRICS = [
  { id: 'ttft', name: 'Time to First Token', unit: 'ms', target: 200 },
  { id: 'rps', name: 'Requests Per Second', unit: 'req/s', target: 100 },
  { id: 'itl', name: 'Inter-Token Latency', unit: 'ms', target: 20 },
  { id: 'e2e-p95', name: 'E2E Latency (P95)', unit: 'ms', target: 3000 },
  { id: 'error-rate', name: 'Error Rate', unit: '%', target: 0.5 },
  { id: 'throughput', name: 'Throughput', unit: 'tokens/s', target: 50 },
] as const;
