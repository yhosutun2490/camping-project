import TabListSection from "@/components/TabListSection";
import EventCard from "@/components/EventCard";
import PriceRangeFilter from "@/components/PriceRangeFilter";
export default function EventPage() {
  return (
    <main className="relative flex flex-col bg-primary-50 h-screen">
    
      <div className="flex-shrink-0">
        <TabListSection />
      </div>

      <section className="grid 
          min-h-0            
          grid-cols-[300px_1fr] 
          grid-rows-auto      
          pt-5">
        <div className="p-4 sticky top-5">
         <PriceRangeFilter />
        </div>
        <div className="py-3 px-6 grid justify-center 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,360px))] 
        gap-8 overflow-y-auto">
          <EventCard />
          <EventCard image="/event/event_2.png"/>
          <EventCard image="/event/event_3.png"/>
          <EventCard image="/event/event_1.png"/>
        </div>
      </section>
    </main>
  );
}
