import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Calendar, Type, FolderOpen, Tags } from 'lucide-react';

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'category-asc' | 'tags-desc' | 'tags-asc';

interface DocumentSortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: typeof ArrowUpDown }[] = [
  { value: 'date-desc', label: 'Newest First', icon: Calendar },
  { value: 'date-asc', label: 'Oldest First', icon: Calendar },
  { value: 'title-asc', label: 'Title A-Z', icon: Type },
  { value: 'title-desc', label: 'Title Z-A', icon: Type },
  { value: 'category-asc', label: 'Category A-Z', icon: FolderOpen },
  { value: 'tags-desc', label: 'Most Tags', icon: Tags },
  { value: 'tags-asc', label: 'Fewest Tags', icon: Tags },
];

export function DocumentSortSelect({ value, onChange }: DocumentSortSelectProps) {
  const selectedOption = sortOptions.find(opt => opt.value === value);

  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-[160px] h-9 text-sm border-border/60">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue placeholder="Sort by..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value} className="text-sm">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                {option.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
