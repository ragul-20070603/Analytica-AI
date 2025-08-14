
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
import { GitBranch, User, Calendar, MessageSquare, Fingerprint, History } from 'lucide-react';
import type { DatasetVersion } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';


const mockVersions: DatasetVersion[] = [
  {
    id: 'f4b3c2d1a098e7d6c5b4a3b2a109f8e7d6c5b4a3b2a1f4b3c2d1a098e7d6c5b4',
    author: 'Alice',
    date: '2024-07-28 14:30 UTC',
    commitMessage: 'Initial dataset upload and cleaning',
    branch: 'main',
  },
  {
    id: 'e5c4d3b2a109f8e7d6c5b4a3b2a1f4b3c2d1a098e7d6c5b4a3b2a109f8e7d6c5',
    author: 'Bob',
    date: '2024-07-29 09:15 UTC',
    commitMessage: 'Corrected outliers in revenue column',
    branch: 'feat/revenue-fix',
  },
  {
    id: 'd6b5c4a3b210f8e7d6c5b4a3b2a1f4b3c2d1a098e7d6c5b4a3b2a1f4b3c2d1a0',
    author: 'Alice',
    date: '2024-07-29 11:00 UTC',
    commitMessage: 'Merged revenue fix and updated schema',
    branch: 'main',
  },
  {
    id: 'c7a6b5d4c321f8e7d6c5b4a3b2a1f4b3c2d1a098e7d6c5b4a3b2a1f4b3c2d1a0',
    author: 'Charlie',
    date: '2024-07-30 16:45 UTC',
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
            <TableHead>
                <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" />
                    <span>Commit Hash</span>
                </div>
            </TableHead>
            <TableHead>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Author</span>
                </div>
            </TableHead>
            <TableHead>
                 <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Commit Message</span>
                </div>
            </TableHead>
            <TableHead>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Timestamp</span>
                </div>
            </TableHead>
            <TableHead>
                 <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    <span>Branch</span>
                </div>
            </TableHead>
            <TableHead className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <History className="h-4 w-4" />
                    <span>Actions</span>
                </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVersions.map((version) => (
            <TableRow key={version.id}>
              <TableCell className="font-mono text-sm">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer hover:underline">{version.id.substring(0, 12)}...</TooltipTrigger>
                        <TooltipContent>
                            <p className="font-mono">{version.id}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                {version.author}
              </TableCell>
              <TableCell>
                 {version.commitMessage}
              </TableCell>
              <TableCell>
                 {version.date}
              </TableCell>
              <TableCell>
                <Badge variant={version.branch === 'main' ? 'default' : 'secondary'} className="gap-1.5">
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
