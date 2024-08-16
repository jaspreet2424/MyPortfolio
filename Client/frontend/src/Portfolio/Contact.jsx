import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendMailMessage } from "../Redux/Action";
import { MAIL_ALERT_FAILURE, MAIL_ALERT_SUCCESS } from "../Redux/Constants";

function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const socialLinks = [
    {
      id: 1,
      title: "fa-facebook",
      link: "",
    },
    {
      id: 2,
      title: "fa-instagram",
      link: "",
    },
    {
      id: 3,
      title: "fa-x-twitter",
      link: "",
    },
    {
      id: 4,
      title: "fa-linkedin",
      link: "",
    },
    {
      id: 5,
      title: "fa-github",
      link: "",
    },
  ];

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.GlobalState.isLoading);
  const success = useSelector((state) => state.GlobalState.success);
  const failure = useSelector((state) => state.GlobalState.failure);
  const Details = useSelector((state) => state.GlobalState.details);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", userData.name);
    formdata.append("mobile", userData.mobile);
    formdata.append("email", userData.email);
    formdata.append("subject", userData.subject);
    formdata.append("message", userData.message);

    dispatch(sendMailMessage(formdata));
  };

  useEffect(() => {
    if (failure) {
      setInterval(() => {
        dispatch({ type: MAIL_ALERT_FAILURE, payload: "" });
      }, 4000);
    }
  }, [failure]);

  useEffect(() => {
    if (success) {
      setInterval(() => {
        dispatch({ type: MAIL_ALERT_SUCCESS, payload: "" });
      }, 4000);
    }
  }, [success]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-stone-200 lg:pt-10 lg:pb-6 sm:pt-6 sm:pb-6 xs:py-0">
      <div className="lg:w-3/4 sm:w-3/4 xs:w-full flex bg-white h-full">
        <div className="left flex-1 flex flex-col gap-4 justify-start py-10 px-10">
          <h1 className="text-3xl font-medium">Contact Me</h1>
          <div className="w-full flex lg:flex-row sm:flex-row xs:flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-medium">Email :</span>
              <span className="text-stone-600">
                {Details.length > 0 ? Details[0].email : "xxxxxxx"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-medium">Mobile :</span>
              <span className="text-stone-600">
                +91 {Details.length > 0 ? Details[0].number : "123456789"}
              </span>
            </div>
          </div>

          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full border-b my-1 px-2 pb-2 pt-1 text-md focus:border-b-black focus:outline-transparent"
            />
            <input
              type="text"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full border-b my-1 px-2 pb-2 pt-1 text-md focus:border-b-black focus:outline-transparent"
            />
            <input
              type="text"
              placeholder="Mobile"
              value={userData.mobile}
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
              }
              className="w-full border-b my-1 px-2 pb-2 pt-1 text-md focus:border-b-black focus:outline-transparent"
            />
            <input
              type="text"
              placeholder="Subject"
              value={userData.subject}
              onChange={(e) =>
                setUserData({ ...userData, subject: e.target.value })
              }
              className="w-full border-b my-1 px-2 pb-2 pt-1 text-md focus:border-b-black focus:outline-transparent"
            />
            <textarea
              className="w-full border-b my-1 px-2 pb-2 pt-1 text-md focus:border-b-black focus:outline-transparent"
              placeholder="Enter a message here"
              value={userData.message}
              onChange={(e) =>
                setUserData({ ...userData, message: e.target.value })
              }
              rows="4"
            ></textarea>

            <button className="text-lg bg-teal-500 text-white px-4 py-2 mt-4 hover:bg-teal-700">
              {isLoading ? (
                <span>isLoading...</span>
              ) : (
                <span>Send Message</span>
              )}
            </button>
            <span className={`text-sm text-red-600`}>
              {failure ? failure : null}
            </span>
            <span className={`text-sm text-green-600`}>
              {success ? success : null}
            </span>
          </form>

          <div className="flex gap-4 mt-4">
            <h1 className="font-medium">Follow me on :</h1>
            <div className="flex gap-6">
              {socialLinks.map((item) => {
                return (
                  <a href={item.link} key={item.id}>
                    <i
                      className={`fa-brands ${item.title} text-xl opacity-70 hover:opacity-100 `}
                    ></i>
                  </a>
                );
              })}
            </div>
          </div>
          <Link className="text-lg underline" to="/">
            Back to Homepage
          </Link>
        </div>
        <div className="right flex-1 lg:block sm:hidden xs:hidden">
          <img
            src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="contact"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
