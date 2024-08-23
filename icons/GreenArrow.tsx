import * as React from "react";

function GreenArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      className={props.className}
    >
      <path
        id="Polygon_4"
        data-name="Polygon 4"
        d="M8,0l8,14H0Z"
        transform="translate(16 14) rotate(180)"
        fill="#2eb752"
      />
    </svg>
  );
}

export default GreenArrow;
