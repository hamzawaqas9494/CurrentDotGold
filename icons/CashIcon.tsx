import * as React from "react";

function CashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Icon_ionic-md-cash"
      data-name="Icon ionic-md-cash"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="58.116"
      height="41.511"
      viewBox="0 0 58.116 41.511"
      className={props.className}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#b96a00" />
          <stop offset="0.51" stopColor="#af8901" />
          <stop offset="1" stopColor="#e1bc00" />
        </linearGradient>
      </defs>
      <path
        id="Path_4"
        data-name="Path 4"
        d="M2.25,6.75V39.959H60.366V6.75ZM23.07,35.808H12.641a6.234,6.234,0,0,0-6.24-6.24V19.2a8.31,8.31,0,0,0,8.3-8.3H23.07a19.369,19.369,0,0,0-4.216,12.453A19.369,19.369,0,0,0,23.07,35.808Zm33.144-6.24a6.273,6.273,0,0,0-6.227,6.24H39.545a19.369,19.369,0,0,0,4.216-12.453A19.369,19.369,0,0,0,39.545,10.9h8.367a8.31,8.31,0,0,0,8.3,8.3Z"
        transform="translate(-2.25 -6.75)"
        fill="url(#linear-gradient)"
      />
      <path
        id="Path_5"
        data-name="Path 5"
        d="M2.25,27H60.366v4.151H2.25Z"
        transform="translate(-2.25 10.36)"
        fill="url(#linear-gradient)"
      />
    </svg>
  );
}

export default CashIcon;
