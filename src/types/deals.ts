// Deal types for the application

// Pipeline stages for deal tracking
export const PIPELINE_STAGES = [
  'screening',
  'initial_review', 
  'due_diligence',
  'negotiation',
  'term_sheet',
  'closing',
  'closed',
  'passed',
] as const;

export type PipelineStage = typeof PIPELINE_STAGES[number];

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  screening: 'Screening',
  initial_review: 'Initial Review',
  due_diligence: 'Due Diligence',
  negotiation: 'Negotiation',
  term_sheet: 'Term Sheet',
  closing: 'Closing',
  closed: 'Closed',
  passed: 'Passed',
};

export const PIPELINE_STAGE_COLORS: Record<PipelineStage, string> = {
  screening: 'bg-slate-500',
  initial_review: 'bg-blue-500',
  due_diligence: 'bg-amber-500',
  negotiation: 'bg-purple-500',
  term_sheet: 'bg-indigo-500',
  closing: 'bg-orange-500',
  closed: 'bg-green-500',
  passed: 'bg-red-500',
};

export interface Deal {
  id: string;
  name: string;
  industry: string;
  stage: string;
  amount: number;
  match: number;
  trending: boolean;
  description: string;
  // Extended fields for comparison
  metrics: DealMetrics;
  team: DealTeam;
  timeline: DealTimeline;
  // Pipeline tracking
  pipelineStage: PipelineStage;
  pipelineHistory?: PipelineHistoryEntry[];
  // Investment memo and documents
  investmentMemo?: InvestmentMemo;
  documents?: DealDocument[];
  dueDiligenceChecklist?: DueDiligenceItem[];
}

export interface PipelineHistoryEntry {
  stage: PipelineStage;
  enteredAt: string;
  exitedAt?: string;
  notes?: string;
}

export interface InvestmentMemo {
  summary: string;
  thesis: string;
  keyRisks: string[];
  keyOpportunities: string[];
  competitiveAdvantage: string;
  marketAnalysis: string;
  useOfFunds: string;
  exitStrategy: string;
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'pass';
  preparedBy?: string;
  preparedAt?: string;
}

export interface DealDocument {
  id: string;
  name: string;
  type: 'pitch_deck' | 'financials' | 'legal' | 'technical' | 'market_research' | 'other';
  url?: string;
  uploadedAt: string;
  size?: string;
}

export interface DueDiligenceItem {
  id: string;
  category: 'financial' | 'legal' | 'technical' | 'commercial' | 'operational';
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'flagged';
  assignee?: string;
  dueDate?: string;
  completedAt?: string;
  notes?: string;
}

export interface DealMetrics {
  revenue: number;
  revenueGrowth: number;
  grossMargin: number;
  burnRate?: number;
  runway?: number;
  customers: number;
  arr?: number; // Annual Recurring Revenue
  mrr?: number; // Monthly Recurring Revenue
}

export interface DealTeam {
  size: number;
  founders: number;
  advisors: number;
  previousExits: boolean;
}

export interface DealTimeline {
  founded: string;
  lastRound?: string;
  targetClose: string;
  dueDiligencePhase: 'initial' | 'detailed' | 'final';
}

export interface ComparisonCriteria {
  id: string;
  label: string;
  key: keyof Deal | string;
  category: 'overview' | 'metrics' | 'team' | 'timeline' | 'fit';
  format: 'currency' | 'percentage' | 'number' | 'text' | 'boolean' | 'date' | 'match';
  higherIsBetter?: boolean;
}

