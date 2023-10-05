import * as React from "react";
import { SVGProps } from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <path
        d="M15.75 16.25L11.8522 12.3523M11.8522 12.3523C12.9072 11.2973 13.4998 9.86653 13.4998 8.37463C13.4998 6.88273 12.9072 5.45194 11.8522 4.39701C10.7973 3.34207 9.3665 2.74942 7.8746 2.74942C6.3827 2.74942 4.95191 3.34207 3.89698 4.39701C2.84204 5.45194 2.24939 6.88273 2.24939 8.37463C2.24939 9.86653 2.84204 11.2973 3.89698 12.3523C4.95191 13.4072 6.3827 13.9998 7.8746 13.9998C9.3665 13.9998 10.7973 13.4072 11.8522 12.3523Z"
        stroke="#52525B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
