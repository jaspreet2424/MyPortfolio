import React, { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/get_projects");
        if (response.data.success) {
          setProjects(response.data.Projects);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data)
        setErrorMessage(error.response.data);
      }
    };

    fetchProjects();
  }, [projects]);

  return (
    <div className="w-full  my-24 flex flex-col justify-center items-center py-12 gap-24" id ="projectss">
      <div>
        <h1 className="text-4xl font-medium text-teal-700">My Projects</h1>
      </div>
      {errorMessage ? (
        <div>
          <span className="text-xl text-red-500">{errorMessage}</span>
        </div>
      ) : (
        <div className="grid grid-flow-row lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
          {projects.map((item) => {
            return (
              <div
                className="h-fit lg:mx-20 sm:mx-12 xs:mx-4 my-16 bg-slate-200 shadow-lg hover:scale-105 transition-all duration-300 rounded-md overflow-hidden"
                key={item._id}
              >
                <div className="h-2/3">
                  <img src={item.projectImg} alt="" />
                </div>
                <div className="w-full lg:px-12 sm:px-10 xs:px-2 py-6 flex flex-col gap-2">
                  <span className="text-md text-slate-500">
                    <span className="text-lg font-medium underline text-black">
                      Title
                    </span>
                    : {item.title}
                  </span>
                  <span className="text-md text-slate-500">
                    <span className="text-lg font-medium underline text-black">
                      Description
                    </span>
                    : {item.description}
                  </span>
                  <span className="text-md text-slate-500">
                    <span className="text-lg font-medium underline text-black">
                      Languages Used:
                    </span>
                    : {item.languages}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Projects;
