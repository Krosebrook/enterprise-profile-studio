import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';
import {
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Filter,
} from 'lucide-react';
import { format, differenceInDays, parseISO, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Deal, PIPELINE_STAGES, PIPELINE_STAGE_LABELS, PipelineStage, generateFullMockDeals } from '@/types/deals';

interface ConversionRate {
  from: PipelineStage;
  to: PipelineStage;
  rate: number;
  deals: number;
}

interface StageMetrics {
  stage: PipelineStage;
  label: string;
  avgDays: number;
  currentDeals: number;
  totalValue: number;
}

interface ValueTrend {
  month: string;
  totalValue: number;
  dealCount: number;
  avgDealSize: number;
}

const STAGE_COLORS: Record<PipelineStage, string> = {
  screening: '#64748b',
  initial_review: '#3b82f6',
  due_diligence: '#f59e0b',
  negotiation: '#a855f7',
  term_sheet: '#6366f1',
  closing: '#f97316',
  closed: '#22c55e',
  passed: '#ef4444',
};

export function DealAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m' | 'all'>('6m');
  const deals = useMemo(() => generateFullMockDeals(), []);

  // Calculate pipeline conversion rates
  const conversionRates = useMemo((): ConversionRate[] => {
    const stages = PIPELINE_STAGES.filter(s => s !== 'passed');
    const rates: ConversionRate[] = [];

    for (let i = 0; i < stages.length - 1; i++) {
      const currentStage = stages[i];
      const nextStage = stages[i + 1];
      
      // Mock conversion rates based on typical pipeline metrics
      const mockRates: Record<string, number> = {
        'screening-initial_review': 65,
        'initial_review-due_diligence': 45,
        'due_diligence-negotiation': 70,
        'negotiation-term_sheet': 55,
        'term_sheet-closing': 80,
        'closing-closed': 90,
      };

      const key = `${currentStage}-${nextStage}`;
      rates.push({
        from: currentStage,
        to: nextStage,
        rate: mockRates[key] || 50,
        deals: Math.floor(Math.random() * 10) + 5,
      });
    }

    return rates;
  }, []);

  // Calculate time-in-stage metrics
  const stageMetrics = useMemo((): StageMetrics[] => {
    const metrics: StageMetrics[] = [];
    
    // Mock average days per stage
    const avgDaysByStage: Record<PipelineStage, number> = {
      screening: 5,
      initial_review: 12,
      due_diligence: 28,
      negotiation: 21,
      term_sheet: 14,
      closing: 10,
      closed: 0,
      passed: 0,
    };

    PIPELINE_STAGES.forEach(stage => {
      const stageDeals = deals.filter(d => d.pipelineStage === stage);
      metrics.push({
        stage,
        label: PIPELINE_STAGE_LABELS[stage],
        avgDays: avgDaysByStage[stage],
        currentDeals: stageDeals.length,
        totalValue: stageDeals.reduce((sum, d) => sum + d.amount, 0),
      });
    });

    return metrics;
  }, [deals]);

  // Calculate value trends over time
  const valueTrends = useMemo((): ValueTrend[] => {
    const trends: ValueTrend[] = [];
    const monthsToShow = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : timeRange === '12m' ? 12 : 24;
    
    // Generate mock trend data
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const baseValue = 50000000 + Math.random() * 30000000;
      const dealCount = Math.floor(5 + Math.random() * 10);
      
      trends.push({
        month: format(date, 'MMM yyyy'),
        totalValue: Math.round(baseValue * (1 + i * 0.05)),
        dealCount,
        avgDealSize: Math.round(baseValue / dealCount),
      });
    }

    return trends;
  }, [timeRange]);

  // Calculate funnel data
  const funnelData = useMemo(() => {
    const stages = ['screening', 'initial_review', 'due_diligence', 'negotiation', 'term_sheet', 'closing', 'closed'] as PipelineStage[];
    let remaining = 100;
    
    return stages.map((stage, index) => {
      const value = remaining;
      if (index < stages.length - 1) {
        remaining = Math.round(remaining * (conversionRates[index]?.rate || 50) / 100);
      }
      return {
        stage: PIPELINE_STAGE_LABELS[stage],
        value,
        fill: STAGE_COLORS[stage],
      };
    });
  }, [conversionRates]);

  // Summary stats
  const summaryStats = useMemo(() => {
    const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);
    const closedDeals = deals.filter(d => d.pipelineStage === 'closed');
    const closedValue = closedDeals.reduce((sum, d) => sum + d.amount, 0);
    const avgDealSize = totalValue / deals.length;
    const overallConversion = closedDeals.length / deals.length * 100;

    return {
      totalPipelineValue: totalValue,
      closedValue,
      avgDealSize,
      overallConversion,
      activeDeals: deals.filter(d => d.pipelineStage !== 'closed' && d.pipelineStage !== 'passed').length,
    };
  }, [deals]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Deal Analytics</h2>
          <p className="text-muted-foreground">Pipeline performance and conversion insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryStats.totalPipelineValue)}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed Value</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryStats.closedValue)}</p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <Target className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>1 deal closed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryStats.avgDealSize)}</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>{summaryStats.activeDeals} active deals</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Conversion</p>
                <p className="text-2xl font-bold">{summaryStats.overallConversion.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg bg-purple-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
              <ArrowDownRight className="h-4 w-4" />
              <span>-2% from target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="funnel" className="space-y-6">
        <TabsList>
          <TabsTrigger value="funnel" className="gap-2">
            <PieChartIcon className="h-4 w-4" />
            Conversion Funnel
          </TabsTrigger>
          <TabsTrigger value="time" className="gap-2">
            <Clock className="h-4 w-4" />
            Time in Stage
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Value Trends
          </TabsTrigger>
        </TabsList>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Funnel Visualization */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Pipeline Funnel</CardTitle>
                <CardDescription>Deal progression through stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((item, index) => (
                    <div key={item.stage} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.stage}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="h-8 w-full rounded-lg bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.fill,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stage-by-Stage Conversion */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Stage Conversion Rates</CardTitle>
                <CardDescription>Conversion between pipeline stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionRates} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="from"
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) => PIPELINE_STAGE_LABELS[value as PipelineStage]}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                      labelFormatter={(value) => `${PIPELINE_STAGE_LABELS[value as PipelineStage]} → Next Stage`}
                    />
                    <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                      {conversionRates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STAGE_COLORS[entry.from]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display">Detailed Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">From Stage</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">To Stage</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Conversion Rate</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Deals Converted</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionRates.map((rate, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3">
                          <Badge variant="outline" style={{ borderColor: STAGE_COLORS[rate.from], color: STAGE_COLORS[rate.from] }}>
                            {PIPELINE_STAGE_LABELS[rate.from]}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" style={{ borderColor: STAGE_COLORS[rate.to], color: STAGE_COLORS[rate.to] }}>
                            {PIPELINE_STAGE_LABELS[rate.to]}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${rate.rate}%`, backgroundColor: rate.rate >= 70 ? '#22c55e' : rate.rate >= 50 ? '#f59e0b' : '#ef4444' }}
                              />
                            </div>
                            <span className="font-medium">{rate.rate}%</span>
                          </div>
                        </td>
                        <td className="py-3 font-medium">{rate.deals}</td>
                        <td className="py-3">
                          {rate.rate >= 70 ? (
                            <Badge className="bg-green-500/10 text-green-600">Healthy</Badge>
                          ) : rate.rate >= 50 ? (
                            <Badge className="bg-amber-500/10 text-amber-600">Average</Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-600">Needs Attention</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time in Stage Tab */}
        <TabsContent value="time" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Average Time Chart */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Average Time per Stage</CardTitle>
                <CardDescription>Days spent in each pipeline stage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stageMetrics.filter(m => m.stage !== 'closed' && m.stage !== 'passed')}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value} days`, 'Avg Duration']}
                    />
                    <Bar dataKey="avgDays" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                      {stageMetrics.map((entry) => (
                        <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Stage Distribution Pie */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Current Deal Distribution</CardTitle>
                <CardDescription>Deals in each pipeline stage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stageMetrics.filter(m => m.currentDeals > 0)}
                      dataKey="currentDeals"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      {stageMetrics.map((entry) => (
                        <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stage Details Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display">Stage Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Stage</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Avg Days</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Current Deals</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Total Value</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stageMetrics.filter(m => m.stage !== 'passed').map((metric) => (
                      <tr key={metric.stage} className="border-b border-border/50">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: STAGE_COLORS[metric.stage] }} />
                            <span className="font-medium">{metric.label}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{metric.avgDays} days</span>
                          </div>
                        </td>
                        <td className="py-3 font-medium">{metric.currentDeals}</td>
                        <td className="py-3 font-medium">{formatCurrency(metric.totalValue)}</td>
                        <td className="py-3">
                          {metric.avgDays <= 10 ? (
                            <Badge className="bg-green-500/10 text-green-600">Fast</Badge>
                          ) : metric.avgDays <= 20 ? (
                            <Badge className="bg-blue-500/10 text-blue-600">Normal</Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600">Slow</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Value Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          {/* Value Over Time Chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display">Pipeline Value Trend</CardTitle>
              <CardDescription>Total pipeline value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={valueTrends}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Pipeline Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalValue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Deal Count Trend */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Deal Volume</CardTitle>
                <CardDescription>Number of deals over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={valueTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="dealCount"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                      name="Deal Count"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Average Deal Size Trend */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Average Deal Size</CardTitle>
                <CardDescription>Average deal size over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={valueTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Avg Deal Size']}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgDealSize"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: '#22c55e' }}
                      name="Avg Deal Size"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Value by Stage Chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display">Value by Pipeline Stage</CardTitle>
              <CardDescription>Total deal value in each stage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stageMetrics.filter(m => m.totalValue > 0)}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Total Value']}
                  />
                  <Bar dataKey="totalValue" radius={[4, 4, 0, 0]}>
                    {stageMetrics.map((entry) => (
                      <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
