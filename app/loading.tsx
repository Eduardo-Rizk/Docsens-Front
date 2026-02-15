export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-4 w-36 rounded-full" />
      <div className="skeleton h-14 w-2/3 rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-48 rounded-3xl" />
        <div className="skeleton h-48 rounded-3xl" />
        <div className="skeleton h-48 rounded-3xl" />
      </div>
      <div className="space-y-3">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
    </div>
  );
}
