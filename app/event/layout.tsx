export default function EventLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <div className="h-screen bg-primary-50 pt-[60px]">
      <main className="min-h-0 overflow-auto">{children}</main>
    </div>
    );
  }