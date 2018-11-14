import React from 'react';
import Square from '../square'
import './board.css'
import ActionButton from './../action-button';


export default class Board extends React.Component{
    renderSquare(i) {        
        return (
            <Square value={this.props.squares[i]} />
        );
    }

    renderActionButton(i) {
        return (
            <ActionButton onClick={()=>this.props.onClick(i)} />
        );
    }

    createTable = ()=>{
        let table = [];

        //tr with action buttons 0-5
        let action_button_tds = [];
        for(let i = 0; i < 6; i++){            
            action_button_tds.push(<td key={i}>{this.renderActionButton(i)}</td>)            
        }
        table.push(<tr key='-1'>{action_button_tds}</tr>)

        //trs with squares 30-35, 24-29, 18-23, 12-17, 6-11, 0-5
        for(let i = 0; i<=5; i++){
            let squares_tds = []
            for(let j=6; j>=1; j--){
                let key = 36 - (i*6) - j;
                squares_tds.push(<td key={key}>{this.renderSquare(key)}</td>)
            }
            table.push(<tr key={i}>{squares_tds}</tr>)
        }

        return table;
    }

    render(){        
        return (
            <table className='board'>
                <tbody>
                    {this.createTable()}
                </tbody>
            </table>            
        );
    }
}