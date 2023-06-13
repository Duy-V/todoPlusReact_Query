import React from "react";
import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex mt-5">
      <a
        href="/"
        className="w-1/4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
      >
        Todo App
      </a>
      <div className="grow h-14 ">
        <SearchInput />
      </div>
      <nav className="flex w-1/4 sm:justify-end space-x-4 ml-4">
        {[
          ["Home", "/"],
          ["TagsList", "/tags/list"],
          //   ['Projects', '/projects'],
          //   ['Reports', '/reports'],
        ].map(([title, url, index]) => (
          <NavLink
            key={index}
            to={url}
            className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default NavBar;
