import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Action";
import { USER_LOGIN_FAILURE } from "../Redux/Constants";

function Login() {
  const [visiblePass, setVisiblePass] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.User.isLoading);
  const failure = useSelector((state) => state.User.failure);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisiblePass(!visiblePass);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("email", userData.email);
    formdata.append("password", userData.password);

    dispatch(loginUser(formdata, navigate));
  };

  useEffect(() => {
    if (failure) {
      setInterval(() => {
        dispatch({ type: USER_LOGIN_FAILURE, payload: "" });
      }, 4000);
    }
  }, [failure]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="login-form flex flex-col items-center gap-8 bg-white px-10 py-12 lg:w-1/3 sm:w-2/3 xs:w-full">
        <h1 className="text-5xl text-lime-800 font-medium">Admin Login</h1>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            className="px-3 py-2 text-lg border border-slate-400 hover:border hover:border-lime-600 focus:outline-lime-900"
          />
          <input
            type={`${visiblePass ? "text" : "password"}`}
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="px-3 py-2 text-lg border border-slate-400 hover:border hover:border-lime-600 focus:outline-lime-900"
          />
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="show-password"
              className="cursor-pointer"
              onClick={toggleVisibility}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>
          <div>
            {failure ? (
              <span className="text-md text-red-500 ">{failure}</span>
            ) : null}
          </div>
          <button className="px-4 py-2 bg-lime-800 text-lg hover:bg-lime-600 text-white font-medium">
            {isLoading ? "Loading...." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
