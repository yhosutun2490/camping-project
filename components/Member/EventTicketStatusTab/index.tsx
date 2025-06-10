
export type TabList = {
    label: string,
    value: string
}
interface Props {
  tabList: TabList[]
  activeTab: TabList
  onTabChange: (activeTab: TabList) => void;
}
export default function TicketStatusTabs({ tabList, activeTab, onTabChange }: Props) {
  return (
    <div className="flex space-x-6 border-b border-primary-300 text-sm font-medium">
      {tabList.map((item) => {
        const isActive = activeTab.value === item.value;
        return (
          <button
            key={item.value}
            className={`pb-2 cursor-pointer ${
              isActive
                ? "text-primary-500 border-b-2 border-primary-500"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => onTabChange(item)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
