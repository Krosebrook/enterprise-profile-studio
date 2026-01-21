import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { useCreateDocument } from '@/hooks/useKnowledgeBase';
import type { EmployeePersona } from '@/types/employee-persona';
import { toast } from 'sonner';

interface GeneratePersonaDocButtonProps {
  persona: EmployeePersona;
}

function formatArrayAsList(arr: string[] | undefined, fallback = 'Not specified'): string {
  if (!arr || arr.length === 0) return fallback;
  return arr.map((item, i) => `${i + 1}. ${item}`).join('\n');
}

function formatArrayAsBullets(arr: string[] | undefined, fallback = 'Not specified'): string {
  if (!arr || arr.length === 0) return `- ${fallback}`;
  return arr.map(item => `- ${item}`).join('\n');
}

function generatePersonaDocument(persona: EmployeePersona): string {
  const now = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const formality = persona.communication_style?.formality || 'balanced';
  const detailLevel = persona.communication_style?.detail_level || 'balanced';
  const technicalDepth = persona.communication_style?.technical_depth || 'balanced';
  const examplesPreference = persona.communication_style?.examples_preference || 'moderate';

  const focusTime = persona.work_preferences?.focus_time || 'flexible';
  const collaborationStyle = persona.work_preferences?.collaboration_style || 'mixed';
  const decisionMaking = persona.work_preferences?.decision_making || 'collaborative';
  const feedbackPreference = persona.work_preferences?.feedback_preference || 'diplomatic';

  const formalityMap: Record<string, string> = {
    casual: 'Casual',
    balanced: 'Professional',
    formal: 'Formal'
  };

  const detailMap: Record<string, string> = {
    concise: 'Brief',
    balanced: 'Moderate',
    detailed: 'Detailed'
  };

  const technicalMap: Record<string, string> = {
    simplified: 'Avoid jargon, use simple explanations',
    balanced: 'Use appropriate technical terms with context',
    technical: 'Include technical jargon, assume expertise'
  };

  const decisionMap: Record<string, string> = {
    data_driven: 'Data-driven',
    intuitive: 'Intuitive',
    collaborative: 'Collaborative'
  };

  const feedbackMap: Record<string, string> = {
    direct: 'Direct',
    diplomatic: 'Diplomatic',
    coaching: 'Coaching-oriented'
  };

  const collaborationMap: Record<string, string> = {
    async: 'Asynchronous (email, docs)',
    realtime: 'Real-time (meetings, chat)',
    mixed: 'Mixed approach'
  };

  const focusTimeMap: Record<string, string> = {
    morning: 'Morning (8am-12pm)',
    afternoon: 'Afternoon (12pm-5pm)',
    evening: 'Evening (5pm+)',
    flexible: 'Flexible/varies'
  };

  const responseLengthMap: Record<string, string> = {
    short: 'Concise - get to the point quickly',
    medium: 'Moderate - balanced detail',
    long: 'Detailed - comprehensive responses'
  };

  const interactionStyleMap: Record<string, string> = {
    concise: 'Brief, action-oriented responses',
    balanced: 'Balanced explanation and action',
    comprehensive: 'Thorough analysis and context'
  };

  // Generate the Claude system prompt
  const claudePrompt = `You are an AI assistant configured for ${persona.name}, a ${persona.job_title || 'Professional'} in ${persona.department || 'the organization'}.

Communication style: ${formalityMap[formality]}, ${detailMap[detailLevel]} responses.
Technical depth: ${technicalMap[technicalDepth]}
Expertise areas: ${persona.expertise_areas?.join(', ') || 'General'}
Key skills: ${persona.skills?.slice(0, 5).join(', ') || 'Various'}

When responding:
- Use a ${persona.preferred_tone || 'professional'} tone
- Provide ${responseLengthMap[persona.preferred_response_length || 'medium']}
- ${interactionStyleMap[persona.ai_interaction_style || 'balanced']}
- Consider their tools: ${persona.tools_used?.slice(0, 5).join(', ') || 'standard office tools'}

Help them achieve: ${persona.goals?.slice(0, 3).join('; ') || 'their professional objectives'}`;

  // Generate the Copilot prompt
  const copilotPrompt = `# User Context: ${persona.name}
Role: ${persona.job_title || 'Professional'} | ${persona.department || 'Organization'}

## Preferences
- Response style: ${detailMap[detailLevel]}, ${formalityMap[formality].toLowerCase()}
- Technical level: ${technicalDepth}
- Primary skills: ${persona.skills?.slice(0, 5).join(', ') || 'Various'}
- Tools used: ${persona.tools_used?.slice(0, 5).join(', ') || 'Microsoft 365'}

## Objectives
${persona.goals?.map(g => `- ${g}`).join('\n') || '- Support professional tasks'}`;

  // Generate the Gemini prompt
  const geminiPrompt = `Configure responses for ${persona.name} (${persona.job_title || 'Professional'}, ${persona.department || 'Organization'}):

Style: ${formalityMap[formality]} and ${detailMap[detailLevel].toLowerCase()}
Expertise: ${persona.expertise_areas?.join(', ') || 'General professional knowledge'}
Tools context: ${persona.tools_used?.join(', ') || 'Standard productivity tools'}
Goals: ${persona.goals?.slice(0, 3).join('; ') || 'Professional effectiveness'}
Tone: ${persona.preferred_tone || 'professional'}`;

  return `# AI Persona Configuration: ${persona.name}

**Role:** ${persona.job_title || 'Not specified'}
**Department:** ${persona.department || 'Not specified'}
**Generated:** ${now}

---

## 1. Core Identity and Objective

I am **${persona.name}**, a **${persona.job_title || 'Professional'}** in the **${persona.department || 'Organization'}** department.

### Professional Focus
${formatArrayAsBullets(persona.expertise_areas, 'General professional responsibilities')}

### Working Context
- Collaboration style: ${collaborationMap[collaborationStyle]}
- Decision-making: ${decisionMap[decisionMaking]}
- Feedback preference: ${feedbackMap[feedbackPreference]}

---

## 2. Communication Style

### Tone Preferences
- **Formality:** ${formalityMap[formality]}
- **Detail Level:** ${detailMap[detailLevel]}
- **Technical Depth:** ${technicalDepth.charAt(0).toUpperCase() + technicalDepth.slice(1)}
- **Examples Preference:** ${examplesPreference.charAt(0).toUpperCase() + examplesPreference.slice(1)}

### Output Standards
- Preferred tone: ${persona.preferred_tone || 'professional'}
- Response length: ${persona.preferred_response_length || 'medium'}
- AI interaction style: ${persona.ai_interaction_style || 'balanced'}

---

## 3. Expertise Areas

### Core Skills
${formatArrayAsList(persona.skills, 'Skills not specified')}

### Domain Knowledge
${formatArrayAsBullets(persona.expertise_areas, 'Expertise areas not specified')}

### Tools & Technologies
${formatArrayAsBullets(persona.tools_used, 'Tools not specified')}

---

## 4. Work Preferences

### Decision-Making Style
- Approach: ${decisionMap[decisionMaking]}
- Collaboration: ${collaborationMap[collaborationStyle]}
- Feedback style: ${feedbackMap[feedbackPreference]}

### Productivity Patterns
- Peak focus hours: ${focusTimeMap[focusTime]}
- Preferred collaboration: ${collaborationMap[collaborationStyle]}

---

## 5. AI Interaction Preferences

### How I Want AI to Help Me

**Response Preferences:**
- Length: ${responseLengthMap[persona.preferred_response_length || 'medium']}
- Style: ${interactionStyleMap[persona.ai_interaction_style || 'balanced']}
- Tone: ${persona.preferred_tone || 'professional'}

**Reasoning Framework:**
- Technical depth: ${technicalMap[technicalDepth]}
- Examples: ${examplesPreference} use of examples and analogies

---

## 6. Current Goals & Priorities

### Goals
${formatArrayAsList(persona.goals, 'Goals not specified')}

---

## 7. Pain Points & Challenges

### Daily Frustrations
${formatArrayAsBullets(persona.pain_points, 'Pain points not specified')}

---

## 8. Platform-Specific Instructions

### For Claude

\`\`\`
${claudePrompt}
\`\`\`

### For Microsoft Copilot

\`\`\`
${copilotPrompt}
\`\`\`

### For Google Gemini

\`\`\`
${geminiPrompt}
\`\`\`

---

## Usage Instructions

1. **Claude:** Copy the Claude prompt above and paste it into Claude's Projects or as a system prompt
2. **Microsoft Copilot:** Use the Copilot section in Microsoft 365 Copilot settings
3. **Google Gemini:** Add to Gems or use as context in Gemini Advanced

---

*This configuration was auto-generated from the ${persona.name} persona profile.*
`;
}

export function GeneratePersonaDocButton({ persona }: GeneratePersonaDocButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const createDocument = useCreateDocument();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const content = generatePersonaDocument(persona);
      const slug = `ai-config-${persona.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      
      const doc = await createDocument.mutateAsync({
        title: `AI Configuration: ${persona.name}`,
        slug,
        content,
        description: `AI persona configuration for ${persona.name} (${persona.job_title || 'Professional'}) - includes Claude, Copilot, and Gemini prompts`,
        category: 'AI Configuration',
        tags: ['persona', 'ai-config', persona.department?.toLowerCase() || 'general', 'auto-generated'],
        is_public: false,
      });

      toast.success('Document created', {
        description: 'AI configuration document saved to Knowledge Base',
      });

      navigate(`/knowledge/${doc.slug}`);
    } catch (error) {
      console.error('Failed to generate document:', error);
      toast.error('Failed to create document');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleGenerate} 
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          Generate Knowledge Base Document
        </>
      )}
    </Button>
  );
}
