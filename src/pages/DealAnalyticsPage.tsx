import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { DealAnalyticsDashboard } from '@/components/deals/DealAnalyticsDashboard';
import { ArrowLeft, LayoutDashboard, GitCompare, Loader2 } from 'lucide-react';

export default function DealAnalyticsPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="the-dot-lg animate-pulse-dot" />
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-20">
        <div className="container max-w-7xl py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button variant="ghost" onClick={() => navigate('/deals/pipeline')} className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pipeline
              </Button>
              <h1 className="font-display text-3xl font-bold">Deal Analytics</h1>
              <p className="mt-1 text-muted-foreground">
                Track pipeline performance, conversion rates, and value trends
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/deals/pipeline">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Pipeline
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/deals/compare">
                  <GitCompare className="mr-2 h-4 w-4" />
                  Compare Deals
                </Link>
              </Button>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <DealAnalyticsDashboard />
        </div>
      </main>
    </>
  );
}
