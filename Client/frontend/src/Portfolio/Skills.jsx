import React from "react";

function Skills() {
  const skills = [
    {
      id: 1,
      skillName: "HTML5",
      logo: "/Images/html.png",
    },
    {
      id: 2,
      skillName: "CSS3",
      logo: "/Images/css.png",
    },
    {
      id: 3,
      skillName: "JavaScript",
      logo: "/Images/js.png",
    },
    {
      id: 4,
      skillName: "TailwindCSS",
      logo: "/Images/tailwind.png",
    },
    {
      id: 5,
      skillName: "React.js",
      logo: "/Images/reactjs.png",
    },
    {
      id: 6,
      skillName: "Redux.js",
      logo: "/Images/reactjs.png",
    },
    {
      id: 7,
      skillName: "Node.js",
      logo: "/Images/reactjs.png",
    },
    {
      id: 8,
      skillName: "Express.js",
      logo: "/Images/reactjs.png",
    },
    {
      id: 9,
      skillName: "Mongoose",
      logo: "/Images/reactjs.png",
    },
  ];

  return (
    <div className="w-full  my-24 flex flex-col justify-center items-center py-12 gap-24" id="skills">
      <div>
        <h1 className="text-4xl font-medium text-teal-700">My Skills</h1>
      </div>

      <div className="w-full lg:px-36 grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {skills.map((item) => {
          return (
            <div key={item.id}>
              <h1 className="text-2xl px-4 font-medium text-teal-700">{item.skillName}</h1>
              <div
                className="flex items-center gap-8 px-6 py-2 mx-3 mb-5 bg-teal-300 shadow-md shadow-slate-400"
                key={item.id}
              >
                <div className="flex-1 flex flex-col">
                  <span className="text-sm text-slate-700 font-medium">Level:</span>
                  <span className="text-2xl text-black font-medium">
                    Intermediate
                  </span>
                </div>
                <div className="flex-1 flex gap-4 items-center">
                  <span className="text-sm text-black font-medium">
                    Years of Exp.
                  </span>
                  <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
                    <span className="text-2xl font-medium text-white">1</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
