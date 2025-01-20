import * as React from "react";
import { twMerge } from "tailwind-merge";

const Badge: React.FC<{
    className?: string,
    children: any
}> = ({children, className}) => {

  return (
    <div className={twMerge("text-gray-50 uppercase p-1 px-2 rounded inline-block", className)}><b>{children}</b></div>
  );
}

export default Badge;