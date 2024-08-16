import React from "react";
import {useSelector} from 'react-redux';

function About() {

  const Details = useSelector((state)=> state.GlobalState.details);

  return (
    <div className="w-full mt-32" id="about">
      <div
        className="w-full lg:h-72 sm:h-36 xs:h-36 bg-teal-200 flex flex-col gap-4 items-center justify-center"
        
      >
        <h1 className="lg:text-4xl sm:text-3xl xs:text-2xl font-medium text-teal-900">
          About Me
        </h1>
        <a
          href="https://drive.google.com/file/d/1JgCNsrrGjbNiFz3VYN7XJiphClN6zn_q/view?usp=drive_link"
          target="_blank"
          className="border-2 border-teal-900 rounded-lg text-lg font-medium px-4 py-2 text-teal-900 hover:text-white hover:bg-teal-900 transition-all duration-300"
        >
          My Resume
        </a>
      </div>
      <div className="flex lg:flex-row sm:flex-col xs:flex-col">
        <div className="flex-1 py-16 px-8 bg-zinc-100">
          <h1 className="text-teal-700 text-3xl font-medium underline">
            Full Stack Web Developer
          </h1>
          <p className="pt-2 text-slate-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
            consequatur dicta ad tempore earum repellat non eos quos,
            reprehenderit ullam repudiandae nesciunt iste ipsam modi ex
            perferendis atque nobis? Incidunt.
          </p>
        </div>

        <div className="flex-1 flex lg:flex-row sm:flex-col xs:flex-col gap-4 py-16 px-8 bg-zinc-200">
          <div className="flex-1 flex flex-col gap-2 rounded-md bg-zinc-50 p-3">
            <span className="text-lg font-medium">
              Name :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
                {Details.length > 0 ? Details[0].name : "Lucifer Morningstar"}
              </span>
            </span>
            <span className="text-lg font-medium">
              Email :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
              {Details.length > 0 ? Details[0].email : "Lucifer123@gmail.com"}
              </span>
            </span>
            <span className="text-lg font-medium">
              Mobile :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
              {Details.length > 0 ? Details[0].number : "1234567890"}
              </span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2 rounded-md bg-zinc-50 p-3">
            <span className="text-lg font-medium">
              Degree :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
                B.tech
              </span>
            </span>
            <span className="text-lg font-medium">
              Stream :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
                Computer Science & Eng.
              </span>
            </span>
            <span className="text-lg font-medium">
              Address :{" "}
              <span className="ml-2 font-normal text-md text-slate-500">
                Ludhiana, Punjab, India
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
