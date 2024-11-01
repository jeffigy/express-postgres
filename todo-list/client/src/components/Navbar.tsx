import React from "react";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className=" bg-background flex justify-center border-b top-0 sticky ">
      <div className="flex w-full justify-between h-14 max-w-screen-md px-3 md:px-0 items-center">
        <p>Todos</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
