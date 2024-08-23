import * as React from "react";

function MoneyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="25.005"
      height="44.213"
      viewBox="0 0 25.005 44.213"
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
        id="Icon_material-attach-money"
        data-name="Icon material-attach-money"
        d="M22.941,23.9c-5.576-1.449-7.369-2.948-7.369-5.281,0-2.677,2.481-4.544,6.632-4.544,4.372,0,5.993,2.088,6.141,5.158h5.428a9.791,9.791,0,0,0-7.885-9.358V4.5H18.519V9.806c-4.765,1.032-8.6,4.127-8.6,8.867,0,5.674,4.692,8.5,11.545,10.145,6.141,1.474,7.369,3.635,7.369,5.92,0,1.695-1.2,4.4-6.632,4.4-5.06,0-7.05-2.26-7.32-5.158H9.48c.295,5.379,4.323,8.4,9.039,9.408v5.33h7.369V43.432c4.79-.909,8.6-3.684,8.6-8.72C34.485,27.737,28.516,25.354,22.941,23.9Z"
        transform="translate(-9.48 -4.5)"
        fill="url(#linear-gradient)"
      />
    </svg>
  );
}

export default MoneyIcon;
