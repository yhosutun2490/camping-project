import CartSteps from "@/components/Cart/CartSteps";
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cart_layout min-h-screen flex flex-col bg-primary-50">
      {/* 步驟列 */}
      <div className="z-1 sticky top-0">
          <CartSteps />
      </div>
    
      {/* 主區塊要可滾動 */}
      <main className="cart_page_content flex-1 min-h-0 px-[4%] sm:px-[5%] lg:px-[10%] xl:px-[15%]">{children}</main>
    </div>
  );
}
