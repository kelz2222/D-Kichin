export default function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-32 bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-2 bg-white/10 rounded w-full" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-3 bg-white/10 rounded w-12" />
          <div className="w-8 h-8 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
