import React from 'react';
import './undo-button.css';

const UndoButton = (props)=>{
    return(
        <div className="undo-button">
            <button className="btn btn-outline-secondary" onClick={ props.onUndoClick } disabled={ props.isDisabled }>
                <i className="fa fa-undo"/>
            </button>
        </div>
    );
}

export default UndoButton;
 