import type { GetEventsParams } from "@/types/api/event/allEvents";
import EventFilterShell from "@/components/EventFilterShell";
import RestButton from "@/components/EventFilterShell/ResetButton";
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

  const { location, people, minPrice, maxPrice } = filter;

  const searchDescriptions: string[] = [];

  if (location) searchDescriptions.push(`「${location}」`);
  if (people) searchDescriptions.push(`「${people}人」`);
  if (minPrice && maxPrice) {
    searchDescriptions.push(`「價格 $${minPrice}~$${maxPrice}」`);
  }

  const searchSummary =
    searchDescriptions.length > 0
      ? `以下是您搜尋 ${searchDescriptions.join("、")} 的露營活動`
      : "以下是所有露營活動";

  // event tags
  const tagData = await getEventTags();

  return (
    <div className="min-h-screen bg-primary-50">
      <div
        className="search_condition flex flex-col gap-2 md:flex-row items-center heading-3 text-center text-neutral-950 
      pt-6 pb-3 md:py-6 px-4 lg:py-2"
      >
        {isAllEmpty ? (
          <span className="heading-3">以下是所有露營活動</span>
        ) : (
          <span>{searchSummary}</span>
        )}
        <RestButton />
      </div>
      <EventFilterShell
        initialFilter={filter}
        initialEventTags={tagData?.eventTags ?? []}
      />
    </div>
  );
}
