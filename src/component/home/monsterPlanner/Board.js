import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
// Import Storage object
import { Storage } from '../../../storage/Storage'
// Import Box component
import { Box } from './BoardBox'
// Import utility functions
import * as utils from '../../../utils/Functions'
// Import Board and Scoreboard views
import Scoreboard from "./Scoreboard";
//Import css
 import '../../../styles/board.css'
 import '../../../styles/box.css'
 import '../../../styles/buttons.css'



//item.props.genes is an array and will need to be looped through
//item.props.genes.name is an example of how to access one part of that object
//

 export class Board extends React.Component {

   
    
    constructor(props) {
    super(props)

        // Initialize component state
        this.state = {
            boxes: [
                {},{},{},
                {},{},{},
                {},{},{}
            ],
            history: [],
            xIsNext: true,
            type: 100,
            element: 100
        }
    }

    

    // Create instance of Storage object
    storage = new Storage()

    // Handle click on boxes on the board.
    handleBoxClick(index, gene) {
        // get current state of boxes
        const boxes = this.state.boxes.slice()

        // Get current state of history
        let history = this.state.history

        // // Stop the game if board contains winning combination
        // if (utils.findWinner(boxes) || boxes[index]) {
        //     return
        // }

        // // Stop the game if all boxes are clicked (filled)
        // if(utils.areAllBoxesClicked(boxes) === true) {
        //     return
        // }
        utils.findElement(boxes, this.state.element)
        utils.findType(boxes, this.state.type)

        
        //add a drop down menu on click so user can choose gene to add

       // boxes[index] = this.state.xIsNext ? 'x' : 'o'
       boxes[index] = gene;

        // Add move to game history
        history.push(gene)
        //history.push(this.state.xIsNext ? 'x' : 'o')

        // Update component state with new data
    this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }

    saveGene = (index, gene) => {
        this.handleBoxClick(index, gene)
    }

    // Handle board restart - set component state to initial state
    // handleBoardRestart = () => {
    //     this.setState({
    //         boxes: Array(9).fill(null),
    //         history: [],
    //         xIsNext: true
    //     })
    // }

    render() {
        
        // Get winner (if there is any)
        
    const elementBingo = utils.findElement(this.state.boxes, this.state.element)
    const typeBingo = utils.findType(this.state.boxes, this.state.type)

        // Are all boxes checked?
    const isFilled = utils.areAllBoxesClicked(this.state.boxes)

        // Status message
    let elementStatus
    let typeStatus
    let bingoBonuses = 'Bingo Bonuses: '

    if (typeBingo) {

        // If winner exists, create status message
        typeStatus = `${typeBingo}`

        // Push data about the game to storage
        this.storage.update([{typeBingo}])
    }   
    
        if (elementBingo) {
            // If winner exists, create status message
            elementStatus = `${elementBingo}`

            // Push data about the game to storage
            this.storage.update([{elementBingo}])
            
            
        } else if(!elementBingo && isFilled) {
            // If game is drawn, create status message
            elementStatus = ''

            // Push data about the game to storage
            this.storage.update(['Game drawn'])
        } else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            elementStatus = `It is ${(this.state.xIsNext ? 'x' : 'o')}'s turn.`
        }

        return (
            <>
               {/* The game board */}
                <div className="board-wrapper">
                    
                    <div className="board">
                        <h2 className="board-heading">{bingoBonuses}</h2>
                            <p>{elementStatus}</p>
                            <p>{typeStatus}</p>
                        <div className="board-row">
                            
                            {/* <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} /> */}
                            
                            <Box value={this.state.boxes[0].picture}  saveGene={this.saveGene} position="0" genes={this.props.genes}/>
                            
                            <Box value={this.state.boxes[1].picture} saveGene={this.saveGene} position="1" genes={this.props.genes}/>

                            <Box value={this.state.boxes[2].picture} saveGene={this.saveGene} position="2" genes={this.props.genes}/>
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[3].picture} saveGene={this.saveGene} position="3" genes={this.props.genes}/>

                            <Box value={this.state.boxes[4].picture} saveGene={this.saveGene} position="4" genes={this.props.genes}/>

                            <Box value={this.state.boxes[5].picture} saveGene={this.saveGene} position="5" genes={this.props.genes}/>
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[6].picture} saveGene={this.saveGene} position="6" genes={this.props.genes}/>

                            <Box value={this.state.boxes[7].picture} saveGene={this.saveGene} position="7" genes={this.props.genes}/>

                            <Box value={this.state.boxes[8].picture} saveGene={this.saveGene} position="8" genes={this.props.genes}/>
                        </div>
                        
                        </div >
                        {/* right side begins here */}
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="board-history" >
                        
                        <h2 className="board-heading ">Gene Information:</h2>

                        {/* List with history of moves */}
                        <div className="col-lg-12">
                        <ul  className="board-historyList ">
                            {this.state.history.length === 0 && <span>No genes to show.</span>}

                            {this.state.history.length !== 0 && this.state.history.map((gene, index) => {
                                return <li key={index}> <img src={gene.picture} style={{ width: '20px', height: '20px' }} />  
                                        <strong>{gene.name} </strong> 
                                        <br></br>
                                        <strong>Element: </strong>{gene.element} 
                                        <br></br> 
                                        <strong>Type: </strong> {gene.type}
                                        <br></br>
                                        {gene.description}
                                        <br></br>
                                        Monsters with this gene: 

                                        {/* {teacher.courses.map((course)=>{
                                return(
                            <p className="card-text">Courses Taught: {course.courseName}</p> */}
                            
                                        {gene.monsters.map((monster) =>{
                                            return(
                                                <img src={monster.namePicture} style={{ width: '20px', height: '20px' }} />
                                                );
                                        }
                                        
                                        )}
                                        <br></br>
                                        ------------------------------------------------------------------------
                                </li>
                                        
                            })}
                        </ul>
                        </div>
                    </div>
                    </div>

                    

                    {/* Button to start new game
                    {winner && <div className="board-footer" class="center">
                        <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
                    </div>} */}
            </>
        )
    }
}
export default Board;