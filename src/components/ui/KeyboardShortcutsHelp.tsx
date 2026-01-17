import { useState, useEffect } from 'react';
import { Keyboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const shortcuts = [
  { keys: ['⌘', 'K'], description: 'Open command palette' },
  { keys: ['/'], description: 'Focus search' },
  { keys: ['N'], description: 'Create new item' },
  { keys: ['E'], description: 'Edit current item' },
  { keys: ['H'], description: 'Go home' },
  { keys: ['D'], description: 'Go to dashboard' },
  { keys: ['K'], description: 'Go to knowledge base' },
  { keys: ['A'], description: 'Go to analytics' },
  { keys: ['Esc'], description: 'Cancel / Close' },
  { keys: ['?'], description: 'Show this help' },
];

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);
  
  // Listen for shortcut event
  useEffect(() => {
    const handleShowHelp = () => setOpen(true);
    window.addEventListener('shortcut:show-help', handleShowHelp);
    return () => window.removeEventListener('shortcut:show-help', handleShowHelp);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          title="Keyboard shortcuts"
        >
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Navigate quickly with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 text-xs font-medium text-foreground"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Press <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 text-xs">?</kbd> anywhere to open this dialog
        </div>
      </DialogContent>
    </Dialog>
  );
}
