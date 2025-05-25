import type { GetEventsParams } from "@/types/api/event/allEvents";
import EventFilterShell from "@/components/EventFilterShell";
import { getEventTags } from "@/api/server-components/event/tags";
export const dynamic = "force-dynamic";
export default async function EventPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const params = await searchParams;

  // filter 條件
  const filter: GetEventsParams = {
    location: params?.location,
    people: params?.person !== undefined ? Number(params.person) : undefined,
    startTime: params?.from,
    endTime: params?.to,
    minPrice:
      params?.minPrice !== undefined && params.minPrice !== ""
        ? Number(params.minPrice)
        : undefined,
    maxPrice:
      params?.maxPrice !== undefined && params.maxPrice !== ""
        ? Number(params.maxPrice)
        : undefined,
  };
  const isAllEmpty = JSON.stringify(params) === "{}";

  // event tags
  const tagData = await getEventTags();

  return (
    <div className="min-h-screen bg-primary-50">
      <p className="search_condition heading-3 text-center text-neutral-950 px-4 py-2">
        {isAllEmpty ? (
          <span>以下是所有露營活動</span>
        ) : (
          <span>
            以下是與
            {filter?.location && <>「{filter?.location}」地區</>}
            {filter?.people && <>、{filter?.people} 人</>}
            {filter?.startTime && filter?.endTime && (
              <>
                時間:{filter?.startTime} ~ {filter?.endTime}
              </>
            )}
            {filter?.minPrice && filter?.maxPrice && (
              <>
                價格:{filter?.minPrice} ~ {filter?.maxPrice}
              </>
            )}
            有關的露營活動體驗
          </span>
        )}
      </p>
      <EventFilterShell
        initialFilter={filter}
        initialTags={tagData?.eventTags ?? []}
      />
    </div>
  );
}
