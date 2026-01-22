// Enterprise AI Dashboard Data
// Strategic Assessment, TCO, LLM Benchmarks, and GRC metrics

import {
  UseCaseMetric,
  LLMUnitEconomics,
  LLMBenchmark,
  AgentGovernance,
  SecurityRisk,
  ComplianceStatus,
  TTFTvsISLDataPoint,
  PerformanceSLO,
} from '@/types/enterprise-dashboard';

// ============================================================================
// SECTION 2: Use Case Impact Metrics (from mandate Table 1)
// ============================================================================

export const useCaseMetrics: UseCaseMetric[] = [
  {
    id: 'uc-001',
    category: 'Customer Service (Agentic)',
    name: 'Claims Handling Automation',
    quantifiableMetric: 'Claim Handling Time & NPS',
    observedImpact: '40% time reduction; 15-point NPS increase',
    impactPercentage: 40,
    department: 'Customer Service',
    complexity: 'high',
    priority: 'critical',
    status: 'production',
  },
  {
    id: 'uc-002',
    category: 'Manufacturing/Operations',
    name: 'Predictive Maintenance',
    quantifiableMetric: 'Downtime Reduction',
    observedImpact: '30-50% reduction in downtime',
    impactPercentage: 40,
    department: 'Operations',
    complexity: 'high',
    priority: 'critical',
    status: 'scaling',
  },
  {
    id: 'uc-003',
    category: 'Content/Marketing',
    name: 'AI Content Generation',
    quantifiableMetric: 'Productivity & Time-to-Market',
    observedImpact: '60% productivity increase; faster time-to-market',
    impactPercentage: 60,
    department: 'Marketing',
    complexity: 'medium',
    priority: 'high',
    status: 'production',
  },
  {
    id: 'uc-004',
    category: 'Risk Monitoring (Finance)',
    name: 'Autonomous Risk Detection',
    quantifiableMetric: 'Risk Event Reduction',
    observedImpact: 'Up to 60% reduction in pilot environments',
    impactPercentage: 60,
    department: 'Finance',
    complexity: 'high',
    priority: 'critical',
    status: 'pilot',
  },
  {
    id: 'uc-005',
    category: 'IT Operations',
    name: 'Auto-resolving Service Tickets',
    quantifiableMetric: 'Workflow Cycle Time',
    observedImpact: '20-30% acceleration in workflow cycles',
    impactPercentage: 25,
    department: 'IT',
    complexity: 'medium',
    priority: 'high',
    status: 'scaling',
  },
  {
    id: 'uc-006',
    category: 'Insurance',
    name: 'Claims Processing Automation',
    quantifiableMetric: 'Processing Time',
    observedImpact: 'Up to 75% reduction in claims processing time',
    impactPercentage: 75,
    department: 'Operations',
    complexity: 'high',
    priority: 'critical',
    status: 'pilot',
  },
  {
    id: 'uc-007',
    category: 'Sales',
    name: 'Lead Scoring & Prioritization',
    quantifiableMetric: 'Conversion Rate',
    observedImpact: '35% increase in qualified lead conversion',
    impactPercentage: 35,
    department: 'Sales',
    complexity: 'medium',
    priority: 'high',
    status: 'production',
  },
  {
    id: 'uc-008',
    category: 'HR/Talent',
    name: 'Resume Screening Automation',
    quantifiableMetric: 'Time-to-Hire',
    observedImpact: '50% reduction in initial screening time',
    impactPercentage: 50,
    department: 'HR',
    complexity: 'low',
    priority: 'medium',
    status: 'production',
  },
];

// ============================================================================
// SECTION 3: LLM Unit Economics (from mandate Section 3.2)
// ============================================================================

export const llmUnitEconomics: LLMUnitEconomics[] = [
  {
    modelId: 'gpt-5-mini',
    modelName: 'GPT-5 Mini',
    provider: 'OpenAI',
    inputTokenPrice: 0.25,
    outputTokenPrice: 2.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 92,
    cpra: 0.0014, // calculated
  },
  {
    modelId: 'gpt-5',
    modelName: 'GPT-5',
    provider: 'OpenAI',
    inputTokenPrice: 2.50,
    outputTokenPrice: 10.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 97,
    cpra: 0.0092,
  },
  {
    modelId: 'claude-4-sonnet',
    modelName: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    inputTokenPrice: 3.00,
    outputTokenPrice: 15.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 96,
    cpra: 0.0125,
  },
  {
    modelId: 'claude-4-opus',
    modelName: 'Claude 4 Opus',
    provider: 'Anthropic',
    inputTokenPrice: 15.00,
    outputTokenPrice: 75.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 98,
    cpra: 0.0612,
  },
  {
    modelId: 'gemini-2.5-pro',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    inputTokenPrice: 1.25,
    outputTokenPrice: 5.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 95,
    cpra: 0.0046,
  },
  {
    modelId: 'gemini-2.5-flash',
    modelName: 'Gemini 2.5 Flash',
    provider: 'Google',
    inputTokenPrice: 0.075,
    outputTokenPrice: 0.30,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 88,
    cpra: 0.0003,
  },
  {
    modelId: 'llama-3.3-70b',
    modelName: 'Llama 3.3 70B',
    provider: 'Meta (Self-Hosted)',
    inputTokenPrice: 0.10,
    outputTokenPrice: 0.10,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 89,
    cpra: 0.0002,
  },
  {
    modelId: 'mistral-large',
    modelName: 'Mistral Large',
    provider: 'Mistral',
    inputTokenPrice: 2.00,
    outputTokenPrice: 6.00,
    averageRequestTokens: 1500,
    averageResponseTokens: 500,
    accuracy: 91,
    cpra: 0.0055,
  },
];

