import React, { useState } from "react";

function GetQuote() {
  const [addQuote, setAddQuote] = useState(0);

  const quotes = [
    "There are no accidents, you have to BELIEVE",
    "If you want to become the BEST version of yourself, the old one has to die",
    "Failure inspires Winners",
    "You don't wake up today to be average",
    "Talent wouldn't get you anywhere if you don't work for it",
    "Everything is possible if you have Inner Peace",
    "No one can resist an Idea whose time has come",
    "Tiny gains Everyday adds up to big results",
    "God Works in mysterious ways. No one knows what he has in the store for us.",
    "You'r not here for no easy fights",
    "Good Things comes to those who waits",
    "If you are going through a lot , you are going to get a lot",
    "You'r chosen by GOD to be something more than who you'r now",
  ];

  const handleButtonClick = () => {
    const len = quotes.length;
    const rand = Math.floor(Math.random() * len);
    setAddQuote(rand);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-teal-950 lg:px-36 sm:px-24 xs:px-4 py-16 mb-16"
      id="quote"
    >
      <span className="text-2xl text-white font-medium">
        Get a Quote to yourself
      </span>
      <span className="my-4 lg:text-3xl sm:text-3xl xs:text-lg text-teal-900 bg-white px-6 py-4 font-medium rounded-md">
        "{quotes[addQuote]}"
      </span>
      -
      <button
        className="text-lg text-black bg-teal-300 px-6 py-2 font-medium hover:underline"
        onClick={handleButtonClick}
      >
        Get a Quote
      </button>
    </div>
  );
}

export default GetQuote;
