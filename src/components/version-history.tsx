'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitBranch, User, Calendar, MessageSquare } from 'lucide-react';
import type { DatasetVersion } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';


const mockVersions: DatasetVersion[] = [
  {
    id: 'f4b3c2d1a098',
    author: 'Alice',
    date: '2024-07-28 14:30',
    commitMessage: 'Initial dataset upload and cleaning',
    branch: 'main',
  },
  {
    id: 'e5c4d3b2a109',
    author: 'Bob',
    date: '2024-07-29 09:15',
    commitMessage: 'Corrected outliers in revenue column',
    branch: 'feat/revenue-fix',
  },
  {
    id: 'd6b5c4a3b210',
    author: 'Alice',
    date: '2024-07-29 11:00',
    commitMessage: 'Merged revenue fix and updated schema',
    branch: 'main',
  },
  {
    id: 'c7a6b5d4c321',
    author: 'Charlie',
    date: '2024-07-30 16:45',
    commitMessage: 'Added new validation rules for user age',
    branch: 'feat/age-validation',
  },
];


export default function VersionHistory() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commit Hash</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Commit Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVersions.map((version) => (
            <TableRow key={version.id}>
              <TableCell className="font-mono text-sm">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{version.id.substring(0, 7)}...</TooltipTrigger>
                        <TooltipContent>
                            <p>{version.id}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{version.author}</span>
                </div>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{version.commitMessage}</span>
                </div>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{version.date}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={version.branch === 'main' ? 'default' : 'secondary'} className="gap-1">
                  <GitBranch className="h-3 w-3" />
                  {version.branch}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  View Snapshot
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
