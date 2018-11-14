import React from 'react';
import './status.css';

const Status = (props) => {
    return (
        <div className="status">
            <span><b>Next is :</b> {props.turn === true? 'Player X' : 'Player O'}</span>
            <br/>
            <span><b>Turns left :</b> {36 - props.turnNumber}</span>
        </div>
        
    )
}

export default Status;