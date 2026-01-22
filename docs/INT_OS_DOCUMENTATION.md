# INT OS — Complete Documentation

**Version**: 2.0.0  
**Last Updated**: 2026-01-22  
**Status**: Production

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Audience-Specific Guides](#2-audience-specific-guides)
   - [For End Users](#21-for-end-users)
   - [For Developers](#22-for-developers)
   - [For Operators/DevOps](#23-for-operatorsdevops)
3. [System Architecture](#3-system-architecture)
4. [Data Models & API Reference](#4-data-models--api-reference)
5. [Configuration Reference](#5-configuration-reference)
6. [User Flows & Workflows](#6-user-flows--workflows)
7. [Testing & Quality Assurance](#7-testing--quality-assurance)
8. [Security & Compliance](#8-security--compliance)
9. [Observability & Operations](#9-observability--operations)
10. [Examples & Use Cases](#10-examples--use-cases)
11. [Troubleshooting Guide](#11-troubleshooting-guide)
12. [Version History & Changelog](#12-version-history--changelog)
13. [Appendix: Style Guide](#appendix-style-guide)

---

## 1. Executive Summary

### Product Vision

**INT OS** (Enterprise AI Job Orchestration Platform) is an enterprise-grade platform that enables organizations to:

- **Assess AI Readiness**: Evaluate organizational AI capabilities across 20+ dimensions
- **Manage AI Personas**: Create AI-ready configurations for employees across Claude, Copilot, and Gemini ecosystems
- **Orchestrate AI Jobs**: Execute async AI tasks through a unified dashboard
- **Maintain Knowledge**: Organize documentation, frameworks, and methodologies
- **Track ROI**: Calculate and monitor AI investment returns

### Platform Positioning

```
┌─────────────────────────────────────────────────────────────────────┐
│                    INT OS Platform Ecosystem                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│   │  AI Explorer │    │   Persona   │    │  Knowledge  │             │
│   │   50+ Tools  │    │   Builder   │    │    Base     │             │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘             │
│          │                   │                   │                    │
│          └───────────────────┼───────────────────┘                    │
│                              ▼                                        │
│                    ┌─────────────────┐                               │
│                    │  Job Orchestration │                             │
│                    │     Dashboard      │                             │
│                    └─────────────────┘                               │
│                              │                                        │
│          ┌───────────────────┼───────────────────┐                    │
│          ▼                   ▼                   ▼                    │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│   │   Claude    │    │   Copilot   │    │   Gemini    │             │
│   │ (Anthropic) │    │ (Microsoft) │    │  (Google)   │             │
│   └─────────────┘    └─────────────┘    └─────────────┘             │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Supported Platforms & Environments

| Environment | Support Level | Notes |
|-------------|---------------|-------|
| Modern Browsers (Chrome, Firefox, Safari, Edge) | ✅ Full | Last 2 versions |
| iOS Safari | ✅ Full | PWA installable |
| Android Chrome | ✅ Full | PWA installable |
| Desktop PWA | ✅ Full | Windows, macOS, Linux |
| Offline Mode | ✅ Partial | IndexedDB caching |

### Versioning Strategy

We follow **Semantic Versioning (SemVer)**:

- **MAJOR**: Breaking changes to API or data models
- **MINOR**: New features, backward-compatible
- **PATCH**: Bug fixes, security updates

---

## 2. Audience-Specific Guides

### 2.1 For End Users

#### Quick Start (5 Minutes)

1. **Sign Up**: Navigate to the app and create an account
2. **Complete Onboarding**: Follow the guided wizard to set preferences
3. **Explore AI Platforms**: Browse 50+ AI tools in the Platform Explorer
4. **Create Your First Persona**: Build an AI configuration for your role
5. **Export to Your Ecosystem**: Download prompts for Claude, Copilot, or Gemini

#### Installing as PWA

**Desktop (Chrome/Edge)**:
1. Click the install icon in the address bar
2. Confirm installation
3. Launch from Start Menu/Dock

**iOS (Safari)**:
1. Tap Share button
2. Select "Add to Home Screen"
3. Tap "Add"

**Android (Chrome)**:
1. Tap menu (⋮)
2. Select "Install app"
3. Confirm installation

#### Key Features Tour

##### AI Platform Explorer
Navigate to `/ai-explorer` to access:
- **Platform Browser**: Search and filter 50+ AI tools
- **Capability Matrix**: Compare platforms across 20 dimensions
- **ROI Calculator**: Estimate productivity gains
- **Assessment Wizard**: Evaluate organizational readiness

##### Persona Builder
Create employee AI configurations:
1. Navigate to `/personas`
2. Click "Create Persona"
3. Fill in role details
4. Add "Hats" (roles/responsibilities)
5. Export to Claude/Copilot/Gemini

##### Knowledge Base
Manage documentation at `/knowledge`:
- Create folders and documents
- Tag and search content
- Use templates for common formats
- Track version history

#### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open Command Palette |
| `Cmd/Ctrl + /` | Toggle keyboard shortcuts help |
| `Cmd/Ctrl + B` | Toggle sidebar |
| `Cmd/Ctrl + S` | Save current document |
| `Esc` | Close modal/dialog |

---

### 2.2 For Developers

#### Prerequisites

```bash
# Required
- Node.js 18+ (LTS recommended)
- npm 9+ or bun
- Git 2.x+
- Lovable Cloud account

# Recommended
- VS Code with extensions:
  - TypeScript
  - ESLint
  - Tailwind CSS IntelliSense
  - Prettier
```

#### Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-org/int-os.git
cd int-os

# Install dependencies
npm install

# Start development server
npm run dev

# App runs at http://localhost:5173
```

#### Project Architecture

```
int-os/
├── docs/                      # Documentation
│   ├── ARCHITECTURE-2.md      # System design
│   ├── PRD_MASTER.md          # Product requirements
│   ├── ENTITY_ACCESS_RULES.md # RBAC policies
│   └── INT_OS_DOCUMENTATION.md # This file
├── e2e/                       # Playwright E2E tests
├── public/                    # Static assets
│   └── pwa-icons/             # PWA manifest icons
├── src/
│   ├── components/            # React components
│   │   ├── ai-explorer/       # AI Platform Explorer tabs
│   │   ├── auth/              # Authentication forms
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── deals/             # Deal tracking
│   │   ├── knowledge/         # Knowledge base
│   │   ├── onboarding/        # Onboarding wizard
│   │   ├── persona/           # Persona builder
│   │   ├── pwa/               # PWA components
│   │   ├── ui/                # shadcn/ui primitives
│   │   └── wizard/            # Profile wizard
│   ├── contexts/              # React contexts
│   ├── data/                  # Static data & seeds
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/          # External services
│   │   └── supabase/          # Database client & types
│   ├── lib/                   # Utilities
│   │   └── pwa/               # PWA utilities
│   ├── pages/                 # Route components
│   ├── test/                  # Test setup
│   └── types/                 # TypeScript definitions
├── supabase/
│   ├── functions/             # Edge Functions
│   │   ├── ai-recommendations/
│   │   ├── generate-document/
│   │   ├── generate-persona/
│   │   └── ...
│   └── migrations/            # Database migrations
└── Configuration Files
    ├── tailwind.config.ts
    ├── vite.config.ts
    ├── vitest.config.ts
    └── playwright.config.ts
```

#### Tech Stack Deep Dive

| Layer | Technology | Purpose |
|-------|------------|---------|
| **UI Framework** | React 18 | Component library |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite | Fast bundling & HMR |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Components** | shadcn/ui + Radix | Accessible primitives |
| **State** | TanStack Query | Server state management |
| **Routing** | React Router 6 | Client-side routing |
| **Animation** | Framer Motion | Declarative animations |
| **Forms** | React Hook Form + Zod | Validation |
| **Icons** | Lucide React | Icon library |
| **Database** | PostgreSQL (Supabase) | Relational data |
| **Auth** | Supabase Auth | JWT authentication |
| **Edge Functions** | Deno (Supabase) | Serverless compute |
| **AI Gateway** | Lovable AI | Model access |
| **Testing** | Vitest + Playwright | Unit & E2E |

#### Component Development

```typescript
// Example: Creating a new component

// 1. Define types (src/types/my-feature.ts)
export interface MyFeatureProps {
  title: string;
  onAction: (id: string) => void;
  variant?: 'default' | 'compact';
}

// 2. Create component (src/components/my-feature/MyFeature.tsx)
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MyFeatureProps } from '@/types/my-feature';

export function MyFeature({ title, onAction, variant = 'default' }: MyFeatureProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card className={variant === 'compact' ? 'p-2' : 'p-4'}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => onAction('test-id')}
          variant={isActive ? 'default' : 'outline'}
        >
          Take Action
        </Button>
      </CardContent>
    </Card>
  );
}

// 3. Create hook if needed (src/hooks/useMyFeature.ts)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useMyFeature() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['my-feature'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('my_table')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newItem: CreateInput) => {
      const { data, error } = await supabase
        .from('my_table')
        .insert(newItem)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-feature'] });
    },
  });

  return { data, isLoading, create: createMutation.mutate };
}

// 4. Write tests (src/components/my-feature/__tests__/MyFeature.test.tsx)
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyFeature } from '../MyFeature';

describe('MyFeature', () => {
  it('renders title correctly', () => {
    render(<MyFeature title="Test Title" onAction={vi.fn()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onAction when button clicked', async () => {
    const onAction = vi.fn();
    render(<MyFeature title="Test" onAction={onAction} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledWith('test-id');
  });
});
```

#### Edge Function Development

```typescript
// supabase/functions/my-function/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { inputData } = await req.json();

    // Use Lovable AI Gateway (no API key needed)
    const response = await fetch(
      'https://hrjqmgbmbzregowdepac.supabase.co/functions/v1/ai-gateway',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.get('Authorization') || '',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'user', content: `Process this: ${inputData}` }
          ],
        }),
      }
    );

    const aiResult = await response.json();

    return new Response(
      JSON.stringify({ success: true, result: aiResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

---

### 2.3 For Operators/DevOps

#### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Production Environment                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌─────────────────┐         ┌─────────────────┐                   │
│   │   CDN (Edge)    │◄───────▶│  Static Assets  │                   │
│   │  (CloudFlare)   │         │   (Optimized)   │                   │
│   └────────┬────────┘         └─────────────────┘                   │
│            │                                                          │
│            ▼                                                          │
│   ┌─────────────────┐         ┌─────────────────┐                   │
│   │   React SPA     │◄───────▶│  Service Worker │                   │
│   │   (Vite Build)  │         │   (Workbox PWA) │                   │
│   └────────┬────────┘         └─────────────────┘                   │
│            │                                                          │
│            ▼ HTTPS                                                    │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    Lovable Cloud Backend                     │   │
│   ├─────────────────────────────────────────────────────────────┤   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │   │
│   │  │   Auth   │  │ Database │  │   Edge   │  │  Storage │    │   │
│   │  │ Service  │  │(Postgres)│  │Functions │  │  (S3)    │    │   │
│   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

#### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml (example)
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e

  deploy:
    runs-on: ubuntu-latest
    needs: [test, e2e]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      # Lovable handles deployment automatically
      - run: echo "Deployed via Lovable"
```

#### Environment Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Backend API URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Public API key |
| `VITE_SUPABASE_PROJECT_ID` | Yes | Project identifier |
| `RESEND_API_KEY` | For email | Email service key |

#### Monitoring & Alerting

**Health Checks**:
- Frontend: HTTP 200 on `/`
- Edge Functions: HTTP 200 on `/functions/v1/health`
- Database: Connection pool status

**Key Metrics**:
| Metric | Warning | Critical |
|--------|---------|----------|
| Response Time (p95) | > 2s | > 5s |
| Error Rate | > 1% | > 5% |
| Database Connections | > 80% | > 95% |
| Edge Function Duration | > 10s | > 30s |

#### Backup & Recovery

**Automated Backups** (via Lovable Cloud):
- Daily database snapshots
- Point-in-time recovery (last 7 days)
- Cross-region replication available

**Recovery Procedures**:
```bash
# Database restore (via Lovable Cloud UI)
1. Navigate to Backend → Settings → Backups
2. Select restore point
3. Confirm restoration

# Application rollback
1. Navigate to Lovable → Version History
2. Select previous working version
3. Click "Restore"
```

---

## 3. System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Client Layer                                 │
│                                                                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │  Browser   │  │    PWA     │  │   Mobile   │  │  Offline   │     │
│  │   (React)  │  │ (Installed)│  │  (Future)  │  │  (Cache)   │     │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘     │
│        │               │               │               │              │
│        └───────────────┴───────┬───────┴───────────────┘              │
│                                │                                       │
│  ┌─────────────────────────────┴─────────────────────────────────┐   │
│  │                     Service Worker (Workbox)                   │   │
│  │  - Cache-first for assets  - Network-first for API           │   │
│  │  - Background sync         - Push notifications (future)      │   │
│  └───────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │ HTTPS/WSS
┌──────────────────────────────────┴───────────────────────────────────┐
│                         Backend Layer (Lovable Cloud)                 │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                        API Gateway                               │ │
│  │  - JWT Validation    - Rate Limiting    - Request Routing       │ │
│  └─────────────────────────────┬───────────────────────────────────┘ │
│                                │                                      │
│  ┌─────────┬─────────┬─────────┴─────────┬─────────┬─────────┐      │
│  │         │         │                   │         │         │      │
│  ▼         ▼         ▼                   ▼         ▼         ▼      │
│ ┌───────┐┌───────┐┌───────┐       ┌───────┐┌───────┐┌───────┐      │
│ │ Auth  ││ CRUD  ││Realtime│       │ Edge  ││Storage││  AI   │      │
│ │Service││  API  ││  Subs  │       │ Funcs ││ (S3)  ││Gateway│      │
│ └───────┘└───────┘└───────┘       └───────┘└───────┘└───────┘      │
│     │        │        │               │        │        │           │
│     └────────┴────────┴───────┬───────┴────────┴────────┘           │
│                               │                                      │
│  ┌────────────────────────────┴────────────────────────────────────┐│
│  │                    PostgreSQL Database                          ││
│  │  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐              ││
│  │  │  Users   ││ Profiles ││ Personas ││Knowledge │              ││
│  │  │& Roles   ││& Analytics││ & Hats   ││  Base    │              ││
│  │  └──────────┘└──────────┘└──────────┘└──────────┘              ││
│  │  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐              ││
│  │  │ Feedback ││Dashboards││Scheduled ││ Anomaly  │              ││
│  │  │& Requests││ Configs  ││ Reports  ││  Alerts  │              ││
│  │  └──────────┘└──────────┘└──────────┘└──────────┘              ││
│  └─────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

### Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        React Application                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐  │
│  │     Pages       │───▶│   Components    │───▶│   UI Library    │  │
│  │                 │    │                 │    │  (shadcn/ui)    │  │
│  │ - LandingPage   │    │ - ProfileCard   │    │                 │  │
│  │ - DashboardPage │    │ - PersonaCard   │    │ - Button        │  │
│  │ - AIExplorer    │    │ - DocumentCard  │    │ - Card          │  │
│  │ - KnowledgeBase │    │ - PlatformCard  │    │ - Dialog        │  │
│  └────────┬────────┘    └────────┬────────┘    │ - Tabs          │  │
│           │                      │             └─────────────────┘  │
│           ▼                      ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Custom Hooks Layer                       │    │
│  │                                                               │    │
│  │  useProfiles    usePersonas    useKnowledgeBase              │    │
│  │  useFeedback    useAIRecommendations    useDashboardConfig   │    │
│  │  useAuth        useOnboarding    useAnalytics                │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    TanStack Query                            │    │
│  │         (Caching, Deduplication, Background Refresh)         │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Supabase Client   │
                    │  @supabase/supabase │
                    └─────────────────────┘
```

---

## 4. Data Models & API Reference

### Database Schema

#### Core Tables

```sql
-- User Profiles (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Roles (separate table for security)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enterprise Profiles
CREATE TABLE enterprise_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  status profile_status DEFAULT 'draft',
  company_info JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  services JSONB DEFAULT '{}',
  team JSONB DEFAULT '{}',
  compliance JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Employee Personas
CREATE TABLE employee_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  job_title TEXT,
  communication_style JSONB DEFAULT '{}',
  work_preferences JSONB DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  expertise_areas TEXT[] DEFAULT '{}',
  tools_used TEXT[] DEFAULT '{}',
  pain_points TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  ai_interaction_style TEXT DEFAULT 'balanced',
  preferred_response_length TEXT DEFAULT 'medium',
  preferred_tone TEXT DEFAULT 'professional',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Employee Hats (Roles per Persona)
CREATE TABLE employee_hats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id UUID REFERENCES employee_personas ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  key_tasks TEXT[] DEFAULT '{}',
  stakeholders TEXT[] DEFAULT '{}',
  tools TEXT[] DEFAULT '{}',
  time_percentage INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 1,
  ai_suggestions JSONB DEFAULT '{}',
  optimized_prompt TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Knowledge Base Documents
CREATE TABLE knowledge_base_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  folder_id UUID REFERENCES knowledge_base_folders,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback & Feature Requests
CREATE TABLE feedback_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  platform_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  category TEXT,
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### Enums

```sql
CREATE TYPE app_role AS ENUM ('admin', 'manager', 'user');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE profile_status AS ENUM ('draft', 'published', 'archived');
```

### API Endpoints (Edge Functions)

| Function | Method | Description |
|----------|--------|-------------|
| `ai-recommendations` | POST | Generate AI platform recommendations |
| `generate-document` | POST | AI-powered document generation |
| `generate-persona` | POST | Auto-fill persona from job details |
| `generate-persona-prompts` | POST | Create ecosystem-specific prompts |
| `generate-profile-content` | POST | AI content for enterprise profiles |
| `generate-onboarding-suggestions` | POST | Personalized onboarding tips |
| `send-scheduled-report` | POST | Email scheduled analytics reports |
| `send-anomaly-alert` | POST | Email anomaly notifications |
| `send-notification` | POST | General email notifications |
| `track-analytics` | POST | Track user events |
| `validate-api-key` | POST | Verify external API keys |

#### Example API Call

```typescript
// Using ai-recommendations
const response = await supabase.functions.invoke('ai-recommendations', {
  body: {
    usagePatterns: {
      primaryUseCase: 'content_generation',
      teamSize: 25,
      technicalLevel: 'intermediate',
      budget: 'medium',
      integrationNeeds: ['slack', 'github'],
    },
  },
});

// Response structure
{
  "success": true,
  "recommendations": {
    "primaryPlatform": {
      "id": "claude",
      "name": "Claude 3.5",
      "matchScore": 92,
      "reasoning": "Best for content generation with strong writing capabilities"
    },
    "alternativePlatforms": [...],
    "implementationSteps": [...],
    "estimatedROI": {...}
  }
}
```

---

## 5. Configuration Reference

### Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_SUPABASE_URL` | string | - | Backend API endpoint |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | string | - | Public anon key |
| `VITE_SUPABASE_PROJECT_ID` | string | - | Project identifier |
| `RESEND_API_KEY` | string | - | Email service (edge functions) |

### Tailwind Configuration

Key theme extensions in `tailwind.config.ts`:

```typescript
// Design tokens
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {...},
  muted: {...},
  accent: {...},
  destructive: {...},
}

// FlashFusion Design System
"eclipse-navy": "hsl(220, 40%, 13%)",
"cloudburst-blue": "hsl(210, 100%, 50%)",
"purple-highlight": "hsl(270, 70%, 60%)",
"signature-orange": "hsl(25, 95%, 55%)",
```

### PWA Configuration

```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'pwa-icons/*.png'],
  manifest: {
    name: 'INT OS',
    short_name: 'INT OS',
    theme_color: '#1a1f2e',
    background_color: '#1a1f2e',
    display: 'standalone',
    icons: [
      { src: '/pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
        handler: 'NetworkFirst',
        options: { cacheName: 'api-cache', expiration: { maxEntries: 100 } },
      },
    ],
  },
})
```

---

## 6. User Flows & Workflows

### Authentication Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                     Authentication Flow                           │
└──────────────────────────────────────────────────────────────────┘

     ┌─────────┐        ┌─────────┐        ┌─────────┐
     │  User   │        │   App   │        │  Auth   │
     └────┬────┘        └────┬────┘        └────┬────┘
          │                  │                  │
          │  1. Navigate     │                  │
          │─────────────────▶│                  │
          │                  │                  │
          │                  │  2. Check Auth   │
          │                  │─────────────────▶│
          │                  │                  │
          │                  │  3. No Session   │
          │                  │◀─────────────────│
          │                  │                  │
          │  4. Show Login   │                  │
          │◀─────────────────│                  │
          │                  │                  │
          │  5. Enter Creds  │                  │
          │─────────────────▶│                  │
          │                  │                  │
          │                  │  6. Sign In      │
          │                  │─────────────────▶│
          │                  │                  │
          │                  │  7. JWT Token    │
          │                  │◀─────────────────│
          │                  │                  │
          │  8. Redirect     │                  │
          │◀─────────────────│                  │
          │   to Dashboard   │                  │
          │                  │                  │
```

### Persona Creation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Persona Creation Workflow                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │  1. Start   │───▶│  2. Basic   │───▶│  3. Work    │              │
│  │   Wizard    │    │    Info     │    │   Prefs     │              │
│  └─────────────┘    └─────────────┘    └──────┬──────┘              │
│                                               │                      │
│                      ┌────────────────────────┘                      │
│                      ▼                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │  6. Export  │◀───│  5. Review  │◀───│  4. Add     │              │
│  │  Ecosystem  │    │   & Edit    │    │   Hats      │              │
│  └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     AI Assistance Available                  │    │
│  │  • Auto-fill from job title                                 │    │
│  │  • Generate role descriptions                               │    │
│  │  • Optimize prompts for each ecosystem                      │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### AI Recommendation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                  AI Recommendation Engine Flow                       │
└─────────────────────────────────────────────────────────────────────┘

User Input                    Processing                    Output
───────────                   ──────────                    ──────
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│ Use Case    │              │             │              │ Primary     │
│ Selection   │──────────────│             │──────────────│ Platform    │
└─────────────┘              │             │              └─────────────┘
                             │   Edge      │
┌─────────────┐              │  Function   │              ┌─────────────┐
│ Team Size   │──────────────│             │──────────────│ Alternatives│
│ & Budget    │              │  ai-recs    │              └─────────────┘
└─────────────┘              │             │
                             │             │              ┌─────────────┐
┌─────────────┐              │   Gemini    │              │ ROI         │
│ Integration │──────────────│    API      │──────────────│ Estimate    │
│ Needs       │              │             │              └─────────────┘
└─────────────┘              │             │
                             └─────────────┘              ┌─────────────┐
                                                          │ Action      │
                                                          │ Steps       │
                                                          └─────────────┘
```

---

## 7. Testing & Quality Assurance

### Test Coverage Expectations

| Category | Target | Current |
|----------|--------|---------|
| Unit Tests | 80% | ~75% |
| Component Tests | 70% | ~65% |
| Integration Tests | 60% | ~55% |
| E2E Tests | Key flows | ✓ |

### Running Tests

```bash
# Unit & Component Tests (Vitest)
npm run test              # Single run
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

# E2E Tests (Playwright)
npx playwright test       # Run all E2E tests
npx playwright test --ui  # Interactive mode
npx playwright show-report # View results
```

### Test File Structure

```
src/
├── components/
│   └── my-component/
│       ├── MyComponent.tsx
│       └── __tests__/
│           └── MyComponent.test.tsx
├── hooks/
│   └── __tests__/
│       └── useMyHook.test.ts
└── lib/
    └── pwa/
        └── __tests__/
            └── offline-storage.test.ts

e2e/
├── app.spec.ts          # Core app flows
└── pwa.spec.ts          # PWA-specific tests
```

### Writing Tests

```typescript
// Component Test Example
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyComponent } from '../MyComponent';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('MyComponent', () => {
  it('renders and handles user interaction', async () => {
    const onSubmit = vi.fn();
    render(<MyComponent onSubmit={onSubmit} />, { wrapper: createWrapper() });

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
```

### CI Integration

Tests run automatically on:
- Every pull request
- Push to main branch
- Pre-deployment

---

## 8. Security & Compliance

### Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Security Architecture                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Client (Browser)                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │  Auth Form   │  │ JWT Storage  │  │   RLS Token  │        │  │
│  │  │ (React Hook  │  │ (Memory,     │  │  (Supabase   │        │  │
│  │  │   Form)      │  │  HttpOnly)   │  │    Auto)     │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │ HTTPS Only                            │
│  ┌───────────────────────────┴───────────────────────────────────┐  │
│  │                    Backend Security Layer                      │  │
│  │                                                                 │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │   API Key    │  │  JWT Valid   │  │    Rate      │        │  │
│  │  │  Validation  │  │   ation      │  │   Limiting   │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  │                                                                 │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              Row Level Security (RLS)                    │  │  │
│  │  │                                                           │  │  │
│  │  │  • Users see only their own data                         │  │  │
│  │  │  • Admins have elevated access                           │  │  │
│  │  │  • Public data explicitly marked                         │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### RLS Policy Examples

```sql
-- Users can only access their own personas
CREATE POLICY "Users can CRUD own personas" ON employee_personas
  FOR ALL USING (auth.uid() = user_id);

-- Knowledge base documents with public option
CREATE POLICY "Users can read own or public docs" ON knowledge_base_documents
  FOR SELECT USING (
    auth.uid() = user_id OR is_public = true
  );

-- Admin access pattern (using security definer function)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### OWASP Top 10 Considerations

| Risk | Mitigation |
|------|------------|
| **Injection** | Parameterized queries via Supabase SDK |
| **Broken Auth** | JWT tokens, secure session handling |
| **Sensitive Data** | HTTPS only, encrypted at rest |
| **XXE** | Not applicable (no XML processing) |
| **Broken Access** | RLS policies on all tables |
| **Security Misconfig** | Secure defaults, no debug in prod |
| **XSS** | React's built-in escaping |
| **Insecure Deserialization** | JSON only, validated schemas |
| **Known Vulns** | Regular `npm audit`, dependency updates |
| **Logging** | Audit logs for sensitive operations |

### Secrets Management

**DO**:
- Store secrets in environment variables
- Use Lovable Cloud Secrets for edge functions
- Rotate API keys periodically
- Use least-privilege access

**DON'T**:
- Hardcode secrets in code
- Log sensitive data
- Store secrets in localStorage
- Commit `.env` files

---

## 9. Observability & Operations

### Logging Conventions

```typescript
// Edge Function Logging
console.log('[ai-recommendations] Request received:', {
  userId: user.id,
  useCase: body.usagePatterns.primaryUseCase,
  timestamp: new Date().toISOString(),
});

console.error('[ai-recommendations] Error:', {
  error: error.message,
  stack: error.stack,
  userId: user?.id,
});
```

### Metrics Dashboard

Key metrics to monitor:

| Metric | Query | Alert Threshold |
|--------|-------|-----------------|
| Active Users (DAU) | `SELECT COUNT(DISTINCT user_id) FROM analytics_events WHERE created_at > NOW() - INTERVAL '1 day'` | < 10 |
| Error Rate | Edge function error logs | > 5% |
| Assessment Completion | `SELECT COUNT(*) FROM ai_assessments WHERE recommendations IS NOT NULL` | - |
| Document Creation | `SELECT COUNT(*) FROM knowledge_base_documents WHERE created_at > NOW() - INTERVAL '1 day'` | - |

### Anomaly Detection

The system includes automated anomaly detection:

```typescript
// Anomaly types tracked
- usage_spike     // Unusual activity increase
- error_rate      // Elevated error percentage
- performance     // Slow response times
- security        // Suspicious access patterns
```

### Backup Procedures

**Automatic** (Lovable Cloud):
- Daily database snapshots
- 7-day retention
- Point-in-time recovery

**Manual Export**:
```sql
-- Export user data
SELECT * FROM employee_personas WHERE user_id = 'uuid';
SELECT * FROM knowledge_base_documents WHERE user_id = 'uuid';
```

---

## 10. Examples & Use Cases

### Use Case 1: Creating an AI Persona

```typescript
// 1. Create base persona
const { data: persona } = await supabase
  .from('employee_personas')
  .insert({
    name: 'Sarah Chen',
    job_title: 'Senior Product Manager',
    department: 'Product',
    skills: ['Roadmapping', 'User Research', 'Agile'],
    goals: ['Launch MVP by Q3', 'Improve user retention'],
  })
  .select()
  .single();

// 2. Add hats (roles)
await supabase.from('employee_hats').insert([
  {
    persona_id: persona.id,
    name: 'Product Strategy',
    time_percentage: 40,
    responsibilities: ['Define product vision', 'Prioritize backlog'],
  },
  {
    persona_id: persona.id,
    name: 'Stakeholder Management',
    time_percentage: 30,
    responsibilities: ['Executive updates', 'Cross-team alignment'],
  },
]);

// 3. Generate ecosystem prompt
const { data: prompts } = await supabase.functions.invoke('generate-persona-prompts', {
  body: { personaId: persona.id, ecosystems: ['claude', 'copilot', 'gemini'] },
});
```

### Use Case 2: Knowledge Base Document

```typescript
// Create document with version tracking
const { data: doc } = await supabase
  .from('knowledge_base_documents')
  .insert({
    title: 'AI Implementation Guide',
    slug: 'ai-implementation-guide',
    content: '# AI Implementation Guide\n\n## Overview...',
    category: 'methodology',
    tags: ['AI', 'implementation', 'best-practices'],
    is_public: false,
  })
  .select()
  .single();

// Auto-create version
await supabase.from('document_versions').insert({
  document_id: doc.id,
  version_number: 1,
  title: doc.title,
  content: doc.content,
  change_summary: 'Initial creation',
});
```

### Use Case 3: AI Platform Recommendation

```typescript
// Get personalized recommendations
const { data } = await supabase.functions.invoke('ai-recommendations', {
  body: {
    usagePatterns: {
      primaryUseCase: 'code_generation',
      teamSize: 50,
      technicalLevel: 'advanced',
      budget: 'enterprise',
      integrationNeeds: ['github', 'jira', 'slack'],
      complianceRequirements: ['soc2', 'gdpr'],
    },
  },
});

// Result includes:
// - Primary platform recommendation with match score
// - Alternative platforms ranked
// - Implementation roadmap
// - ROI projections
```

---

## 11. Troubleshooting Guide

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **Auth Fails** | "Invalid credentials" error | Clear cookies, check email confirmation |
| **Data Not Loading** | Spinner indefinitely | Check network tab, verify RLS policies |
| **Edge Function Timeout** | 504 Gateway Timeout | Reduce payload size, check function logs |
| **PWA Not Installing** | Install prompt missing | Ensure HTTPS, check manifest |
| **Offline Mode Issues** | Stale data, sync failures | Clear cache, trigger manual sync |
| **Type Errors** | TS compilation fails | Run `npm run type-check`, regenerate types |
| **Build Fails** | Vite build error | Clear `node_modules`, reinstall |
| **RLS Blocking Data** | Empty results when data exists | Verify `auth.uid()` matches `user_id` |

### Debug Commands

```bash
# Clear all caches
rm -rf node_modules .vite dist
npm install

# Check for type errors
npx tsc --noEmit

# Verify environment
echo $VITE_SUPABASE_URL

# Test edge function locally
supabase functions serve my-function --env-file .env

# Check RLS policies
# Run in Supabase SQL Editor:
SELECT * FROM pg_policies WHERE tablename = 'employee_personas';
```

---

## 12. Version History & Changelog

### v2.0.0 (2026-01-22)

**Major Features**:
- ✨ AI Recommendation Engine with usage pattern analysis
- ✨ Custom Dashboard Builder with drag-and-drop widgets
- ✨ Email Notifications for scheduled reports and anomaly alerts
- ✨ Feedback Dashboard with ratings and feature requests
- ✨ Enhanced Analytics with trend visualization

**Database Changes**:
- Added `feedback_ratings` table
- Added `feature_requests` table
- Added `user_dashboard_configs` table
- Added `scheduled_reports` table
- Added `anomaly_alerts` table

**Edge Functions**:
- `ai-recommendations` - AI platform matching
- `send-scheduled-report` - Email reports
- `send-anomaly-alert` - Anomaly notifications

### v1.5.0 (2026-01-15)

- Executive Summary Dashboard
- AI Governance Tab
- Implementation Planning Tab
- Enhanced Analytics Tab

### v1.0.0 (2026-01-01)

**Initial Release**:
- Enterprise Profile Management
- Employee Persona Builder
- Knowledge Base System
- AI Platform Explorer
- PWA Support

### Upgrade Instructions

**v1.x → v2.x**:

1. Database migrations run automatically
2. Clear browser cache for PWA updates
3. Update any custom integrations to use new endpoints
4. Review new RLS policies for feedback tables

---

## Appendix: Style Guide

### Terminology

| Term | Definition |
|------|------------|
| **Persona** | AI-ready employee configuration |
| **Hat** | A specific role within a persona |
| **Ecosystem** | AI platform (Claude, Copilot, Gemini) |
| **Assessment** | AI readiness evaluation |
| **Platform** | Individual AI tool/service |

### Code Style

**TypeScript**:
- Strict mode enabled
- Explicit return types
- Avoid `any`
- Use `interface` over `type` for objects

**React**:
- Functional components only
- Hooks for state and effects
- Co-locate tests with components
- Use `cn()` for conditional classes

**Naming**:
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `PascalCase.tsx` (components), `kebab-case.ts` (utilities)

### Documentation Standards

- Use Markdown for all docs
- Include code examples
- Keep headings hierarchical
- Update on every major change
- Link related documents

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

**Document Maintainers**: Platform Team  
**Review Cycle**: Quarterly  
**Feedback**: Create issue or PR in repository
