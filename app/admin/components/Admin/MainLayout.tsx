"use client";
import { FC, ReactNode, useState } from "react";
import React from "react";
import { Navbar, Footer, Sidebar } from "@/app/admin/components/Admin/ui";

interface MainLayoutProps {
  children?: ReactNode | undefined;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    
    <main>
        <Navbar handleSideBarStatus={() => setShowSideBar(!showSideBar)} />
        <div className="flex bg-gray-50 pt-16">
          <Sidebar showSideBar={showSideBar} />
          <div
            className={`relative h-full w-full bg-gray-50 transition delay-150 ease-in-out lg:ml-64 ${
              showSideBar && "lg:"
                ? "sm:ml-auto md:ml-auto"
                : "sm:ml-64 md:ml-64 lg:ml-auto"
            } `}
          >
           {children}
            <Footer />
          </div>
          </div>
          </main>
  );
};

export default MainLayout;
