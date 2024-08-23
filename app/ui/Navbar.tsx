"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const userNavigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

type NavebarProps = {
  className?: string;
};

const Navebar: FC<NavebarProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [navbar, setNavbar] = useState(false);
  // const [activePage, setActivePage] = useState("");

  // useEffect(() => {
  //   setActivePage(pathname);
  // }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="container z-[1] relative">
        <nav className="w-full py-2">
          <div className="items-center justify-between md:flex md:items-center">
            <div>
              <div className="flex items-center justify-between">
                <Link href="/">
                  <Image
                    width={0}
                    height={0}
                    alt="Current Gold"
                    sizes="100vw"
                    className="w-16 md:w-20 h-auto"
                    src="/assets/logo.png"
                  />
                </Link>
                <div className="md:hidden ">
                  <button
                    className="rounded-md p-2 relative text-gray-700 outline-none focus:border focus:border-gray-400"
                    onClick={() => setNavbar((prev) => !prev)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="relative md:static w-full md:w-auto">
              <div
                className={`absolute md:static top-0 left-0 w-full z-10 mt-2 md:mt-0 pb-3 md:pb-0 ${
                  navbar ? "block" : "hidden"
                } md:block`}
              >
                <ul className="w-full p-12 md:p-0 items-center justify-center space-y-6 bg-black md:bg-transparent md:flex md:space-x-6 md:space-y-0 transition ease-in-out duration-1000">
                  {userNavigation.map((item) => (
                    <li
                      key={item.name}
                      className={`nav-item ${
                        isActive(item.href) ? "active" : ""
                      }`}
                    >
                      <button
                        className={`text-base font-semibold uppercase `}
                        onClick={() => {
                          router.push(item.href);
                          // setActivePage(item.href);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Navebar;
