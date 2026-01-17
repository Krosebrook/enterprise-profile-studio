import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DealDetail } from '@/components/deals/DealDetail';
import { generateFullMockDeals } from '@/types/deals';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const allDeals = useMemo(() => generateFullMockDeals(), []);
  
  const deal = allDeals.find(d => d.id === id);

  if (!deal) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background">
          <Card className="max-w-md">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-bold">Deal Not Found</h2>
              <p className="mt-2 text-muted-foreground">
                The deal you're looking for doesn't exist or has been removed.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/deals/pipeline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Pipeline
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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
            <DealDetail deal={deal} onBack={() => navigate(-1)} />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
