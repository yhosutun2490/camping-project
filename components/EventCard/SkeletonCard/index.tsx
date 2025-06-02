export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-white shadow p-4 space-y-4 max-w-[500px] min-w-[300px] mx-auto">
      <div className="bg-neutral-200 h-[180px] w-full rounded-md" />
      <div className="h-4 bg-neutral-200 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 rounded w-1/2" />
      <div className="flex space-x-2">
        <div className="h-6 w-16 bg-neutral-200 rounded-full" />
        <div className="h-6 w-16 bg-neutral-200 rounded-full" />
      </div>
    </div>
  );
}