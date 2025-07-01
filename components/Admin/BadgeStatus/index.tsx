interface Props {
    status: '待審核' | 'reject' | 'unpublish_pending' | '已結束'
}
export default function BadgeStatus({status}:Props) {
  return (
    <div className="flex justify-start">
      {status === "待審核" && (
        <span className="rounded bg-yellow-50 px-2 py-0.5 text-xs text-yellow-600">
          待審核
        </span>
      )}
      {status === "reject" && (
        <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
          已退回
        </span>
      )}
      {status === "unpublish_pending" && (
        <span className="rounded bg-yellow-50 px-2 py-0.5 text-xs text-yellow-600">
          待審核
        </span>
      )}
        {status === "已結束" && (
        <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
          已下架
        </span>
      )}
    </div>
  );
}
