import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";



// Create Box component
export const Box = (props) => {

    const [monsters, setMonsters] = useState([]);
    const [genes, setGenes] = useState([]);
    const [selectedGene, setSelectedGene] = useState({
        namePicture: "./images/blank.png",
        name: "click the button"
    });


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
        axios.get('http://localhost:8080/findAllGenes')
        .then(response => {
            setGenes(response.data);
        }).catch(error => {
 
        });
    }, []
    ); 

    function dropDown() {
        document.getElementById("myDropdown2-"+props.position).classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn2')) {
            var dropdowns = document.getElementsByClassName("dropdown-content2");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <button className="circle dropbtn2" onClick={dropDown}>

                    <div >

                                    {/* <button onClick={dropDown} className="dropbtn"> */}
                            {/* <img src={selectedMonster.namePicture} style={{ width: '50px', height: '50px' }} /> */}
                        {/* </button> */}
                        <div id={"myDropdown2-"+props.position} class="dropdown-content2">
                            {genes.map((gene) => {
                                
                                return(
                                <div>
                                    <a onClick={()=> {
                                    props.saveGene(props.position, gene)}}>
                                         {gene.name}
                                         </a>

                                    
                                </div>
                                )}
                            )}
                        </div>

                        </div>
                        {
                        props.value?<img src={props.value} style={{ width: '50px', height: '50px' }} />:""
                    }
        </button>
    )
}