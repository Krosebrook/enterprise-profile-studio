import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  KnowledgeFolder,
  useCreateFolder,
  useDeleteFolder,
  useUpdateFolder,
  generateSlug,
} from '@/hooks/useKnowledgeBase';

interface FolderTreeProps {
  folders: KnowledgeFolder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

interface FolderItemProps {
  folder: KnowledgeFolder;
  folders: KnowledgeFolder[];
  level: number;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  expandedFolders: Set<string>;
  toggleFolder: (id: string) => void;
}

function FolderItem({
  folder,
  folders,
  level,
  selectedFolderId,
  onSelectFolder,
  expandedFolders,
  toggleFolder,
}: FolderItemProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(folder.name);
  const deleteFolder = useDeleteFolder();
  const updateFolder = useUpdateFolder();

  const childFolders = folders.filter((f) => f.parent_id === folder.id);
  const hasChildren = childFolders.length > 0;
  const isExpanded = expandedFolders.has(folder.id);
  const isSelected = selectedFolderId === folder.id;

  const handleDelete = () => {
    deleteFolder.mutate(folder.id);
  };

  const handleUpdate = () => {
    updateFolder.mutate({
      id: folder.id,
      name: editName,
      slug: generateSlug(editName),
    });
    setEditDialogOpen(false);
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1.5 rounded-md cursor-pointer group transition-colors',
          isSelected
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-muted text-foreground'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <button
          onClick={() => hasChildren && toggleFolder(folder.id)}
          className="p-0.5 hover:bg-muted rounded"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <span className="w-4" />
          )}
        </button>
        
        <button
          onClick={() => onSelectFolder(folder.id)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          {isExpanded || isSelected ? (
            <FolderOpen className="h-4 w-4 shrink-0" style={{ color: folder.color }} />
          ) : (
            <Folder className="h-4 w-4 shrink-0" style={{ color: folder.color }} />
          )}
          <span className="truncate text-sm">{folder.name}</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Child folders */}
      {hasChildren && isExpanded && (
        <div>
          {childFolders.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              folders={folders}
              level={level + 1}
              selectedFolderId={selectedFolderId}
              onSelectFolder={onSelectFolder}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename folder</DialogTitle>
          </DialogHeader>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Folder name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function FolderTree({ folders, selectedFolderId, onSelectFolder }: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const createFolder = useCreateFolder();

  const rootFolders = folders.filter((f) => !f.parent_id);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder.mutate({
        name: newFolderName.trim(),
        slug: generateSlug(newFolderName.trim()),
        parent_id: selectedFolderId,
      });
      setNewFolderName('');
      setNewFolderDialogOpen(false);
    }
  };

  return (
    <div className="space-y-1">
      {/* All Documents */}
      <button
        onClick={() => onSelectFolder(null)}
        className={cn(
          'flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors',
          selectedFolderId === null
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-muted text-foreground'
        )}
      >
        <Folder className="h-4 w-4" />
        All Documents
      </button>

      {/* Root folders */}
      {rootFolders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          folders={folders}
          level={0}
          selectedFolderId={selectedFolderId}
          onSelectFolder={onSelectFolder}
          expandedFolders={expandedFolders}
          toggleFolder={toggleFolder}
        />
      ))}

      {/* New folder button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 text-muted-foreground"
        onClick={() => setNewFolderDialogOpen(true)}
      >
        <Plus className="h-4 w-4" />
        New Folder
      </Button>

      {/* New folder dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