export const COMPARISON_CRITERIA: ComparisonCriteria[] = [
  // Overview
  { id: 'name', label: 'Deal Name', key: 'name', category: 'overview', format: 'text' },
  { id: 'industry', label: 'Industry', key: 'industry', category: 'overview', format: 'text' },
  { id: 'stage', label: 'Stage', key: 'stage', category: 'overview', format: 'text' },
  { id: 'amount', label: 'Deal Size', key: 'amount', category: 'overview', format: 'currency' },
  { id: 'match', label: 'Match Score', key: 'match', category: 'fit', format: 'match', higherIsBetter: true },
  
  // Metrics
  { id: 'revenue', label: 'Revenue', key: 'metrics.revenue', category: 'metrics', format: 'currency', higherIsBetter: true },
  { id: 'revenueGrowth', label: 'Revenue Growth', key: 'metrics.revenueGrowth', category: 'metrics', format: 'percentage', higherIsBetter: true },
  { id: 'grossMargin', label: 'Gross Margin', key: 'metrics.grossMargin', category: 'metrics', format: 'percentage', higherIsBetter: true },
  { id: 'burnRate', label: 'Burn Rate', key: 'metrics.burnRate', category: 'metrics', format: 'currency', higherIsBetter: false },
  { id: 'runway', label: 'Runway (months)', key: 'metrics.runway', category: 'metrics', format: 'number', higherIsBetter: true },
  { id: 'customers', label: 'Customers', key: 'metrics.customers', category: 'metrics', format: 'number', higherIsBetter: true },
  { id: 'arr', label: 'ARR', key: 'metrics.arr', category: 'metrics', format: 'currency', higherIsBetter: true },
  
  // Team
  { id: 'teamSize', label: 'Team Size', key: 'team.size', category: 'team', format: 'number' },
  { id: 'founders', label: 'Founders', key: 'team.founders', category: 'team', format: 'number' },
  { id: 'advisors', label: 'Advisors', key: 'team.advisors', category: 'team', format: 'number' },
  { id: 'previousExits', label: 'Previous Exits', key: 'team.previousExits', category: 'team', format: 'boolean', higherIsBetter: true },
  
  // Timeline
  { id: 'founded', label: 'Founded', key: 'timeline.founded', category: 'timeline', format: 'date' },
  { id: 'targetClose', label: 'Target Close', key: 'timeline.targetClose', category: 'timeline', format: 'date' },
  { id: 'dueDiligence', label: 'DD Phase', key: 'timeline.dueDiligencePhase', category: 'timeline', format: 'text' },
];

