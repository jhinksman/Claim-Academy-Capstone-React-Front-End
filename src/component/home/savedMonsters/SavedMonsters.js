import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import pic1 from '../../../images/pic1.jpg';

function SavedMonsters() {

    const [monsters, setMonsters] = useState([]);
    const [User, setUser] = useState([]);
    const [Genes, setGenes]= useState([]);

    useEffect(() => {
        // [] means array
        // {} means object
        axios.get('http://localhost:8080/findAllMonsters').then(response => {
                //Spring returns a Monster object hence we save in the
                //state variable called monster
                setMonsters(response.data);
            }).catch(error => {
            });
    }, []
    );

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

    useEffect(() => {
        // [] means array
        // {} means object

        axios.get('http://localhost:8080/findAllGenes')
            .then(response => {
                //Spring returns a Course object hence we save in the
                //state variable called course
  
                setGenes(response.data);
            }).catch(error => {

            });
    }, []
    );

    useEffect(()=> {
        const params = {
          email: localStorage.getItem('loggedInUser')
          
        }
        axios.get('http://localhost:8080/findAllSavedMonsters', {params})
        .then(response=>{
            //Spring returns a Student object hence we save in the
            //state variable called student
        setMonsters(response.data);
        }).catch(error => {
          
        });
       }, []
    );

  return (
   
<section id="services" class="services">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>{User.username}'s Monsters</h2>
          <p>These are all the monsters you've created!</p>
        </div>

        <div class="row">
          <div class="col-lg-4 order-2 order-lg-1">
            
            {monsters.map((monster, index)=> {
                return (
            <div class="icon-box mt-5 mt-lg-0" data-aos="fade-up">
              
              <i><img src={monster.namePicture} style={{ width: '50px', height: '50px' }} /></i>
              <h4>{monster.name}</h4>
              <p><img src={monster.typePicture} style={{ width: '20px', height: '20px' }} />{monster.type} 
              <img src={monster.elementPicture} style={{ width: '20px', height: '20px' }} /> {monster.element}</p>
            </div>

             ) })}


          </div>



          <div class="image col-lg-8 order-1 order-lg-2 picture3"  data-aos="fade-left" data-aos-delay="100"></div>


        </div>

      </div>
    </section>
  );
}

export default SavedMonsters;
