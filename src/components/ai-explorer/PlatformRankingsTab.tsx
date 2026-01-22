import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { enterprisePlatformRankings, rankingsSummary, type CategoryRanking } from '@/data/enterprisePlatformRankings';
import { Trophy, Medal, Award, Info } from 'lucide-react';

const RANK_COLORS = {
  1: 'hsl(var(--chart-1))',
  2: 'hsl(var(--chart-2))',
  3: 'hsl(var(--chart-3))',
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
        <Trophy className="h-3 w-3 mr-1" />
        #1
      </Badge>
    );
  }
  if (rank === 2) {
    return (
      <Badge className="bg-slate-400/20 text-slate-600 border-slate-400/30">
        <Medal className="h-3 w-3 mr-1" />
        #2
      </Badge>
    );
  }
  if (rank === 3) {
    return (
      <Badge className="bg-orange-600/20 text-orange-700 border-orange-600/30">
        <Award className="h-3 w-3 mr-1" />
        #3
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      #{rank}
    </Badge>
  );
}

function CategoryCard({ category }: { category: CategoryRanking }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <CardTitle className="text-lg">{category.displayName}</CardTitle>
        </div>
        <CardDescription>Top 10 platforms for 2025</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {category.platforms.slice(0, 5).map((platform) => (
            <div
              key={platform.rank}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <RankBadge rank={platform.rank} />
                  <span className="font-medium text-sm truncate">{platform.platform}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {platform.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RankingsChart() {
  const chartData = rankingsSummary.categories.map((cat) => ({
    category: cat.name,
    rank1: 3,
    rank2: 2,
    rank3: 1,
    rank1Label: cat.rank1,
    rank2Label: cat.rank2,
    rank3Label: cat.rank3,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = chartData.find((d) => d.category === label);
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: RANK_COLORS[1] }} />
              <span className="font-medium">#1:</span> {data?.rank1Label}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: RANK_COLORS[2] }} />
              <span className="font-medium">#2:</span> {data?.rank2Label}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: RANK_COLORS[3] }} />
              <span className="font-medium">#3:</span> {data?.rank3Label}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          2025 Platform Rankings Overview
        </CardTitle>
        <CardDescription>
          Top 3 platforms per category based on market analysis and enterprise adoption
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 6]} hide />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 12 }}
                className="text-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    rank1: 'Rank 1',
                    rank2: 'Rank 2',
                    rank3: 'Rank 3',
                  };
                  return labels[value] || value;
                }}
              />
              <Bar dataKey="rank1" stackId="a" fill={RANK_COLORS[1]} name="rank1" radius={[0, 0, 0, 0]} />
              <Bar dataKey="rank2" stackId="a" fill={RANK_COLORS[2]} name="rank2" radius={[0, 0, 0, 0]} />
              <Bar dataKey="rank3" stackId="a" fill={RANK_COLORS[3]} name="rank3" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailedRankingsTable({ category }: { category: CategoryRanking }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          {category.displayName} - Full Rankings
        </CardTitle>
        <CardDescription>
          Complete top 10 list with focus areas and ideal use cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="hidden md:table-cell">Focus</TableHead>
              <TableHead className="hidden lg:table-cell">Ideal For</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.platforms.map((platform) => (
              <TableRow key={platform.rank}>
                <TableCell>
                  <RankBadge rank={platform.rank} />
                </TableCell>
                <TableCell className="font-medium">{platform.platform}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {platform.focus}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline">{platform.idealFor}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function PlatformRankingsTab() {
  const [selectedCategory, setSelectedCategory] = useState(enterprisePlatformRankings[0].category);

  const currentCategory = enterprisePlatformRankings.find(
    (c) => c.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">2025 Platform Rankings</h2>
          <p className="text-muted-foreground">
            Comprehensive rankings across 10 enterprise software categories
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Info className="h-3 w-3" />
          100 Platforms Ranked
        </Badge>
      </div>

      {/* Rankings Overview Chart */}
      <RankingsChart />

      {/* Category Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick View by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {enterprisePlatformRankings.slice(0, 5).map((category) => (
            <CategoryCard key={category.category} category={category} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
          {enterprisePlatformRankings.slice(5, 10).map((category) => (
            <CategoryCard key={category.category} category={category} />
          ))}
        </div>
      </div>

      {/* Detailed View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Detailed Rankings</h3>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {enterprisePlatformRankings.map((category) => (
              <TabsTrigger
                key={category.category}
                value={category.category}
                className="text-xs sm:text-sm"
              >
                <span className="mr-1">{category.icon}</span>
                <span className="hidden sm:inline">{category.displayName}</span>
                <span className="sm:hidden">{category.displayName.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {enterprisePlatformRankings.map((category) => (
            <TabsContent key={category.category} value={category.category} className="mt-4">
              <DetailedRankingsTable category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
