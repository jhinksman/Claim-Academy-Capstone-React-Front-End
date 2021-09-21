import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";


function Signup() {

const [signUpUser, setSignUpUser] = useState({});
const history = useHistory();


    const changeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        const tempSignUp = {...signUpUser};
        tempSignUp[name] = value;
        setSignUpUser(tempSignUp);

    }

    const signUpSubmitHandler = () =>{
        axios.post('http://localhost:8080/save', signUpUser).then(response=>{
            history.push("/thank-you")
        }).catch(error=>{console.log("IN THE FUTURE ADD LOGIC TO NAVIGATE TO AN ERROR PAGE")})
    }

  return (
    
    
    <section id="hero">
    <div className="hero-container">
    
  </div>
  
        <br></br>
        <br></br>
        <form class="row g-3">
  <h2 data-aos="fade-up" data-aos-delay="200"> Sign up for a Monster Planner account</h2>
<div class="col-md-6">
    <label data-aos="fade-up" data-aos-delay="200" for="inputFirstName" class="form-label">Username</label>
    <input data-aos="fade-up" data-aos-delay="200" onChange={changeHandler} value={signUpUser.username} type="text" name="username" class="form-control" id="inputFirstName" />
  </div> 

  <div class="col-md-6">
    <label data-aos="fade-up" data-aos-delay="200" for="inputEmail" class="form-label">Email</label>
    <input data-aos="fade-up" data-aos-delay="200" onChange={changeHandler} value={signUpUser.email} name="email" type="email" class="form-control" id="inputEmail4" />
  </div>

  <div data-aos="fade-up" data-aos-delay="200" class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input data-aos="fade-up" data-aos-delay="200" onChange={changeHandler} value={signUpUser.password} type="password" name="password" class="form-control" id="inputPassword4" />
  </div>

     <div data-aos="fade-up" data-aos-delay="200" class="d-grid gap-2 ">
      <button data-aos="fade-up" data-aos-delay="200" class="bg-dark btn btn-outline-success" onClick={signUpSubmitHandler} type="button">Sign up</button>
</div>
</form>
</section>

    
  );
}

export default Signup;
