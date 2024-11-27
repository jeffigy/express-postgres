import Navbar from "@/components/Navbar";
import React from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full ">
      <Navbar />
      <div className="flex p-5 space-y-5 flex-col"> {children}</div>
    </div>
  );
};
export default layout;
