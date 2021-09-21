import axios from "axios";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Genes from "./genes/Genes";
import Monsters from "./monsters/Monsters";
import MonsterPlanner from "./monsterPlanner/MonsterPlanner";
import SavedMonsters from "./savedMonsters/SavedMonsters";



function Home() {

    const [User, setUser] = useState ({email: '', username: '', password: ''});


    useEffect(()=> {
        //params is only for get methods
        //post requires an entire object
        const params = {
          email: localStorage.getItem('loggedInUser')
          
        }
        axios.get('http://localhost:8080/findUserById', {params})
        .then(response=>{
            //Spring returns a User object hence we save in the
            //state variable called user
        setUser(response.data);
        }).catch(error => {
          
        });
       }, []
    );

  return (

    
    <section id="featured" className="featured">
      <div className="container">

      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'z-index': '-1' }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'z-index': '-1' }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: '0', top: '0' }}></div></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'z-index': '-1' }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: '0', top: '0' }}></div></div></div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">{User.userName}'s Profile</h1>
                    </div>
                   <Route path="/home/monsters" component={Monsters}/>                   
                   <Route path="/home/genes" component= {Genes} />
                   <Route path="/home/monster-planner" component = {MonsterPlanner}/>
                   <Route path="/home/saved-monsters" component={SavedMonsters}/>
                </main>
                
        <div className="row">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="tab-content">

            
              <div className="tab-pane active show" id="tab-1">
        	<figure>
            <Link className="nav-link" to="/monsters">
                  <img src="./images/Zamtrios.png" alt="" className="img-fluid"/>
                  </Link>
                </figure>
                
              </div>
              

		
              <div className="tab-pane" id="tab-2">
                <figure>

                <Link className="nav-link" to="/genes">
                  <img src="./images/Fatalis.png" alt="" className="img-fluid"/>
                  </Link>

                </figure>
              </div>
		
		
		
              <div className="tab-pane" id="tab-3">
                <figure>

                <Link className="nav-link" to="/monster-planner">
                  <img src="./images/StygianZinogre.png" alt="" className="img-fluid"/>
                  </Link>

                </figure>
              </div>
		

		
              <div className="tab-pane" id="tab-4">
                <figure>
                <Link className="nav-link" to="/saved-monsters">
                  <img src="./images/Velkhana.png" alt="" className="img-fluid"/>
                  </Link>
                </figure>
              </div>
		

            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <a className="nav-link active show" data-bs-toggle="tab" href="#tab-1">
                  <h4>Monsters</h4>
                  <p>See a list of all the monsters in game!</p>
                </a>
              </li>
              <li className="nav-item mt-2">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                  <h4>Genes</h4>
                  <p>All of the Genes, and which monsters carry them!</p>
                </a>
              </li>
              <li className="nav-item mt-2">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                  <h4>Monster Planner</h4>
                  <p>Create your own monster and gene combination!</p>
                </a>
              </li>
              <li className="nav-item mt-2">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                  <h4>Your Saved Monsters</h4>
                  <p>See a list of all the created monsters you've built!</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;