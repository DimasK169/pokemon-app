import React from "react";
import { Link, Outlet } from "react-router";
import { HiOutlineHome } from "react-icons/hi2";
import { BsBackpack3 } from "react-icons/bs";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row py-2 px-10 shadow bg-blue-400 items-center gap-3">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Pokedex" className="size-10" />
        <h1 className="text-lg font-semibold text-white">Pokédex</h1>
      </div>
      <Outlet />
      <div className="flex flex-row py-5 px-10 shadow bg-blue-400 justify-center">
        <nav className="flex items-center justify-center gap-5">
          <Link to="/">
          <HiOutlineHome className="size-8 text-white"/>
          </Link>
          <Link to="/my-pokemon">
          <BsBackpack3 className="size-7 text-white"/>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
