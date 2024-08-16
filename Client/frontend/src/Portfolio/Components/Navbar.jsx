import { React, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [appView, setAppView] = useState(false);

  const navigationLinks = [
    {
      id: 1,
      name: "About me",
      href : "#about"
    },
    {
      id: 2,
      name: "My Projects",
      href : '#projects'
    },
    {
      id: 3,
      name: "My Skills",
      href : "#skills"
    },
    {
      id: 4,
      name: "Get a Quote",
      href : "#quote"
    },
  ];

  const handleAppView = () => {
    setAppView(!appView);
  };

  return (
    <div
      className={`w-full bg-white shadow-md shadow-teal-700 lg:px-40 lg:py-4 sm:px-12 sm:py-4 xs:px-8 xs:py-4 flex flex-row justify-between items-center fixed z-50`}
    >
      <a className="text-3xl z-50 font-medium text-teal-700">Portfolio</a>

      {/* Web View Listing items */}

      <ul className="lg:flex lg:flex-row sm:hidden xs:hidden">
        {navigationLinks.map((item) => {
          return (
            <a
              className="text-lg font-medium text-teal-700 rounded-md px-3 py-1 mx-4 hover:bg-teal-700 hover:text-white"
              href={item.href}
              key={item.id}
            >
              {item.name}
            </a>
          );
        })}
      </ul>

      {/* Mobile View Listing items */}

      <ul
        className={`lg:hidden ${
          appView ? "flex -z-10" : "hidden"
        } app_nav_list`}
      >
        {navigationLinks.map((item) => {
          return (
            <a
              className="text-lg font-medium text-teal-700 rounded-md px-3 py-1 hover:bg-teal-700 hover:text-white"
              href={item.href}
              key={item.id}
            >
              {item.name}
            </a>
          );
        })}
      </ul>

      <button
        className="lg:hidden sm:block xs:block rounded-md px-3 py-1 bg-teal-700 text-lg font-medium text-white z-50"
        onClick={handleAppView}
      >
        Options
      </button>
    </div>
  );
}

export default Navbar;
