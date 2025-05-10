export default function EventLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <div className="h-screen bg-primary-50">
      <main className="min-h-full overflow-auto">{children}</main>
    </div>
    );
  }