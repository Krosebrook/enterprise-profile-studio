import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Users,
  Eye,
  Lock,
  Clock,
  Activity,
  FileCheck,
  AlertCircle,
  Bot,
  UserCheck,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { 
  agentGovernanceData, 
  securityRisks, 
  complianceStatuses,
  humanOversightStatus,
} from '@/data/enterpriseDashboardData';
import { RISK_TIER_CONFIGS } from '@/types/enterprise-dashboard';
import { 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  Cell,
  PieChart,
  Pie,
  Treemap,
} from 'recharts';

const SEVERITY_COLORS = {
  low: 'hsl(var(--muted-foreground))',
  medium: 'hsl(var(--warning))',
  high: 'hsl(var(--destructive))',
  critical: 'hsl(0, 84%, 40%)',
};

const RISK_TYPE_LABELS: Record<string, string> = {
  'chained-vulnerability': 'Chained Vulnerability',
  'data-leakage': 'Data Leakage',
  'synthetic-identity': 'Synthetic Identity',
  'privilege-escalation': 'Privilege Escalation',
  'model-poisoning': 'Model Poisoning',
};

export function GRCControlTowerTab() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Calculate summary metrics
  const activeAgents = agentGovernanceData.filter((a) => a.status === 'active').length;
  const criticalRisks = securityRisks.filter((r) => r.severity === 'critical' || r.severity === 'high').length;
  const complianceRate = (complianceStatuses.filter((c) => c.status === 'compliant').length / complianceStatuses.length) * 100;
  const unmitigatedRisks = securityRisks.filter((r) => r.mitigationStatus === 'unmitigated').length;

  // Risk distribution for pie chart
  const riskDistribution = [
    { name: 'Critical', value: securityRisks.filter((r) => r.severity === 'critical').length, color: SEVERITY_COLORS.critical },
    { name: 'High', value: securityRisks.filter((r) => r.severity === 'high').length, color: SEVERITY_COLORS.high },
    { name: 'Medium', value: securityRisks.filter((r) => r.severity === 'medium').length, color: SEVERITY_COLORS.medium },
    { name: 'Low', value: securityRisks.filter((r) => r.severity === 'low').length, color: SEVERITY_COLORS.low },
  ].filter((d) => d.value > 0);

  // Agent risk tier distribution
  const agentTierDistribution = [
    { name: 'Low Risk', value: agentGovernanceData.filter((a) => a.riskTier === 'low').length },
    { name: 'Medium Risk', value: agentGovernanceData.filter((a) => a.riskTier === 'medium').length },
    { name: 'High Risk', value: agentGovernanceData.filter((a) => a.riskTier === 'high').length },
    { name: 'Critical', value: agentGovernanceData.filter((a) => a.riskTier === 'critical').length },
  ];

  // Heatmap data for risk exposure
  const riskHeatmapData = agentGovernanceData.map((agent) => {
    const agentRisks = securityRisks.filter((r) => r.affectedAgents.includes(agent.agentId));
    const riskScore = agentRisks.reduce((sum, r) => {
      switch (r.severity) {
        case 'critical': return sum + 40;
        case 'high': return sum + 25;
        case 'medium': return sum + 10;
        default: return sum + 5;
      }
    }, 0);
    
    return {
      name: agent.agentName,
      size: Math.max(riskScore, 10),
      riskTier: agent.riskTier,
      department: agent.department,
      autonomyLevel: agent.autonomyLevel,
    };
  });

  const getRiskTierColor = (tier: string) => {
    switch (tier) {
      case 'critical': return 'bg-[hsl(0,84%,40%)]/10 text-[hsl(0,84%,40%)] border-[hsl(0,84%,40%)]/20';
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-success/10 text-success border-success/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-success/10 text-success';
      case 'non-compliant': return 'bg-destructive/10 text-destructive';
      case 'pending-review': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMitigationColor = (status: string) => {
    switch (status) {
      case 'mitigated': return 'text-success';
      case 'in-progress': return 'text-warning';
      default: return 'text-destructive';
    }
  };

  const selectedAgentData = selectedAgent 
    ? agentGovernanceData.find((a) => a.agentId === selectedAgent) 
    : null;

  return (
    <div className="space-y-6">
      {/* Control Tower Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Active Agents</span>
            </div>
            <p className="text-2xl font-bold">{activeAgents}</p>
            <p className="text-xs text-muted-foreground">of {agentGovernanceData.length} deployed</p>
          </CardContent>
        </Card>

        <Card className={criticalRisks > 0 ? 'border-destructive/50 bg-destructive/5' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`h-4 w-4 ${criticalRisks > 0 ? 'text-destructive' : 'text-success'}`} />
              <span className="text-sm text-muted-foreground">Critical/High Risks</span>
            </div>
            <p className={`text-2xl font-bold ${criticalRisks > 0 ? 'text-destructive' : 'text-success'}`}>
              {criticalRisks}
            </p>
            <p className="text-xs text-muted-foreground">{unmitigatedRisks} unmitigated</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Compliance Rate</span>
            </div>
            <p className="text-2xl font-bold text-success">{complianceRate.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">
              {complianceStatuses.filter((c) => c.status === 'compliant').length}/{complianceStatuses.length} regulations
            </p>
          </CardContent>
        </Card>

        <Card className={humanOversightStatus.overrideAuthorityPresent ? '' : 'border-destructive/50 bg-destructive/5'}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Human Oversight</span>
            </div>
            <p className="text-2xl font-bold">{humanOversightStatus.staffOnDuty}</p>
            <p className="text-xs text-muted-foreground">
              {humanOversightStatus.coveragePercentage}% coverage | {humanOversightStatus.avgResponseTime}min avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Escalations (24h)</span>
            </div>
            <p className="text-2xl font-bold">{humanOversightStatus.escalationsLast24h}</p>
            <p className="text-xs text-muted-foreground">requiring human review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents" className="gap-2">
            <Bot className="h-4 w-4" />
            Agent Governance
          </TabsTrigger>
          <TabsTrigger value="risks" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Security Risks
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="tiers" className="gap-2">
            <Settings className="h-4 w-4" />
            Risk Tiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Agent List */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Deployed Agents</CardTitle>
                <CardDescription>Click an agent to view governance details</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {agentGovernanceData.map((agent) => (
                      <div
                        key={agent.agentId}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedAgent === agent.agentId 
                            ? 'bg-primary/5 border-primary' 
                            : 'bg-card hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedAgent(agent.agentId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getRiskTierColor(agent.riskTier)}`}>
                              <Bot className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{agent.agentName}</p>
                              <p className="text-xs text-muted-foreground">
                                {agent.department} • Owner: {agent.owner}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getRiskTierColor(agent.riskTier)}>
                              {agent.riskTier}
                            </Badge>
                            <Badge variant="outline">
                              Autonomy: {agent.autonomyLevel}/10
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Agent Details */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Agent Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAgentData ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="h-4 w-4" />
                        <span className="font-medium">{selectedAgentData.agentName}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge variant={selectedAgentData.status === 'active' ? 'default' : 'secondary'}>
                            {selectedAgentData.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Department</p>
                          <p>{selectedAgentData.department}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Permissions</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Max Transaction</span>
                          <span>${selectedAgentData.permissions.maxTransactionValue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Dual Control</span>
                          {selectedAgentData.permissions.requiresDualControl ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">External API</span>
                          {selectedAgentData.permissions.externalApiAccess ? (
                            <CheckCircle2 className="h-4 w-4 text-warning" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Data Access</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedAgentData.permissions.dataAccess.map((access) => (
                          <Badge key={access} variant="outline" className="text-xs">
                            {access}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedAgentData.auditTrail.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Recent Activity</p>
                        <div className="space-y-2">
                          {selectedAgentData.auditTrail.slice(0, 3).map((entry, i) => (
                            <div key={i} className="text-xs p-2 rounded bg-muted/30">
                              <p className="font-medium">{entry.action}</p>
                              <p className="text-muted-foreground">{entry.rationale}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {entry.outcome}
                                </Badge>
                                {entry.humanOverride && (
                                  <Badge variant="outline" className="text-xs bg-warning/10">
                                    Human Override
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                    <Bot className="h-8 w-8 mb-2 opacity-50" />
                    <p>Select an agent to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Risk Distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk List */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Security Risk Register</CardTitle>
                <CardDescription>Active threats requiring monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {securityRisks.map((risk) => (
                      <div 
                        key={risk.id}
                        className="p-3 rounded-lg border bg-card"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${SEVERITY_COLORS[risk.severity]}20` }}
                            >
                              <AlertTriangle 
                                className="h-4 w-4" 
                                style={{ color: SEVERITY_COLORS[risk.severity] }}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{RISK_TYPE_LABELS[risk.type]}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {risk.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge 
                                  variant="outline"
                                  style={{ 
                                    backgroundColor: `${SEVERITY_COLORS[risk.severity]}10`,
                                    color: SEVERITY_COLORS[risk.severity],
                                    borderColor: `${SEVERITY_COLORS[risk.severity]}30`,
                                  }}
                                >
                                  {risk.severity}
                                </Badge>
                                <span className={`text-sm ${getMitigationColor(risk.mitigationStatus)}`}>
                                  {risk.mitigationStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {risk.affectedAgents.map((agentId) => {
                            const agent = agentGovernanceData.find((a) => a.agentId === agentId);
                            return (
                              <Badge key={agentId} variant="outline" className="text-xs">
                                {agent?.agentName || agentId}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Regulatory Compliance Status</CardTitle>
              <CardDescription>Data residency and AI governance compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complianceStatuses.map((status) => (
                  <div 
                    key={status.regulation}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">{status.regulation}</span>
                      </div>
                      <Badge className={getStatusColor(status.status)}>
                        {status.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{status.region}</p>
                    <p className="text-xs text-muted-foreground">{status.notes}</p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs text-muted-foreground">
                      <span>Last audit: {status.lastAudit}</span>
                      {status.deadline && (
                        <span className="text-warning">Deadline: {status.deadline}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* EU AI Act Warning */}
          <Card className="border-warning/50 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning">EU AI Act Compliance Window</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    The European Union has proposed delaying enforcement of strict "high risk" AI rules 
                    from August 2026 to December 2027. INT Inc. has until December 2027 to ensure full compliance.
                    Current gap analysis is in progress.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Risk Tier Configuration</CardTitle>
              <CardDescription>Autonomy thresholds and approval requirements by risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {RISK_TIER_CONFIGS.map((tier) => (
                  <div 
                    key={tier.tier}
                    className={`p-4 rounded-lg border ${getRiskTierColor(tier.tier)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium capitalize">{tier.tier} Risk</span>
                      <Badge variant="outline">≤${tier.thresholdValue.toLocaleString()}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Max Autonomy</span>
                        <span>{tier.maxAutonomyLevel}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Approval Required</span>
                        {tier.requiresApproval ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Approval Level</span>
                        <span className="capitalize">{tier.approvalLevel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Monitoring</span>
                        <span className="capitalize">{tier.monitoringFrequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agent Distribution by Tier */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Agent Distribution by Risk Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agentTierDistribution.map((tier) => (
                  <div key={tier.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{tier.name}</span>
                      <span className="font-medium">{tier.value} agents</span>
                    </div>
                    <Progress 
                      value={(tier.value / agentGovernanceData.length) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
