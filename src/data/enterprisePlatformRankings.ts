/**
 * Enterprise Platform Rankings 2025
 * Based on INT Inc. Strategic Assessment - Top platforms by category
 */

export interface PlatformRanking {
  rank: number;
  platform: string;
  focus: string;
  idealFor: string;
}

export interface CategoryRanking {
  category: string;
  displayName: string;
  icon: string;
  platforms: PlatformRanking[];
}

export const enterprisePlatformRankings: CategoryRanking[] = [
  {
    category: 'enterprise-ai',
    displayName: 'Enterprise AI Assistants',
    icon: '🤖',
    platforms: [
      { rank: 1, platform: 'Google Gemini', focus: 'Universal AI assistant with broad integration', idealFor: 'Multi-department, cross-enterprise' },
      { rank: 2, platform: 'Microsoft Copilot', focus: 'Deep Microsoft ecosystem integration', idealFor: 'Microsoft 365-heavy enterprises' },
      { rank: 3, platform: 'Anthropic Claude', focus: 'Constitutional AI, secure reasoning', idealFor: 'Security/compliance-critical orgs' },
      { rank: 4, platform: 'OpenAI ChatGPT', focus: 'Creative content, general-purpose AI', idealFor: 'Content creation, ideation' },
      { rank: 5, platform: 'IBM watsonX', focus: 'Enterprise AI governance, lifecycle management', idealFor: 'Large enterprises, regulated industries' },
      { rank: 6, platform: 'Azure AI (Microsoft)', focus: 'Enterprise ML + copilots suite', idealFor: 'Microsoft ecosystem enterprises' },
      { rank: 7, platform: 'Cohere Coral', focus: 'Domain-specific NLP models', idealFor: 'Custom industry solutions' },
      { rank: 8, platform: 'Mistral AI', focus: 'High-performance generative models', idealFor: 'Real-time document/content generation' },
      { rank: 9, platform: 'Meta Llama 3', focus: 'Open-source large language models', idealFor: 'Cost-conscious, on-premise deployments' },
      { rank: 10, platform: 'Perplexity AI', focus: 'Research & retrieval-augmented AI', idealFor: 'Knowledge-intensive workflows' },
    ],
  },
  {
    category: 'crm',
    displayName: 'CRM Platforms',
    icon: '📊',
    platforms: [
      { rank: 1, platform: 'Salesforce Sales Cloud', focus: 'Enterprise sales automation, ecosystem', idealFor: 'Complex sales orgs, enterprises' },
      { rank: 2, platform: 'HubSpot CRM', focus: 'Freemium, ease-of-use, SMB focus', idealFor: 'SMBs, marketing-led companies' },
      { rank: 3, platform: 'Microsoft Dynamics 365', focus: 'Microsoft integration, full suite', idealFor: 'Microsoft-centric enterprises' },
      { rank: 4, platform: 'Zoho CRM', focus: 'Affordable, feature-rich', idealFor: 'Cost-conscious mid-market' },
      { rank: 5, platform: 'Oracle NetSuite', focus: 'ERP + CRM integration, finance focus', idealFor: 'Finance-driven mid-market' },
      { rank: 6, platform: 'Freshsales (Freshworks)', focus: 'AI-powered, modern UX', idealFor: 'SaaS & high-velocity sales' },
      { rank: 7, platform: 'SAP Hybris / Commerce Cloud', focus: 'B2C commerce + CRM', idealFor: 'E-commerce enterprises' },
      { rank: 8, platform: 'Pipedrive', focus: 'Sales-focused, deal management', idealFor: 'SMB sales teams' },
      { rank: 9, platform: 'SugarCRM', focus: 'Open-source CRM, flexibility', idealFor: 'Custom implementations' },
      { rank: 10, platform: 'Insightly', focus: 'SMB project + CRM integration', idealFor: 'Small project-based teams' },
    ],
  },
  {
    category: 'erp',
    displayName: 'ERP Systems',
    icon: '🏢',
    platforms: [
      { rank: 1, platform: 'Oracle NetSuite', focus: 'Cloud-native, mid-market, rapid deployment', idealFor: 'Fast-growing mid-market' },
      { rank: 2, platform: 'Microsoft Dynamics 365', focus: 'Microsoft ecosystem integration, modular', idealFor: 'Microsoft-centric enterprises' },
      { rank: 3, platform: 'SAP S/4HANA', focus: 'Enterprise, on-premise/cloud, real-time', idealFor: 'Large global enterprises' },
      { rank: 4, platform: 'Infor CloudSuite', focus: 'Industry-specific solutions, cloud', idealFor: 'Manufacturing, distribution' },
      { rank: 5, platform: 'Epicor ERP', focus: 'Manufacturing & distribution focus', idealFor: 'Discrete/process manufacturing' },
      { rank: 6, platform: 'Acumatica', focus: 'Cloud-native, mid-market, modern UI', idealFor: 'Growing manufacturers' },
      { rank: 7, platform: 'IFS Applications', focus: 'Complex operations, service lifecycle', idealFor: 'Field service, manufacturing' },
      { rank: 8, platform: 'Sage Intacct', focus: 'Financial management, nonprofit', idealFor: 'Finance-focused mid-market' },
      { rank: 9, platform: 'Odoo', focus: 'Open-source, modular, affordable', idealFor: 'SMBs, startups' },
      { rank: 10, platform: 'SYSPRO', focus: 'Manufacturing ERP, mid-market', idealFor: 'Mid-sized manufacturers' },
    ],
  },
  {
    category: 'hris',
    displayName: 'HRIS/HR Platforms',
    icon: '👥',
    platforms: [
      { rank: 1, platform: 'Workday HCM', focus: 'Enterprise HCM, analytics, planning', idealFor: 'Large enterprises, global orgs' },
      { rank: 2, platform: 'SAP SuccessFactors', focus: 'Talent management, SAP integration', idealFor: 'SAP ecosystem enterprises' },
      { rank: 3, platform: 'ADP Workforce Now', focus: 'Payroll + HR, compliance', idealFor: 'Mid-market, payroll-focused' },
      { rank: 4, platform: 'UKG Pro (Ultimate Kronos)', focus: 'Workforce management, time tracking', idealFor: 'Shift-based, hourly workforce' },
      { rank: 5, platform: 'Oracle HCM Cloud', focus: 'Global HR, talent, workforce planning', idealFor: 'Oracle ecosystem, large enterprises' },
      { rank: 6, platform: 'Ceridian Dayforce', focus: 'Payroll, benefits, workforce', idealFor: 'Complex payroll needs' },
      { rank: 7, platform: 'BambooHR', focus: 'SMB HR, ease-of-use', idealFor: 'SMBs, growing companies' },
      { rank: 8, platform: 'Paylocity', focus: 'Payroll, HR, mid-market', idealFor: 'US mid-market employers' },
      { rank: 9, platform: 'Namely', focus: 'Mid-market HR, benefits', idealFor: 'Mid-sized US companies' },
      { rank: 10, platform: 'Gusto', focus: 'SMB payroll, benefits, ease', idealFor: 'SMBs, startups' },
    ],
  },
  {
    category: 'marketing',
    displayName: 'Marketing Automation',
    icon: '📢',
    platforms: [
      { rank: 1, platform: 'HubSpot Marketing Hub', focus: 'Inbound marketing, CRM integration', idealFor: 'SMBs, inbound-focused' },
      { rank: 2, platform: 'Adobe Marketo Engage', focus: 'Enterprise B2B marketing automation', idealFor: 'B2B enterprises, ABM' },
      { rank: 3, platform: 'Salesforce Pardot', focus: 'B2B marketing, Salesforce integration', idealFor: 'Salesforce CRM users' },
      { rank: 4, platform: 'Mailchimp', focus: 'Email marketing, SMB ease-of-use', idealFor: 'SMBs, email-first marketers' },
      { rank: 5, platform: 'ActiveCampaign', focus: 'Email + CRM automation, mid-market', idealFor: 'Growing businesses' },
      { rank: 6, platform: 'Klaviyo', focus: 'E-commerce email/SMS marketing', idealFor: 'E-commerce, DTC brands' },
      { rank: 7, platform: 'Braze', focus: 'Customer engagement, mobile', idealFor: 'Mobile-first, retail' },
      { rank: 8, platform: 'Iterable', focus: 'Cross-channel marketing', idealFor: 'Digital-first brands' },
      { rank: 9, platform: 'Sendinblue (Brevo)', focus: 'Email, SMS, chat, affordable', idealFor: 'Budget-conscious marketers' },
      { rank: 10, platform: 'Oracle Eloqua', focus: 'Enterprise B2B marketing', idealFor: 'Oracle ecosystem' },
    ],
  },
  {
    category: 'customer-service',
    displayName: 'Customer Service',
    icon: '🎧',
    platforms: [
      { rank: 1, platform: 'Zendesk', focus: 'Omnichannel support, ecosystem', idealFor: 'Digital-first, SaaS companies' },
      { rank: 2, platform: 'Freshdesk', focus: 'Affordable, AI-powered', idealFor: 'SMBs, growing support teams' },
      { rank: 3, platform: 'Intercom', focus: 'Conversational support, product-led', idealFor: 'SaaS, product-led growth' },
      { rank: 4, platform: 'Salesforce Service Cloud', focus: 'Enterprise service, CRM integration', idealFor: 'Salesforce CRM users' },
      { rank: 5, platform: 'ServiceNow CSM', focus: 'IT + customer service convergence', idealFor: 'IT-intensive organizations' },
      { rank: 6, platform: 'HubSpot Service Hub', focus: 'CRM-integrated support', idealFor: 'HubSpot CRM users' },
      { rank: 7, platform: 'Zoho Desk', focus: 'Affordable, AI features', idealFor: 'Zoho ecosystem users' },
      { rank: 8, platform: 'Help Scout', focus: 'Simple, human-focused support', idealFor: 'Small teams, personal touch' },
      { rank: 9, platform: 'Kustomer', focus: 'CRM-first customer service', idealFor: 'High-touch B2C' },
      { rank: 10, platform: 'Gladly', focus: 'Customer-centric service', idealFor: 'Premium consumer brands' },
    ],
  },
  {
    category: 'security',
    displayName: 'Security Platforms',
    icon: '🔒',
    platforms: [
      { rank: 1, platform: 'CrowdStrike Falcon', focus: 'Endpoint protection, threat intel', idealFor: 'Enterprise, high-threat environments' },
      { rank: 2, platform: 'SentinelOne', focus: 'Autonomous AI security', idealFor: 'Security-first organizations' },
      { rank: 3, platform: 'Microsoft Defender', focus: 'Microsoft ecosystem security', idealFor: 'Microsoft 365 enterprises' },
      { rank: 4, platform: 'Palo Alto Networks', focus: 'Network security, SASE', idealFor: 'Complex network environments' },
      { rank: 5, platform: 'Splunk', focus: 'Security analytics, SIEM', idealFor: 'SOC teams, log analysis' },
      { rank: 6, platform: 'Okta', focus: 'Identity & access management', idealFor: 'Cloud-first, zero trust' },
      { rank: 7, platform: 'Zscaler', focus: 'Zero trust network access', idealFor: 'Remote/hybrid workforce' },
      { rank: 8, platform: 'Proofpoint', focus: 'Email security, threat protection', idealFor: 'Email-heavy organizations' },
      { rank: 9, platform: 'Fortinet', focus: 'Network security, SD-WAN', idealFor: 'Distributed networks' },
      { rank: 10, platform: 'Trend Micro', focus: 'Cloud & endpoint security', idealFor: 'Hybrid cloud environments' },
    ],
  },
  {
    category: 'productivity',
    displayName: 'Productivity Suites',
    icon: '📝',
    platforms: [
      { rank: 1, platform: 'Microsoft 365', focus: 'Enterprise productivity, Copilot AI', idealFor: 'Enterprise, Microsoft ecosystem' },
      { rank: 2, platform: 'Google Workspace', focus: 'Cloud-native, collaboration', idealFor: 'Cloud-first, collaborative teams' },
      { rank: 3, platform: 'Slack', focus: 'Team messaging, integrations', idealFor: 'Tech-forward, async teams' },
      { rank: 4, platform: 'Notion', focus: 'Docs + databases + wiki', idealFor: 'Startups, knowledge workers' },
      { rank: 5, platform: 'Asana', focus: 'Project management, workflows', idealFor: 'Cross-functional teams' },
      { rank: 6, platform: 'Monday.com', focus: 'Work OS, visual workflows', idealFor: 'Visual project management' },
      { rank: 7, platform: 'Atlassian (Jira/Confluence)', focus: 'Dev + IT project management', idealFor: 'Software teams, IT orgs' },
      { rank: 8, platform: 'ClickUp', focus: 'All-in-one productivity', idealFor: 'Teams seeking consolidation' },
      { rank: 9, platform: 'Zoom', focus: 'Video conferencing, meetings', idealFor: 'Remote/hybrid workforce' },
      { rank: 10, platform: 'Dropbox Business', focus: 'File sync, collaboration', idealFor: 'File-heavy workflows' },
    ],
  },
  {
    category: 'data-analytics',
    displayName: 'Data & Analytics',
    icon: '📈',
    platforms: [
      { rank: 1, platform: 'Tableau', focus: 'Visual analytics, dashboards', idealFor: 'Business intelligence, analysts' },
      { rank: 2, platform: 'Microsoft Power BI', focus: 'Microsoft-integrated BI', idealFor: 'Microsoft ecosystem users' },
      { rank: 3, platform: 'Google Looker', focus: 'Cloud-native BI, data modeling', idealFor: 'Google Cloud, data teams' },
      { rank: 4, platform: 'Snowflake', focus: 'Cloud data warehouse', idealFor: 'Data-intensive organizations' },
      { rank: 5, platform: 'Databricks', focus: 'Data lakehouse, ML platform', idealFor: 'Data engineering, ML teams' },
      { rank: 6, platform: 'Qlik', focus: 'Associative analytics, discovery', idealFor: 'Ad-hoc analysis' },
      { rank: 7, platform: 'Domo', focus: 'Cloud BI, real-time dashboards', idealFor: 'Real-time decision making' },
      { rank: 8, platform: 'ThoughtSpot', focus: 'AI-powered search analytics', idealFor: 'Self-service BI' },
      { rank: 9, platform: 'Alteryx', focus: 'Data prep, advanced analytics', idealFor: 'Analysts, data preparation' },
      { rank: 10, platform: 'SAS', focus: 'Advanced analytics, enterprise', idealFor: 'Large enterprises, statistical' },
    ],
  },
  {
    category: 'cloud-integration',
    displayName: 'Cloud Integration',
    icon: '☁️',
    platforms: [
      { rank: 1, platform: 'MuleSoft', focus: 'Enterprise API management, integration', idealFor: 'Complex enterprise integration' },
      { rank: 2, platform: 'Zapier', focus: 'No-code automation, SMB focus', idealFor: 'SMBs, citizen integrators' },
      { rank: 3, platform: 'Azure Integration Services', focus: 'Microsoft cloud integration', idealFor: 'Azure-first enterprises' },
      { rank: 4, platform: 'Workato', focus: 'Enterprise automation, recipes', idealFor: 'Enterprise automation' },
      { rank: 5, platform: 'Dell Boomi', focus: 'Cloud-native iPaaS', idealFor: 'Mid-market, hybrid cloud' },
      { rank: 6, platform: 'Informatica', focus: 'Data integration, governance', idealFor: 'Data-centric enterprises' },
      { rank: 7, platform: 'Celigo', focus: 'Pre-built integrations, NetSuite', idealFor: 'NetSuite ecosystem' },
      { rank: 8, platform: 'Tray.io', focus: 'Low-code automation platform', idealFor: 'RevOps, marketing ops' },
      { rank: 9, platform: 'Make (Integromat)', focus: 'Visual automation, affordable', idealFor: 'Power users, SMBs' },
      { rank: 10, platform: 'SnapLogic', focus: 'AI-powered integration', idealFor: 'Enterprise data flows' },
    ],
  },
];

