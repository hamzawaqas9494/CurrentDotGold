import * as React from "react";

const Polygon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      id="Group_8"
      data-name="Group 8"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="33.877"
      height="39.212"
      viewBox="0 0 33.877 39.212"
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
      <g
        id="Polygon_1"
        data-name="Polygon 1"
        transform="translate(-721.007 -382.999)"
        fill="none"
      >
        <path
          d="M737.945,422.212l-16.939-9.8V392.8l16.939-9.8,16.939,9.8v19.606Z"
          stroke="none"
        />
        <path
          d="M 737.9452514648438 419.9008178710938 L 752.8839111328125 411.2551879882812 L 752.8839111328125 393.95556640625 L 737.9452514648438 385.3099975585938 L 723.006591796875 393.95556640625 L 723.006591796875 411.2551879882812 L 737.9452514648438 419.9008178710938 M 737.9452514648438 422.2116088867188 L 721.006591796875 412.4085083007812 L 721.006591796875 392.80224609375 L 737.9452514648438 382.9992065429688 L 754.8839111328125 392.80224609375 L 754.8839111328125 412.4085083007812 L 737.9452514648438 422.2116088867188 Z"
          stroke="none"
          fill="#fff"
        />
      </g>
      <path
        id="Polygon_1_copy"
        data-name="Polygon 1 copy"
        d="M739.534,418.949l-12.573-7.3v-14.6l12.573-7.3,12.573,7.3v14.6Z"
        transform="translate(-722.596 -384.745)"
        fill="url(#linear-gradient)"
      />
    </svg>
  );
};

export default Polygon;
