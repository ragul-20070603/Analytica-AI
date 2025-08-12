'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  datasetName: z.string().min(2, 'Dataset name must be at least 2 characters.'),
  source: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  tags: z.string().optional(),
});

type MetadataFormProps = {
  fileName: string;
  onBack: () => void;
};

export default function MetadataForm({ fileName, onBack }: MetadataFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datasetName: fileName.split('.').slice(0, -1).join('.'),
      source: '',
      description: '',
      tags: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would save this data to Firestore.
    console.log('Metadata submitted:', values);
    toast({
      title: 'Metadata Saved',
      description: `Metadata for ${values.datasetName} has been saved successfully.`,
    });
    // Here you might redirect or update the UI state.
  }

  return (
    <Card className="w-full">
        <CardHeader>
            <div className='flex items-center gap-4'>
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <CardTitle>Dataset Metadata</CardTitle>
                    <CardDescription>Provide details for: {fileName}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="datasetName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Dataset Name</FormLabel>
                    <FormControl>
                        <Input placeholder="E.g., Quarterly Sales Data" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="A brief description of the dataset, its contents, and purpose."
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Data Source (URL)</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com/data-source" {...field} />
                    </FormControl>
                    <FormDescription>
                        Optional: The original source of the data.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="Sales, Q1, Finance" {...field} />
                    </FormControl>
                    <FormDescription>
                        Comma-separated tags for easier searching.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">Save Metadata</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
