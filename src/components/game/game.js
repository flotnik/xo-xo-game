import React from 'react';
import './game.css';

import Header from '../header'
import Status from '../status'
import Board from '../board'

export default class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          history: [
            {
              squares: Array(6*6).fill(null)
            }
          ],
          stepNumber: 0,
          xIsNext: true
        };
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        for(let k = i; k < 36; k+=6){
          if(squares[k] === null){
            squares[k] = this.state.xIsNext ? 1 : 0;
            //console.log("Square " + k, " was set to " + squares[k]);
            this.setState({
              history: history.concat([
                {
                  squares: squares
                }
              ]),
              stepNumber: history.length,
              xIsNext: !this.state.xIsNext
            });
            return 
          }                 
        }
        alert("Incorrect move! Please try again");        
      }

    render(){
        const {history, stepNumber, xIsNext} = this.state;
        const current = history[stepNumber];
        //console.log('stepNumber' , stepNumber)

        return (
            <div className='game'>
                <Header />
                <Status turn={xIsNext} turnNumber={stepNumber}/>
                <Board squares={current.squares}
                       onClick={i => this.handleClick(i)}
                />
            </div>
        );
    }
}
