import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger, Button} from 'react-bootstrap';
import Deed from '../Deed';

class Landed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let result;
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let s = this.props.squareConfig.squares[p.position];

        if(!this.props.component) {
            result = <div>{this.props.text}</div>
        } else {
            result =  <div>{this.props.text}
                <Deed square={s} linkValue={this.props.linkValue}/>.
                <Button onClick={this.props.onclick()} title={this.props.title}>
                    {this.props.value}
                </Button>
            </div>;
        }

        return (
            <div id="landed" style={{display: "block"}}>
                {result}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        game            : state.gameFunctionality,
        playersConfig   : state.playersConfig,
        squareConfig    : state.squareConfig,
    };
}

export default connect(mapStateToProps)(Landed);