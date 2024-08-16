import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const User = useSelector((state) => state.User.User);

  return (
    <div className="w-full bg-lime-800 px-20 py-4 flex justify-between items-center">
      <Link
        className="text-2xl text-white hover:underline"
        to="/admin/dashboard"
      >
        Dashboard
      </Link>
      <ul className="flex flex-row gap-6">
        <li>
          <a
            href="#updatePassword"
            className="text-lg text-white font-medium hover:underline"
          >
            Change Password
          </a>
        </li>
        <li>
          <a
            href="#uploadProject"
            className="text-lg text-white font-medium hover:underline"
          >
            Upload Project
          </a>
        </li>
        <li>
          {User.token ? (
            <Link
              to="/admin/logout"
              className="border border-lime-500 text-lg text-white font-medium rounded-md px-6 py-2 hover:underline hover:bg-lime-500"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="bg-lime-500 text-lg text-white font-medium rounded-md px-6 py-2 hover:underline "
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
