interface Props {
    status: 'pending' | 'reject'
}
export default function BadgeStatus({status}:Props) {
  return (
    <div className="flex justify-start">
      {status === "pending" && (
        <span className="rounded bg-yellow-50 px-2 py-0.5 text-xs text-yellow-600">
          待審核
        </span>
      )}
      {status === "reject" && (
        <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
          已退回
        </span>
      )}
    </div>
  );
}
