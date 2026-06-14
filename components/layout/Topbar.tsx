export default function Topbar() {
  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center gap-x-4">
          <p className="hidden sm:block text-sm text-slate-500 font-medium tracking-wide uppercase">Placement Intelligence, Personalized.</p>
          <p className="sm:hidden text-sm text-slate-900 font-bold tracking-tight">PrepSync AI</p>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold border border-indigo-200">
              JS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
