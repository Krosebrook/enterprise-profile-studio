import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Shield, 
  Clock,
  DollarSign,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { 
  useCaseMetrics, 
  organizationalReadiness, 
  roiTimeline 
} from '@/data/enterpriseDashboardData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

const COLORS = {
  critical: 'hsl(var(--destructive))',
  high: 'hsl(var(--warning))',
  medium: 'hsl(var(--primary))',
  low: 'hsl(var(--muted-foreground))',
};

export function StrategicAssessmentDashboard() {
  const [selectedView, setSelectedView] = useState('overview');

  // Calculate summary metrics
  const totalAnnualSavings = roiTimeline.tangible.annualSavings;
  const avgProductivityGain = roiTimeline.tangible.productivityIncrease;
  const complianceRate = roiTimeline.intangible.regulatoryComplianceRate;
  const riskReduction = roiTimeline.intangible.riskEventReduction;

  // Prepare use case data for scatter plot (Strategic Value Matrix)
  const valueMatrixData = useCaseMetrics.map((uc) => ({
    name: uc.name,
    impact: uc.impactPercentage,
    complexity: uc.complexity === 'high' ? 80 : uc.complexity === 'medium' ? 50 : 20,
    priority: uc.priority,
    status: uc.status,
    department: uc.department,
  }));

  // Radar chart data for organizational readiness
  const readinessRadarData = [
    { dimension: 'AI Fluency', value: organizationalReadiness.aiFluencyRate, fullMark: 100 },
    { dimension: 'Cultural Readiness', value: organizationalReadiness.culturalReadinessScore, fullMark: 100 },
    { dimension: 'Adoption Velocity', value: Math.min(organizationalReadiness.adoptionVelocity * 5, 100), fullMark: 100 },
    { dimension: 'Task Reduction', value: organizationalReadiness.augmentationTimeMetrics.lowValueTaskReduction * 2, fullMark: 100 },
    { dimension: 'Strategic Focus', value: organizationalReadiness.augmentationTimeMetrics.strategicTaskIncrease * 2, fullMark: 100 },
    { dimension: 'Time Reclaimed', value: organizationalReadiness.augmentationTimeMetrics.hoursReclaimed * 10, fullMark: 100 },
  ];

  // ROI breakdown for bar chart
  const roiBreakdown = [
    { category: 'Cost Reduction', value: roiTimeline.tangible.costPerTransactionReduction, type: 'tangible' },
    { category: 'Productivity', value: roiTimeline.tangible.productivityIncrease, type: 'tangible' },
    { category: 'Process Speed', value: roiTimeline.tangible.processAcceleration, type: 'tangible' },
    { category: 'Compliance', value: roiTimeline.intangible.regulatoryComplianceRate, type: 'intangible' },
    { category: 'Engagement', value: roiTimeline.intangible.customerEngagementScore, type: 'intangible' },
    { category: 'Risk Reduction', value: roiTimeline.intangible.riskEventReduction, type: 'intangible' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high': return 'bg-warning/10 text-warning border-warning/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'bg-success/10 text-success border-success/20';
      case 'scaling': return 'bg-primary/10 text-primary border-primary/20';
      case 'pilot': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Savings</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totalAnnualSavings)}</p>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+12% vs. projection</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productivity Gain</p>
                <p className="text-2xl font-bold text-primary">{avgProductivityGain}%</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Target: 60%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-bold text-warning">{complianceRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10">
                <Shield className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-success">
              <CheckCircle2 className="h-3 w-3" />
              <span>Above threshold</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Reduction</p>
                <p className="text-2xl font-bold text-destructive">{riskReduction}%</p>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Target: 60%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                ROI Timeline Progress
              </CardTitle>
              <CardDescription>
                Expected payback: {roiTimeline.expectedPaybackMonths} months | Current: Month {roiTimeline.currentMonth}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {roiTimeline.investmentPhase.charAt(0).toUpperCase() + roiTimeline.investmentPhase.slice(1)} Phase
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Breakeven</span>
              <span className="font-medium">{Math.round((roiTimeline.currentMonth / roiTimeline.expectedPaybackMonths) * 100)}%</span>
            </div>
            <Progress 
              value={(roiTimeline.currentMonth / roiTimeline.expectedPaybackMonths) * 100} 
              className="h-3"
            />
            <p className="text-xs text-muted-foreground">
              Projected breakeven: {new Date(roiTimeline.projectedBreakeven).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            ROI Breakdown
          </TabsTrigger>
          <TabsTrigger value="usecases" className="gap-2">
            <Target className="h-4 w-4" />
            Use Case Matrix
          </TabsTrigger>
          <TabsTrigger value="readiness" className="gap-2">
            <Users className="h-4 w-4" />
            Readiness
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Tangible vs Intangible ROI */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">ROI Components</CardTitle>
                <CardDescription>Tangible (blue) vs Intangible (amber) benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="category" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Value']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))' 
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {roiBreakdown.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.type === 'tangible' ? 'hsl(var(--primary))' : 'hsl(var(--warning))'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Augmentation Metrics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Human Augmentation Metrics
                </CardTitle>
                <CardDescription>AI-driven productivity enhancement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low-Value Task Reduction</span>
                    <span className="font-medium text-success">
                      -{organizationalReadiness.augmentationTimeMetrics.lowValueTaskReduction}%
                    </span>
                  </div>
                  <Progress 
                    value={organizationalReadiness.augmentationTimeMetrics.lowValueTaskReduction} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Strategic Task Increase</span>
                    <span className="font-medium text-primary">
                      +{organizationalReadiness.augmentationTimeMetrics.strategicTaskIncrease}%
                    </span>
                  </div>
                  <Progress 
                    value={organizationalReadiness.augmentationTimeMetrics.strategicTaskIncrease} 
                    className="h-2"
                  />
                </div>

                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hours Reclaimed</p>
                      <p className="text-3xl font-bold">
                        {organizationalReadiness.augmentationTimeMetrics.hoursReclaimed}
                      </p>
                      <p className="text-xs text-muted-foreground">per employee / week</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">AI Fluency Rate</p>
                      <p className="text-2xl font-bold text-primary">
                        {organizationalReadiness.aiFluencyRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">staff trained</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usecases" className="space-y-4">
          {/* Strategic Value Matrix */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Strategic Value Matrix</CardTitle>
              <CardDescription>
                Impact vs Complexity | Size indicates priority level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      type="number" 
                      dataKey="complexity" 
                      name="Complexity" 
                      domain={[0, 100]}
                      label={{ value: 'Implementation Complexity →', position: 'bottom', offset: 0 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="impact" 
                      name="Impact" 
                      domain={[0, 100]}
                      label={{ value: '← Business Impact', angle: -90, position: 'left', offset: 0 }}
                    />
                    <ZAxis 
                      type="number" 
                      dataKey="impact" 
                      range={[100, 400]} 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (payload && payload.length > 0) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.department}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className={getPriorityColor(data.priority)}>
                                  {data.priority}
                                </Badge>
                                <Badge variant="outline" className={getStatusColor(data.status)}>
                                  {data.status}
                                </Badge>
                              </div>
                              <p className="text-sm mt-1">Impact: {data.impact}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      data={valueMatrixData} 
                      fill="hsl(var(--primary))"
                    >
                      {valueMatrixData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[entry.priority as keyof typeof COLORS] || COLORS.medium}
                          fillOpacity={0.8}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Use Case List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {useCaseMetrics.map((uc) => (
                  <div 
                    key={uc.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{uc.name}</h4>
                        <Badge variant="outline" className={getPriorityColor(uc.priority)}>
                          {uc.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(uc.status)}>
                          {uc.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {uc.department} • {uc.observedImpact}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{uc.impactPercentage}%</p>
                      <p className="text-xs text-muted-foreground">Impact</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readiness" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Readiness Radar */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Organizational Readiness Profile</CardTitle>
                <CardDescription>Multi-dimensional readiness assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={readinessRadarData}>
                      <PolarGrid className="stroke-muted" />
                      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Current"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Score']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))' 
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Readiness Metrics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Adoption & Fluency Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">AI Fluency Mandate</span>
                    <Badge variant={organizationalReadiness.aiFluencyRate >= 40 ? 'default' : 'destructive'}>
                      {organizationalReadiness.aiFluencyRate >= 40 ? 'On Track' : 'Below Target'}
                    </Badge>
                  </div>
                  <Progress value={organizationalReadiness.aiFluencyRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {organizationalReadiness.aiFluencyRate}% of staff completed AI training (Industry benchmark: 40%)
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Adoption Velocity</span>
                    <span className="text-sm font-bold text-success flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      {organizationalReadiness.adoptionVelocity}% MoM
                    </span>
                  </div>
                  <Progress value={organizationalReadiness.adoptionVelocity * 5} className="h-2" />
                </div>

                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Cultural Readiness Score</span>
                    <span className="text-sm font-bold">{organizationalReadiness.culturalReadinessScore}/100</span>
                  </div>
                  <Progress value={organizationalReadiness.culturalReadinessScore} className="h-2" />
                </div>

                <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning">Productivity Dip Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Initial productivity dip expected during Month 9-12 of adoption. 
                        Monitor augmentation metrics closely.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