// ============================================================================
// SECTION 4: LLM Benchmarks (from mandate Section 4)
// ============================================================================

export const llmBenchmarks: LLMBenchmark[] = [
  {
    modelId: 'gpt-5',
    modelName: 'GPT-5',
    provider: 'OpenAI',
    contextWindow: 128000,
    timestamp: '2025-11-25T10:00:00Z',
    metrics: {
      rps: 85,
      throughput: 48,
      errorRate: 0.3,
      ttft: { p50: 180, p95: 420, p99: 650, avg: 210 },
      e2eLatency: { p50: 2100, p95: 4500, p99: 6200, avg: 2400 },
      itl: 18,
    },
  },
  {
    modelId: 'claude-4-sonnet',
    modelName: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    contextWindow: 200000,
    timestamp: '2025-11-25T10:00:00Z',
    metrics: {
      rps: 72,
      throughput: 52,
      errorRate: 0.2,
      ttft: { p50: 150, p95: 380, p99: 520, avg: 175 },
      e2eLatency: { p50: 1900, p95: 3800, p99: 5100, avg: 2100 },
      itl: 15,
    },
  },
  {
    modelId: 'gemini-2.5-pro',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    contextWindow: 1000000,
    timestamp: '2025-11-25T10:00:00Z',
    metrics: {
      rps: 65,
      throughput: 42,
      errorRate: 0.4,
      ttft: { p50: 280, p95: 680, p99: 950, avg: 320 },
      e2eLatency: { p50: 2800, p95: 5500, p99: 7800, avg: 3100 },
      itl: 22,
    },
  },
  {
    modelId: 'gemini-2.5-flash',
    modelName: 'Gemini 2.5 Flash',
    provider: 'Google',
    contextWindow: 1000000,
    timestamp: '2025-11-25T10:00:00Z',
    metrics: {
      rps: 180,
      throughput: 95,
      errorRate: 0.5,
      ttft: { p50: 85, p95: 180, p99: 280, avg: 100 },
      e2eLatency: { p50: 800, p95: 1600, p99: 2200, avg: 950 },
      itl: 8,
    },
  },
  {
    modelId: 'llama-3.3-70b',
    modelName: 'Llama 3.3 70B',
    provider: 'Meta (Self-Hosted)',
    contextWindow: 128000,
    timestamp: '2025-11-25T10:00:00Z',
    metrics: {
      rps: 45,
      throughput: 35,
      errorRate: 0.8,
      ttft: { p50: 220, p95: 520, p99: 780, avg: 260 },
      e2eLatency: { p50: 2600, p95: 5200, p99: 7200, avg: 2900 },
      itl: 25,
    },
  },
];

// TTFT vs Input Sequence Length data (for Section 4.3 visualization)
export const ttftVsIslData: TTFTvsISLDataPoint[] = [
  // Low load
  { inputSequenceLength: 100, ttft: 50, load: 'low' },
  { inputSequenceLength: 500, ttft: 80, load: 'low' },
  { inputSequenceLength: 1000, ttft: 120, load: 'low' },
  { inputSequenceLength: 5000, ttft: 280, load: 'low' },
  { inputSequenceLength: 10000, ttft: 520, load: 'low' },
  { inputSequenceLength: 50000, ttft: 1800, load: 'low' },
  { inputSequenceLength: 100000, ttft: 4200, load: 'low' },
  // Medium load
  { inputSequenceLength: 100, ttft: 85, load: 'medium' },
  { inputSequenceLength: 500, ttft: 140, load: 'medium' },
  { inputSequenceLength: 1000, ttft: 220, load: 'medium' },
  { inputSequenceLength: 5000, ttft: 480, load: 'medium' },
  { inputSequenceLength: 10000, ttft: 920, load: 'medium' },
  { inputSequenceLength: 50000, ttft: 3200, load: 'medium' },
  { inputSequenceLength: 100000, ttft: 7500, load: 'medium' },
  // High load
  { inputSequenceLength: 100, ttft: 150, load: 'high' },
  { inputSequenceLength: 500, ttft: 280, load: 'high' },
  { inputSequenceLength: 1000, ttft: 450, load: 'high' },
  { inputSequenceLength: 5000, ttft: 980, load: 'high' },
  { inputSequenceLength: 10000, ttft: 1850, load: 'high' },
  { inputSequenceLength: 50000, ttft: 6500, load: 'high' },
  { inputSequenceLength: 100000, ttft: 15000, load: 'high' },
];

