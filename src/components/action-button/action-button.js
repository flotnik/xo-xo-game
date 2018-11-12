import React from 'react';

export default class ActionButton extends React.Component{

    render(){
        return(
            <button type="button" className="btn btn-success" onClick={this.props.onClick}>
                <i className="fa fa-arrow-circle-down" />
            </button>
        );
    }
}