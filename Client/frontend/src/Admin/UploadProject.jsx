import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadProjectMethod } from "../Redux/Action";
import {
  UPLOAD_PROJECT_FAILURE,
  UPLOAD_PROJECT_SUCCESS,
} from "../Redux/Constants";

function UploadProject() {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    languages: "",
    projectImg: "",
  });

  const isLoading = useSelector((state) => state.User.isLoading);
  const success = useSelector((state) => state.User.sucess);
  const failure = useSelector((state) => state.Userfailure);

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", userData.title);
    formData.append("description", userData.description);
    formData.append("languages", userData.languages);
    formData.append("projectImg", userData.projectImg);

    dispatch(uploadProjectMethod(formData));
  };

  useEffect(() => {
    if (failure) {
      setInterval(() => {
        dispatch({ type: UPLOAD_PROJECT_FAILURE, payload: "" });
      }, 4000);
    }
  }, [failure]);

  return (
    <div
      className="w-full mt-32 gap-10  flex flex-col items-center justify-center"
      id="uploadProject"
    >
      <h1 className="text-4xl text-lime-700 font-medium">Upload New Project</h1>

      <form
        className="lg:w-1/3 sm:w-2/3 xs:w-full xs:px-4 flex flex-col"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Enter title of Project"
          value={userData.title}
          onChange={(e) => setUserData({ ...userData, title: e.target.value })}
          className="w-full px-2 py-1 text-lg border border-black focus:outline-none"
        />
        <textarea
          cols="10"
          rows="4"
          value={userData.description}
          onChange={(e) =>
            setUserData({ ...userData, description: e.target.value })
          }
          placeholder="Enter Description of Project"
          className="mt-3 w-full px-2 py-1 text-lg border border-black focus:outline-none"
        ></textarea>
        <textarea
          cols="10"
          rows="4"
          value={userData.languages}
          onChange={(e) =>
            setUserData({ ...userData, languages: e.target.value })
          }
          placeholder="Languages/Technology Used "
          className="mt-3 w-full px-2 py-1 text-lg border border-black focus:outline-none"
        ></textarea>
        <span className="mt-2 text-slate-500">
          Add Project Screenshot{"("}.jpg,.png{")"}
        </span>
        <input
          type="file"
          name="projectImg"
          onChange={(e) =>
            setUserData({ ...userData, projectImg: e.target.files[0] })
          }
        />

        <div>
          {failure ? (
            <span className="text-md text-red-500 ">{failure}</span>
          ) : null}
        </div>

        <button className="text-lg mt-8 font-medium text-lime-700 border border-lime-700 py-2 rounded-md transition-all duration-400 hover:bg-lime-700 hover:text-white">
          {isLoading ? "Loading...." : "Upload Project"}
        </button>
      </form>
    </div>
  );
}

export default UploadProject;
