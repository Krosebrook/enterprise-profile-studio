import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg primary-gradient">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>ProfileBuilder</span>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProfileBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
