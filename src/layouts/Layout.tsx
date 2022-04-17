interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-[34px] font-extrabold text-slate-900">
        Movie<span className="text-blue-500">Time</span>
      </h1>
      {children}
    </div>
  );
}
