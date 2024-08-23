import { FC } from "react";

interface TabNavItemProps {
  id: string;
  city: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}
export const TabNavItem: FC<TabNavItemProps> = ({
  id,
  city,
  activeTab,
  setActiveTab,
}) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <button
      onClick={handleClick}
      className={
        activeTab === id
          ? "active rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500  to-yellow-400  py-1 px-3 sm:px-5 text-sm md:text-lg text-white"
          : "text-lg md:text-xl font-medium text-[#333333]"
      }
    >
      {city}
    </button>
  );
};
