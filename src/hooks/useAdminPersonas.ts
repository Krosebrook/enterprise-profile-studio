import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from './useUserRole';
import type { EmployeePersona, EmployeeHat, CommunicationStyle, WorkPreferences, HatAISuggestions } from '@/types/employee-persona';

// Hook to get all personas across the organization (admin only)
export function useAllPersonas() {
  const { isAdmin } = useUserRole();
  
  return useQuery({
    queryKey: ['all-personas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_personas')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(row => ({
        ...row,
        communication_style: (row.communication_style || {}) as unknown as CommunicationStyle,
        work_preferences: (row.work_preferences || {}) as unknown as WorkPreferences,
      })) as EmployeePersona[];
    },
    enabled: isAdmin,
  });
}

// Hook to get all hats across the organization (admin only)
export function useAllHats() {
  const { isAdmin } = useUserRole();
  
  return useQuery({
    queryKey: ['all-hats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_hats')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(row => ({
        ...row,
        ai_suggestions: (row.ai_suggestions || {}) as unknown as HatAISuggestions,
      })) as EmployeeHat[];
    },
    enabled: isAdmin,
  });
}

// Hook to get persona statistics (admin only)
export function usePersonaStats() {
  const { data: personas = [] } = useAllPersonas();
  const { data: hats = [] } = useAllHats();
  
  const stats = {
    totalPersonas: personas.length,
    activePersonas: personas.filter(p => p.status === 'active').length,
    draftPersonas: personas.filter(p => p.status === 'draft').length,
    totalHats: hats.length,
    avgHatsPerPersona: personas.length > 0 ? Math.round(hats.length / personas.length * 10) / 10 : 0,
    departmentBreakdown: personas.reduce((acc, p) => {
      const dept = p.department || 'Unassigned';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    recentlyUpdated: personas.slice(0, 5),
  };
  
  return stats;
}
