import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Download, 
  Loader2, 
  Bot, 
  CheckCircle2,
  AlertCircle,
  FileArchive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EmployeePersona, EmployeeHat } from '@/types/employee-persona';
import JSZip from 'jszip';

interface BulkExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personas: EmployeePersona[];
}

type ExportStatus = 'pending' | 'processing' | 'success' | 'error';

interface PersonaExportStatus {
  id: string;
  name: string;
  status: ExportStatus;
  error?: string;
}

export function BulkExportDialog({
  open,
  onOpenChange,
  personas,
}: BulkExportDialogProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatuses, setExportStatuses] = useState<PersonaExportStatus[]>([]);
  const [progress, setProgress] = useState(0);

  const ecosystems = ['claude', 'copilot', 'gemini'] as const;

  const togglePersona = (id: string) => {
    const newSet = new Set(selectedPersonas);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedPersonas(newSet);
  };

  const toggleAll = () => {
    if (selectedPersonas.size === personas.length) {
      setSelectedPersonas(new Set());
    } else {
      setSelectedPersonas(new Set(personas.map(p => p.id)));
    }
  };

  const fetchPersonaHats = async (personaId: string): Promise<EmployeeHat[]> => {
    const { data } = await supabase
      .from('employee_hats')
      .select('*')
      .eq('persona_id', personaId);
    return (data || []) as unknown as EmployeeHat[];
  };

  const generatePromptForEcosystem = async (
    persona: EmployeePersona,
    hats: EmployeeHat[],
    ecosystem: string
  ): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('generate-persona-prompts', {
      body: {
        type: ecosystem,
        persona,
        hats,
      },
    });

    if (error) throw error;
    return data.prompt || data.content || '';
  };

  const handleExport = async () => {
    if (selectedPersonas.size === 0) {
      toast.error('Please select at least one persona');
      return;
    }

    setIsExporting(true);
    setProgress(0);
    
    const selectedList = personas.filter(p => selectedPersonas.has(p.id));
    const statuses: PersonaExportStatus[] = selectedList.map(p => ({
      id: p.id,
      name: p.name,
      status: 'pending' as ExportStatus,
    }));
    setExportStatuses(statuses);

    const zip = new JSZip();
    const totalSteps = selectedList.length * ecosystems.length;
    let completedSteps = 0;

    for (const persona of selectedList) {
      // Update status to processing
      setExportStatuses(prev => prev.map(s => 
        s.id === persona.id ? { ...s, status: 'processing' } : s
      ));

      try {
        const hats = await fetchPersonaHats(persona.id);
        const personaFolder = zip.folder(sanitizeFilename(persona.name));

        for (const ecosystem of ecosystems) {
          try {
            const content = await generatePromptForEcosystem(persona, hats, ecosystem);
            personaFolder?.file(`${ecosystem}_prompt.txt`, content);
          } catch (err) {
            console.error(`Error generating ${ecosystem} for ${persona.name}:`, err);
            personaFolder?.file(`${ecosystem}_prompt.txt`, `Error generating prompt: ${err}`);
          }
          
          completedSteps++;
          setProgress(Math.round((completedSteps / totalSteps) * 100));
        }

        // Create persona summary
        const summary = createPersonaSummary(persona, hats);
        personaFolder?.file('persona_summary.md', summary);

        setExportStatuses(prev => prev.map(s => 
          s.id === persona.id ? { ...s, status: 'success' } : s
        ));
      } catch (error) {
        console.error(`Error processing ${persona.name}:`, error);
        setExportStatuses(prev => prev.map(s => 
          s.id === persona.id ? { ...s, status: 'error', error: String(error) } : s
        ));
        
        // Skip remaining ecosystems for this persona
        completedSteps += ecosystems.length;
        setProgress(Math.round((completedSteps / totalSteps) * 100));
      }
    }

    // Generate and download ZIP
    try {
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `persona_exports_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Export completed successfully!');
    } catch (error) {
      toast.error('Failed to create ZIP file');
      console.error('ZIP generation error:', error);
    }

    setIsExporting(false);
  };

  const sanitizeFilename = (name: string): string => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  const createPersonaSummary = (persona: EmployeePersona, hats: EmployeeHat[]): string => {
    return `# ${persona.name}

## Basic Information
- **Title**: ${persona.job_title || 'Not set'}
- **Department**: ${persona.department || 'Not set'}
- **Email**: ${persona.email || 'Not set'}
- **Status**: ${persona.status}

## Skills
${persona.skills?.map(s => `- ${s}`).join('\n') || 'None specified'}

## Expertise Areas
${persona.expertise_areas?.map(e => `- ${e}`).join('\n') || 'None specified'}

## Tools Used
${persona.tools_used?.map(t => `- ${t}`).join('\n') || 'None specified'}

## Goals
${persona.goals?.map(g => `- ${g}`).join('\n') || 'None specified'}

## Pain Points
${persona.pain_points?.map(p => `- ${p}`).join('\n') || 'None specified'}

## AI Preferences
- **Interaction Style**: ${persona.ai_interaction_style}
- **Response Length**: ${persona.preferred_response_length}
- **Tone**: ${persona.preferred_tone}

## Roles (Hats)
${hats.length > 0 ? hats.map(h => `
### ${h.name}
- **Time Allocation**: ${h.time_percentage}%
- **Description**: ${h.description || 'No description'}
- **Responsibilities**: ${h.responsibilities?.join(', ') || 'None'}
- **Key Tasks**: ${h.key_tasks?.join(', ') || 'None'}
`).join('\n') : 'No roles defined'}

---
*Generated on ${new Date().toLocaleString()}*
`;
  };

  const handleClose = () => {
    if (!isExporting) {
      setSelectedPersonas(new Set());
      setExportStatuses([]);
      setProgress(0);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileArchive className="h-5 w-5" />
            Bulk Export Personas
          </DialogTitle>
          <DialogDescription>
            Generate Claude, Copilot, and Gemini prompts for multiple personas at once
          </DialogDescription>
        </DialogHeader>

        {!isExporting && exportStatuses.length === 0 ? (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedPersonas.size} of {personas.length} selected
                </span>
                <Button variant="ghost" size="sm" onClick={toggleAll}>
                  {selectedPersonas.size === personas.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>

              <ScrollArea className="h-[300px] rounded-lg border p-3">
                <div className="space-y-2">
                  {personas.map((persona) => (
                    <label
                      key={persona.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                        selectedPersonas.has(persona.id) 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      )}
                    >
                      <Checkbox
                        checked={selectedPersonas.has(persona.id)}
                        onCheckedChange={() => togglePersona(persona.id)}
                      />
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{persona.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {persona.job_title || 'No title'} 
                          {persona.department && ` • ${persona.department}`}
                        </p>
                      </div>
                      <Badge variant={persona.status === 'active' ? 'default' : 'secondary'}>
                        {persona.status}
                      </Badge>
                    </label>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleExport} 
                disabled={selectedPersonas.size === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export {selectedPersonas.size} Persona{selectedPersonas.size !== 1 ? 's' : ''}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Generating prompts...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <ScrollArea className="h-[250px] rounded-lg border p-3">
                <div className="space-y-2">
                  {exportStatuses.map((status) => (
                    <div
                      key={status.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      {status.status === 'pending' && (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      {status.status === 'processing' && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                      {status.status === 'success' && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {status.status === 'error' && (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{status.name}</p>
                        {status.error && (
                          <p className="text-sm text-destructive">{status.error}</p>
                        )}
                      </div>
                      <Badge variant="outline">
                        {status.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {!isExporting && (
              <DialogFooter>
                <Button onClick={handleClose}>
                  Close
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
