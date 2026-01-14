import { CreateDocumentData, generateSlug } from '@/hooks/useKnowledgeBase';

// Pre-defined documents from the uploaded files
export const seedDocuments: CreateDocumentData[] = [
  // Claude Code Standards Documents
  {
    title: 'Claude Code Standards Rollout @ Intinc',
    slug: 'claude-code-standards-readme',
    description: 'Complete package for Claude Code TIER 1 rollout with timeline and checklist',
    category: 'Claude Code Standards',
    tags: ['rollout', 'tier-1', 'platform-engineering', 'getting-started'],
    content: `# Claude Code Standards Rollout @ Intinc

**Status:** Ready to Deploy  
**Timeline:** Week of Jan 27 – Week of Feb 23  
**Owner:** Platform Engineering (@Kyle)  

---

## 📋 Complete Package Contents

Five comprehensive docs covering everything from governance to metrics:

| Doc | Purpose | Read Time | When to Use |
|-----|---------|-----------|---|
| **TIER 1 Canon** | 9 required tools, setup, security | 25 min | Week 1: Share with all engineers |
| **Decision Framework** | 4-gate approval process for tools | 20 min | Ongoing: Tool requests reference |
| **Tool Request Template** | How engineers submit tool ideas | 5 min | Ongoing: Template for PRs/GitHub issues |
| **Rollout Roadmap** | Week-by-week implementation plan | 30 min | Now: Your roadmap for 4 weeks |
| **Adoption Metrics** | PostHog setup + dashboards | 20 min | Week 1: Instrument tracking |

---

## 🚀 Quick Start (Next 48 Hours)

### Day 1 (Monday, Jan 20)

- [ ] **1 hr** — Read: Decision Framework + Rollout Roadmap
- [ ] **30 min** — Skim: TIER 1 Canon (tool descriptions)
- [ ] **30 min** — Confirm: GitHub infra (GitHub MCP setup ready? Sentry tokens ready?)
- [ ] **30 min** — Create GitHub repo \`intinc/claude-code-canon\` + commit all docs
- [ ] **30 min** — Start PostHog project (Adoption Metrics doc section 1)

### Day 2 (Tuesday, Jan 21)

- [ ] **1 hr** — Schedule kickoff meeting with leads (Backend, AppSec, DevOps, QA)
- [ ] **1 hr** — Dry-run: Set up TIER 1 tools on test machine. Document blockers.
- [ ] **1 hr** — Prepare: Recording videos (5 min each, 4 videos total)
- [ ] **30 min** — Create Slack channel #claude-code-rollout

**If all ✅ → Ready to launch Week 1**`,
    is_public: false,
  },
  {
    title: 'Claude Code Tool Decision Framework v1.0',
    slug: 'decision-framework',
    description: '4-gate approval process for adding tools to the engineering toolkit',
    category: 'Claude Code Standards',
    tags: ['governance', 'decision-making', 'tool-evaluation', 'tier-system'],
    content: `# Claude Code Tool Decision Framework v1.0

**Owner:** Platform Engineering (@Kyle)  
**Last Updated:** January 2025  
**Governance Level:** MANDATORY (all tool requests flow through this)

---

## TL;DR

Before adopting any tool beyond TIER 1, it must pass **4 gates**: Persona fit → Cost/benefit → Integration risk → Adoption readiness. If any gate fails, **HOLD** (don't add).

---

## The 4-Gate Process

### GATE 1: PERSONA FIT
Does this tool serve a clear persona (role, team, or individual)?
- All 50–200 engineers → Candidate for TIER 1
- Role: Backend/AppSec/etc → Candidate for TIER 2
- Individual choice → Sandbox (TIER 3, no approval needed)
- Unclear persona → ❌ SKIP. Redefine request.

### GATE 2: COST vs. BENEFIT
Is effort <3 hrs AND benefit ≥ 3/5?
- High benefit (P0/P1), Low cost → ✅ FAST-TRACK
- Medium benefit (P2), Low cost → ✅ CONDITIONAL (RFC if >2 hrs)
- Medium benefit, High cost → ⏳ HOLD (revisit in Q2)
- Low benefit (P3+) → ❌ SKIP

### GATE 3: INTEGRATION RISK
Fail = BLOCK until de-risked
- <3 external dependencies (APIs, services)?
- Last update <6 months ago?
- No conflict with existing tools?
- Rollback <1 hr if broken?
- Owned by someone on Platform Eng or assigned team?

### GATE 4: ADOPTION READINESS
Fail = DELAY until ready
- README + setup docs exist (5 min read)?
- Video demo or Slack walkthrough recorded?
- Success metric defined + measurable?
- Feedback mechanism exists?
- Training (if >10 min setup) planned?`,
    is_public: false,
  },
  {
    title: 'TIER 1 Rollout Roadmap',
    slug: 'rollout-roadmap',
    description: 'Week-by-week implementation plan for Claude Code TIER 1 tools',
    category: 'Claude Code Standards',
    tags: ['roadmap', 'implementation', 'timeline', 'phase-plan'],
    content: `# Claude Code TIER 1 Rollout Roadmap

**Timeline:** Week of Jan 27 – Week of Feb 24, 2025  
**Owner:** Platform Engineering (@Kyle)  
**Adoption Target:** >50% of daily users by Feb 28  

---

## Phase 0: Prep (Week of Jan 20)
- Lock decision framework
- Assign tool owners
- Set up PostHog
- Record demo videos
- Dry-run all tools

## Phase 1: Foundation (Week 1: Jan 27 – Feb 2)
- Deploy: GitHub MCP, awesome-claude-code, ccusage + ccflare, Sentry MCP
- Target: >30% adoption by EOW

## Phase 2: Standards (Week 2: Feb 3–9)
- Deploy: TDD Guard + fcakyon, cc-sessions + cchistory, PostgreSQL MCP
- Target: >50% adoption

## Phase 3: Security (Week 3: Feb 10–16)
- Deploy: security-sentinel, Playwright MCP
- Target: >60% adoption (lock TIER 1)

## Phase 4: Stabilization (Week 4: Feb 17–23)
- Fix blockers, tune rules, plan TIER 2
- Target: >70% adoption (sustained)`,
    is_public: false,
  },
  {
    title: 'Tool Request Template',
    slug: 'tool-request-template',
    description: 'Template for submitting new tool requests to Platform Engineering',
    category: 'Claude Code Standards',
    tags: ['template', 'tool-request', 'process', 'submission'],
    content: `# Claude Code Tool Request Template

**Where to submit:** 
- GitHub: Create issue in \`intinc/platform\` with label \`tool-request\`
- Slack: Tag @Platform-Eng in #platform-eng with this template

---

## REQUEST FORM

**Requested by:** @name  
**Date submitted:** YYYY-MM-DD  
**Urgency:** [ ] Low [ ] Medium [ ] High  

---

## SECTION 1: The Problem

**What problem does this tool solve?**
> Describe the pain point in 2–3 sentences.

**Who experiences this problem?**
- [ ] All engineers (50–200)
- [ ] Specific role: Backend / Frontend / AppSec / DevOps
- [ ] Your team only
- [ ] You specifically

## SECTION 2: The Tool

**Tool name & links:**
- GitHub: [link]
- Docs: [link]

**What does it do?**
> 2–3 sentences on functionality.

## SECTION 3: Assessment

Platform Eng will evaluate through Gates 1-4.

## SECTION 4: Decision

**Recommendation:** 
- ✅ APPROVED → Tier: [ ] TIER 1 [ ] TIER 2 [ ] TIER 3
- ⏳ CONDITIONAL → Reason: ___
- ❌ REJECTED → Reason: ___`,
    is_public: false,
  },
  {
    title: 'Adoption Metrics & PostHog Setup',
    slug: 'adoption-metrics',
    description: 'PostHog configuration for tracking Claude Code tool adoption',
    category: 'Claude Code Standards',
    tags: ['metrics', 'analytics', 'posthog', 'tracking', 'dashboards'],
    content: `# Claude Code Adoption Metrics & PostHog Setup

**Owner:** Platform Engineering (@Kyle)  
**Setup Time:** 1–2 hours (one-time)  
**Maintenance:** Weekly reviews, monthly calibration  

---

## TL;DR

Set up PostHog events to track who uses which Claude Code tools. This gives you adoption %, weekly trends, and early warning signals.

---

## Key Metrics to Track

| Metric | Target | Color Coding |
|--------|--------|--------------|
| Tool Adoption % | >50% by week 3 | 🟢 >50%, 🟡 30–50%, 🔴 <30% |
| Avg Tools Per Engineer | >3 by week 4 | Trend up |
| Weekly Active Users | >90% by week 4 | Trend |
| Test Coverage | >80% | 🟢 >80%, 🟡 60–80%, 🔴 <60% |
| Code Quality | >90% | 🟢 >90%, 🟡 75–90%, 🔴 <75% |

---

## PostHog Events

\`\`\`javascript
// Track session start
posthog.capture('claude_code_session_start', {
  session_id: sessionId,
  model: 'claude-opus-4.1',
  team: getUserTeam(userId)
});

// Track tool usage
posthog.capture('claude_code_tool_used', {
  tool_name: 'github_mcp',
  tool_action: 'create_pr'
});
\`\`\``,
    is_public: false,
  },
  {
    title: 'Intinc Claude Code Canon: TIER 1',
    slug: 'tier-1-canon',
    description: 'The 9 required tools for all engineers at Intinc',
    category: 'Claude Code Standards',
    tags: ['tier-1', 'required-tools', 'canon', 'standards'],
    content: `# Intinc Claude Code Canon: TIER 1 (Required)

**Last Updated:** January 2025  
**Owner:** Platform Engineering (@Kyle)  
**Status:** ACTIVE (50–200 engineers)  

---

## Summary

TIER 1 is the **mandatory foundation** for all engineers at Intinc. These 9 tools enforce security, reproducibility, cost visibility, and development standards without friction.

| Tool | Role | Setup | Owner |
|------|------|-------|-------|
| awesome-claude-code | Discovery + reference | Bookmark | Platform Eng |
| ccusage + ccflare | Token burn tracking | 45 min | You |
| GitHub MCP | Native GitHub integration | 30 min | Backend Lead |
| Playwright MCP | E2E testing | 45 min | QA Lead |
| TDD Guard + fcakyon | Tests-first enforcement | 60 min | QA Lead |
| Sentry MCP | Prod error correlation | 45 min | DevOps |
| PostgreSQL MCP | RLS audit | 60 min | AppSec Lead |
| security-sentinel | Security rules | 90 min | AppSec Lead |
| cc-sessions + cchistory | Reproducibility | 30 min | You |`,
    is_public: false,
  },
  // Platform Documentation
  {
    title: 'Deployment Guide',
    slug: 'deployment-guide',
    description: 'Complete deployment documentation for production releases',
    category: 'Platform Documentation',
    tags: ['deployment', 'devops', 'ci-cd', 'vercel', 'production'],
    content: `# Deployment Guide

**INT Inc Enterprise Claude Profile Builder**  
**Production Deployment Documentation**

---

## Deployment Strategy

- **Environment Tiers**: Development → Staging → Production
- **Deployment Method**: Continuous Deployment (CD) via GitHub Actions
- **Release Schedule**: Weekly releases (Tuesdays, 2 PM EST)
- **Zero-Downtime**: Blue-green deployment strategy

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Vercel CLI (for Vercel deployments)
- GitHub repository access
- Environment variable access

## Build Process

\`\`\`bash
npm install
npm run type-check
npm test
npm run lint
npm run build
\`\`\`

## Deployment Platforms

### Vercel (Recommended)
\`\`\`bash
vercel login
vercel link
vercel --prod
\`\`\`

### Netlify
Configure in \`netlify.toml\`

### AWS S3 + CloudFront
Use for enterprise deployments`,
    is_public: false,
  },
  {
    title: 'API Documentation',
    slug: 'api-documentation',
    description: 'Backend API documentation for Edge Functions',
    category: 'Platform Documentation',
    tags: ['api', 'backend', 'edge-functions', 'endpoints'],
    content: `# API Documentation

**INT Inc Enterprise Claude Profile Builder**

---

## Overview

This API documentation covers the backend services provided by the Supabase Edge Functions.

**Base URL**: \`https://<project-ref>.supabase.co/functions/v1\`

**Authentication**: Bearer token required

---

## 🤖 Agent API

### Run Agent
\`POST /agents/run\`

Executes an AI agent with a specific goal. Supports streaming response.

### Create Agent
\`POST /agents/create\`

Defines a new custom agent.

---

## 🔌 Integrations API

### List Integrations
\`GET /integrations\`

### Connect Integration
\`POST /integrations/{id}/connect\`

---

## 🛡️ Security API

### Analyze Prompt
\`POST /security/analyze\`

Checks prompts for injection attacks or policy violations.`,
    is_public: false,
  },
  {
    title: 'Architecture Documentation',
    slug: 'architecture-documentation',
    description: 'System architecture and design decisions',
    category: 'Platform Documentation',
    tags: ['architecture', 'design', 'system-design', 'technical'],
    content: `# Architecture Documentation

**INT Inc Enterprise Claude Profile Builder**

---

## Overview

The platform is architected as a **hybrid client-server platform**:
- **Read-Heavy** operations run Client-Side (React)
- **Write-Heavy / Sensitive** operations run Server-Side (Edge Functions)

## Design Goals

1. **Maintainability** - Easy content updates
2. **Scalability** - 100+ pages without degradation
3. **Type Safety** - Zero runtime type errors
4. **Performance** - Sub-second load times
5. **Security** - Zero-trust architecture

## Agent Framework (ReAct Pattern)

1. **Observation**: Agent receives user goal
2. **Reasoning**: LLM generates "Thought"
3. **Action**: Agent selects a Tool
4. **Execution**: Server executes tool securely
5. **Result**: Output fed back into context
6. **Loop**: Repeat until goal met

## Security Layers

- Content Security Policy (Headers)
- Agent Sandboxing (Deno Isolate)
- Tool Permission Scope (RBAC)
- Input Sanitization
- Audit Logging`,
    is_public: false,
  },
  {
    title: 'Documentation Index',
    slug: 'documentation-index',
    description: 'Master index of all project documentation',
    category: 'Platform Documentation',
    tags: ['index', 'navigation', 'reference', 'overview'],
    content: `# Documentation Index
## INT Inc Enterprise Claude Profile Builder - Phase 11

**Version**: 2.0.0  
**Last Updated**: January 13, 2026  
**Status**: Production Ready

---

## 📚 Quick Navigation

### 🚀 Getting Started
- README - Project overview and quick start
- Quick Start Guide - Testing new features
- Migration Guide - Upgrade from v1.0.0 to v2.0.0

### 📋 Release Information
- Changelog - Complete version history
- Release Notes v2.0.0 - What's new

### 🏗️ Architecture & Planning
- Refactoring Summary
- Supabase Migration Plan
- Duplicate Cleanup Plan

---

## 📖 Documentation by Audience

### For End Users
- Getting Started guides
- New Features walkthrough
- Troubleshooting

### For Developers
- Setup & Installation
- Architecture documentation
- API documentation
- Testing procedures

### For DevOps
- Deployment guides
- Monitoring setup
- Migration & Rollback procedures`,
    is_public: false,
  },
  {
    title: 'Migration Guide: v1.0.0 → v2.0.0',
    slug: 'migration-guide-v1-to-v2',
    description: 'Step-by-step upgrade guide from v1.0.0 to v2.0.0',
    category: 'Platform Documentation',
    tags: ['migration', 'upgrade', 'v2', 'breaking-changes'],
    content: `# Migration Guide: v1.0.0 → v2.0.0

**Estimated Migration Time**: 15-30 minutes  
**Risk Level**: Low (Zero breaking changes)  
**Backward Compatible**: ✅ Yes

---

## What's Changing?

- Performance improvements (45% faster)
- New UI features (feedback widget, skeleton loaders)
- Better error handling (error boundaries)
- Accessibility improvements (WCAG 2.1 AA)
- Analytics framework (opt-in)

## What's NOT Changing?

- ✅ All existing features work the same
- ✅ localStorage data format unchanged
- ✅ API integrations unchanged
- ✅ UI layout and navigation unchanged

---

## Step-by-Step Migration

### Step 1: Backup Current Version
\`\`\`bash
git tag v1.0.0-backup
git push origin v1.0.0-backup
\`\`\`

### Step 2: Pull Latest Code
\`\`\`bash
git pull origin main
\`\`\`

### Step 3: Install Dependencies
\`\`\`bash
rm -rf node_modules
npm install
\`\`\`

### Step 4: Build & Verify
\`\`\`bash
npm run build
npm run preview
\`\`\``,
    is_public: false,
  },
  // Phase Status Documents
  {
    title: 'Phase 3 Status: Governance & Operations',
    slug: 'phase-3-status',
    description: 'Status report for Phase 3 completion',
    category: 'Phase Status',
    tags: ['phase-3', 'governance', 'status', 'operations'],
    content: `# Phase 3 Status: Governance & Operations Migration

## Executive Summary
Phase 3 focused on migrating critical operational components to the new feature-based architecture.

## Completed Objectives

### 1. Governance Feature Migration
- Module: \`features/governance\`
- Status: ✅ Complete
- Migrated legacy Governance section to standalone feature module

### 2. Strategy & Analysis Refactoring
- Module: \`features/strategy\`
- Status: ✅ Complete
- Decoupled data from presentation

### 3. Architecture & Integration
- Updated routing with React.lazy and Suspense
- Removed legacy imports
- Added proper skeleton loading states

## Next Steps (Phase 4)
- User Profile & Settings
- Advanced Search
- Real-time Collaboration`,
    is_public: false,
  },
  {
    title: 'Phase 4 Status: Personalization & Search',
    slug: 'phase-4-status',
    description: 'Status report for Phase 4 completion',
    category: 'Phase Status',
    tags: ['phase-4', 'personalization', 'search', 'status'],
    content: `# Phase 4 Status: Personalization & Global Search

## Executive Summary
Phase 4 implemented user personalization features and a powerful global search command palette.

## Completed Objectives

### 1. Global Search (Command Palette)
- Component: \`GlobalSearch.tsx\`
- Status: ✅ Complete
- Cmd+K / Ctrl+K accessible command palette

### 2. User Settings & Profile
- Component: \`Settings.tsx\`
- Status: ✅ Complete
- Tabs for Profile, Account, Notifications, Display

### 3. Role Profiles Migration
- Module: \`features/roles\`
- Status: ✅ Complete

## Architecture Improvements
- Updated Sidebar and TopBar integration
- Added lazy-loading routes`,
    is_public: false,
  },
  {
    title: 'Phase 5 Status: Analytics & Collaboration',
    slug: 'phase-5-status',
    description: 'Status report for Phase 5 completion',
    category: 'Phase Status',
    tags: ['phase-5', 'analytics', 'collaboration', 'status'],
    content: `# Phase 5 Status: Advanced Analytics & Collaboration

## Executive Summary
Phase 5 introduced enterprise-grade analytics, collaborative workspace hub, and comprehensive knowledge base.

## Completed Objectives

### 1. Advanced Analytics Dashboard
- Component: \`AnalyticsDashboard.tsx\`
- Status: ✅ Complete
- Rich dashboard using recharts for visualization

### 2. Knowledge Base
- Component: \`ReferenceLibrary.tsx\`
- Status: ✅ Complete
- Searchable document repository

### 3. Team Collaboration Hub
- Component: \`CollaborationHub.tsx\`
- Status: ✅ Complete
- Tabbed interface for workspaces

## Architecture Improvements
- Code splitting with lazy loading
- Updated TypeScript types`,
    is_public: false,
  },
  {
    title: 'Phase 5 Implementation - Bug Fixes',
    slug: 'phase-5-fixes',
    description: 'Summary of bug fixes applied during Phase 5',
    category: 'Phase Status',
    tags: ['phase-5', 'bug-fixes', 'troubleshooting', 'implementation'],
    content: `# Phase 5 Implementation - Bug Fixes Summary

## Critical Fixes Applied

### 1. Button Component Ref Forwarding
- **Issue**: React warning about refs without forwardRef
- **Fix**: Converted Button to use React.forwardRef

### 2. Section Type Definitions
- **Issue**: New sections not defined in Section type
- **Fix**: Added analytics, knowledge, collaboration types

### 3. ContentViewer Routing
- **Issue**: New components not in routing system
- **Fix**: Added lazy-loaded imports and route cases

### 4. Missing KnowledgeBase Component
- **Issue**: Component file not created
- **Fix**: Created fully functional component

### 5. Sidebar Navigation Updates
- **Issue**: Phase 5 items missing from sidebar
- **Fix**: Added navigation items

## Phase 5 Status: ✅ Complete`,
    is_public: false,
  },
];
