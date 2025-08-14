
'use client';

import { useState } from 'react';
import DataUpload from './data-upload';
import CleaningConfiguration from './cleaning-configuration';
import { Button } from './ui/button';
import { Download, File as FileIcon, Loader2, Sparkles, Wand2, SlidersHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { explainCleaningAction, autoCleanAction } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import type { AutoCleanOutput } from '@/ai/flows/auto-clean';

type WorkflowStep = 'upload' | 'select_mode' | 'configure' | 'auto_clean_result' | 'download';

export default function DataWorkflow() {
  const [step, setStep] = useState<WorkflowStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isAutoCleaning, setIsAutoCleaning] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [autoCleanResult, setAutoCleanResult] = useState<AutoCleanOutput | null>(null);
  const { toast } = useToast();

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile);
    setStep('select_mode');
    setExplanation(null);
    setAutoCleanResult(null);
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

  const handleAutoClean = async () => {
    setIsAutoCleaning(true);
    setAutoCleanResult(null);
    const result = await autoCleanAction();
    if (result.success && result.data) {
        setAutoCleanResult(result.data);
        setStep('auto_clean_result');
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Failed to generate auto-cleaning plan.',
            variant: 'destructive',
        });
    }
    setIsAutoCleaning(false);
  }
  
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

  const resetWorkflow = () => {
    setFile(null);
    setStep('upload');
    setExplanation(null);
    setAutoCleanResult(null);
  }

  const renderFileUpload = () => (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Upload Your Dataset</CardTitle>
      </CardHeader>
      <CardContent>
        <DataUpload onFileAccepted={handleFileAccepted} />
      </CardContent>
    </Card>
  );

  const renderFileCard = () => (
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
            <FileIcon className="w-8 h-8 text-primary" />
            <div>
                <CardTitle>File: {file?.name}</CardTitle>
                <CardDescription>
                    <Button variant="link" className="p-0 h-auto" onClick={resetWorkflow}>Process another file</Button>
                </CardDescription>
            </div>
            </div>
        </CardHeader>
      </Card>
  )

  const renderSelectMode = () => (
    <div className="space-y-6">
        {renderFileCard()}
        <Card>
            <CardHeader>
                <CardTitle>Step 2: Choose Cleaning Method</CardTitle>
                <CardDescription>Select how you want to clean your dataset.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={handleAutoClean} disabled={isAutoCleaning}>
                    {isAutoCleaning ? <Loader2 className="h-6 w-6 animate-spin" /> : <Wand2 className="h-6 w-6 text-primary" />}
                    <span className="text-lg font-semibold">Auto Clean with AI</span>
                    <span className="text-sm text-muted-foreground font-normal">Let AI choose the best cleaning methods.</span>
                </Button>
                 <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setStep('configure')}>
                    <SlidersHorizontal className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">Manual Configuration</span>
                     <span className="text-sm text-muted-foreground font-normal">Manually select cleaning rules.</span>
                </Button>
            </CardContent>
        </Card>
    </div>
  )

  const renderConfigure = () => (
      <div className="space-y-6">
        {renderFileCard()}
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

  const renderAutoCleanResult = () => (
    <div className="space-y-6">
        {renderFileCard()}
        <Card>
            <CardHeader>
                <CardTitle>AI Cleaning Plan</CardTitle>
                <CardDescription>The AI has analyzed your data and proposed the following cleaning steps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {autoCleanResult?.plan.map((item, index) => (
                    <Alert key={index}>
                        <Wand2 className="h-4 w-4" />
                        <AlertTitle>{item.column}</AlertTitle>
                        <AlertDescription>
                            <strong>Technique:</strong> {item.technique} <br />
                            <strong>Reasoning:</strong> {item.reasoning}
                        </AlertDescription>
                    </Alert>
                ))}
                <div className="flex justify-end gap-4 pt-4">
                     <Button variant="outline" onClick={() => setStep('select_mode')}>Back</Button>
                     <Button onClick={() => setStep('download')} size="lg">Apply Plan &amp; Download</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )

  const renderDownload = () => (
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
                      <Button variant="link" onClick={resetWorkflow}>
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

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return renderFileUpload();
      case 'select_mode':
        return renderSelectMode();
      case 'configure':
        return renderConfigure();
      case 'auto_clean_result':
        return renderAutoCleanResult();
      case 'download':
        return renderDownload();
    }
  };

  return <div>{renderStep()}</div>;
}
