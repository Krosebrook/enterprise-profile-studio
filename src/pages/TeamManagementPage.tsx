import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useUserRole, useAllUserRoles } from '@/hooks/useUserRole';
import { useAllPersonas, usePersonaStats } from '@/hooks/useAdminPersonas';
import { RoleAssignmentCard } from '@/components/persona/RoleAssignmentCard';
import { BulkExportDialog } from '@/components/persona/BulkExportDialog';
import { 
  Users, 
  Bot, 
  HardHat, 
  Building2, 
  Shield, 
  Loader2, 
  Search,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Download,
  FileArchive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { EmployeePersona } from '@/types/employee-persona';

export default function TeamManagementPage() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const { data: personas = [], isLoading: personasLoading } = useAllPersonas();
  const { data: roles = [] } = useAllUserRoles();
  const stats = usePersonaStats();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [bulkExportOpen, setBulkExportOpen] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState<Set<string>>(new Set());

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <ShieldAlert className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Get unique departments
  const departments = [...new Set(personas.map(p => p.department).filter(Boolean))] as string[];

  // Filter personas
  const filteredPersonas = personas.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.job_title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || p.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const togglePersonaSelection = (id: string) => {
    const newSet = new Set(selectedPersonas);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedPersonas(newSet);
  };

  const toggleAllFiltered = () => {
    if (selectedPersonas.size === filteredPersonas.length) {
      setSelectedPersonas(new Set());
    } else {
      setSelectedPersonas(new Set(filteredPersonas.map(p => p.id)));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12 pt-20">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <Badge variant="outline">Admin</Badge>
          </div>
          <h1 className="font-display text-3xl font-bold">Team Management</h1>
          <p className="mt-1 text-muted-foreground">
            Manage employee personas and AI configurations across your organization
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Personas</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPersonas}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activePersonas} active, {stats.draftPersonas} drafts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Roles</CardTitle>
              <HardHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHats}</div>
              <p className="text-xs text-muted-foreground">
                Avg. {stats.avgHatsPerPersona} per persona
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
              <p className="text-xs text-muted-foreground">
                Across organization
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">User Roles</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
              <p className="text-xs text-muted-foreground">
                Assigned roles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Department Breakdown */}
        {Object.keys(stats.departmentBreakdown).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Department Breakdown</CardTitle>
              <CardDescription>Persona distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(stats.departmentBreakdown).map(([dept, count]) => (
                  <div key={dept} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{dept}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Personas Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">All Personas</CardTitle>
                <CardDescription>View and manage all employee personas</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {selectedPersonas.size > 0 && (
                  <Button onClick={() => setBulkExportOpen(true)} variant="outline">
                    <FileArchive className="mr-2 h-4 w-4" />
                    Export {selectedPersonas.size}
                  </Button>
                )}
                <Button onClick={() => setBulkExportOpen(true)} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Bulk Export
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search personas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {personasLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredPersonas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium">No personas found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || departmentFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'No employee personas have been created yet'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        checked={selectedPersonas.size === filteredPersonas.length && filteredPersonas.length > 0}
                        onCheckedChange={toggleAllFiltered}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonas.map((persona) => (
                    <TableRow key={persona.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPersonas.has(persona.id)}
                          onCheckedChange={() => togglePersonaSelection(persona.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{persona.name}</p>
                            {persona.email && (
                              <p className="text-xs text-muted-foreground">{persona.email}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{persona.job_title || '-'}</TableCell>
                      <TableCell>{persona.department || '-'}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={persona.status === 'active' ? 'default' : 'secondary'}
                          className={cn(
                            persona.status === 'active' && 'bg-green-500/10 text-green-600 border-green-500/20'
                          )}
                        >
                          {persona.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(persona.updated_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/personas/${persona.id}`)}
                        >
                          View
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Role Management Card */}
        <div className="mt-8">
          <RoleAssignmentCard />
        </div>

        {/* Recently Updated */}
        {stats.recentlyUpdated.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Recently Updated</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentlyUpdated.map((persona) => (
                  <div key={persona.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{persona.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {persona.job_title && persona.department 
                            ? `${persona.job_title} • ${persona.department}`
                            : persona.job_title || persona.department || 'No details'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(persona.updated_at), { addSuffix: true })}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/personas/${persona.id}`)}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bulk Export Dialog */}
        <BulkExportDialog
          open={bulkExportOpen}
          onOpenChange={setBulkExportOpen}
          personas={selectedPersonas.size > 0 
            ? personas.filter(p => selectedPersonas.has(p.id)) as EmployeePersona[]
            : personas as EmployeePersona[]
          }
        />
      </div>
    </div>
  );
}
