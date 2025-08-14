import VersionHistory from '@/components/version-history';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VersionControlPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Dataset Version History</CardTitle>
          <CardDescription>
            Track changes to your datasets. Each version represents a commit to the immutable ledger.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VersionHistory />
        </CardContent>
      </Card>
    </div>
  );
}
