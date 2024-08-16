import React from "react";
// import UserIcon from "/Images/portfolio.png";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

function Introduction() {
  const Details = useSelector((state) => state.GlobalState.details);
  return (
    <div className="w-full h-screen bg-teal-300 flex lg:flex-row sm:flex-col xs:flex-col">
      <div className="left_container border-r flex-1 flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1714138667818-b545353d768a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="userImage" className="lg:w-1/2 sm:w-1/3 " />
      </div>

      <div className="right_container flex-1 flex flex-col items-center justify-center lg:gap-8 sm:gap-6 xs:gap-4 pb-30">
        <span className="lg:text-3xl sm:text-2xl xs:text-xl text-teal-700 font-medium">
          Hey! This is{" "}
        </span>
        <span className="lg:text-5xl sm:text-3xl xs:text-2xl text-teal-700 bg-white lg:px-10 lg:py-4 sm:px-4 sm:py-2 xs:px-4 xs:py-1 rounded-lg font-medium">
          {Details.length > 0 ? Details[0].name : "xxxxxxx"}
        </span>
        <span className="lg:text-3xl sm:text-2xl xs:text-xl text-teal-700 font-medium">
          Full Stack Developer
        </span>
        <div className="flex gap-6">
          <a
            href="#about"
            className="text-lg rounded-md bg-teal-700 border border-teal-700 text-white font-medium transition-ease duration-200 hover:bg-transparent hover:text-teal-700 hover:border hover:border-teal-700 px-8 py-2"
          >
            Explore More
          </a>
          <Link
            to="/contact"
            className="text-lg rounded-md bg-teal-700 border border-teal-700 text-white font-medium transition-ease duration-200 hover:bg-transparent hover:text-teal-700 hover:border hover:border-teal-700 px-8 py-2"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
