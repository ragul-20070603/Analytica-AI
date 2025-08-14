
'use client';

import { useState } from 'react';
import DataUpload from './data-upload';
import CleaningConfiguration from './cleaning-configuration';
import { Button } from './ui/button';
import { Download, File as FileIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type WorkflowStep = 'upload' | 'configure' | 'download';

export default function DataWorkflow() {
  const [step, setStep] = useState<WorkflowStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const { toast } = useToast();

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile);
    setStep('configure');
  };

  const handleCleanData = () => {
    setIsCleaning(true);
    toast({
      title: 'Processing Data',
      description: 'Your dataset is being cleaned...',
    });

    // Simulate cleaning process
    setTimeout(() => {
      setIsCleaning(false);
      setStep('download');
      toast({
        title: 'Cleaning Complete',
        description: 'Your dataset is now ready for download.',
      });
    }, 2000);
  };
  
  const handleDownload = (format: 'csv' | 'xlsx') => {
    if (!file) return;
    toast({
        title: 'Download Started',
        description: `Downloading cleaned ${file.name} as ${format}. (Simulation)`,
    });
    // In a real app, you would trigger a file download here.
  }

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Upload Your Dataset</CardTitle>
            </CardHeader>
            <CardContent>
              <DataUpload onFileAccepted={handleFileAccepted} />
            </CardContent>
          </Card>
        );
      case 'configure':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <FileIcon className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>File: {file?.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <CleaningConfiguration />
            <div className="flex justify-end">
              <Button onClick={handleCleanData} disabled={isCleaning} size="lg">
                {isCleaning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cleaning...
                  </>
                ) : (
                  'Clean Data & Prepare for Download'
                )}
              </Button>
            </div>
          </div>
        );
      case 'download':
        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Step 3: Download Your Cleaned Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Your dataset <span className="font-semibold text-primary">{file?.name}</span> has been successfully cleaned.</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => handleDownload('csv')} size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download as CSV
                        </Button>
                        <Button onClick={() => handleDownload('xlsx')} size="lg" variant="secondary">
                            <Download className="mr-2 h-4 w-4" />
                            Download as XLSX
                        </Button>
                    </div>
                     <div className="mt-6">
                        <Button variant="link" onClick={() => { setFile(null); setStep('upload'); }}>
                            Process another file
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
  };

  return <div>{renderStep()}</div>;
}
