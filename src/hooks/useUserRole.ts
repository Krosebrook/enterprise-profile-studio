import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type AppRole = 'admin' | 'manager' | 'user';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

// Hook to get current user's role
export function useUserRole() {
  const { user } = useAuth();
  
  const query = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1);
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.[0] as UserRole | undefined;
    },
    enabled: !!user,
  });

  const role = query.data?.role;
  const isAdmin = role === 'admin';
  const isManager = role === 'admin' || role === 'manager';

  return {
    ...query,
    role,
    isAdmin,
    isManager,
  };
}

// Hook to get all user roles (admin only)
export function useAllUserRoles() {
  const { isAdmin } = useUserRole();
  
  return useQuery({
    queryKey: ['all-user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserRole[];
    },
    enabled: isAdmin,
  });
}

// Hook to assign a role to a user (admin only)
export function useAssignRole() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      // First, remove existing role
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      // Then assign new role
      const { data, error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-user-roles'] });
      queryClient.invalidateQueries({ queryKey: ['user-role'] });
      toast.success('Role updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update role: ${error.message}`);
    },
  });
}

// Hook to remove a role from a user (admin only)
export function useRemoveRole() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-user-roles'] });
      queryClient.invalidateQueries({ queryKey: ['user-role'] });
      toast.success('Role removed successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove role: ${error.message}`);
    },
  });
}