// Performance SLOs
export const performanceSLOs: PerformanceSLO[] = [
  { metric: 'Time to First Token (P95)', target: 500, current: 420, unit: 'ms', status: 'met' },
  { metric: 'Requests Per Second', target: 100, current: 85, unit: 'req/s', status: 'at-risk' },
  { metric: 'Inter-Token Latency', target: 25, current: 18, unit: 'ms', status: 'met' },
  { metric: 'E2E Latency (P95)', target: 5000, current: 4500, unit: 'ms', status: 'met' },
  { metric: 'Error Rate', target: 0.5, current: 0.3, unit: '%', status: 'met' },
  { metric: 'Throughput', target: 50, current: 48, unit: 'tokens/s', status: 'at-risk' },
];

// ============================================================================
// SECTION 5: GRC Data (from mandate Section 5)
// ============================================================================

export const agentGovernanceData: AgentGovernance[] = [
  {
    agentId: 'agent-001',
    agentName: 'Claims Processing Agent',
    owner: 'Sarah Chen',
    department: 'Operations',
    riskTier: 'high',
    autonomyLevel: 4,
    status: 'active',
    permissions: {
      dataAccess: ['claims_data', 'customer_profiles', 'policy_data'],
      maxTransactionValue: 5000,
      requiresDualControl: true,
      sandboxOnly: false,
      externalApiAccess: true,
    },
    auditTrail: [
      {
        timestamp: '2025-11-25T09:30:00Z',
        action: 'Approved claim #12847',
        rationale: 'Claim within policy limits, documentation complete',
        outcome: 'success',
        humanOverride: false,
      },
      {
        timestamp: '2025-11-25T09:45:00Z',
        action: 'Escalated claim #12848',
        rationale: 'Claim exceeds $5000 threshold',
        outcome: 'escalated',
        humanOverride: false,
        reviewerId: 'manager-ops-01',
      },
    ],
  },
  {
    agentId: 'agent-002',
    agentName: 'Customer Support Bot',
    owner: 'Michael Rodriguez',
    department: 'Customer Service',
    riskTier: 'medium',
    autonomyLevel: 6,
    status: 'active',
    permissions: {
      dataAccess: ['customer_profiles', 'support_tickets', 'faq_database'],
      maxTransactionValue: 100,
      requiresDualControl: false,
      sandboxOnly: false,
      externalApiAccess: false,
    },
    auditTrail: [
      {
        timestamp: '2025-11-25T10:00:00Z',
        action: 'Resolved ticket #45892',
        rationale: 'FAQ match confidence 94%',
        outcome: 'success',
        humanOverride: false,
      },
    ],
  },
  {
    agentId: 'agent-003',
    agentName: 'Financial Risk Monitor',
    owner: 'Jennifer Walsh',
    department: 'Finance',
    riskTier: 'critical',
    autonomyLevel: 2,
    status: 'active',
    permissions: {
      dataAccess: ['financial_transactions', 'risk_models', 'market_data'],
      maxTransactionValue: 0,
      requiresDualControl: true,
      sandboxOnly: false,
      externalApiAccess: true,
    },
    auditTrail: [
      {
        timestamp: '2025-11-25T08:00:00Z',
        action: 'Flagged anomaly in transaction batch #7821',
        rationale: 'Pattern deviation > 3 sigma',
        outcome: 'escalated',
        humanOverride: false,
        reviewerId: 'risk-officer-01',
      },
    ],
  },
  {
    agentId: 'agent-004',
    agentName: 'Content Generation Assistant',
    owner: 'David Park',
    department: 'Marketing',
    riskTier: 'low',
    autonomyLevel: 8,
    status: 'active',
    permissions: {
      dataAccess: ['content_library', 'brand_guidelines', 'campaign_data'],
      maxTransactionValue: 0,
      requiresDualControl: false,
      sandboxOnly: false,
      externalApiAccess: true,
    },
    auditTrail: [],
  },
  {
    agentId: 'agent-005',
    agentName: 'IT Ticket Resolver',
    owner: 'Alex Thompson',
    department: 'IT',
    riskTier: 'medium',
    autonomyLevel: 5,
    status: 'active',
    permissions: {
      dataAccess: ['it_tickets', 'system_logs', 'user_directory'],
      maxTransactionValue: 500,
      requiresDualControl: false,
      sandboxOnly: false,
      externalApiAccess: true,
    },
    auditTrail: [],
  },
];

