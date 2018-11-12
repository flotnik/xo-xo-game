import React from 'react';

const Status = (props) => {
    return (
        <div>
            <span><b>Next is :</b> {props.turn === true? 'Player X' : 'Player O'}</span>
            <br/>
            <span><b>Turns left :</b> {36 - props.turnNumber}</span>
        </div>
        
    )
}

export default Status;