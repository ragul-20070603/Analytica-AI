import DataUpload from '@/components/data-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitBranch, MessageSquare, User, Calendar } from 'lucide-react';
import type { DatasetVersion } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

const versionHistory: DatasetVersion[] = [
  {
    id: 'a1b2c3d4',
    author: 'Alice Johnson',
    date: '2024-07-20',
    commitMessage: 'Initial dataset upload and cleaning.',
    branch: 'main',
  },
  {
    id: 'e5f6g7h8',
    author: 'Bob Williams',
    date: '2024-07-21',
    commitMessage: 'Applied conditional transformation on revenue.',
    branch: 'feature/revenue-analysis',
  },
  {
    id: 'i9j0k1l2',
    author: 'Alice Johnson',
    date: '2024-07-22',
    commitMessage: 'Merged revenue analysis and fixed outliers.',
    branch: 'main',
  },
  {
    id: 'm3n4o5p6',
    author: 'Charlie Brown',
    date: '2024-07-23',
    commitMessage: 'Generated synthetic data for testing.',
    branch: 'develop',
  },
];

export default function DatasetsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Ingest Data</CardTitle>
            <CardDescription>Upload a new dataset to begin analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataUpload />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Dataset Version Control</CardTitle>
            <CardDescription>Track changes and versions of your datasets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Commit Details</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {versionHistory.map((version) => (
                    <TableRow key={version.id}>
                        <TableCell>
                            <p className="font-medium text-foreground">{version.commitMessage}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <div className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5" />
                                    <span>{version.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{version.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <GitBranch className="h-3.5 w-3.5" />
                                    <Badge variant="outline">{version.branch}</Badge>
                                </div>
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>Commit ID: {version.id}</p>
                        </TableCell>
                        <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm">View Changes</Button>
                            <Button variant="secondary" size="sm">Revert</Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
