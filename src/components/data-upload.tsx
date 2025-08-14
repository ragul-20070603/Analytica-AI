
'use client';

import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useEffectOnce } from '@/hooks/use-effect-once';

type DataUploadProps = {
  onFileAccepted: (file: File) => void;
};

export default function DataUpload({ onFileAccepted }: DataUploadProps) {
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a CSV or XLSX file.',
          variant: 'destructive',
        });
        return;
      }

      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        onFileAccepted(selectedFile);
        toast({
            title: 'File Accepted',
            description: `${selectedFile.name} is ready for processing.`,
        });
      }
    },
    [toast, onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
        isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-border hover:border-primary/50'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <UploadCloud className="w-12 h-12 text-primary" />
        <p className="font-semibold text-foreground">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag & drop a file here, or click to select'}
        </p>
        <p className="text-sm">CSV or XLSX files only</p>
      </div>
    </div>
  );
}
