import { FC, ReactNode } from "react";

interface TabNavItemProps {
  id: string;
  activeTab: string;
  children: ReactNode;
}
export const TabContent: FC<TabNavItemProps> = ({
  id,
  activeTab,
  children,
}) => {
  return activeTab === id ? <div>{children}</div> : null;
};
