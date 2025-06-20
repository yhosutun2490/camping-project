import type { EventInfo } from "@/types/api/event/eventById";
type EventModalInfo = Pick<
  EventInfo,
  "id" | "title" | "description" | "cancel_policy" | "notices" | "plans"
>;

interface Props {
  content: EventModalInfo;
  handleCloseContentModal?: ()=>void
}
export default function ActivityModalContent({ content,handleCloseContentModal }: Props) {

 
  return (
    <div className="event_details flex flex-col">
      <button className="btn-primary w-fit self-end" onClick={handleCloseContentModal}>關閉</button>
      <ul className="space-y-2">
        <li className="description space-y-2">
          <p className="text-primary-500">活動描述:</p>
          <p className="text-neutral-950"> {content.description} </p>
        </li>
        <li className="policy space-y-2">
          <p className="text-primary-500">活動政策:</p>
          <p className="text-neutral-950"> {content.cancel_policy} </p>
        </li>
        <div className="plans"></div>
        <li className="notices space-y-2">
          <p className="text-primary-500">注意事項:</p>
          <ul className="content text-neutral-950 list-disc list-inside p-2 border rounded-2xl border-primary-500 space-y-1">
            {content.notices.map((notice) => {
              return <li key={notice.id}>{notice.content}</li>;
            })}
          </ul>
        </li>
        <li className="plans space-y-2">
          <p className="text-primary-500">方案內容:</p>
          <ul className="content space-y-4 text-neutral-950">
            {content.plans.map((plan, index) => {
              return (
                <li key={plan.id} className="p-2 border rounded-2xl border-primary-500">
                  <p>方案 {index + 1}</p>
                  <p>{plan.title}</p>
                  {plan.eventPlanAddonBox.map(item => (
                    <div key={item.id}>{item.name}</div>
                  ))}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
