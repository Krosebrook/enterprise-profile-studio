import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  Clock, 
  Zap, 
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Server,
  Gauge,
  Timer,
} from 'lucide-react';
import { 
  llmBenchmarks, 
  ttftVsIslData, 
  performanceSLOs 
} from '@/data/enterpriseDashboardData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  AreaChart,
  Area,
} from 'recharts';

const LOAD_COLORS = {
  low: 'hsl(var(--success))',
  medium: 'hsl(var(--warning))',
  high: 'hsl(var(--destructive))',
};

export function PerformanceMetricsTab() {
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [selectedLoadLevel, setSelectedLoadLevel] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const selectedBenchmark = llmBenchmarks.find((b) => b.modelId === selectedModel);

  // Filter TTFT vs ISL data by load level
  const filteredTtftData = selectedLoadLevel === 'all' 
    ? ttftVsIslData 
    : ttftVsIslData.filter((d) => d.load === selectedLoadLevel);

  // Prepare radar data for multi-model comparison
  const radarData = [
    { metric: 'RPS', fullMark: 200 },
    { metric: 'Throughput', fullMark: 100 },
    { metric: 'TTFT (inv)', fullMark: 100 },
    { metric: 'Error Rate (inv)', fullMark: 100 },
    { metric: 'ITL (inv)', fullMark: 100 },
  ].map((item) => {
    const result: Record<string, unknown> = { metric: item.metric, fullMark: item.fullMark };
    llmBenchmarks.forEach((b) => {
      let value: number;
      switch (item.metric) {
        case 'RPS':
          value = b.metrics.rps;
          break;
        case 'Throughput':
          value = b.metrics.throughput;
          break;
        case 'TTFT (inv)':
          // Invert so lower is better becomes higher score
          value = Math.max(0, 100 - (b.metrics.ttft.avg / 5));
          break;
        case 'Error Rate (inv)':
          value = Math.max(0, 100 - (b.metrics.errorRate * 50));
          break;
        case 'ITL (inv)':
          value = Math.max(0, 100 - (b.metrics.itl * 2));
          break;
        default:
          value = 0;
      }
      result[b.modelName] = value;
    });
    return result;
  });

  // Latency comparison data
  const latencyComparisonData = llmBenchmarks.map((b) => ({
    model: b.modelName,
    ttftP50: b.metrics.ttft.p50,
    ttftP95: b.metrics.ttft.p95,
    e2eP50: b.metrics.e2eLatency.p50,
    e2eP95: b.metrics.e2eLatency.p95,
  }));

  const getSLOStatus = (status: string) => {
    switch (status) {
      case 'met':
        return { color: 'text-success', bgColor: 'bg-success/10', icon: CheckCircle2 };
      case 'at-risk':
        return { color: 'text-warning', bgColor: 'bg-warning/10', icon: AlertTriangle };
      case 'breached':
        return { color: 'text-destructive', bgColor: 'bg-destructive/10', icon: AlertTriangle };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: Clock };
    }
  };

  const formatLatency = (ms: number) => {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
    return `${ms}ms`;
  };

  return (
    <div className="space-y-6">
      {/* SLO Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {performanceSLOs.map((slo) => {
          const statusConfig = getSLOStatus(slo.status);
          const StatusIcon = statusConfig.icon;
          const percentage = (slo.current / slo.target) * 100;
          
          return (
            <Card key={slo.metric} className={`${statusConfig.bgColor} border-0`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {slo.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{slo.metric}</p>
                <p className="text-lg font-bold">
                  {slo.current}{slo.unit}
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: {slo.target}{slo.unit}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Model Selector */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                LLM Inference Benchmarks
              </CardTitle>
              <CardDescription>Real-time performance metrics for deployed models</CardDescription>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {llmBenchmarks.map((b) => (
                  <SelectItem key={b.modelId} value={b.modelId}>
                    {b.modelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {selectedBenchmark && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">RPS</span>
                </div>
                <p className="text-xl font-bold">{selectedBenchmark.metrics.rps}</p>
                <p className="text-xs text-muted-foreground">req/sec</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Throughput</span>
                </div>
                <p className="text-xl font-bold">{selectedBenchmark.metrics.throughput}</p>
                <p className="text-xs text-muted-foreground">tokens/sec</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-4 w-4 text-success" />
                  <span className="text-xs text-muted-foreground">TTFT (P50)</span>
                </div>
                <p className="text-xl font-bold">{formatLatency(selectedBenchmark.metrics.ttft.p50)}</p>
                <p className="text-xs text-muted-foreground">median</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-4 w-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">TTFT (P95)</span>
                </div>
                <p className="text-xl font-bold">{formatLatency(selectedBenchmark.metrics.ttft.p95)}</p>
                <p className="text-xs text-muted-foreground">tail</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">E2E (P95)</span>
                </div>
                <p className="text-xl font-bold">{formatLatency(selectedBenchmark.metrics.e2eLatency.p95)}</p>
                <p className="text-xs text-muted-foreground">tail</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">Error Rate</span>
                </div>
                <p className="text-xl font-bold">{selectedBenchmark.metrics.errorRate}%</p>
                <p className="text-xs text-muted-foreground">failures</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="ttft" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ttft">TTFT vs ISL</TabsTrigger>
          <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          <TabsTrigger value="latency">Latency Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="ttft">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Time to First Token vs Input Sequence Length</CardTitle>
                  <CardDescription>
                    TTFT scales quadratically with prompt length. Optimize ISL for responsiveness SLOs.
                  </CardDescription>
                </div>
                <Select value={selectedLoadLevel} onValueChange={(v) => setSelectedLoadLevel(v as typeof selectedLoadLevel)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Loads</SelectItem>
                    <SelectItem value="low">Low Load</SelectItem>
                    <SelectItem value="medium">Medium Load</SelectItem>
                    <SelectItem value="high">High Load</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      type="number" 
                      dataKey="inputSequenceLength" 
                      name="ISL"
                      scale="log"
                      domain={[100, 100000]}
                      tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v}
                      label={{ value: 'Input Sequence Length (tokens)', position: 'bottom', offset: 20 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="ttft" 
                      name="TTFT"
                      scale="log"
                      domain={[10, 20000]}
                      tickFormatter={(v) => v >= 1000 ? `${v/1000}s` : `${v}ms`}
                      label={{ value: 'TTFT (ms)', angle: -90, position: 'left', offset: 40 }}
                    />
                    <Tooltip 
                      content={({ payload }) => {
                        if (payload && payload.length > 0) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
                              <p className="text-sm font-medium capitalize">{data.load} Load</p>
                              <p className="text-sm">ISL: {data.inputSequenceLength.toLocaleString()} tokens</p>
                              <p className="text-sm">TTFT: {formatLatency(data.ttft)}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {selectedLoadLevel === 'all' ? (
                      <>
                        <Scatter 
                          data={ttftVsIslData.filter(d => d.load === 'low')} 
                          fill={LOAD_COLORS.low}
                          name="Low Load"
                        />
                        <Scatter 
                          data={ttftVsIslData.filter(d => d.load === 'medium')} 
                          fill={LOAD_COLORS.medium}
                          name="Medium Load"
                        />
                        <Scatter 
                          data={ttftVsIslData.filter(d => d.load === 'high')} 
                          fill={LOAD_COLORS.high}
                          name="High Load"
                        />
                      </>
                    ) : (
                      <Scatter 
                        data={filteredTtftData} 
                        fill={LOAD_COLORS[selectedLoadLevel]}
                        name={`${selectedLoadLevel} Load`}
                      />
                    )}
                    <Legend />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-warning">Latency Scaling Warning</p>
                    <p className="text-muted-foreground">
                      TTFT increases quadratically with ISL. At 100K tokens under high load, expect 15+ seconds TTFT.
                      Consider chunking large context windows for interactive applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Multi-Model Performance Radar</CardTitle>
                <CardDescription>Normalized scores across key metrics (higher = better)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid className="stroke-muted" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      {llmBenchmarks.slice(0, 4).map((b, i) => (
                        <Radar
                          key={b.modelId}
                          name={b.modelName}
                          dataKey={b.modelName}
                          stroke={`hsl(${i * 60 + 200}, 70%, 50%)`}
                          fill={`hsl(${i * 60 + 200}, 70%, 50%)`}
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}
                      <Legend />
                      <Tooltip 
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Context Window Comparison</CardTitle>
                <CardDescription>Maximum context capacity by model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={llmBenchmarks.map(b => ({
                        model: b.modelName,
                        context: b.contextWindow / 1000,
                        provider: b.provider,
                      }))}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        type="number" 
                        tickFormatter={(v) => `${v}K`}
                        label={{ value: 'Context Window (K tokens)', position: 'bottom', offset: 0 }}
                      />
                      <YAxis type="category" dataKey="model" width={120} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}K tokens`, 'Context']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))' 
                        }}
                      />
                      <Bar dataKey="context" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="latency">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Latency Distribution by Model</CardTitle>
              <CardDescription>P50 vs P95 latency for TTFT and E2E</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={latencyComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="model" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => formatLatency(v)} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [formatLatency(value), name]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Legend />
                    <Bar dataKey="ttftP50" name="TTFT P50" fill="hsl(var(--primary))" />
                    <Bar dataKey="ttftP95" name="TTFT P95" fill="hsl(var(--primary)/0.5)" />
                    <Bar dataKey="e2eP50" name="E2E P50" fill="hsl(var(--warning))" />
                    <Bar dataKey="e2eP95" name="E2E P95" fill="hsl(var(--warning)/0.5)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