export const securityRisks: SecurityRisk[] = [
  {
    id: 'risk-001',
    type: 'chained-vulnerability',
    severity: 'high',
    affectedAgents: ['agent-001', 'agent-003'],
    description: 'Potential error cascade between Claims Agent and Risk Monitor when processing high-value claims',
    mitigationStatus: 'in-progress',
    detectedAt: '2025-11-20T14:30:00Z',
    lastUpdated: '2025-11-25T09:00:00Z',
  },
  {
    id: 'risk-002',
    type: 'data-leakage',
    severity: 'medium',
    affectedAgents: ['agent-002'],
    description: 'Customer Support Bot occasionally includes PII in external API calls for sentiment analysis',
    mitigationStatus: 'mitigated',
    detectedAt: '2025-11-15T10:00:00Z',
    lastUpdated: '2025-11-22T16:00:00Z',
  },
  {
    id: 'risk-003',
    type: 'synthetic-identity',
    severity: 'critical',
    affectedAgents: ['agent-003'],
    description: 'Attempted agent identity spoofing detected from external API endpoint',
    mitigationStatus: 'mitigated',
    detectedAt: '2025-11-23T02:15:00Z',
    lastUpdated: '2025-11-23T08:00:00Z',
  },
  {
    id: 'risk-004',
    type: 'privilege-escalation',
    severity: 'medium',
    affectedAgents: ['agent-005'],
    description: 'IT Ticket Resolver requested elevated permissions beyond defined scope',
    mitigationStatus: 'unmitigated',
    detectedAt: '2025-11-24T11:00:00Z',
    lastUpdated: '2025-11-24T11:00:00Z',
  },
];

export const complianceStatuses: ComplianceStatus[] = [
  {
    regulation: 'GDPR',
    region: 'EU',
    status: 'compliant',
    lastAudit: '2025-10-15',
    notes: 'Annual audit completed. All data processing activities documented.',
  },
  {
    regulation: 'CCPA',
    region: 'California',
    status: 'compliant',
    lastAudit: '2025-09-20',
    notes: 'Consumer rights request process verified.',
  },
  {
    regulation: 'HIPAA',
    region: 'USA',
    status: 'pending-review',
    lastAudit: '2025-08-10',
    notes: 'Healthcare AI use cases under review for BAA compliance.',
  },
  {
    regulation: 'SOX',
    region: 'USA',
    status: 'compliant',
    lastAudit: '2025-11-01',
    notes: 'Financial controls verified for AI-assisted reporting.',
  },
  {
    regulation: 'EU AI Act',
    region: 'EU',
    status: 'pending-review',
    deadline: '2027-12-01',
    lastAudit: '2025-11-20',
    notes: 'Gap analysis in progress. High-risk AI classifications being evaluated.',
  },
  {
    regulation: 'ISO 27001',
    region: 'Global',
    status: 'compliant',
    lastAudit: '2025-07-15',
    notes: 'Certification renewed. AI systems included in ISMS scope.',
  },
  {
    regulation: 'SOC 2 Type II',
    region: 'Global',
    status: 'compliant',
    lastAudit: '2025-06-30',
    notes: 'No findings. AI data handling controls verified.',
  },
];

// Human Oversight Status
export const humanOversightStatus = {
  staffOnDuty: 4,
  coveragePercentage: 100,
  overrideAuthorityPresent: true,
  avgResponseTime: 2.5,
  escalationsLast24h: 3,
};

// ============================================================================
// Organizational Readiness Data (Section 2.3)
// ============================================================================

export const organizationalReadiness = {
  aiFluencyRate: 42, // 42% of staff completed AI training (industry: 40%)
  adoptionVelocity: 15, // 15% month-over-month increase
  culturalReadinessScore: 68,
  augmentationTimeMetrics: {
    lowValueTaskReduction: 32, // 32% reduction
    strategicTaskIncrease: 28, // 28% increase in strategic work
    hoursReclaimed: 6.5, // hours per employee per week
  },
};

// ROI Timeline Data
export const roiTimeline = {
  expectedPaybackMonths: 28, // 2-4 year range
  currentMonth: 8,
  projectedBreakeven: '2027-03-15',
  investmentPhase: 'scaling' as const,
  tangible: {
    costPerTransactionReduction: 35,
    productivityIncrease: 48,
    processAcceleration: 38,
    annualSavings: 2400000,
  },
  intangible: {
    regulatoryComplianceRate: 98,
    customerEngagementScore: 72, // NPS
    employeeSatisfactionScore: 76,
    riskEventReduction: 45,
  },
};
