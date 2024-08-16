import React from "react";
// import UserIcon from "/Images/portfolio.png";
import { useSelector } from "react-redux";

function IntroductionSection() {
  const User = useSelector((state) => state.User.User);
  return (
    <div className="w-full h-screen bg-lime-300 flex lg:flex-row sm:flex-col xs:flex-col">
      <div className="left_container flex-1 flex items-center justify-center">
        <img src={"https://images.unsplash.com/photo-1714138667818-b545353d768a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="userImage" className="lg:w-full sm:w-1/3 " />
      </div>

      <div className="right_container flex-1 flex flex-col items-center justify-center lg:gap-8 sm:gap-6 xs:gap-4 pb-30">
        <span className="lg:text-3xl sm:text-2xl xs:text-xl text-lime-700 font-medium">
          Hey! Welcome Back{" "}
        </span>
        <span className="lg:text-5xl sm:text-3xl xs:text-2xl text-lime-700 bg-white lg:px-10 lg:py-4 sm:px-4 sm:py-2 xs:px-4 xs:py-1 rounded-lg font-medium">
          {User.token ? User.name : "xxxxxxx"}
        </span>
        <a
          href="#uploadProject"
          className="text-lg rounded-md bg-lime-700 border border-lime-700 text-white font-medium transition-ease duration-200 hover:bg-transparent hover:text-lime-700 hover:border hover:border-lime-700 px-8 py-2"
        >
          Try Uploading Things
        </a>
      </div>
    </div>
  );
}

export default IntroductionSection;
