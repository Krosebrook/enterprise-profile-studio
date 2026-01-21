import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  ArrowRight, 
  Trash2, 
  MoreHorizontal,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EmployeePersona } from '@/types/employee-persona';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PersonaCardProps {
  persona: EmployeePersona;
  onEdit: () => void;
  onDelete: () => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

// Calculate persona completion percentage
function calculateCompletion(persona: EmployeePersona): number {
  const fields = [
    persona.name,
    persona.job_title,
    persona.department,
    persona.email,
    (persona.skills?.length || 0) > 0,
    (persona.expertise_areas?.length || 0) > 0,
    (persona.tools_used?.length || 0) > 0,
    (persona.pain_points?.length || 0) > 0,
    (persona.goals?.length || 0) > 0,
    persona.ai_interaction_style,
    persona.preferred_tone,
    persona.preferred_response_length,
  ];
  
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

// Get department color
function getDepartmentColor(department?: string | null): string {
  const colors: Record<string, string> = {
    'Information Security': 'bg-red-500',
    'InfoSec': 'bg-red-500',
    'IT': 'bg-blue-500',
    'Technology': 'bg-blue-500',
    'Marketing': 'bg-pink-500',
    'Sales': 'bg-green-500',
    'Operations': 'bg-orange-500',
    'Finance': 'bg-emerald-500',
    'HR': 'bg-purple-500',
    'Legal': 'bg-slate-500',
    'Customer Success': 'bg-cyan-500',
    'Development': 'bg-indigo-500',
  };
  
  if (!department) return 'bg-muted-foreground';
  
  for (const [key, value] of Object.entries(colors)) {
    if (department.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return 'bg-primary';
}

export function PersonaCard({ 
  persona, 
  onEdit, 
  onDelete,
  isSelected = false,
  onToggleSelect
}: PersonaCardProps) {
  const completion = calculateCompletion(persona);
  const departmentColor = getDepartmentColor(persona.department);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          'hover:shadow-lg hover:border-primary/30',
          isSelected && 'ring-2 ring-primary border-primary'
        )}
      >
        {/* Top accent bar */}
        <div className={cn('absolute top-0 left-0 right-0 h-1', departmentColor)} />
        
        {/* Selection checkbox overlay */}
        {onToggleSelect && (
          <button
            onClick={onToggleSelect}
            className={cn(
              'absolute top-3 right-3 w-5 h-5 rounded border-2 transition-all z-10',
              isSelected 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'border-muted-foreground/30 hover:border-primary'
            )}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4" />}
          </button>
        )}
        
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg',
                departmentColor
              )}>
                {persona.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              {persona.status === 'active' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-base truncate">{persona.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {persona.job_title || 'No title'}
                    {persona.department && ` • ${persona.department}`}
                  </p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Edit Persona
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {persona.skills?.slice(0, 3).map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
                {(persona.skills?.length || 0) > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{(persona.skills?.length || 0) - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Completion progress */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {completion === 100 ? (
                  <>
                    <Sparkles className="h-3 w-3 text-primary" />
                    Profile Complete
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    {completion}% Complete
                  </>
                )}
              </span>
              <Badge 
                variant={persona.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {persona.status}
              </Badge>
            </div>
            <Progress value={completion} className="h-1.5" />
          </div>
          
          {/* Quick action */}
          <Button 
            variant="ghost" 
            className="w-full mt-3 justify-between group/btn"
            onClick={onEdit}
          >
            <span>Configure Persona</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
