import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import React from "react";
// reactstrap components
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
  } from "reactstrap";

function Header() {

  const [signInUser, setSignInUser] = useState({email: '', password: ''});
  const history = useHistory();



  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const handleSignOut=()=>{
    localStorage.clear();
    history.push("/landing");
  }


  const changeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    const tempSignIn = {...signInUser};

    tempSignIn[name] = value;
    setSignInUser(tempSignIn);

  }

  const signInSubmitHandler = () =>{ 
    
    console.log("THE PERSON LOGGING IN IS: "+ signInUser.email)

    
    axios.post('http://localhost:8080/login', signInUser).then(response=>{
      //this is how we store the user email
    localStorage.setItem("loggedInUser", response.data.email);
    localStorage.setItem("user", response.data)
     history.push("/home");
    }).catch(error=>{console.log("in the future add logic to navigate to an erorr page")});
   
   }

   const toggleDisplay=()=> {

    if(localStorage.getItem('loggedInUser')) {
        return(
    <header id="header" className="d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <a href="/home"><img src="./images/Monsters/Bazelgeuse.png" alt="" className="img-fluid"/></a>
        
      </div>
      <a className="nav-link scrollto" href="/home">Monster Planner</a>
      <a className="nav-link" to="/about-us">About Us</a>
      
      <nav id="navbar" className="navbar">
                        
      
        <button onClick={handleSignOut} className="btn btn-outline-success" type="button">Sign out</button>
          </nav>
          </div>
          </header>
                
           
        );
    }else{
        return(
            <header id="header" className="d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <Link data-aos="fade-up" data-aos-delay="200" to="/landing"><img src="./images/Monsters/Bazelgeuse.png" alt="" className="img-fluid"/></Link>
        <Link data-aos="fade-up" data-aos-delay="200" className="nav-link scrollto" to="/landing">Monster Planner</Link>
      </div>

      <Link data-aos="fade-up" data-aos-delay="200" className="nav-link" to="/sign-up">Sign Up</Link>
            <Link data-aos="fade-up" data-aos-delay="200" className="nav-link" to="/about-us">About Us </Link>

      <nav id="navbar" className="navbar">
        <ul>
            {/* <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a className="nav-link scrollto" href="#about">About</a></li>
            <li><a className="nav-link scrollto" href="#services">Services</a></li>
            <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
            <li><a className="nav-link scrollto" href="#team">Team</a></li>
            <li><a className="nav-link scrollto" href="#pricing">Pricing</a></li> */}

            

          
          <input data-aos="fade-up" data-aos-delay="200" onChange={changeHandler} className="form-control me-2" type="email" placeholder="Email Address" name="email" value={signInUser.email}/>
          <input data-aos="fade-up" data-aos-delay="200" onChange={changeHandler} className="form-control me-2" type="password" placeholder="Password" name="password" value={signInUser.password}/> 
          <button data-aos="fade-up" data-aos-delay="200" onClick={signInSubmitHandler}  className="btn btn-outline-success" type="button">Sign In</button>

                                
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
        );
    }
}
return(
    toggleDisplay()
);
}

export default Header;
