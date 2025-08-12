import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NlqInterface from '@/components/nlq-interface';
import InteractiveChart from '@/components/interactive-chart';

export default function AnalyticsPage() {
  return (
    <Tabs defaultValue="nlq" className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
        <TabsTrigger value="nlq">NLQ Interface</TabsTrigger>
        <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
      </TabsList>
      <TabsContent value="nlq" className="mt-8">
        <NlqInterface />
      </TabsContent>
      <TabsContent value="visualizations" className="mt-8">
        <InteractiveChart />
      </TabsContent>
    </Tabs>
  );
}
