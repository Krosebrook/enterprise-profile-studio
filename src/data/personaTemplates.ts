/**
 * Persona Templates
 * Pre-configured personas for common roles
 */

import type { CreatePersonaInput, CommunicationStyle, WorkPreferences } from '@/types/employee-persona';

export interface PersonaTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  data: {
    job_title: string;
    department: string;
    communication_style: CommunicationStyle;
    work_preferences: WorkPreferences;
    skills: string[];
    expertise_areas: string[];
    tools_used: string[];
    pain_points: string[];
    goals: string[];
    ai_interaction_style: 'concise' | 'balanced' | 'comprehensive';
    preferred_response_length: 'short' | 'medium' | 'long';
    preferred_tone: 'casual' | 'professional' | 'formal';
  };
}

export const personaTemplates: PersonaTemplate[] = [
  {
    id: 'sales-rep',
    name: 'Sales Representative',
    description: 'Customer-facing sales professional focused on closing deals',
    icon: 'TrendingUp',
    color: 'bg-green-500',
    data: {
      job_title: 'Sales Representative',
      department: 'Sales',
      communication_style: {
        formality: 'balanced',
        detail_level: 'concise',
        examples_preference: 'moderate',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'realtime',
        decision_making: 'intuitive',
        feedback_preference: 'direct',
      },
      skills: ['Negotiation', 'Prospecting', 'Presentation', 'CRM Management', 'Relationship Building'],
      expertise_areas: ['B2B Sales', 'Account Management', 'Pipeline Development'],
      tools_used: ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Zoom', 'Slack'],
      pain_points: [
        'Writing personalized outreach emails at scale',
        'Preparing for client meetings quickly',
        'Keeping CRM data updated',
        'Researching prospects efficiently',
      ],
      goals: [
        'Close more deals with less admin work',
        'Improve email response rates',
        'Shorten sales cycle time',
        'Better qualify leads upfront',
      ],
      ai_interaction_style: 'concise',
      preferred_response_length: 'short',
      preferred_tone: 'professional',
    },
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    description: 'Technical engineer building and maintaining software',
    icon: 'Code',
    color: 'bg-blue-500',
    data: {
      job_title: 'Software Developer',
      department: 'Engineering',
      communication_style: {
        formality: 'casual',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'technical',
      },
      work_preferences: {
        focus_time: 'afternoon',
        collaboration_style: 'async',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Testing', 'API Design'],
      expertise_areas: ['Full-Stack Development', 'System Architecture', 'Code Review'],
      tools_used: ['GitHub', 'VS Code', 'Jira', 'Slack', 'Figma', 'Docker'],
      pain_points: [
        'Writing boilerplate code',
        'Debugging complex issues',
        'Writing documentation',
        'Code review feedback loops',
      ],
      goals: [
        'Ship features faster with fewer bugs',
        'Improve code quality and maintainability',
        'Learn new technologies efficiently',
        'Reduce time spent on repetitive tasks',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'long',
      preferred_tone: 'casual',
    },
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Coordinates teams and ensures project delivery',
    icon: 'Kanban',
    color: 'bg-purple-500',
    data: {
      job_title: 'Project Manager',
      department: 'Operations',
      communication_style: {
        formality: 'balanced',
        detail_level: 'balanced',
        examples_preference: 'moderate',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'collaborative',
        feedback_preference: 'diplomatic',
      },
      skills: ['Stakeholder Management', 'Agile/Scrum', 'Risk Assessment', 'Resource Planning', 'Communication'],
      expertise_areas: ['Project Planning', 'Team Coordination', 'Process Improvement'],
      tools_used: ['Jira', 'Asana', 'Monday.com', 'Confluence', 'Slack', 'Microsoft Teams'],
      pain_points: [
        'Writing status reports and updates',
        'Managing stakeholder expectations',
        'Tracking multiple projects simultaneously',
        'Running efficient meetings',
      ],
      goals: [
        'Deliver projects on time and within budget',
        'Improve team productivity',
        'Better forecast project risks',
        'Streamline communication across teams',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'medium',
      preferred_tone: 'professional',
    },
  },
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    description: 'Drives brand awareness and lead generation',
    icon: 'Megaphone',
    color: 'bg-pink-500',
    data: {
      job_title: 'Marketing Manager',
      department: 'Marketing',
      communication_style: {
        formality: 'balanced',
        detail_level: 'balanced',
        examples_preference: 'extensive',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'data_driven',
        feedback_preference: 'diplomatic',
      },
      skills: ['Content Strategy', 'Campaign Management', 'Analytics', 'Copywriting', 'Brand Management'],
      expertise_areas: ['Digital Marketing', 'Lead Generation', 'Content Marketing'],
      tools_used: ['HubSpot', 'Google Analytics', 'Mailchimp', 'Canva', 'Hootsuite', 'Slack'],
      pain_points: [
        'Creating consistent content at scale',
        'Analyzing campaign performance',
        'Writing compelling copy quickly',
        'Coordinating with multiple teams',
      ],
      goals: [
        'Increase qualified lead generation',
        'Improve content engagement rates',
        'Optimize marketing spend ROI',
        'Build stronger brand recognition',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'medium',
      preferred_tone: 'professional',
    },
  },
  {
    id: 'customer-success',
    name: 'Customer Success Manager',
    description: 'Ensures customer satisfaction and retention',
    icon: 'Heart',
    color: 'bg-red-500',
    data: {
      job_title: 'Customer Success Manager',
      department: 'Customer Success',
      communication_style: {
        formality: 'balanced',
        detail_level: 'balanced',
        examples_preference: 'moderate',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'flexible',
        collaboration_style: 'realtime',
        decision_making: 'intuitive',
        feedback_preference: 'coaching',
      },
      skills: ['Customer Empathy', 'Problem Solving', 'Product Knowledge', 'Communication', 'Data Analysis'],
      expertise_areas: ['Customer Onboarding', 'Retention Strategy', 'Account Health Management'],
      tools_used: ['Zendesk', 'Intercom', 'Salesforce', 'Slack', 'Loom', 'Notion'],
      pain_points: [
        'Responding to customer inquiries quickly',
        'Identifying at-risk accounts',
        'Creating personalized success plans',
        'Tracking customer health metrics',
      ],
      goals: [
        'Reduce customer churn',
        'Increase product adoption',
        'Improve customer satisfaction scores',
        'Identify upsell opportunities',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'medium',
      preferred_tone: 'casual',
    },
  },
  {
    id: 'hr-specialist',
    name: 'HR Specialist',
    description: 'Manages employee relations and talent acquisition',
    icon: 'Users',
    color: 'bg-orange-500',
    data: {
      job_title: 'HR Specialist',
      department: 'HR',
      communication_style: {
        formality: 'formal',
        detail_level: 'detailed',
        examples_preference: 'moderate',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'collaborative',
        feedback_preference: 'coaching',
      },
      skills: ['Recruiting', 'Employee Relations', 'Compliance', 'Benefits Administration', 'Conflict Resolution'],
      expertise_areas: ['Talent Acquisition', 'Employee Engagement', 'Policy Development'],
      tools_used: ['Workday', 'LinkedIn Recruiter', 'BambooHR', 'Slack', 'Zoom', 'DocuSign'],
      pain_points: [
        'Writing job descriptions',
        'Screening resumes efficiently',
        'Drafting HR policies',
        'Managing employee documentation',
      ],
      goals: [
        'Reduce time-to-hire',
        'Improve employee satisfaction',
        'Streamline HR processes',
        'Ensure compliance with regulations',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'medium',
      preferred_tone: 'formal',
    },
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Drives product strategy and roadmap',
    icon: 'Lightbulb',
    color: 'bg-yellow-500',
    data: {
      job_title: 'Product Manager',
      department: 'Product',
      communication_style: {
        formality: 'balanced',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Prioritization', 'Cross-functional Leadership'],
      expertise_areas: ['Product Discovery', 'Feature Development', 'Market Analysis'],
      tools_used: ['Jira', 'Figma', 'Notion', 'Amplitude', 'Slack', 'Productboard'],
      pain_points: [
        'Writing PRDs and specs',
        'Analyzing user feedback at scale',
        'Prioritizing feature requests',
        'Communicating roadmap decisions',
      ],
      goals: [
        'Ship features that customers love',
        'Increase product adoption',
        'Reduce feature development time',
        'Make data-driven decisions',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'medium',
      preferred_tone: 'professional',
    },
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Transforms data into actionable insights',
    icon: 'BarChart3',
    color: 'bg-cyan-500',
    data: {
      job_title: 'Data Analyst',
      department: 'Operations',
      communication_style: {
        formality: 'balanced',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'technical',
      },
      work_preferences: {
        focus_time: 'afternoon',
        collaboration_style: 'async',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['SQL', 'Python', 'Data Visualization', 'Statistics', 'Business Intelligence'],
      expertise_areas: ['Data Analysis', 'Reporting', 'Dashboard Development'],
      tools_used: ['Tableau', 'Power BI', 'Python', 'SQL', 'Excel', 'Looker'],
      pain_points: [
        'Writing complex SQL queries',
        'Cleaning messy data',
        'Explaining findings to non-technical stakeholders',
        'Automating repetitive reports',
      ],
      goals: [
        'Deliver insights faster',
        'Improve data quality',
        'Automate reporting processes',
        'Enable data-driven decision making',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'long',
      preferred_tone: 'professional',
    },
  },
];

export const getTemplateById = (id: string): PersonaTemplate | undefined => {
  return personaTemplates.find(t => t.id === id);
};

export const getTemplatesByDepartment = (department: string): PersonaTemplate[] => {
  return personaTemplates.filter(t => t.data.department === department);
};
