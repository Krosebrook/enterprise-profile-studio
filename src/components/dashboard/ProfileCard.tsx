import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnterpriseProfile } from '@/hooks/useProfiles';
import { Building2, Edit, Eye, ExternalLink, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface ProfileCardProps {
  profile: EnterpriseProfile;
  onDelete: (id: string) => void;
}

export function ProfileCard({ profile, onDelete }: ProfileCardProps) {
  const statusColors = {
    draft: 'bg-warning/10 text-warning border-warning/20',
    published: 'bg-success/10 text-success border-success/20',
    archived: 'bg-muted text-muted-foreground border-muted',
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 primary-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              Updated {formatDistanceToNow(new Date(profile.updated_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem asChild>
              <Link to={`/profile/${profile.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/profile/${profile.id}/preview`}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Link>
            </DropdownMenuItem>
            {profile.status === 'published' && (
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Public
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(profile.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <Badge variant="outline" className={statusColors[profile.status]}>
          {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
        </Badge>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="default" size="sm" className="flex-1 primary-gradient border-0">
          <Link to={`/profile/${profile.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link to={`/profile/${profile.id}/preview`}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
