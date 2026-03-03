import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useEmployeePersonas } from '@/hooks/useEmployeePersonas';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Users, HardHat, PieChart, TrendingUp, ArrowLeft, Layers } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import {
  PieChart as RechartsPie, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
} from 'recharts';
import type { HatAISuggestions } from '@/types/employee-persona';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(210, 70%, 55%)',
  'hsl(160, 60%, 45%)',
  'hsl(340, 65%, 55%)',
  'hsl(45, 80%, 50%)',
  'hsl(270, 55%, 55%)',
  'hsl(30, 70%, 50%)',
];

function useAllHatsForUser() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['all-user-hats', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_hats')
        .select('*')
        .order('priority', { ascending: true });
      if (error) throw error;
      return data.map(row => ({
        ...row,
        ai_suggestions: (row.ai_suggestions || {}) as unknown as HatAISuggestions,
      }));
    },
    enabled: !!user,
  });
}

function useEcosystemExportCount() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['ecosystem-export-count', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ecosystem_exports')
        .select('ecosystem, is_active');
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export default function PersonaAnalyticsPage() {
  const { data: personas = [], isLoading: personasLoading } = useEmployeePersonas();
  const { data: hats = [], isLoading: hatsLoading } = useAllHatsForUser();
  const { data: exports = [], isLoading: exportsLoading } = useEcosystemExportCount();

  const isLoading = personasLoading || hatsLoading || exportsLoading;

  // --- Computed metrics ---
  const statusData = useMemo(() => {
    const counts = { active: 0, draft: 0, archived: 0 };
    personas.forEach(p => { counts[p.status as keyof typeof counts] = (counts[p.status as keyof typeof counts] || 0) + 1; });
    return Object.entries(counts).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [personas]);

  const deptData = useMemo(() => {
    const map: Record<string, number> = {};
    personas.forEach(p => { const d = p.department || 'Unassigned'; map[d] = (map[d] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [personas]);

  const hatTimeData = useMemo(() => {
    return hats.map(h => ({
      name: h.name.length > 18 ? h.name.slice(0, 16) + '…' : h.name,
      time: h.time_percentage ?? 0,
      tasks: (h.key_tasks ?? []).length,
    })).sort((a, b) => b.time - a.time).slice(0, 10);
  }, [hats]);

  const ecosystemData = useMemo(() => {
    const map: Record<string, number> = {};
    exports.forEach(e => { map[e.ecosystem] = (map[e.ecosystem] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [exports]);

  const radarData = useMemo(() => {
    if (personas.length === 0) return [];
    const skills: Record<string, number> = {};
    personas.forEach(p => (p.skills ?? []).forEach(s => { skills[s] = (skills[s] || 0) + 1; }));
    return Object.entries(skills)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([skill, count]) => ({ skill, count }));
  }, [personas]);

  const summaryStats = useMemo(() => ({
    totalPersonas: personas.length,
    activePersonas: personas.filter(p => p.status === 'active').length,
    totalHats: hats.length,
    avgHats: personas.length > 0 ? Math.round((hats.length / personas.length) * 10) / 10 : 0,
    totalExports: exports.length,
    activeExports: exports.filter(e => e.is_active).length,
    avgTimeAllocated: hats.length > 0 ? Math.round(hats.reduce((s, h) => s + (h.time_percentage ?? 0), 0) / hats.length) : 0,
  }), [personas, hats, exports]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container max-w-7xl">
          <FadeIn>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="pillar-border-accent pl-4">
                  <h1 className="font-display text-3xl font-bold">Persona Analytics</h1>
                  <p className="mt-1 text-muted-foreground">Adoption metrics & role allocation insights</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/personas"><ArrowLeft className="mr-2 h-4 w-4" />Back to Personas</Link>
              </Button>
            </div>
          </FadeIn>

          {/* Summary Cards */}
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { label: 'Total Personas', value: summaryStats.totalPersonas, sub: `${summaryStats.activePersonas} active`, icon: Users, color: 'text-primary' },
              { label: 'Total Hats', value: summaryStats.totalHats, sub: `${summaryStats.avgHats} avg/persona`, icon: HardHat, color: 'text-accent' },
              { label: 'Avg Time Allocation', value: `${summaryStats.avgTimeAllocated}%`, sub: 'per hat', icon: PieChart, color: 'text-chart-3' },
              { label: 'Ecosystem Exports', value: summaryStats.totalExports, sub: `${summaryStats.activeExports} active`, icon: Layers, color: 'text-chart-4' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold font-display mt-1">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color} opacity-60`} />
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Charts Row 1 */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Hat Time Allocation */}
            <FadeIn delay={0.1}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Hat Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hatTimeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={hatTimeData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="name" width={120} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }}
                          formatter={(v: number) => [`${v}%`, 'Time']}
                        />
                        <Bar dataKey="time" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-12">No hats created yet</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Persona Status Distribution */}
            <FadeIn delay={0.15}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-accent" />
                    Persona Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPie>
                        <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                          {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                      </RechartsPie>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-12">No personas yet</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Department Breakdown */}
            <FadeIn delay={0.2}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Department Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {deptData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={deptData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} angle={-30} textAnchor="end" height={60} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-12">No department data</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Skills Radar */}
            <FadeIn delay={0.25}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Top Skills Across Personas</CardTitle>
                </CardHeader>
                <CardContent>
                  {radarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <Radar name="Frequency" dataKey="count" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-12">No skills data</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Ecosystem Exports */}
          {ecosystemData.length > 0 && (
            <FadeIn delay={0.3}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Ecosystem Export Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 items-center justify-center py-4">
                    {ecosystemData.map((e, i) => (
                      <div key={e.name} className="flex items-center gap-3 rounded-lg border border-border/50 px-5 py-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <div>
                          <p className="font-semibold text-sm">{e.name}</p>
                          <p className="text-xs text-muted-foreground">{e.value} export{e.value !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Persona Detail Table */}
          <FadeIn delay={0.35}>
            <Card className="border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Persona Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 font-medium text-muted-foreground">Name</th>
                        <th className="pb-2 font-medium text-muted-foreground">Department</th>
                        <th className="pb-2 font-medium text-muted-foreground">Status</th>
                        <th className="pb-2 font-medium text-muted-foreground">Hats</th>
                        <th className="pb-2 font-medium text-muted-foreground">Skills</th>
                        <th className="pb-2 font-medium text-muted-foreground">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personas.map(p => {
                        const pHats = hats.filter(h => h.persona_id === p.id);
                        return (
                          <tr key={p.id} className="border-b border-border/40 hover:bg-muted/30">
                            <td className="py-2.5 font-medium">{p.name}</td>
                            <td className="py-2.5 text-muted-foreground">{p.department || '—'}</td>
                            <td className="py-2.5">
                              <Badge variant={p.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                {p.status}
                              </Badge>
                            </td>
                            <td className="py-2.5">{pHats.length}</td>
                            <td className="py-2.5">{(p.skills ?? []).length}</td>
                            <td className="py-2.5 text-muted-foreground text-xs">
                              {new Date(p.updated_at).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                      {personas.length === 0 && (
                        <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No personas found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
