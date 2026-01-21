import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Grid3X3, List, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonaFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartments: string[];
  onDepartmentToggle: (dept: string) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  departments: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function PersonaFilterBar({
  searchQuery,
  onSearchChange,
  selectedDepartments,
  onDepartmentToggle,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  departments,
  onClearFilters,
  hasActiveFilters,
}: PersonaFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-4">
      {/* Main toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search personas by name, title, or skills..."
            className="pl-10 h-11"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Status filter */}
        <Select value={selectedStatus || 'all'} onValueChange={(v) => onStatusChange(v === 'all' ? null : v)}>
          <SelectTrigger className="w-[140px] h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'secondary' : 'outline'}
          className="h-11 gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {selectedDepartments.length + (selectedStatus ? 1 : 0)}
            </Badge>
          )}
        </Button>
        
        {/* View mode toggle */}
        <div className="flex border rounded-lg h-11">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-full rounded-r-none',
              viewMode === 'grid' && 'bg-muted'
            )}
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-full rounded-l-none',
              viewMode === 'list' && 'bg-muted'
            )}
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Department
            </span>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear all
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Badge
                key={dept}
                variant={selectedDepartments.includes(dept) ? 'default' : 'outline'}
                className="cursor-pointer transition-colors"
                onClick={() => onDepartmentToggle(dept)}
              >
                {dept}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
