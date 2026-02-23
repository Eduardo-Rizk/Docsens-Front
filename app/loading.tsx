export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-36 bg-surface border border-border" />
      <div className="h-14 w-2/3 bg-surface border border-border" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-48 bg-surface border border-border" />
        <div className="h-48 bg-surface border border-border" />
        <div className="h-48 bg-surface border border-border" />
      </div>
      <div className="space-y-3">
        <div className="h-24 bg-surface border border-border" />
        <div className="h-24 bg-surface border border-border" />
      </div>
    </div>
  );
}
