import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Sparkles } from 'lucide-react';
import type { EmployeePersona } from '@/types/employee-persona';

interface PersonaStatsBarProps {
  personas: EmployeePersona[];
}

export function PersonaStatsBar({ personas }: PersonaStatsBarProps) {
  const total = personas.length;
  const active = personas.filter(p => p.status === 'active').length;
  const drafts = personas.filter(p => p.status === 'draft').length;
  
  // Calculate average completion
  const calculateCompletion = (persona: EmployeePersona): number => {
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
  };
  
  const avgCompletion = total > 0 
    ? Math.round(personas.reduce((acc, p) => acc + calculateCompletion(p), 0) / total)
    : 0;
  
  const stats = [
    {
      label: 'Total Personas',
      value: total,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active',
      value: active,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Drafts',
      value: drafts,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Avg. Completion',
      value: `${avgCompletion}%`,
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-xl p-4 border shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
