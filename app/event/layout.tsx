export default function EventLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <div className="h-screen bg-primary-50">
      <main className="min-h-0 overflow-y-auto">{children}</main>
    </div>
    );
  }