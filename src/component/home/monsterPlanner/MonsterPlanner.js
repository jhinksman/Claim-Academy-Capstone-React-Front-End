import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import React from "react";
import {useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'

// Import Storage object
import { Storage } from '../../../storage/Storage'

// Import Box component
import { Box } from './BoardBox'
import Board from "./Board";



// Import utility functions
import * as utils from '../../../utils/Functions'

// Import Board and Scoreboard views
import Scoreboard from "./Scoreboard";
//Import css
 import '../../../styles/board.css'
 import '../../../styles/box.css'
 import '../../../styles/buttons.css'



function MonsterPlanner() {

    const history = useHistory();
    const [signInUser, setSignInUser] = useState({email: '', password: ''});
    const [user, setUser] = useState({});
    const [monsters, setMonsters] = useState([]);
    const [genes, setGenes] = useState([]);
    const [image, setImage] = useState("./images/blank.png");
    const [selectedMonster, setSelectedMonster] = useState({
        namePicture: "./images/blank.png",
        name: "click the button",
        user: user
    });

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
        console.log("useEffect email: "+ user.email);
        }).catch(error => {
          
        });
       }, []
    );



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

    const changeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
    
        const tempSignIn = {...signInUser};
    
        tempSignIn[name] = value;
        setSignInUser(tempSignIn);
    
      }

    const saveMonsterHandler = () =>{ 

      

        //params is only for get methods
        //post requires an entire object
        setSelectedMonster(user);
        const tempMonster = {...selectedMonster};
        tempMonster.user= user;
        //console.log("EMAIL GOES HERE" +localStorage.getItem("loggedInUser"));
        console.log("USER GOES HERE" +user.email);
  
        axios.post('http://localhost:8080/saveMonster', tempMonster).then(response=>{
         history.push("/monster-saved");
        }).catch(error=>{console.log("in the future add logic to navigate to an erorr page")});
       
       }



    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function dropDown() {

        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
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
        <div className="MonsterPlanner">
            <br></br>
            <br></br>
            <table class="center col-lg-4">
                <tr>
                    <td>
                        <button data-aos="fade-up" data-aos-delay="200" onClick={dropDown} className="dropbtn">
                            <img src={selectedMonster.namePicture} style={{ width: '50px', height: '50px' }} />
                        </button>
                        <div data-aos="fade-up" data-aos-delay="200" id="myDropdown" class="dropdown-content">
                            {monsters.map((monster) => 
                                <div >
                                    <a onClick={() => setSelectedMonster(monster)} >{monster.name}</a>
                                </div>
                            )}
                        </div>
                    </td>
                    
                    <th data-aos="fade-up" data-aos-delay="200">
                        {selectedMonster.element} <img src={selectedMonster.elementPicture} style={{ width: '20px', height: '20px' }} />
                    </th>
                    <tr>
                        <th data-aos="fade-up" data-aos-delay="200">
                            {selectedMonster.name}
                        </th>
                    </tr>
                    <td data-aos="fade-up" data-aos-delay="200">
                        {selectedMonster.type} <img src={selectedMonster.typePicture} style={{ width: '20px', height: '20px' }} />
                    </td>
                    <td>
                    <button data-aos="fade-up" data-aos-delay="200" variant="warning" type="button" className="btn btn-outline-success" onClick={saveMonsterHandler}>Save Monster to account</button>
                    </td>
                </tr>
            </table>


            <table  data-aos="fade-up" data-aos-delay="200" class="center col-lg-4">
                
                <Board genes={genes} dropDown={dropDown} monsters={monsters} />
            </table>
        </div>
    );
}



export default MonsterPlanner;
