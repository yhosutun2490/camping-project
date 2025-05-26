export default function RootLoading() {
  return (
    <div className="flex flex-col space-y-4 h-screen w-screen items-center justify-center">
      <span className="loading loading-spinner text-neutral"></span>
      <p className="text-black">載入中........</p>
    </div>
  );
}