import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DealPipelineTracker } from '@/components/deals/DealPipelineTracker';
import { Button } from '@/components/ui/button';
import { BarChart3, GitCompare } from 'lucide-react';

export default function DealPipelinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header with navigation */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold">Deal Pipeline</h1>
                <p className="mt-1 text-muted-foreground">Track deals through stages</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/deals/compare">
                    <GitCompare className="mr-2 h-4 w-4" />
                    Compare
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/deals/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </div>
            </div>
            <DealPipelineTracker />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
