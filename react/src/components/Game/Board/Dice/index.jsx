import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';
// import {require} from 'require';


function importAll(r) {
  return r.keys().map(r);
}

// const images = importAll(require.context('components/imgs', false, /\.(png|jpeg|svg)$/));
// const images=[];
class Dice extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // let imgName = images[this.props.diceNumber-1];
       	// let img=imgName?(<img src={imgName}/>):'';

        return (
            <div title="Dice" className="dice">{this.props.diceNumber}</div>
        );
    }
}

export default Dice;