// Generate mock deals with full data
export const generateFullMockDeals = (): Deal[] => [
  {
    id: '1',
    name: 'TechVenture AI',
    industry: 'Technology',
    stage: 'Series A',
    amount: 5000000,
    match: 95,
    trending: true,
    description: 'AI-powered enterprise automation platform',
    pipelineStage: 'due_diligence',
    metrics: {
      revenue: 1200000,
      revenueGrowth: 180,
      grossMargin: 75,
      burnRate: 250000,
      runway: 18,
      customers: 45,
      arr: 1200000,
      mrr: 100000,
    },
    team: {
      size: 28,
      founders: 2,
      advisors: 4,
      previousExits: true,
    },
    timeline: {
      founded: '2021-03-15',
      lastRound: '2022-06-01',
      targetClose: '2024-03-31',
      dueDiligencePhase: 'detailed',
    },
    investmentMemo: {
      summary: 'TechVenture AI is an enterprise automation platform leveraging proprietary AI models to streamline business processes.',
      thesis: 'The AI enterprise automation market is projected to grow at 35% CAGR. TechVenture has demonstrated strong product-market fit with 180% YoY revenue growth and 75% gross margins.',
      keyRisks: ['High customer concentration (top 5 = 60%)', 'Competitive pressure from well-funded players', 'Execution risk on enterprise sales cycle'],
      keyOpportunities: ['Expansion into adjacent verticals', 'Strong upsell motion with existing customers', 'Partnership opportunities with system integrators'],
      competitiveAdvantage: 'Proprietary AI models trained on domain-specific data with 40% better accuracy than competitors.',
      marketAnalysis: 'TAM of $50B with 35% CAGR. The company targets mid-market enterprises with 500-5000 employees.',
      useOfFunds: '60% R&D, 30% Sales & Marketing, 10% G&A',
      exitStrategy: 'Strategic acquisition by enterprise software company or IPO in 5-7 years',
      recommendation: 'buy',
      preparedBy: 'Investment Team',
      preparedAt: '2024-01-15',
    },
    documents: [
      { id: 'd1', name: 'Pitch Deck Q4 2023', type: 'pitch_deck', uploadedAt: '2024-01-10', size: '4.2 MB' },
      { id: 'd2', name: 'Financial Model', type: 'financials', uploadedAt: '2024-01-12', size: '1.8 MB' },
      { id: 'd3', name: 'Technical Architecture', type: 'technical', uploadedAt: '2024-01-14', size: '2.1 MB' },
    ],
    dueDiligenceChecklist: [
      { id: 'dd1', category: 'financial', title: 'Revenue Verification', status: 'completed', completedAt: '2024-01-20' },
      { id: 'dd2', category: 'financial', title: 'Cash Flow Analysis', status: 'completed', completedAt: '2024-01-22' },
      { id: 'dd3', category: 'legal', title: 'IP Review', status: 'in_progress', assignee: 'Legal Team' },
      { id: 'dd4', category: 'technical', title: 'Tech Stack Assessment', status: 'completed', completedAt: '2024-01-18' },
      { id: 'dd5', category: 'commercial', title: 'Customer Reference Calls', status: 'in_progress', assignee: 'Deal Lead' },
      { id: 'dd6', category: 'operational', title: 'Management Assessment', status: 'pending', dueDate: '2024-02-01' },
    ],
  },
  {
    id: '2',
    name: 'HealthCore Systems',
    industry: 'Healthcare & Life Sciences',
    stage: 'Series B',
    amount: 15000000,
    match: 88,
    trending: false,
    description: 'Digital health infrastructure for hospitals',
    pipelineStage: 'negotiation',
    metrics: {
      revenue: 8500000,
      revenueGrowth: 95,
      grossMargin: 68,
      burnRate: 500000,
      runway: 24,
      customers: 120,
      arr: 8500000,
      mrr: 708333,
    },
    team: {
      size: 85,
      founders: 3,
      advisors: 6,
      previousExits: true,
    },
    timeline: {
      founded: '2019-08-22',
      lastRound: '2022-01-15',
      targetClose: '2024-04-15',
      dueDiligencePhase: 'final',
    },
    investmentMemo: {
      summary: 'HealthCore provides essential digital infrastructure for hospitals, enabling seamless data integration across healthcare systems.',
      thesis: 'Healthcare digitization is accelerating post-COVID. HealthCore has strong customer retention (95%+) and regulatory moats.',
      keyRisks: ['Long sales cycles', 'Regulatory compliance complexity', 'Integration challenges'],
      keyOpportunities: ['Medicare mandates driving adoption', 'Expansion to outpatient facilities', 'International markets'],
      competitiveAdvantage: 'HIPAA-compliant platform with proven integrations to 50+ EHR systems.',
      marketAnalysis: 'Healthcare IT market is $250B with strong tailwinds from government mandates.',
      useOfFunds: '50% Sales, 35% R&D, 15% Operations',
      exitStrategy: 'Strategic acquisition by major healthcare IT company',
      recommendation: 'strong_buy',
    },
    documents: [
      { id: 'd4', name: 'Series B Deck', type: 'pitch_deck', uploadedAt: '2024-01-08', size: '5.1 MB' },
      { id: 'd5', name: 'Audited Financials 2023', type: 'financials', uploadedAt: '2024-01-15', size: '3.2 MB' },
    ],
    dueDiligenceChecklist: [
      { id: 'dd7', category: 'financial', title: 'Audit Review', status: 'completed' },
      { id: 'dd8', category: 'legal', title: 'HIPAA Compliance', status: 'completed' },
      { id: 'dd9', category: 'commercial', title: 'Market Analysis', status: 'completed' },
    ],
  },
  {
    id: '3',
    name: 'GreenEnergy Solutions',
    industry: 'Energy & Utilities',
    stage: 'Growth Equity',
    amount: 25000000,
    match: 82,
    trending: true,
    description: 'Renewable energy storage technology',
    pipelineStage: 'screening',
    metrics: {
      revenue: 22000000,
      revenueGrowth: 65,
      grossMargin: 42,
      burnRate: 800000,
      runway: 30,
      customers: 35,
      arr: 18000000,
    },
    team: {
      size: 150,
      founders: 2,
      advisors: 8,
      previousExits: false,
    },
    timeline: {
      founded: '2017-01-10',
      lastRound: '2021-09-20',
      targetClose: '2024-06-30',
      dueDiligencePhase: 'initial',
    },
  },
  {
    id: '4',
    name: 'FinServe Platform',
    industry: 'Financial Services',
    stage: 'Series C+',
    amount: 50000000,
    match: 78,
    trending: false,
    description: 'B2B payments infrastructure',
    pipelineStage: 'term_sheet',
    metrics: {
      revenue: 45000000,
      revenueGrowth: 55,
      grossMargin: 58,
      burnRate: 1200000,
      runway: 36,
      customers: 500,
      arr: 45000000,
      mrr: 3750000,
    },
    team: {
      size: 220,
      founders: 4,
      advisors: 10,
      previousExits: true,
    },
    timeline: {
      founded: '2016-05-01',
      lastRound: '2022-11-01',
      targetClose: '2024-05-15',
      dueDiligencePhase: 'detailed',
    },
    investmentMemo: {
      summary: 'FinServe is a B2B payments platform processing $2B+ in annual volume.',
      thesis: 'Strong network effects and high switching costs create defensible moat.',
      keyRisks: ['Regulatory changes', 'Fraud risk', 'Large incumbent competition'],
      keyOpportunities: ['Cross-border expansion', 'Embedded finance', 'SMB market penetration'],
      competitiveAdvantage: 'Lowest transaction fees with 99.99% uptime SLA.',
      marketAnalysis: 'B2B payments is a $125T market with less than 1% digitization.',
      useOfFunds: '40% International expansion, 40% Product, 20% Compliance',
      exitStrategy: 'IPO or acquisition by major fintech',
      recommendation: 'buy',
    },
    documents: [
      { id: 'd6', name: 'Term Sheet Draft', type: 'legal', uploadedAt: '2024-01-25', size: '0.5 MB' },
    ],
    dueDiligenceChecklist: [
      { id: 'dd10', category: 'financial', title: 'Full Audit', status: 'completed' },
      { id: 'dd11', category: 'legal', title: 'Regulatory Review', status: 'completed' },
      { id: 'dd12', category: 'technical', title: 'Security Audit', status: 'completed' },
    ],
  },
  {
    id: '5',
    name: 'RetailTech Pro',
    industry: 'Consumer & Retail',
    stage: 'Series A',
    amount: 8000000,
    match: 75,
    trending: true,
    description: 'Omnichannel retail analytics',
    pipelineStage: 'initial_review',
    metrics: {
      revenue: 2500000,
      revenueGrowth: 120,
      grossMargin: 72,
      burnRate: 300000,
      runway: 20,
      customers: 85,
      arr: 2500000,
      mrr: 208333,
    },
    team: {
      size: 35,
      founders: 2,
      advisors: 3,
      previousExits: false,
    },
    timeline: {
      founded: '2020-11-01',
      lastRound: '2022-08-15',
      targetClose: '2024-04-01',
      dueDiligencePhase: 'initial',
    },
  },
  {
    id: '6',
    name: 'LogiChain AI',
    industry: 'Transportation & Logistics',
    stage: 'Series B',
    amount: 20000000,
    match: 72,
    trending: false,
    description: 'AI-powered supply chain optimization',
    pipelineStage: 'closed',
    metrics: {
      revenue: 12000000,
      revenueGrowth: 85,
      grossMargin: 55,
      burnRate: 600000,
      runway: 28,
      customers: 200,
      arr: 12000000,
      mrr: 1000000,
    },
    team: {
      size: 95,
      founders: 3,
      advisors: 5,
      previousExits: true,
    },
    timeline: {
      founded: '2018-06-15',
      lastRound: '2022-03-01',
      targetClose: '2024-07-31',
      dueDiligencePhase: 'detailed',
    },
  },
];
