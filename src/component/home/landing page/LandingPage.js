import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";


function LandingPage() {



  return (
    
    
    <section id="hero">
    <div className="hero-container">
    <a href="index.html" className="hero-logo" data-aos="zoom-in"><img src="./images/Monsters/Bazelgeuse.png" alt=""/></a>
    <h1 data-aos="zoom-in">Welcome To Monster Planner</h1>
    <h2 data-aos="fade-up">Create and plan your favorite monsters</h2>
    <a data-aos="fade-up" data-aos-delay="200" href="/sign-up" className="btn-get-started scrollto">Get Started</a>
  </div>
</section>

    
  );
}

export default LandingPage;
