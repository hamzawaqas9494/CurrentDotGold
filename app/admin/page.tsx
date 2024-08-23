import React from "react";
import type { NextPage, Metadata } from "next";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import MainLayout from "@/app/admin/components/Admin/MainLayout";
import { Card, CardBody, CardHeader } from "@/app/ui/Card";
import Graph from "@/app/admin/components/Admin/AreaGraph";

export const metadata: Metadata = {
  title: "Admin Dashboard - Gold Rate Pakistan",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard: NextPage = () => {
  return (
    <React.Fragment>
      <MainLayout>
        <main>
          <div className="m-4">
            <Card className="my-4">
              <CardHeader>Dashboard</CardHeader>
              <CardBody>
                {/* last 30 days stats */}
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Last 30 days
                  </h3>
                  <dl className="mt-5 grid grid-cols-1 bg-white md:grid-cols-3 gap-4">
                    {stats.map((item) => (
                      <div
                        key={item.name}
                        className="px-4 py-5 sm:p-6 shadow-lg rounded-lg"
                      >
                        <dt className="text-base font-normal text-gray-900">
                          {item.name}
                        </dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                            {item.stat}
                            <span className="ml-2 text-sm font-medium text-gray-500">
                              from {item.previousStat}
                            </span>
                          </div>
                          <div
                            className={classNames(
                              item.changeType === "increase"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800",
                              "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                            )}
                          >
                            {item.changeType === "increase" ? (
                              <ArrowUpIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowDownIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                aria-hidden="true"
                              />
                            )}

                            <span className="sr-only">
                              {" "}
                              {item.changeType === "increase"
                                ? "Increased"
                                : "Decreased"}{" "}
                              by{" "}
                            </span>
                            {item.change}
                          </div>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="shadow-lg rounded-lg px-4 py-5 mt-4">
                  {/* area graph */}
                  <Graph />
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </MainLayout>
    </React.Fragment>
  );
};

export default Dashboard;

const stats = [
  {
    name: "Total Visitors",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Avg. Open Rate",
    stat: "58.16%",
    previousStat: "56.14%",
    change: "2.02%",
    changeType: "increase",
  },
  {
    name: "Avg. Click Rate",
    stat: "24.57%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];
