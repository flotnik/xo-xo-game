import React from 'react';
import './game.css';

import Header from '../header'
import Status from '../status'
import Board from '../board'
import UndoButton from '../undo-button';

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

            this.setState({
              history: history.concat([
                {
                  squares: squares
                }
              ]),
              stepNumber: history.length,
              xIsNext: !this.state.xIsNext
            });
            let winner = calculateWiner(squares, k);
            console.log(winner);
            if(winner.length > 0){
              alert("Winner is " + winner);
            }
            return;
          }                 
        }
        alert("Incorrect move! Please try again");        
      }

      onUndoClick = ()=>{   

        this.setState(({history, stepNumber, xIsNext})=>{
          const prevHistory = history.slice(0, history.length-1);

          return {
            stepNumber: stepNumber-1,
            xIsNext: !xIsNext,
            history: prevHistory
          }
        });
      }

    render(){
        const {history, stepNumber, xIsNext} = this.state;
        const current = history[stepNumber];

        return (
            <div className='game'>
                <Header />
                <div className="panel">
                  <Status turn={xIsNext} turnNumber={stepNumber}/>
                  <UndoButton onUndoClick={ ()=> this.onUndoClick() } isDisabled={ stepNumber === 0? true: false }/>
                </div>                
                <Board squares={current.squares}
                       onClick={ i => this.handleClick(i) }
                />
            </div>
        );
    }
}

function calculateWiner(board, ch_p){
  let horizontal_line = [ch_p];
  let vertical_line = [ch_p];
  let slash_diagonal_line = [ch_p];
  let bkslash_diagonal_line = [ch_p];

  //const x = ch_p % 6;
  const y = Math.floor(ch_p / 6);
  const value = board[ch_p];
 
  for(let i=1; i<4; i++){
    //horizontal line
    let h1 = ch_p + i;    
    if(Math.floor(h1 / 6) === y){
      horizontal_line = [...horizontal_line, h1];
    }
    let h2 = ch_p - i;
    if(Math.floor(h2 / 6) === y){
      horizontal_line = [h2, ...horizontal_line];
    }
    
    //vertical line
    let v1 = ch_p + i * 6;
    if( Math.floor(v1 / 6) < 6){
      vertical_line = [v1, ...vertical_line];
    }
    let v2 = ch_p - i * 6;
    if( v2 >= 0){
      vertical_line = [...vertical_line, v2];
    }

    //slash diagonal line
    let sd1 = ch_p + i * 6 + i;
    if( Math.floor(sd1/6) === Math.floor((sd1-i)/6) && Math.floor(sd1/6) < 6){
      slash_diagonal_line = [sd1, ...slash_diagonal_line];
    }
    let sd2 = ch_p - i * 6 - i;
    if( Math.floor(sd2/6) === Math.floor((sd2+i)/6) && Math.floor(sd2/6) < 6){
      slash_diagonal_line = [...slash_diagonal_line, sd2];
    }

    //backslash diagonal line
    let bsd1 = ch_p + i * 6 - i;
    if( Math.floor(bsd1/6) === Math.floor((bsd1+i)/6) && Math.floor(bsd1/6) < 6){
      bkslash_diagonal_line = [bsd1, ...bkslash_diagonal_line];
    }
    let bsd2 = ch_p - i * 6 + i;
    if( Math.floor(bsd2/6) === Math.floor((bsd2-i)/6) && Math.floor(bsd2/6) < 6){
      bkslash_diagonal_line = [...bkslash_diagonal_line, bsd2];
    }
  }

  //console.log(horizontal_line, vertical_line, slash_diagonal_line, bkslash_diagonal_line);

  const check_line_func = (line)=>{
    let sum = 0;
    for(let i=0; i<line.length; i++){
      if(board[line[i]] === value){
        sum++;
      }else{
        sum = 0;
      }
      if(sum === 4) return true;
    }
    return false;
  };

  // filter only 1 and 0 indexes
  horizontal_line = horizontal_line.filter( el => {return board[el] != null;}).sort((a, b)=>{ return a-b; });
  vertical_line = vertical_line.filter( el => {return board[el] != null;}).sort((a, b)=>{ return a-b; });
  slash_diagonal_line = slash_diagonal_line.filter( el => {return board[el] != null;}).sort((a, b)=>{ return a-b; });
  bkslash_diagonal_line = bkslash_diagonal_line.filter( el => {return board[el] != null;}).sort((a, b)=>{ return a-b; });
  //=============================

  if(check_line_func(horizontal_line)) 
    return horizontal_line;
  if(check_line_func(vertical_line)) 
    return vertical_line;
  if(check_line_func(slash_diagonal_line)) 
    return slash_diagonal_line;
  if(check_line_func(bkslash_diagonal_line)) 
    return bkslash_diagonal_line;

  return [];
}