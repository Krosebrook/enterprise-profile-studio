import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { personaTemplates, type PersonaTemplate } from '@/data/personaTemplates';
import { 
  TrendingUp, 
  Code, 
  Kanban, 
  Megaphone, 
  Heart, 
  Users, 
  Lightbulb, 
  BarChart3,
  FileText,
  Loader2,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Kanban: <Kanban className="h-5 w-5" />,
  Megaphone: <Megaphone className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Lightbulb: <Lightbulb className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
};

interface PersonaTemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: PersonaTemplate, employeeName: string) => void;
  onCreateBlank: (employeeName: string) => void;
  isLoading?: boolean;
}

export function PersonaTemplateSelector({
  open,
  onOpenChange,
  onSelectTemplate,
  onCreateBlank,
  isLoading = false,
}: PersonaTemplateSelectorProps) {
  const [employeeName, setEmployeeName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<PersonaTemplate | null>(null);

  const handleCreate = () => {
    if (!employeeName.trim()) return;
    
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate, employeeName);
    } else {
      onCreateBlank(employeeName);
    }
  };

  const handleClose = () => {
    setEmployeeName('');
    setSelectedTemplate(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Persona</DialogTitle>
          <DialogDescription>
            Start with a template or create a blank persona
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-name">Employee Name</Label>
            <Input
              id="employee-name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="e.g., John Doe"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>Choose a Template (Optional)</Label>
            <ScrollArea className="h-[350px] rounded-lg border p-3">
              <div className="grid gap-3 md:grid-cols-2">
                {/* Blank option */}
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50",
                    selectedTemplate === null 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Blank Persona</span>
                      {selectedTemplate === null && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Start from scratch with a blank template
                    </p>
                  </div>
                </button>

                {/* Template options */}
                {personaTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50",
                      selectedTemplate?.id === template.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-white",
                      template.color
                    )}>
                      {iconMap[template.icon] || <Users className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{template.name}</span>
                        {selectedTemplate?.id === template.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {template.data.department}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={!employeeName.trim() || isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {selectedTemplate ? `Create ${selectedTemplate.name}` : 'Create Blank Persona'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
