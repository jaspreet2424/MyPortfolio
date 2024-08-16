import React, { useEffect } from "react";
import Introduction from "./Introduction";
import Skills from "./Skills";
import Footer from "./Components/Footer";
import GetQuote from "./GetQuote";
import Navbar from "./Components/Navbar";
import About from "./About";
import Projects from "./Projects";
import {useDispatch} from 'react-redux';
import { getDetailsMethod } from "../Redux/Action";


function Home() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDetailsMethod());
  },[dispatch])

  return (
    <div>
      <Navbar />
      <Introduction />
      <About/>
      <Projects/>
      <Skills />
      <GetQuote />
      <Footer />
    </div>
  );
}

export default Home;
