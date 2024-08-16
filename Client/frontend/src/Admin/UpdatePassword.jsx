import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
} from "../Redux/Constants";
import { updatePasswordMethod } from "../Redux/Action";

function UpdatePassword() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.User.isLoading);
  const success = useSelector((state) => state.User.success);
  const failure = useSelector((state) => state.User.failure);

  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    dispatch(updatePasswordMethod(formData));
  };

  useEffect(() => {
    if (failure) {
      setInterval(() => {
        dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: "" });
      }, 4000);
    }
  }, [failure]);

  return (
    <div
      className="w-full my-32 flex flex-col items-center justify-center gap-10"
      id="updatePassword"
    >
      <h1 className="text-4xl text-lime-700 font-medium">Update Password</h1>

      <form
        className="lg:w-1/3 sm:w-2/3 xs:w-full xs:px-4 flex flex-col"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full px-2 py-1 text-lg border-b border-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Enter new Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="w-full px-2 py-1 mt-4 text-lg border-b border-black focus:outline-none"
        />
        <div>
          {failure ? (
            <span className="text-md text-red-500 ">{failure}</span>
          ) : null}
        </div>
        <button className="text-lg mt-8 font-medium text-lime-700 border border-lime-700 py-2 rounded-md transition-all duration-400 hover:bg-lime-700 hover:text-white">
          {isLoading ? "Loading...." : "Update Now"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
