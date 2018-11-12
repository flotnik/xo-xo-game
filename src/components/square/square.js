import React from 'react';

export default class Square extends React.Component{

    render(){
        const {value} = this.props;
        let classNames = '';
        let btnClassNames = 'btn'
        switch(value){
            case 0:
                classNames = 'fa fa-ban';
                btnClassNames += " btn-danger"
                break;
            case 1:
                classNames = 'fa fa-times';
                btnClassNames += " btn-dark"
                break;
            default:
                classNames = 'fa fa-circle';
        }
        
        
        return (
            <button type="button" className={btnClassNames} disabled>
                <i className={classNames}/>
            </button>
        );
    }
}