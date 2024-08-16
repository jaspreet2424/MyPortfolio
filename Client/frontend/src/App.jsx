import React, { useEffect, useReducer } from "react";
import "./App.css";
import Home from "./Portfolio/Home";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Contact from "./Portfolio/Contact";
import { useDispatch, useSelector } from "react-redux";
import {userAuthentication } from "./Redux/Action";
import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login";

function App() {
  const User = useSelector((state) => state.User.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthentication());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home></Home>} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route>
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
