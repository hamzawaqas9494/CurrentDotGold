import * as React from "react";

function RedArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      className={props.className}
    >
      <path id="Polygon_1" data-name="Polygon 1" d="M8,0l8,14H0Z" fill="red" />
    </svg>
  );
}

export default RedArrow;
