import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAllUserRoles, useAssignRole, useRemoveRole, type AppRole, type UserRole } from '@/hooks/useUserRole';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  UserPlus, 
  Trash2, 
  Loader2,
  Search,
  Crown,
  UserCog,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const roleConfig: Record<AppRole, { label: string; icon: React.ReactNode; color: string; description: string }> = {
  admin: {
    label: 'Admin',
    icon: <Crown className="h-4 w-4" />,
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    description: 'Full access to all features and team management',
  },
  manager: {
    label: 'Manager',
    icon: <UserCog className="h-4 w-4" />,
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    description: 'Can view team personas and manage their department',
  },
  user: {
    label: 'User',
    icon: <User className="h-4 w-4" />,
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    description: 'Can manage their own personas only',
  },
};

export function RoleAssignmentCard() {
  const { data: roles = [], isLoading } = useAllUserRoles();
  const assignRole = useAssignRole();
  const removeRole = useRemoveRole();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [newRole, setNewRole] = useState<AppRole>('user');

  const filteredRoles = roles.filter(r => 
    !searchQuery || r.user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = async () => {
    if (!newUserId.trim()) {
      toast.error('Please enter a user ID');
      return;
    }

    try {
      await assignRole.mutateAsync({ userId: newUserId, role: newRole });
      setDialogOpen(false);
      setNewUserId('');
      setNewRole('user');
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleRemove = async (role: UserRole) => {
    if (!confirm(`Remove ${roleConfig[role.role].label} role from this user?`)) return;
    
    try {
      await removeRole.mutateAsync(role.id);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Role Management</CardTitle>
            </div>
            <Button onClick={() => setDialogOpen(true)} size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Role
            </Button>
          </div>
          <CardDescription>
            Manage user roles and permissions across the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Legend */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-lg bg-muted/50">
            {Object.entries(roleConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <Badge variant="outline" className={cn("flex items-center gap-1", config.color)}>
                  {config.icon}
                  {config.label}
                </Badge>
                <span className="text-sm text-muted-foreground">{config.description}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Roles Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium">No roles assigned</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No matching users found' : 'Assign roles to users to get started'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {role.user_id.slice(0, 8)}...
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn("flex items-center gap-1 w-fit", roleConfig[role.role].color)}
                      >
                        {roleConfig[role.role].icon}
                        {roleConfig[role.role].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(role.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(role)}
                        className="text-destructive hover:text-destructive"
                        disabled={removeRole.isPending}
                      >
                        {removeRole.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Assign Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Assign a role to a user by their user ID
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-id">User ID</Label>
              <Input
                id="user-id"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="Enter user UUID"
              />
              <p className="text-xs text-muted-foreground">
                The user must already have an account in the system
              </p>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {config.icon}
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!newUserId.trim() || assignRole.isPending}>
              {assignRole.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
