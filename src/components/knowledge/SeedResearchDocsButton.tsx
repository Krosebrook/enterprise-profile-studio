import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { intIncResearchDocuments } from '@/data/intIncResearchDocuments';
import { useBulkImportDocuments, useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import { Loader2, Check, FileSearch } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SeedResearchDocsButton() {
  const [open, setOpen] = useState(false);
  const { data: existingDocs } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  const existingSlugs = new Set(existingDocs?.map((d) => d.slug) || []);
  const newDocuments = intIncResearchDocuments.filter((d) => !existingSlugs.has(d.slug));

  const handleImport = async () => {
    if (newDocuments.length > 0) {
      await bulkImport.mutateAsync(newDocuments);
    }
    setOpen(false);
  };

  if (newDocuments.length === 0) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Check className="h-4 w-4 text-green-500" />
        Research Docs Imported
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5">
          <FileSearch className="h-4 w-4 text-orange-500" />
          Research Docs ({newDocuments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-orange-500" />
            Import AI Research Documents
          </DialogTitle>
          <DialogDescription>
            Import {newDocuments.length} comprehensive research documents including case studies, ROI analysis, and department taxonomies.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImport} disabled={bulkImport.isPending} className="gap-2">
            {bulkImport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSearch className="h-4 w-4" />}
            {bulkImport.isPending ? 'Importing...' : 'Import All'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
