

import type { GetEventsParams } from '@/types/api/event/allEvents'
import EventFilterShell from '@/components/EventFilterShell'
import { getEventTags } from '@/api/server-components/event/tags'
export const dynamic = 'force-dynamic'
export default async function EventPage({
  searchParams,
}:{
  searchParams: Record<string,string|undefined>
}) {
  const params = await searchParams

  // filter 條件
  const filter:GetEventsParams = {
    location: params?.location || undefined,
    people: Number(params?.person) || 0,
    startTime: params?.from || undefined,
    endTime: params?.to || undefined,
    minPrice: Number(params?.minPrice) || 0, 
    maxPrice: Number(params?.maxPrice) || 10000, 
    page: 1,
    per: 10,
    sort: 'asc'
  }
  const isAllEmpty = JSON.stringify(params) === '{}'

  // event tags
  const eventTagsData = await getEventTags();
  console.log('eventTags',eventTagsData)

  return (
    <div className="h-screen bg-primary-50">
      <p className="search_condition heading-3 text-center text-neutral-950 px-4 py-2">
        {isAllEmpty ? (
          <span>以下是所有露營活動</span>
        ) : (
          <span>
            以下是與
            {filter?.location && <>「{filter?.location}」地區</>}
            {filter?.people && <>、{filter?.people } 人</>}
            {filter?.startTime && filter?.endTime && (
              <>
                時間:{filter?.startTime } ~ {filter?.endTime}
              </>
            )}
             {filter?.minPrice && filter?.maxPrice && (
              <>
                價格:{filter?.minPrice } ~ {filter?.maxPrice}
              </>
            )}

            有關的露營活動體驗
          </span>
        )}
      </p>
      <EventFilterShell initialFilter={filter} initialTags={eventTagsData}/>
    </div>
  );
}
