import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  Server, 
  Cloud, 
  Users, 
  Cpu,
  TrendingUp,
  TrendingDown,
  Calculator,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  Minus,
} from 'lucide-react';
import { llmUnitEconomics } from '@/data/enterpriseDashboardData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  LineChart,
  Line,
  Legend,
  ComposedChart,
  Area,
} from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TCOInputs {
  monthlyRequests: number;
  avgInputTokens: number;
  avgOutputTokens: number;
  requiredAccuracy: number;
  gpuHours: number;
  gpuHourlyRate: number;
  engineerFraction: number;
  engineerMonthlyCost: number;
  integrationCost: number;
  trainingCost: number;
}

const DEFAULT_TCO_INPUTS: TCOInputs = {
  monthlyRequests: 100000,
  avgInputTokens: 1500,
  avgOutputTokens: 500,
  requiredAccuracy: 95,
  gpuHours: 720, // 24/7 operation
  gpuHourlyRate: 1.89, // H100 rate
  engineerFraction: 0.25,
  engineerMonthlyCost: 20000,
  integrationCost: 50000,
  trainingCost: 25000,
};

export function TCOCalculatorTab() {
  const [inputs, setInputs] = useState<TCOInputs>(DEFAULT_TCO_INPUTS);
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [comparisonModels, setComparisonModels] = useState<string[]>(['gpt-5', 'claude-4-sonnet', 'gemini-2.5-flash']);

  const updateInput = <K extends keyof TCOInputs>(key: K, value: TCOInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate TCO for SaaS
  const calculateSaasCost = (modelId: string) => {
    const model = llmUnitEconomics.find((m) => m.modelId === modelId);
    if (!model) return { monthly: 0, annual: 0, perRequest: 0, cpra: 0 };

    const inputCost = (inputs.monthlyRequests * inputs.avgInputTokens / 1000000) * model.inputTokenPrice;
    const outputCost = (inputs.monthlyRequests * inputs.avgOutputTokens / 1000000) * model.outputTokenPrice;
    const monthly = inputCost + outputCost;
    const perRequest = monthly / inputs.monthlyRequests;
    const cpra = perRequest / (model.accuracy / 100);

    return {
      monthly,
      annual: monthly * 12,
      perRequest,
      cpra,
      accuracy: model.accuracy,
      modelName: model.modelName,
      provider: model.provider,
    };
  };

  // Calculate TCO for Self-Hosted
  const selfHostedCost = useMemo(() => {
    const gpuCost = inputs.gpuHours * inputs.gpuHourlyRate;
    const laborCost = inputs.engineerFraction * inputs.engineerMonthlyCost;
    const monthlyOperational = gpuCost + laborCost;
    
    // Amortize integration and training over 24 months
    const amortizedSetup = (inputs.integrationCost + inputs.trainingCost) / 24;
    const monthly = monthlyOperational + amortizedSetup;
    
    const perRequest = monthly / inputs.monthlyRequests;
    // Assume self-hosted accuracy of 89% (Llama-class)
    const accuracy = 89;
    const cpra = perRequest / (accuracy / 100);

    return {
      monthly,
      annual: monthly * 12,
      perRequest,
      cpra,
      accuracy,
      gpuCost,
      laborCost,
      amortizedSetup,
    };
  }, [inputs]);

  // Compare all models
  const modelComparison = useMemo(() => {
    return comparisonModels.map((modelId) => ({
      modelId,
      ...calculateSaasCost(modelId),
    }));
  }, [comparisonModels, inputs]);

  // Find breakeven
  const selectedSaasCost = calculateSaasCost(selectedModel);
  const breakEvenRequests = useMemo(() => {
    if (selfHostedCost.perRequest >= selectedSaasCost.perRequest) return Infinity;
    const fixedCosts = inputs.integrationCost + inputs.trainingCost + (inputs.engineerFraction * inputs.engineerMonthlyCost);
    return Math.ceil(fixedCosts / (selectedSaasCost.perRequest - selfHostedCost.perRequest));
  }, [selfHostedCost, selectedSaasCost, inputs]);

  // Volume projection data
  const volumeProjection = useMemo(() => {
    const volumes = [10000, 50000, 100000, 250000, 500000, 1000000];
    return volumes.map((vol) => {
      const saasPerRequest = selectedSaasCost.perRequest;
      const saasCost = vol * saasPerRequest;
      
      const gpuCost = inputs.gpuHours * inputs.gpuHourlyRate;
      const laborCost = inputs.engineerFraction * inputs.engineerMonthlyCost;
      const fixed = (inputs.integrationCost + inputs.trainingCost) / 24;
      const selfHosted = gpuCost + laborCost + fixed;
      
      return {
        volume: vol,
        volumeLabel: vol >= 1000000 ? `${vol / 1000000}M` : `${vol / 1000}K`,
        saas: saasCost,
        selfHosted,
        savings: saasCost - selfHosted,
      };
    });
  }, [inputs, selectedSaasCost]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  };

  const getRecommendation = () => {
    if (inputs.monthlyRequests > breakEvenRequests && breakEvenRequests !== Infinity) {
      return { type: 'self-hosted', label: 'Self-Hosted Recommended', color: 'text-success' };
    }
    if (inputs.requiredAccuracy > 95) {
      return { type: 'saas', label: 'SaaS Recommended (Accuracy)', color: 'text-primary' };
    }
    return { type: 'saas', label: 'SaaS Recommended', color: 'text-primary' };
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">SaaS Monthly</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(selectedSaasCost.monthly)}</p>
            <p className="text-xs text-muted-foreground">{selectedSaasCost.modelName}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Server className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Self-Hosted Monthly</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(selfHostedCost.monthly)}</p>
            <p className="text-xs text-muted-foreground">Llama 3.3 70B equivalent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Break-Even</span>
            </div>
            <p className="text-2xl font-bold">
              {breakEvenRequests === Infinity ? '∞' : `${(breakEvenRequests / 1000).toFixed(0)}K`}
            </p>
            <p className="text-xs text-muted-foreground">requests/month</p>
          </CardContent>
        </Card>

        <Card className={recommendation.type === 'self-hosted' ? 'border-success/50 bg-success/5' : 'border-primary/50 bg-primary/5'}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {recommendation.type === 'self-hosted' ? (
                <Server className="h-4 w-4 text-success" />
              ) : (
                <Cloud className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm text-muted-foreground">Recommendation</span>
            </div>
            <p className={`text-lg font-bold ${recommendation.color}`}>{recommendation.label}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">TCO Parameters</CardTitle>
            <CardDescription>Adjust inputs to model costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">Monthly Requests</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[inputs.monthlyRequests]}
                  onValueChange={([v]) => updateInput('monthlyRequests', v)}
                  min={1000}
                  max={1000000}
                  step={1000}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={inputs.monthlyRequests}
                  onChange={(e) => updateInput('monthlyRequests', Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Avg Input Tokens / Request</Label>
              <Slider
                value={[inputs.avgInputTokens]}
                onValueChange={([v]) => updateInput('avgInputTokens', v)}
                min={100}
                max={10000}
                step={100}
              />
              <p className="text-xs text-muted-foreground text-right">{inputs.avgInputTokens} tokens</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Avg Output Tokens / Request</Label>
              <Slider
                value={[inputs.avgOutputTokens]}
                onValueChange={([v]) => updateInput('avgOutputTokens', v)}
                min={50}
                max={4000}
                step={50}
              />
              <p className="text-xs text-muted-foreground text-right">{inputs.avgOutputTokens} tokens</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Required Accuracy (%)</Label>
              <Slider
                value={[inputs.requiredAccuracy]}
                onValueChange={([v]) => updateInput('requiredAccuracy', v)}
                min={80}
                max={99}
                step={1}
              />
              <p className="text-xs text-muted-foreground text-right">{inputs.requiredAccuracy}%</p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-2">Self-Hosted Costs</p>
              
              <div className="space-y-2">
                <Label className="text-sm">GPU Hours / Month</Label>
                <Input
                  type="number"
                  value={inputs.gpuHours}
                  onChange={(e) => updateInput('gpuHours', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2 mt-2">
                <Label className="text-sm">GPU Rate ($/hr)</Label>
                <Input
                  type="number"
                  value={inputs.gpuHourlyRate}
                  onChange={(e) => updateInput('gpuHourlyRate', Number(e.target.value))}
                  step={0.01}
                />
              </div>

              <div className="space-y-2 mt-2">
                <Label className="text-sm">Engineer Allocation (%)</Label>
                <Slider
                  value={[inputs.engineerFraction * 100]}
                  onValueChange={([v]) => updateInput('engineerFraction', v / 100)}
                  min={5}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground text-right">{inputs.engineerFraction * 100}%</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setInputs(DEFAULT_TCO_INPUTS)}
            >
              Reset to Defaults
            </Button>
          </CardContent>
        </Card>

        {/* Comparison & Charts */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
              <TabsTrigger value="cpra">CPRA Analysis</TabsTrigger>
              <TabsTrigger value="projection">Volume Projection</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Cost Comparison by Model</CardTitle>
                      <CardDescription>Monthly cost at {(inputs.monthlyRequests / 1000).toFixed(0)}K requests</CardDescription>
                    </div>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {llmUnitEconomics.map((model) => (
                          <SelectItem key={model.modelId} value={model.modelId}>
                            {model.modelName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          ...modelComparison.map((m) => ({
                            name: m.modelName || m.modelId,
                            cost: m.monthly,
                            type: 'saas',
                          })),
                          {
                            name: 'Self-Hosted',
                            cost: selfHostedCost.monthly,
                            type: 'self-hosted',
                          },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
                        <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), 'Monthly Cost']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))' 
                          }}
                        />
                        <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                          {[...modelComparison.map(m => ({ ...m, type: 'saas' })), { modelId: 'self-hosted', type: 'self-hosted' }].map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.type === 'self-hosted' ? 'hsl(var(--warning))' : 'hsl(var(--primary))'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpra">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    Cost-per-Request-per-Accuracy (CPRA)
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>CPRA = Cost per Request ÷ Accuracy Rate. Lower CPRA indicates better value when accuracy requirements are factored in.</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>True cost efficiency including accuracy requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {llmUnitEconomics
                      .sort((a, b) => a.cpra - b.cpra)
                      .map((model) => {
                        const meetsAccuracy = model.accuracy >= inputs.requiredAccuracy;
                        return (
                          <div 
                            key={model.modelId}
                            className={`p-3 rounded-lg border ${meetsAccuracy ? 'bg-card' : 'bg-muted/30 opacity-60'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {meetsAccuracy ? (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="font-medium">{model.modelName}</span>
                                <Badge variant="outline" className="text-xs">{model.provider}</Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${model.cpra.toFixed(4)}</p>
                                <p className="text-xs text-muted-foreground">CPRA</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>Accuracy: {model.accuracy}%</span>
                              <span>•</span>
                              <span>In: ${model.inputTokenPrice}/1M</span>
                              <span>•</span>
                              <span>Out: ${model.outputTokenPrice}/1M</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projection">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Cost by Request Volume</CardTitle>
                  <CardDescription>SaaS vs Self-Hosted at different scales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={volumeProjection}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="volumeLabel" />
                        <YAxis tickFormatter={(v) => formatCurrency(v)} />
                        <Tooltip 
                          formatter={(value: number, name: string) => [formatCurrency(value), name]}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))' 
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="saas" 
                          name="SaaS" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="selfHosted" 
                          name="Self-Hosted" 
                          stroke="hsl(var(--warning))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--warning))' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="savings" 
                          name="Savings" 
                          fill="hsl(var(--success))" 
                          fillOpacity={0.2}
                          stroke="none"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  {breakEvenRequests !== Infinity && (
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Break-even at {(breakEvenRequests / 1000).toFixed(0)}K requests/month
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Cost Breakdown Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cost Component Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">SaaS ({selectedSaasCost.modelName})</p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Input Tokens</span>
                      <span>{formatCurrency((inputs.monthlyRequests * inputs.avgInputTokens / 1000000) * (llmUnitEconomics.find(m => m.modelId === selectedModel)?.inputTokenPrice || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Output Tokens</span>
                      <span>{formatCurrency((inputs.monthlyRequests * inputs.avgOutputTokens / 1000000) * (llmUnitEconomics.find(m => m.modelId === selectedModel)?.outputTokenPrice || 0))}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t">
                      <span>Monthly Total</span>
                      <span>{formatCurrency(selectedSaasCost.monthly)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-warning">Self-Hosted</p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPU Compute</span>
                      <span>{formatCurrency(selfHostedCost.gpuCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Labor (AI Engineers)</span>
                      <span>{formatCurrency(selfHostedCost.laborCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Setup (Amortized)</span>
                      <span>{formatCurrency(selfHostedCost.amortizedSetup)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t">
                      <span>Monthly Total</span>
                      <span>{formatCurrency(selfHostedCost.monthly)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
