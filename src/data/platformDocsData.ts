// Platform Documentation Seed Data
// Comprehensive technical documentation for the AI Adoption Strategist platform

import { CreateDocumentData } from '@/hooks/useKnowledgeBase';

export const platformDocsData: CreateDocumentData[] = [
  {
    title: 'Feature Documentation Index',
    slug: 'features-index',
    description: 'Comprehensive index of all platform features requiring documentation, including AI Readiness Assessment, Executive Dashboard, Platform Comparison, and Report Generation.',
    category: 'Platform Docs',
    tags: ['features', 'documentation', 'index', 'roadmap', 'P0', 'P1'],
    is_public: false,
    content: `# Feature Documentation Index

**Document Status**: Active  
**Priority**: P1 - High  
**Last Updated**: 2026-01-21  
**Owner**: Product/Engineering Team

---

## Purpose

This directory contains detailed documentation for each major feature of the AI Adoption Strategist platform. Each feature should have comprehensive documentation covering purpose, implementation, usage, edge cases, and testing.

## Features Requiring Documentation

### Core Features (P0)

1. **AI Readiness Assessment**
   - Multi-step assessment wizard
   - Question logic and scoring
   - Progress saving and recovery
   
2. **Executive Dashboard**
   - Metrics and visualizations
   - Real-time updates
   - Widget customization

3. **Platform Comparison**
   - Multi-platform comparison matrix
   - Scoring and recommendations
   - Platform database

4. **Report Generation**
   - PDF/CSV/PowerPoint export
   - Custom templates
   - Report scheduling

### Secondary Features (P1)

5. **Strategy Automation**
   - Roadmap generation
   - AI-powered recommendations
   - Implementation planning

6. **AI Governance**
   - Compliance tracking
   - Policy management
   - Audit logging

7. **AI Agent Hub**
   - Agent orchestration
   - Multi-AI provider integration
   - Agent execution tracking

8. **Template Builder**
   - Custom assessment templates
   - Question builder
   - Scoring configuration

9. **Results Analytics**
   - Results visualization
   - Insights and recommendations
   - Historical comparison

10. **Trends Analysis**
    - Time-series analysis
    - Adoption trends
    - Predictive analytics

11. **Feedback Dashboard**
    - User feedback collection
    - Sentiment analysis
    - Feedback analytics

12. **Settings & Preferences**
    - User preferences
    - Organization settings
    - Notification configuration

13. **User Onboarding**
    - Onboarding wizard
    - Initial setup
    - Tutorial flow

## Feature Documentation Template

Each feature document should include:

### 1. Feature Overview
- Purpose and goals
- Target users
- Business value
- User stories

### 2. Technical Implementation
- Architecture diagrams
- Data models
- API endpoints
- State management

### 3. User Interface
- Wireframes/mockups
- Component hierarchy
- Interaction patterns
- Accessibility considerations

### 4. Testing Requirements
- Unit tests
- Integration tests
- E2E tests
- Performance benchmarks

### 5. Edge Cases
- Boundary conditions
- Error handling
- Failure modes
- Recovery procedures

## Documentation Checklist

For each feature:
- [ ] Overview document created
- [ ] Architecture documented
- [ ] API endpoints documented
- [ ] UI/UX documented
- [ ] Test cases documented
- [ ] Edge cases documented
- [ ] Performance requirements defined
- [ ] Security considerations documented
`,
  },
  {
    title: 'Framework Documentation',
    slug: 'framework-documentation',
    description: 'Core technologies, libraries, and architectural patterns used in the AI Adoption Strategist platform including React 18, Tailwind CSS, and Supabase.',
    category: 'Platform Docs',
    tags: ['framework', 'react', 'tailwind', 'supabase', 'architecture', 'typescript'],
    is_public: false,
    content: `# Framework Documentation

**Version**: 1.0.0  
**Last Updated**: 2026-01-08  
**Owner**: Engineering Team  
**Status**: Active

## Overview

This document describes the core technologies, libraries, and architectural patterns used in the AI Adoption Strategist platform.

## Technology Stack

### Frontend Framework

#### React 18.2
**Purpose**: UI component framework

**Key Features Used**:
- Functional components with hooks
- Context API for state management
- Suspense for code splitting
- Concurrent rendering features

**Design Patterns**:
- Component composition
- Higher-order components (HOCs)
- Render props
- Custom hooks for reusable logic

#### React Router 6.26
**Purpose**: Client-side routing

**Features Used**:
- Nested routes
- Route protection and guards
- Lazy loading routes
- URL parameters and query strings

### Styling Framework

#### Tailwind CSS 3.4
**Purpose**: Utility-first CSS framework

**Configuration**:
\`\`\`javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
\`\`\`

**Design System**:
- CSS variables for theming
- Responsive design with breakpoints
- Dark mode support via next-themes
- Animation utilities

### State Management

#### TanStack Query (React Query)
**Purpose**: Server state management

**Features**:
- Automatic caching
- Background refetching
- Optimistic updates
- Query invalidation

#### React Context
**Purpose**: Client state management

**Use Cases**:
- Authentication state
- Theme preferences
- UI state (modals, sidebars)

### Backend Integration

#### Supabase
**Purpose**: Backend as a Service

**Features Used**:
- PostgreSQL database
- Row Level Security (RLS)
- Edge Functions
- Real-time subscriptions
- Authentication

### UI Component Library

#### shadcn/ui
**Purpose**: Accessible component primitives

**Components**:
- Radix UI primitives
- Tailwind styling
- Accessibility built-in
- Customizable variants

### Form Handling

#### React Hook Form
**Purpose**: Form state management

**Features**:
- Uncontrolled inputs
- Schema validation (Zod)
- Error handling
- Performance optimized

### Charts & Visualization

#### Recharts
**Purpose**: Data visualization

**Chart Types**:
- Bar charts
- Line charts
- Pie charts
- Area charts
- Radar charts

## Development Tools

### Build Tool: Vite
- Fast HMR
- ES modules
- Build optimization
- Plugin ecosystem

### Testing: Vitest + Playwright
- Unit testing
- Integration testing
- E2E testing
- Coverage reporting

### Type Checking: TypeScript
- Static type checking
- IDE support
- Documentation
- Refactoring safety

## Best Practices

### Component Architecture
1. Small, focused components
2. Separation of concerns
3. Reusable hooks
4. Proper prop typing

### Performance
1. Code splitting
2. Lazy loading
3. Memoization
4. Virtual scrolling

### Security
1. Input validation
2. XSS prevention
3. CSRF protection
4. RLS policies
`,
  },
  {
    title: 'API Integrations Documentation',
    slug: 'api-integrations',
    description: 'Comprehensive documentation for all serverless function integrations, their APIs, authentication, error handling, and usage patterns.',
    category: 'Platform Docs',
    tags: ['api', 'integrations', 'edge-functions', 'serverless', 'authentication'],
    is_public: false,
    content: `# API Integrations Documentation

**Document Status**: Active  
**Priority**: P1 - High  
**Last Updated**: 2026-01-21  
**Owner**: Integration Team

---

## Purpose

This document comprehensively documents all serverless function integrations, their APIs, authentication, error handling, and usage.

## Serverless Functions

### 1. generate-document
**Purpose**: AI-powered document generation  
**Endpoint**: /functions/v1/generate-document  
**Authentication**: Bearer token (JWT)  
**Dependencies**: Lovable AI Gateway

### 2. generate-persona
**Purpose**: AI persona generation from templates  
**Endpoint**: /functions/v1/generate-persona  
**Authentication**: Bearer token (JWT)  
**Dependencies**: Lovable AI Gateway

### 3. generate-persona-prompts
**Purpose**: Generate ecosystem-specific AI prompts  
**Endpoint**: /functions/v1/generate-persona-prompts  
**Authentication**: Bearer token (JWT)  
**Dependencies**: Lovable AI Gateway

### 4. generate-profile-content
**Purpose**: Generate enterprise profile content  
**Endpoint**: /functions/v1/generate-profile-content  
**Authentication**: Bearer token (JWT)  
**Dependencies**: Lovable AI Gateway

### 5. generate-onboarding-suggestions
**Purpose**: AI-powered onboarding recommendations  
**Endpoint**: /functions/v1/generate-onboarding-suggestions  
**Authentication**: Bearer token (JWT)  
**Dependencies**: Lovable AI Gateway

### 6. send-notification
**Purpose**: Send user notifications  
**Endpoint**: /functions/v1/send-notification  
**Authentication**: Service role key  
**Dependencies**: None

### 7. send-welcome-email
**Purpose**: Welcome email on signup  
**Endpoint**: /functions/v1/send-welcome-email  
**Authentication**: Service role key (triggered by auth)  
**Dependencies**: Email provider

### 8. send-lead-notification
**Purpose**: Lead capture notifications  
**Endpoint**: /functions/v1/send-lead-notification  
**Authentication**: Service role key  
**Dependencies**: Email provider

### 9. track-analytics
**Purpose**: Analytics event tracking  
**Endpoint**: /functions/v1/track-analytics  
**Authentication**: Bearer token (JWT)  
**Dependencies**: None

### 10. validate-api-key
**Purpose**: API key validation  
**Endpoint**: /functions/v1/validate-api-key  
**Authentication**: API key header  
**Dependencies**: None

## Common Request Patterns

### Authentication Header
\`\`\`http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### Request Format
\`\`\`json
{
  "data": { ... },
  "options": { ... }
}
\`\`\`

### Response Format
\`\`\`json
{
  "success": true,
  "data": { ... },
  "error": null
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters"
  }
}
\`\`\`

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Rate Limited - Too many requests |
| 500 | Server Error - Internal failure |

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| generate-* | 10 | per minute |
| send-* | 50 | per hour |
| track-analytics | 100 | per minute |
| validate-api-key | 20 | per minute |
`,
  },
  {
    title: 'Observability and Monitoring',
    slug: 'observability-monitoring',
    description: 'Comprehensive observability strategy including logging, monitoring, tracing, alerting, and operational dashboards.',
    category: 'Platform Docs',
    tags: ['observability', 'monitoring', 'logging', 'metrics', 'alerting', 'SRE'],
    is_public: false,
    content: `# Observability and Monitoring

**Document Status**: Active  
**Priority**: P0 - Critical  
**Last Updated**: 2026-01-21  
**Owner**: SRE/Engineering Lead

---

## Purpose

This document defines the comprehensive observability strategy including logging, monitoring, tracing, alerting, and operational dashboards.

## Observability Architecture

### Stack Overview
- **Logging**: Structured JSON logs
- **Metrics**: Custom application metrics
- **Tracing**: Request correlation IDs
- **Alerting**: Threshold-based alerts

## Logging Strategy

### Log Levels
- **ERROR** - Application errors and exceptions
- **WARN** - Warning conditions
- **INFO** - Informational messages
- **DEBUG** - Debug information
- **TRACE** - Detailed trace information

### What to Log
- Application errors and exceptions
- User actions (authentication, significant operations)
- API requests and responses
- Database queries (slow queries, errors)
- External service calls
- Performance metrics
- Security events

### Log Format
\`\`\`json
{
  "timestamp": "2026-01-21T15:30:00Z",
  "level": "INFO",
  "message": "User logged in",
  "context": {
    "userId": "uuid",
    "correlationId": "req_123",
    "userAgent": "..."
  }
}
\`\`\`

## Metrics and Monitoring

### Application Metrics
- Request rate (requests per second)
- Response times (p50, p95, p99)
- Error rates (4xx, 5xx)
- Database query performance
- Cache hit/miss rates
- API call success/failure rates

### Performance Metrics (Core Web Vitals)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)

### Business Metrics
- Active users (DAU/MAU)
- Assessment completions
- Report generations
- Feature usage
- User engagement

## Alerting Strategy

### Severity Levels

| Level | Response Time | Examples |
|-------|---------------|----------|
| P0 - Critical | 15 minutes | Site down, data loss |
| P1 - High | 1 hour | Core feature broken |
| P2 - Medium | 4 hours | Non-critical issues |
| P3 - Low | 24 hours | Minor bugs |

### Alert Conditions
- Error rate > 5% for 5 minutes
- Response time p99 > 3s for 10 minutes
- Database connections > 80%
- Memory usage > 85%
- Failed authentication spikes

## Dashboards

### Operations Dashboard
- System health overview
- Error rates by service
- Response time trends
- Active users

### Business Dashboard
- User signups
- Assessment completions
- Feature adoption
- Revenue metrics

## Runbooks

Each alert should have an associated runbook:
1. Alert description
2. Impact assessment
3. Diagnostic steps
4. Resolution procedures
5. Escalation path
`,
  },
  {
    title: 'PRD Master - Product Requirements',
    slug: 'prd-master-v2',
    description: 'Master Product Requirements Document defining the vision, goals, user personas, features, and success metrics for the AI Adoption Strategist platform.',
    category: 'Platform Docs',
    tags: ['prd', 'product', 'requirements', 'vision', 'roadmap', 'personas'],
    is_public: false,
    content: `# Product Requirements Document (PRD) - Master

**Version**: 1.0.0  
**Last Updated**: 2026-01-08  
**Owner**: Product Management Team  
**Status**: Active

## Executive Summary

### Product Vision
The AI Adoption Strategist is an enterprise-grade platform that enables organizations to assess their AI readiness, develop comprehensive implementation strategies, and track their AI adoption journey with confidence.

### Mission Statement
Empower enterprises to successfully navigate AI adoption by providing data-driven assessments, actionable insights, and strategic planning tools that accelerate implementation while minimizing risk.

### Target Market
- **Primary**: Medium to large enterprises (500+ employees) considering AI adoption
- **Secondary**: Consulting firms and system integrators helping clients with AI strategy
- **Tertiary**: AI vendors seeking to understand customer readiness and needs

## Problem Statement

Organizations face significant challenges when adopting AI:
1. **Uncertainty**: Unclear understanding of current AI readiness
2. **Complexity**: Overwhelming number of AI platforms and solutions
3. **Risk**: Fear of costly implementation failures
4. **Expertise Gap**: Lack of internal AI strategy expertise
5. **ROI Concerns**: Difficulty demonstrating business value

## Solution

AI Adoption Strategist provides:
- **Comprehensive Assessments**: Evaluate organizational AI readiness across multiple dimensions
- **Strategic Planning**: Generate customized implementation roadmaps
- **Platform Comparison**: Side-by-side analysis of AI platforms aligned with needs
- **Risk Management**: Identify and mitigate adoption risks proactively
- **Progress Tracking**: Monitor implementation progress and measure ROI

## Key Differentiators

1. **Holistic Approach**: Evaluates technical, organizational, and cultural readiness
2. **AI-Powered Insights**: Leverages machine learning for personalized recommendations
3. **Actionable Roadmaps**: Provides step-by-step implementation plans
4. **Risk Quantification**: Data-driven risk assessment and mitigation strategies
5. **Continuous Guidance**: Ongoing support throughout adoption journey

## Goals and Objectives

### Business Goals
1. **Market Leadership**: Become the #1 AI adoption assessment platform by Q4 2026
2. **Customer Acquisition**: Onboard 100 enterprise customers in Year 1
3. **Revenue**: Achieve $5M ARR by end of Year 2
4. **Customer Success**: Maintain 90%+ customer satisfaction score

### Product Goals
1. **User Engagement**: 80% assessment completion rate
2. **Time to Value**: First actionable insight within 15 minutes
3. **Platform Performance**: 99.9% uptime
4. **User Growth**: 50% month-over-month user growth

## User Personas

### 1. Chief Information Officer (CIO)
**Goals**: Strategic AI roadmap, budget justification
**Pain Points**: Board pressure, unclear ROI, vendor selection

### 2. AI Initiative Lead
**Goals**: Successful pilot programs, stakeholder buy-in
**Pain Points**: Resource constraints, technical complexity

### 3. IT Manager
**Goals**: Seamless integration, team enablement
**Pain Points**: Legacy systems, skill gaps

### 4. Management Consultant
**Goals**: Client value delivery, methodology framework
**Pain Points**: Standardized approach, scalable assessments

## Core Features

### F1: AI Readiness Assessment
- Multi-dimensional evaluation wizard
- Scoring and benchmarking
- Progress saving and recovery

### F2: Implementation Roadmap
- Phase-based planning
- Task dependencies
- Resource allocation

### F3: Platform Comparison
- Side-by-side analysis
- Capability scoring
- Recommendation engine

### F4: Executive Dashboard
- Real-time metrics
- Progress tracking
- Report generation

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Assessment Completion | 80% | Completed/Started |
| Time to Value | 15 min | First insight |
| User Satisfaction | 90+ NPS | Survey |
| Platform Uptime | 99.9% | Monitoring |
`,
  },
  {
    title: 'API Reference',
    slug: 'api-reference',
    description: 'Comprehensive API reference for all available endpoints including authentication, request/response patterns, and error handling.',
    category: 'Platform Docs',
    tags: ['api', 'reference', 'endpoints', 'rest', 'authentication', 'swagger'],
    is_public: false,
    content: `# API Reference

**Version**: 1.0.0  
**Last Updated**: 2026-01-08  
**Owner**: API Team  
**Status**: Active

## Overview

This document provides a comprehensive reference for all available API endpoints in the AI Adoption Strategist platform.

## Authentication

### Bearer Token Authentication
All API requests require a valid JWT bearer token in the Authorization header.

\`\`\`http
GET /api/v1/assessments HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### Obtaining Access Tokens
\`\`\`typescript
import { supabase } from '@/integrations/supabase/client';

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Access token: data.session.access_token
\`\`\`

## Common Patterns

### Success Response Format
\`\`\`json
{
  "data": { ... },
  "meta": {
    "timestamp": "2026-01-08T15:30:00Z",
    "version": "1.0.0"
  }
}
\`\`\`

### Error Response Format
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      { "field": "name", "message": "Name is required" }
    ]
  }
}
\`\`\`

### Pagination
\`\`\`http
GET /api/v1/assessments?limit=20&cursor=eyJpZCI6MTIzfQ
\`\`\`

## Endpoints

### Assessments API

#### List Assessments
\`\`\`http
GET /rest/v1/ai_assessments
\`\`\`

#### Get Assessment
\`\`\`http
GET /rest/v1/ai_assessments?id=eq.{id}
\`\`\`

#### Create Assessment
\`\`\`http
POST /rest/v1/ai_assessments
Content-Type: application/json

{
  "organization_profile": { ... },
  "current_ai_usage": { ... },
  "technical_readiness": { ... }
}
\`\`\`

### Profiles API

#### List Profiles
\`\`\`http
GET /rest/v1/enterprise_profiles
\`\`\`

#### Get Profile
\`\`\`http
GET /rest/v1/enterprise_profiles?id=eq.{id}
\`\`\`

### Documents API

#### List Documents
\`\`\`http
GET /rest/v1/knowledge_base_documents
\`\`\`

#### Create Document
\`\`\`http
POST /rest/v1/knowledge_base_documents
Content-Type: application/json

{
  "title": "Document Title",
  "content": "Markdown content...",
  "category": "Platform Docs",
  "tags": ["api", "documentation"]
}
\`\`\`

### Personas API

#### List Personas
\`\`\`http
GET /rest/v1/employee_personas
\`\`\`

#### Create Persona
\`\`\`http
POST /rest/v1/employee_personas
\`\`\`

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_REQUEST | 400 | Malformed request |
| UNAUTHORIZED | 401 | Invalid credentials |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal error |

## Rate Limiting

- **Standard**: 100 requests/minute
- **Authenticated**: 1000 requests/minute
- **Enterprise**: Unlimited
`,
  },
  {
    title: 'System Architecture',
    slug: 'system-architecture-v2',
    description: 'High-level architectural overview of the AI Adoption Strategist platform including system components, data flow, and design decisions.',
    category: 'Platform Docs',
    tags: ['architecture', 'system-design', 'infrastructure', 'diagrams', 'components'],
    is_public: false,
    content: `# System Architecture

**Version**: 1.0.0  
**Last Updated**: 2026-01-08  
**Owner**: Architecture Team  
**Status**: Active

## Overview

This document provides a high-level architectural overview of the AI Adoption Strategist platform.

## System Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │   Mobile     │  │    PWA       │      │
│  │ (React/Vite) │  │   (Future)   │  │  Installed   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS/TLS 1.3
┌───────────────────────────┴─────────────────────────────────┐
│                    CDN & Edge Layer                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  CDN (Cloudflare/Lovable)                           │    │
│  │  - Static Asset Caching                             │    │
│  │  - DDoS Protection                                  │    │
│  │  - SSL/TLS Termination                              │    │
│  └─────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────┐
│                    Backend Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Supabase   │  │    Edge      │  │   Storage    │      │
│  │   Database   │  │  Functions   │  │   (S3)       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Component Architecture

### Frontend Architecture
\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui primitives
│   ├── layout/         # Layout components
│   └── feature/        # Feature-specific components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Utility functions
├── data/               # Static data/constants
└── integrations/       # External service integrations
\`\`\`

### Backend Architecture
\`\`\`
supabase/
├── functions/          # Edge functions
│   ├── generate-*      # AI generation functions
│   ├── send-*          # Notification functions
│   └── validate-*      # Validation functions
└── migrations/         # Database migrations
\`\`\`

## Data Flow

### Authentication Flow
1. User submits credentials
2. Supabase Auth validates
3. JWT token issued
4. Token stored in session
5. Subsequent requests authenticated

### Document Creation Flow
1. User creates document
2. Client validates input
3. API request with JWT
4. RLS policy check
5. Database insert
6. Real-time update broadcast

## Database Schema

### Core Tables
- \`enterprise_profiles\`: Company profiles
- \`employee_personas\`: AI personas
- \`knowledge_base_documents\`: Documentation
- \`ai_assessments\`: Readiness assessments
- \`ai_platforms\`: Platform catalog

### Security
- Row Level Security (RLS) enabled
- User-scoped data access
- Audit logging

## Performance Considerations

### Caching Strategy
- CDN for static assets
- React Query for API responses
- Local storage for user preferences

### Optimization
- Code splitting by route
- Lazy loading for components
- Image optimization
- Database indexing

## Scalability

### Horizontal Scaling
- Stateless frontend
- Serverless functions
- Connection pooling

### Vertical Scaling
- Database tier upgrades
- Function memory allocation
`,
  },
  {
    title: 'Semantic Versioning and Changelog',
    slug: 'changelog-semantic-versioning',
    description: 'Semantic versioning approach, changelog maintenance standards, and release communication protocols.',
    category: 'Platform Docs',
    tags: ['versioning', 'changelog', 'releases', 'semver', 'documentation'],
    is_public: false,
    content: `# Semantic Versioning and Changelog Documentation

**Version**: 1.0.0  
**Last Updated**: 2026-01-08  
**Owner**: Release Management Team  
**Status**: Active

## Overview

This document explains the semantic versioning approach used for releases and how changes are documented.

## Semantic Versioning (SemVer)

### Version Format
\`\`\`
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
\`\`\`

**Example**: \`2.3.1-beta.1+20260108\`

### Version Components

#### MAJOR Version (X.0.0)
**Increment when**: Making incompatible API changes or breaking changes

**Examples**:
- Removing or renaming public API endpoints
- Changing data formats that break existing clients
- Removing features or functionality
- Major architectural changes requiring migration

**Communication**:
- Advance notice (2+ weeks)
- Migration guide required
- Deprecation warnings in previous version

#### MINOR Version (0.X.0)
**Increment when**: Adding functionality in a backward-compatible manner

**Examples**:
- Adding new API endpoints
- Adding new features or components
- Enhancing existing features without breaking changes
- Performance improvements

#### PATCH Version (0.0.X)
**Increment when**: Making backward-compatible bug fixes

**Examples**:
- Bug fixes
- Security patches
- Performance optimizations
- Documentation corrections

### Pre-release Versions

#### Alpha (-alpha.X)
- Internal testing only
- Features may be incomplete
- Breaking changes acceptable

#### Beta (-beta.X)
- Feature freeze
- External testing/preview
- API should be stable

#### Release Candidate (-rc.X)
- All known issues resolved
- Production-ready testing
- Final QA phase

## Changelog Format

### Keep a Changelog Standard

\`\`\`markdown
# Changelog

## [Unreleased]

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes

## [1.0.0] - 2026-01-08

### Added
- Initial release
- AI Readiness Assessment
- Platform Comparison
- Executive Dashboard
\`\`\`

## Release Process

### 1. Pre-Release
- Feature freeze
- QA testing
- Documentation updates
- Changelog preparation

### 2. Release
- Version bump
- Tag creation
- Deployment
- Announcement

### 3. Post-Release
- Monitoring
- Issue triage
- Hotfix preparation if needed

## Breaking Change Policy

### Deprecation Timeline
1. **Announcement**: Feature deprecated in version X.Y.0
2. **Warning**: Console warnings in X.Y+1.0
3. **Removal**: Feature removed in X+1.0.0

### Migration Support
- Migration guides for major versions
- Automated migration scripts where possible
- Support period for previous major version
`,
  },
  {
    title: 'Edge Cases and Failure Modes',
    slug: 'edge-cases-failure-modes',
    description: 'Comprehensive documentation of edge cases, boundary conditions, failure modes, and exceptional scenarios that the platform must handle.',
    category: 'Platform Docs',
    tags: ['edge-cases', 'error-handling', 'failure-modes', 'resilience', 'testing'],
    is_public: false,
    content: `# Edge Cases and Failure Modes

**Document Status**: Active  
**Priority**: P1 - High  
**Last Updated**: 2026-01-21  
**Owner**: Engineering Team

---

## Purpose

This document comprehensively documents all known edge cases, boundary conditions, failure modes, and exceptional scenarios that the platform must handle gracefully.

## Data Layer Edge Cases

### Concurrent Modifications
- **Issue**: Multiple users editing same document simultaneously
- **Current Handling**: Last write wins
- **Expected Behavior**: Conflict detection and resolution
- **Mitigation**: Optimistic locking, conflict resolution UI

### Data Validation Edge Cases
- Empty strings vs. null values
- Special characters in user inputs
- Unicode and emoji handling
- SQL injection attempts
- XSS attack vectors
- Extremely long inputs (>10,000 characters)
- Maximum field length handling

### Large Data Sets
- **Issue**: Performance with 1,000+ documents
- **Expected Behavior**: Pagination, lazy loading
- **Performance Threshold**: < 2s load time
- **Mitigation**: Database indexing, query optimization

### Orphaned Data
- **Issue**: Cascade delete behavior
- **Relationships**:
  - Document deleted → Versions orphaned?
  - User deleted → Documents orphaned?
  - Folder deleted → Documents moved?
- **Mitigation**: Soft deletes, referential integrity

## Authentication Edge Cases

### Token Expiration
- **Issue**: Access token expires during operation
- **Current Handling**: Silent refresh
- **Expected Behavior**: Seamless refresh, operation continues
- **Failure Mode**: Refresh token expired
- **Recovery**: Force re-login

### Permission Changes Mid-Session
- **Issue**: User permissions revoked during active session
- **Expected Behavior**: Next API call fails with 403
- **Recovery**: Refresh session or redirect to login

### Session Security
- Session fixation attacks
- CSRF token handling
- Secure cookie flags
- Token binding

## Network/API Edge Cases

### Network Failures
- **Issue**: Network disconnection during operation
- **Current Handling**: PWA offline support
- **Expected Behavior**: Queue operations, sync when online
- **Mitigation**: IndexedDB caching, retry logic

### Timeout Handling
- **Issue**: Slow API responses
- **Thresholds**:
  - Warning: 5s
  - Error: 30s
  - Abort: 60s
- **Mitigation**: Loading indicators, retry options

### Rate Limiting
- **Issue**: Too many requests
- **Current Handling**: 429 response
- **Expected Behavior**: Exponential backoff
- **User Feedback**: Clear rate limit message

## UI/UX Edge Cases

### Form Submission
- Double-click prevention
- Back button handling
- Unsaved changes warning
- Browser refresh during edit

### File Uploads
- Large file handling (>10MB)
- Unsupported file types
- Network failure during upload
- Duplicate file detection

### Responsive Design
- Extremely small screens (<320px)
- Extremely large screens (>4K)
- Portrait/landscape switching
- Touch vs. pointer inputs

## Error Recovery

### Graceful Degradation
1. Feature fallbacks
2. Cached content display
3. Offline mode activation
4. Error boundary containment

### User Communication
- Clear error messages
- Actionable recovery steps
- Support contact options
- Error tracking and reporting

## Testing Requirements

### Edge Case Testing
- Boundary value analysis
- Equivalence partitioning
- Error guessing
- State transition testing

### Chaos Engineering
- Random network failures
- Database disconnections
- Memory pressure
- CPU throttling
`,
  },
];

export default platformDocsData;