// Summary data for the rankings visualization
export const rankingsSummary = {
  categories: [
    { name: 'Enterprise AI', rank1: 'Google Gemini', rank2: 'Microsoft Copilot', rank3: 'Anthropic Claude' },
    { name: 'CRM', rank1: 'Salesforce', rank2: 'HubSpot', rank3: 'Microsoft D365' },
    { name: 'ERP', rank1: 'Oracle NetSuite', rank2: 'Microsoft D365', rank3: 'SAP S/4HANA' },
    { name: 'HRIS/HR', rank1: 'Workday HCM', rank2: 'SAP SuccessFactors', rank3: 'ADP Workforce Now' },
    { name: 'Marketing', rank1: 'HubSpot Marketing', rank2: 'Adobe Marketo', rank3: 'Salesforce Pardot' },
    { name: 'Customer Service', rank1: 'Zendesk', rank2: 'Freshdesk', rank3: 'Intercom' },
    { name: 'Security', rank1: 'CrowdStrike Falcon', rank2: 'SentinelOne', rank3: 'Microsoft Defender' },
    { name: 'Productivity', rank1: 'Microsoft 365', rank2: 'Google Workspace', rank3: 'Slack' },
    { name: 'Data & Analytics', rank1: 'Tableau', rank2: 'Microsoft Power BI', rank3: 'Google Looker' },
    { name: 'Cloud Integration', rank1: 'MuleSoft', rank2: 'Zapier', rank3: 'Azure Integration' },
  ],
};

// Get top 3 for a category
export function getTop3ByCategory(categoryId: string): PlatformRanking[] {
  const category = enterprisePlatformRankings.find(c => c.category === categoryId);
  return category ? category.platforms.slice(0, 3) : [];
}

// Get all platforms flat
export function getAllRankedPlatforms(): Array<PlatformRanking & { category: string }> {
  return enterprisePlatformRankings.flatMap(cat =>
    cat.platforms.map(p => ({ ...p, category: cat.displayName }))
  );
}
