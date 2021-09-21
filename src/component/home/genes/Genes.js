import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

function Genes (){

    const [genes, setGenes] = useState([]);

   useEffect(() => {
       axios.get('http://localhost:8080/findAllGenes')
       .then(response => {
           setGenes(response.data);
       }).catch(error => {

       });
   }, []
   ); 

   const PopupExample = () => (
    <Popup content='Add users to your feed' trigger={<Button icon='add' />} />
  )

    return(
        
        <section id="services" className="services">
        <div className="container">
  
          <div className="section-title" data-aos="fade-up">
            <h2>Genes</h2>
            <p>See the below list of genes to begin planning your build!</p>
          </div>
  
          <div className="row">
            <div class="col-lg-3 order-2 order-lg-1">
              
            {genes.map((gene)=> {
                  return (
              <div className="icon-box mt-3 mt-lg-0" data-aos="fade-up">
                
              <i><img src={gene.picture} style={{ width: '50px', height: '50px' }} /></i>
              
              <h4>{gene.name}</h4>
              <p>{gene.description}</p>
                    
              <p><strong>Type: </strong>{gene.type} </p>
              <p><strong>Element:  </strong>{gene.element}</p>
              <p><strong>Monsters with this gene:  </strong>
              {gene.monsters.map((monster) =>{
                                            return(
                                                <img src={monster.namePicture} style={{ width: '20px', height: '20px' }} />
                                                );
                                        }
                                        
                                        )}</p>
  
                      
  
              </div>
  
               ) })}
  
  
            </div>
  
  
  
            <div className="image col-lg-9 order-1  picture2"  data-aos="fade-left" data-aos-delay="100"></div>
  
  
          </div>
  
        </div>
      </section>
    );

}
export default Genes;