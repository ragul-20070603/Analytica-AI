'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function IntegrationsPage() {
  const { toast } = useToast();

  const handleImport = () => {
    toast({
      title: 'Import Started',
      description: 'Importing dataset from Kaggle... (simulation)',
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Exporting dataset to Kaggle... (simulation)',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div data-ai-hint="kaggle logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-primary'>
                <path d="M10.9821 13.9375L6.44643 19L2 13.9375L10.9821 4L15.5179 9.0625L10.9821 13.9375Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12.9643 12.0312L17.5 17.1875L22 12.0312L12.9643 3L8.42859 8.15625L12.9643 12.0312Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
                <CardTitle>Kaggle Integration</CardTitle>
                <CardDescription>Import from or export datasets to Kaggle.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="kaggle-url">Kaggle Dataset URL</Label>
              <Input id="kaggle-url" placeholder="e.g., https://www.kaggle.com/datasets/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kaggle-api">Kaggle API Key</Label>
              <Input id="kaggle-api" type="password" placeholder="Enter your Kaggle API key" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleImport} className="w-full">
                Import from Kaggle
              </Button>
              <Button onClick={handleExport} variant="secondary" className="w-full">
                Export to Kaggle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
