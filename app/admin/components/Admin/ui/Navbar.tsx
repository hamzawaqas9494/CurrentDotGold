import React, { useState } from "react";
import { SidebarMobileClose, SidebarMobileHamburger } from "@/icons";
import ProfileDropdown from "@/app/admin/components/Admin/ProfileDropdown";

interface NavbarProps {
  handleSideBarStatus?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ handleSideBarStatus }) => {
  const [isActive, setActive] = useState(false);
  const [username, setUsername] = useState("");

  const toggleClass = () => {
    setActive(!isActive);
  };

  const toggleSidebar = () => {
    handleSideBarStatus();
  };

  return (
    <>
      <nav className="fixed z-30 w-full border-b border-gray-200 bg-white">
        <div className="py-3 px-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                id="toggleSidebar"
                aria-expanded="true"
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="mr-3 hidden cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <SidebarMobileHamburger />
                <SidebarMobileClose />
              </button>
              <a href="/dashboard" className="ml-24 font-semibold">
                Admin
              </a>
            </div>
            <div className="flex items-center">
              <p className="mr-2 hidden text-sm font-normal lg:block">
                Good Morning,
                <span className="ml-1 font-semibold">Faraz</span>
              </p>

              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
