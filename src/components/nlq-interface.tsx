
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { nlqAction } from '@/lib/actions';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Bot, Loader2, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Ask AI Analyst'
      )}
    </Button>
  );
}

export default function NlqInterface() {
  const initialState = {
    success: false,
    data: { result: '' },
    error: null as string | null,
  };
  const [state, formAction] = useActionState(nlqAction, initialState);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Natural Language Query</CardTitle>
        <CardDescription>Ask questions about your data in plain English.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              name="query"
              placeholder="e.g., “Show average AQI in Jan 2024 for all cities”"
              rows={3}
              required
            />
            {state?.error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {state?.success && state.data?.result && (
              <div className="p-4 rounded-lg bg-muted/50 border">
                 <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold">AI Analyst Result</p>
                        <p className="text-sm text-foreground/80">{state.data.result}</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
