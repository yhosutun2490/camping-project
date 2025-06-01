export interface EventNotice {
  id: string;
  event_info_id: string;
  content: string;
  created_at?: string; // 或使用 Date，如果你會轉成 JS Date 物件
  updated_at?: string;
}

interface Props {
  notices: EventNotice[];
}
export default function EventNotice({ notices }: Props) {
  return (
    <div id="event-notice" className="notice_section md:mt-20">
      <p className="heading-2 mb-4">行前提醒</p>
      <div className="notice_contents rounded-2xl bg-neutral-50 p-4">
        {notices.map((item) => (
          <li key={item.id} className="w-[calc(100%-1rem)] text-base relative left-4 mt-2">
            <p>{item.content}</p>
          </li>
        ))}
      </div>
    </div>
  );
}
