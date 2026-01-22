import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookMarked } from 'lucide-react';
import { useKnowledgeDocuments, useBulkImportDocuments } from '@/hooks/useKnowledgeBase';
import { platformDocsData } from '@/data/platformDocsData';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SeedPlatformDocsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { data: existingDocuments } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  const handleSeedDocuments = async () => {
    if (!existingDocuments) {
      toast.error('Unable to check existing documents');
      return;
    }

    // Check for existing documents by slug
    const existingSlugs = new Set(existingDocuments.map(doc => doc.slug));
    const newDocuments = platformDocsData.filter(doc => !existingSlugs.has(doc.slug));

    if (newDocuments.length === 0) {
      toast.info('All Platform Docs are already imported', {
        description: `${platformDocsData.length} documents already exist in your knowledge base.`,
      });
      return;
    }

    setIsSeeding(true);
    
    try {
      await bulkImport.mutateAsync(newDocuments);
      toast.success(`Imported ${newDocuments.length} Platform Docs`, {
        description: 'Technical documentation has been added to your knowledge base.',
      });
    } catch (error) {
      console.error('Failed to seed platform docs:', error);
      toast.error('Failed to import platform documentation');
    } finally {
      setIsSeeding(false);
    }
  };

  const existingSlugs = new Set(existingDocuments?.map(doc => doc.slug) || []);
  const alreadyImported = platformDocsData.every(doc => existingSlugs.has(doc.slug));

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSeedDocuments}
            disabled={isSeeding || alreadyImported}
            className="gap-2"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <BookMarked className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Platform Docs</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {alreadyImported
              ? 'Platform Docs already imported'
              : `Import ${platformDocsData.length} technical documentation files`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
