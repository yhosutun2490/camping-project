export default function ActivityLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        <aside>
          {/* 平行插槽可以選擇不 render */}
          {/* 或者也可以提供不同的 UI */}
          {/** 或乾脆不寫，視需求而定 */}
        </aside>
        <main>{children}</main>
      </div>
    );
  }