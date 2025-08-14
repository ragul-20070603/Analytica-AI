import DataWorkflow from '@/components/data-workflow';

export default function DatasetsPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Data Processing Workflow</h1>
        <p className="text-muted-foreground">Upload, clean, and download your dataset in a few easy steps.</p>
      </div>
      <DataWorkflow />
    </div>
  );
}
