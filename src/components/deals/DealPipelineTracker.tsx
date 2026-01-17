import { useState, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  KanbanSquare,
  List,
  ChevronRight,
  MoreVertical,
  Eye,
  ArrowRight,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Filter,
  SortAsc,
  Plus,
} from 'lucide-react';
import {
  Deal,
  PipelineStage,
  PIPELINE_STAGES,
  PIPELINE_STAGE_LABELS,
  PIPELINE_STAGE_COLORS,
  generateFullMockDeals,
} from '@/types/deals';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

interface DealPipelineTrackerProps {
  onDealClick?: (deal: Deal) => void;
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const getNextStage = (current: PipelineStage): PipelineStage | null => {
  const idx = PIPELINE_STAGES.indexOf(current);
  if (idx < 0 || idx >= PIPELINE_STAGES.length - 2) return null; // Can't go past 'closed' or from 'passed'
  if (current === 'passed') return null;
  return PIPELINE_STAGES[idx + 1];
};

interface DealCardProps {
  deal: Deal;
  onMoveStage?: (dealId: string, newStage: PipelineStage) => void;
}

function DealCard({ deal, onMoveStage }: DealCardProps) {
  const nextStage = getNextStage(deal.pipelineStage);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="cursor-pointer border-l-4 transition-all hover:shadow-lg" style={{
        borderLeftColor: `var(--${deal.pipelineStage === 'closed' ? 'green' : deal.pipelineStage === 'passed' ? 'red' : 'primary'})`,
      }}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <Link to={`/deals/${deal.id}`} className="min-w-0 flex-1">
              <h3 className="truncate font-semibold transition-colors group-hover:text-primary">
                {deal.name}
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{deal.description}</p>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/deals/${deal.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                {nextStage && onMoveStage && (
                  <DropdownMenuItem onClick={() => onMoveStage(deal.id, nextStage)}>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Move to {PIPELINE_STAGE_LABELS[nextStage]}
                  </DropdownMenuItem>
                )}
                {deal.pipelineStage !== 'passed' && deal.pipelineStage !== 'closed' && onMoveStage && (
                  <DropdownMenuItem
                    onClick={() => onMoveStage(deal.id, 'passed')}
                    className="text-red-500"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Pass on Deal
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {deal.industry.split(' ')[0]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {deal.stage}
            </Badge>
            {deal.trending && (
              <Badge variant="outline" className="text-xs">
                🔥
              </Badge>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              {formatCurrency(deal.amount)}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              {deal.metrics.revenueGrowth}% growth
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              {deal.team.size} team
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(deal.timeline.targetClose).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Match</span>
            <div className="flex items-center gap-2">
              <Progress value={deal.match} className="h-1.5 w-16" />
              <span className={cn(
                'text-xs font-medium',
                deal.match >= 90 ? 'text-green-500' : deal.match >= 80 ? 'text-primary' : ''
              )}>
                {deal.match}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DealPipelineTracker({ onDealClick }: DealPipelineTrackerProps) {
  const [deals, setDeals] = useState<Deal[]>(() => generateFullMockDeals());
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  // Active stages (excluding passed for main pipeline)
  const activeStages: PipelineStage[] = [
    'screening',
    'initial_review',
    'due_diligence',
    'negotiation',
    'term_sheet',
    'closing',
    'closed',
  ];

  const dealsByStage = useMemo(() => {
    const grouped: Record<PipelineStage, Deal[]> = {} as Record<PipelineStage, Deal[]>;
    PIPELINE_STAGES.forEach((stage) => {
      grouped[stage] = deals.filter((d) => d.pipelineStage === stage);
    });
    return grouped;
  }, [deals]);

  const moveToStage = (dealId: string, newStage: PipelineStage) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId ? { ...deal, pipelineStage: newStage } : deal
      )
    );
  };

  const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);
  const activeDeals = deals.filter((d) => d.pipelineStage !== 'passed' && d.pipelineStage !== 'closed');
  const closedDeals = deals.filter((d) => d.pipelineStage === 'closed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <KanbanSquare className="h-5 w-5 text-primary" />
              Deal Pipeline
            </h2>
            <p className="text-sm text-muted-foreground">
              Track and manage deals through your investment process
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border p-1">
              <Button
                variant={view === 'kanban' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setView('kanban')}
              >
                <KanbanSquare className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Summary Stats */}
      <FadeIn delay={0.1}>
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{deals.length}</p>
                <p className="text-xs text-muted-foreground">Total Deals</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{activeDeals.length}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{closedDeals.length}</p>
                <p className="text-xs text-muted-foreground">Closed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                <p className="text-xs text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Kanban View */}
      {view === 'kanban' && (
        <FadeIn delay={0.2}>
          <ScrollArea className="w-full pb-4">
            <div className="flex gap-4" style={{ minWidth: `${activeStages.length * 280}px` }}>
              {activeStages.map((stage) => (
                <div key={stage} className="w-[260px] shrink-0">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn('h-2 w-2 rounded-full', PIPELINE_STAGE_COLORS[stage])}
                      />
                      <span className="text-sm font-medium">
                        {PIPELINE_STAGE_LABELS[stage]}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {dealsByStage[stage].length}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatCurrency(
                        dealsByStage[stage].reduce((sum, d) => sum + d.amount, 0)
                      )}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {dealsByStage[stage].map((deal) => (
                        <DealCard key={deal.id} deal={deal} onMoveStage={moveToStage} />
                      ))}
                    </AnimatePresence>

                    {dealsByStage[stage].length === 0 && (
                      <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
                        No deals
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </FadeIn>
      )}

      {/* List View */}
      {view === 'list' && (
        <FadeIn delay={0.2}>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {deals.map((deal) => (
                  <Link
                    key={deal.id}
                    to={`/deals/${deal.id}`}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={cn(
                        'h-3 w-3 shrink-0 rounded-full',
                        PIPELINE_STAGE_COLORS[deal.pipelineStage]
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{deal.name}</span>
                        {deal.trending && <span>🔥</span>}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {deal.description}
                      </p>
                    </div>
                    <Badge variant="secondary">{deal.industry.split(' ')[0]}</Badge>
                    <Badge variant="outline">{deal.stage}</Badge>
                    <Badge
                      className={cn(
                        'text-white',
                        PIPELINE_STAGE_COLORS[deal.pipelineStage]
                      )}
                    >
                      {PIPELINE_STAGE_LABELS[deal.pipelineStage]}
                    </Badge>
                    <span className="w-20 text-right font-medium">
                      {formatCurrency(deal.amount)}
                    </span>
                    <span
                      className={cn(
                        'w-12 text-right text-sm font-medium',
                        deal.match >= 90
                          ? 'text-green-500'
                          : deal.match >= 80
                          ? 'text-primary'
                          : ''
                      )}
                    >
                      {deal.match}%
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Passed Deals Section */}
      {dealsByStage['passed'].length > 0 && (
        <FadeIn delay={0.3}>
          <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                Passed Deals ({dealsByStage['passed'].length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dealsByStage['passed'].map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}
    </div>
  );
}
