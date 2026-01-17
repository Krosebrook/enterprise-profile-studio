import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Download,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  Building2,
  Briefcase,
  BarChart3,
  Shield,
  Zap,
  Flag,
} from 'lucide-react';
import { Deal, PIPELINE_STAGE_LABELS, PIPELINE_STAGE_COLORS, DueDiligenceItem } from '@/types/deals';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

interface DealDetailProps {
  deal: Deal;
  onBack?: () => void;
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'pitch_deck':
      return '📊';
    case 'financials':
      return '💰';
    case 'legal':
      return '⚖️';
    case 'technical':
      return '🔧';
    case 'market_research':
      return '📈';
    default:
      return '📄';
  }
};

const getDDStatusIcon = (status: DueDiligenceItem['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'flagged':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

const getDDStatusBadge = (status: DueDiligenceItem['status']) => {
  const variants: Record<DueDiligenceItem['status'], string> = {
    pending: 'bg-muted text-muted-foreground',
    in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    flagged: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return variants[status];
};

const getCategoryColor = (category: DueDiligenceItem['category']) => {
  const colors: Record<DueDiligenceItem['category'], string> = {
    financial: 'border-l-green-500',
    legal: 'border-l-purple-500',
    technical: 'border-l-blue-500',
    commercial: 'border-l-amber-500',
    operational: 'border-l-pink-500',
  };
  return colors[category];
};

export function DealDetail({ deal, onBack }: DealDetailProps) {
  const [activeTab, setActiveTab] = useState('memo');
  const [ddFilter, setDdFilter] = useState<string>('all');

  const ddProgress = deal.dueDiligenceChecklist
    ? Math.round(
        (deal.dueDiligenceChecklist.filter((item) => item.status === 'completed').length /
          deal.dueDiligenceChecklist.length) *
          100
      )
    : 0;

  const filteredChecklist = deal.dueDiligenceChecklist?.filter(
    (item) => ddFilter === 'all' || item.category === ddFilter
  );

  const ddCategories = ['all', 'financial', 'legal', 'technical', 'commercial', 'operational'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} asChild={!onBack}>
              {onBack ? (
                <ArrowLeft className="h-5 w-5" />
              ) : (
                <Link to="/deals/pipeline">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              )}
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold">{deal.name}</h1>
                {deal.trending && (
                  <Badge variant="outline" className="text-xs">
                    🔥 Trending
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">{deal.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge>{deal.industry}</Badge>
                <Badge variant="secondary">{deal.stage}</Badge>
                <Badge
                  className={cn(
                    'text-white',
                    PIPELINE_STAGE_COLORS[deal.pipelineStage]
                  )}
                >
                  {PIPELINE_STAGE_LABELS[deal.pipelineStage]}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/deals/compare?deals=${deal.id}`}>Compare</Link>
            </Button>
            <Button>
              <Flag className="mr-2 h-4 w-4" />
              Move Stage
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Key Metrics Strip */}
      <FadeIn delay={0.1}>
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Deal Size</p>
                <p className="text-lg font-bold">{formatCurrency(deal.amount)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Match Score</p>
                <p className={cn(
                  'text-lg font-bold',
                  deal.match >= 90 ? 'text-green-500' : deal.match >= 80 ? 'text-primary' : ''
                )}>
                  {deal.match}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-lg font-bold">{formatCurrency(deal.metrics.revenue)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Growth</p>
                <p className="flex items-center justify-center text-lg font-bold text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {deal.metrics.revenueGrowth}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Runway</p>
                <p className="text-lg font-bold">{deal.metrics.runway || '—'} mo</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Team Size</p>
                <p className="text-lg font-bold">{deal.team.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Main Content Tabs */}
      <FadeIn delay={0.2}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="memo" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Investment Memo
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Documents ({deal.documents?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="diligence" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Due Diligence
            </TabsTrigger>
          </TabsList>

          {/* Investment Memo Tab */}
          <TabsContent value="memo" className="space-y-4">
            {deal.investmentMemo ? (
              <StaggerContainer className="grid gap-4 lg:grid-cols-2">
                {/* Summary & Thesis */}
                <StaggerItem>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="h-5 w-5 text-primary" />
                        Investment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Summary</h4>
                        <p className="mt-1">{deal.investmentMemo.summary}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Investment Thesis</h4>
                        <p className="mt-1">{deal.investmentMemo.thesis}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Recommendation</h4>
                        <Badge
                          className={cn(
                            'mt-1',
                            deal.investmentMemo.recommendation === 'strong_buy' && 'bg-green-500',
                            deal.investmentMemo.recommendation === 'buy' && 'bg-blue-500',
                            deal.investmentMemo.recommendation === 'hold' && 'bg-amber-500',
                            deal.investmentMemo.recommendation === 'pass' && 'bg-red-500'
                          )}
                        >
                          {deal.investmentMemo.recommendation.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                {/* Risks & Opportunities */}
                <StaggerItem>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Shield className="h-5 w-5 text-primary" />
                        Risk & Opportunity Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-red-500">
                          <TrendingDown className="h-4 w-4" />
                          Key Risks
                        </h4>
                        <ul className="space-y-1">
                          {deal.investmentMemo.keyRisks.map((risk, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-red-500">•</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-green-500">
                          <TrendingUp className="h-4 w-4" />
                          Key Opportunities
                        </h4>
                        <ul className="space-y-1">
                          {deal.investmentMemo.keyOpportunities.map((opp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-green-500">•</span>
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                {/* Competitive Advantage */}
                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-5 w-5 text-primary" />
                        Competitive Advantage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{deal.investmentMemo.competitiveAdvantage}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>

                {/* Market Analysis */}
                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Market Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{deal.investmentMemo.marketAnalysis}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>

                {/* Use of Funds */}
                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Use of Funds
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{deal.investmentMemo.useOfFunds}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>

                {/* Exit Strategy */}
                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        Exit Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{deal.investmentMemo.exitStrategy}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-medium">No Investment Memo Available</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The investment memo for this deal has not been prepared yet.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Create Memo
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {deal.documents && deal.documents.length > 0 ? (
              <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {deal.documents.map((doc) => (
                  <StaggerItem key={doc.id}>
                    <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs capitalize">
                              {doc.type.replace('_', ' ')}
                            </Badge>
                            {doc.size && <span>{doc.size}</span>}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Download className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-medium">No Documents Uploaded</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload relevant documents like pitch decks, financials, and legal docs.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Due Diligence Tab */}
          <TabsContent value="diligence" className="space-y-4">
            {deal.dueDiligenceChecklist && deal.dueDiligenceChecklist.length > 0 ? (
              <>
                {/* Progress Overview */}
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Due Diligence Progress</p>
                        <p className="text-2xl font-bold">{ddProgress}% Complete</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-green-500">
                            {deal.dueDiligenceChecklist.filter((i) => i.status === 'completed').length}
                          </p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-amber-500">
                            {deal.dueDiligenceChecklist.filter((i) => i.status === 'in_progress').length}
                          </p>
                          <p className="text-xs text-muted-foreground">In Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-muted-foreground">
                            {deal.dueDiligenceChecklist.filter((i) => i.status === 'pending').length}
                          </p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    </div>
                    <Progress value={ddProgress} className="mt-3 h-2" />
                  </CardContent>
                </Card>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {ddCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={ddFilter === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDdFilter(cat)}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Checklist Items */}
                <StaggerContainer className="space-y-2">
                  {filteredChecklist?.map((item) => (
                    <StaggerItem key={item.id}>
                      <Card
                        className={cn(
                          'border-l-4 transition-all hover:shadow-md',
                          getCategoryColor(item.category)
                        )}
                      >
                        <CardContent className="flex items-center gap-4 py-3">
                          <Checkbox
                            checked={item.status === 'completed'}
                            disabled={item.status === 'completed'}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className={cn(
                                'font-medium',
                                item.status === 'completed' && 'text-muted-foreground line-through'
                              )}>
                                {item.title}
                              </p>
                              {getDDStatusIcon(item.status)}
                            </div>
                            {item.description && (
                              <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                            )}
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs capitalize">
                                {item.category}
                              </Badge>
                              <Badge className={cn('text-xs', getDDStatusBadge(item.status))}>
                                {item.status.replace('_', ' ')}
                              </Badge>
                              {item.assignee && (
                                <span className="text-xs text-muted-foreground">
                                  Assigned: {item.assignee}
                                </span>
                              )}
                              {item.dueDate && (
                                <span className="text-xs text-muted-foreground">
                                  Due: {new Date(item.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-medium">No Due Diligence Checklist</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create a due diligence checklist to track your review process.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Create Checklist
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
