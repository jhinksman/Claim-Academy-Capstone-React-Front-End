import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import pic1 from '../../../images/pic1.jpg';

function Monsters() {

    const [monsters, setMonsters] = useState([]);
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

  return (
   
<section id="services" class="services">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Monsters</h2>
          <p>See the below list of monsters to begin planning your build!</p>
        </div>

        <div class="row">
          <div class="col-lg-3 order-2 order-lg-1">
            
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



          <div class="image col-lg-8 order-1 picture"  data-aos="fade-left" data-aos-delay="100"></div>


        </div>

      </div>
    </section>
  );
}

export default Monsters;
