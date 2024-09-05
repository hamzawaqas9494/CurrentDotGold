// import { ChartBarIcon, HomeIcon ,ChartPieIcon,MapPinIcon} from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

let iconClass =
  "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 text-white group-hover:text-white";

const sideNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    // icon: <HomeIcon className={iconClass} />,
    icon: <img src="/assets/Dashboard.svg" className={iconClass} />,
  },
  {
    name: "Major Cities",
    href: "/admin/major-cities",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/major cities icon.svg" className={iconClass} />,
  },
  {
    name: "Add Blog",
    href: "/admin/add-blog",
    // icon: <ChartBarIcon className={iconClass} />,
    icon: <img src="/assets/addicon.svg" className={iconClass} />,
  },
  {
    name: "Hero Section Rates",
    href: "/admin/hero-section-rates",
    // icon: <ChartPieIcon className={iconClass} />,
    icon: <img src="/assets/rates.svg" className={iconClass} />,
  },
  {
    name: "Calculator",
    href: "/admin/calculator",
    // icon: <ChartPieIcon className={iconClass} />,
    icon: <img src="/assets/calculator.svg" className={iconClass} />,
  },
];
const sideNavigationbottom = [
  {
    name: "My Account",
    href: "/admin/my-account",
    // icon: <HomeIcon className={iconClass} />,
    icon: <img src="/assets/myacounticon.svg" className={iconClass} />,
  },
  {
    name: "Reset Filters",
    href: "/admin/reset-filter",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/reset filter icon.svg" className={iconClass} />,
  },
  {
    name: "Logout",
    href: "/admin/logout",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/logout icon.svg" className={iconClass} />,
  },
  {
    name: "DB-data",
    href: "/admin/db-data",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/logout icon.svg" className={iconClass} />,
  },
  {
    name: "updatefrom",
    href: "/admin/update-blog-form",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/logout icon.svg" className={iconClass} />,
  },
  {
    name: "gallery",
    href: "/admin/gallery",
    // icon: <MapPinIcon className={iconClass} />,
    icon: <img src="/assets/logout icon.svg" className={iconClass} />,
  },
];

interface SidebarProps {
  showSideBar?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ showSideBar }) => {
  const [activePage, setActivePage] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  return (
    <aside
      id="sidebar"
      className={`${
        !showSideBar && "w-[0px]"
      } transition-width fixed top-0 left-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 duration-75`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* logo */}
          <div className="flex items-center justify-center bg-gray-750 py-4  divide-y divide-white-200">
            <Link href="/">
              <Image
                width={40}
                height={40}
                alt="Current Gold"
                sizes="100vw"
                className="w-16 md:w-20 h-auto "
                src="/assets/logo.png"
              />
            </Link>
          </div>
          <div className=" flex-1 bg-gray-750  ">
            <hr className="w-11/12 mx-auto" />

            <ul className="py-6">
              {sideNavigation.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setActivePage(item.href);
                  }}
                  className={`flex cursor-pointer items-center pl-6 py-4 pr-2 text-base font-normal text-white hover:bg-gray-450 ${
                    activePage === item.href &&
                    "flex cursor-pointer items-center bg-gray-450 p-2 text-base font-normal text-gray-900 "
                  }`}
                >
                  {item.icon}
                  <span
                    className="ml-3 flex-1 whitespace-nowrap"
                    data-testid="sidebar-item-content"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="w-11/12 mx-auto" />

            <ul className=" py-3">
              {sideNavigationbottom.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setActivePage(item.href);
                  }}
                  className={`flex cursor-pointer items-center pl-6 py-4 pr-2 text-base font-normal text-white hover:bg-gray-450 ${
                    activePage === item.href &&
                    "flex cursor-pointer items-center bg-gray-450 p-4 text-base font-normal text-gray-900 "
                  }`}
                >
                  {item.icon}
                  <span
                    className="ml-3 flex-1 whitespace-nowrap"
                    data-testid="sidebar-item-content"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};
