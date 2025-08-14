
'use client';

import { useState } from 'react';
import DataUpload from './data-upload';
import CleaningConfiguration from './cleaning-configuration';
import { Button } from './ui/button';
import { Download, File as FileIcon, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { explainCleaningAction } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type WorkflowStep = 'upload' | 'configure' | 'download';

export default function DataWorkflow() {
  const [step, setStep] = useState<WorkflowStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
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

  const handleExplainCleaning = async () => {
    setIsExplaining(true);
    setExplanation(null);
    const result = await explainCleaningAction();
    if (result.success && result.data) {
        setExplanation(result.data.explanation);
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Failed to generate explanation.',
            variant: 'destructive',
        });
    }
    setIsExplaining(false);
  };

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
            <div className="space-y-6">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Step 3: Download Your Cleaned Data</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Your dataset <span className="font-semibold text-primary">{file?.name}</span> has been successfully cleaned.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button onClick={() => handleDownload('csv')} size="lg">
                                <Download className="mr-2 h-4 w-4" />
                                Download as CSV
                            </Button>
                            <Button onClick={() => handleDownload('xlsx')} size="lg" variant="secondary">
                                <Download className="mr-2 h-4 w-4" />
                                Download as XLSX
                            </Button>
                            <Button onClick={handleExplainCleaning} size="lg" variant="outline" disabled={isExplaining}>
                                {isExplaining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                Explain Cleaning
                            </Button>
                        </div>
                        <div className="mt-6">
                            <Button variant="link" onClick={() => { setFile(null); setStep('upload'); setExplanation(null); }}>
                                Process another file
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                {isExplaining && (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4 text-muted-foreground">Generating explanation...</p>
                    </div>
                )}
                {explanation && (
                    <Card>
                        <CardHeader>
                            <CardTitle>How Your Data Was Cleaned</CardTitle>
                            <CardDescription>An AI-powered explanation of the techniques applied.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }} />
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    }
  };

  return <div>{renderStep()}</div>;
}
