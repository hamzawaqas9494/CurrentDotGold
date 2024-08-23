"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Graph = () => {
  const [options, setOptions] = useState<any>({});
  const [series, setSeries] = useState<any>([]);

  // get
  async function getGraphData() {
    try {
      setOptions({
        chart: {
          type: "area",
          stacked: false, // Set to false for a single line
          fontFamily: "Open-Sans, sans-serif",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ["2023/03/14", "2023/03/15", "2023/03/16"],
          labels: {
            show: true,
            style: {
              colors: "#8CA0A4",
              fontSize: "12px",
            },
          },
          axisBorder: {
            show: true,
            color: "rgba(0,0,0,0.3)",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          min: 0,
          labels: {
            show: true,
            style: {
              colors: "#8CA0A4",
              fontSize: "12px",
            },
          },
          axisBorder: {
            show: true,
            color: "rgba(0,0,0,0.3)",
            offsetX: 0,
            offsetY: 0,
          },
          title: {
            text: "",
            style: {
              color: "#8CA0A4",
              fontSize: "14px",
              fontWeight: "400",
            },
          },
        },
        tooltip: {
          style: {
            fontSize: "14px",
            fontFamily: "Open-Sans, Sans-serif",
          },
          shared: true,
          intersect: false,
          y: {
            formatter: function (y: number | undefined) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " ";
              }
              return y;
            },
          },
        },
      });
      setSeries([
        {
          name: "Gold 24k (per 10 gram)",
          data: ["17277", "172772", "226000"],
        },
      ]);
    } catch (error: any) {
      console.error("Error getting document: ", error);
    }
  }

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={400}
    />
  );
};

export default Graph;
