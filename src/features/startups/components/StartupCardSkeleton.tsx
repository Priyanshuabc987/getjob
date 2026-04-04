import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StartupCardSkeleton() {
  return (
    <Card className="glass-card overflow-hidden border-none shadow-xl bg-white h-full">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Skeleton className="w-20 h-20 rounded-3xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-64" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-20 rounded-lg" />
              </div>
            </div>
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-wrap gap-6 items-center mt-6">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
