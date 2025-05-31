import CartSteps from "@/components/Cart/CartSteps";
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-primary-50">
      {/* 步驟列 */}
      <CartSteps />

      {/* 主區塊要可滾動 */}
      <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
    </div>
  );
}
