import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const User = useSelector((state) => state.User.User);

  return (
    <div className="w-full py-5 flex justify-center items-center bg-lime-900">
      <span className="text-slate-200">
        Admin Dashboard , Welcome back{" "}
        <span>
          {User.token ? <span className="text-lg underline text-white">{User.name}</span> : "Lucifer Morningstar"}
        </span>{" "}
      </span>
    </div>
  );
}

export default Footer;
