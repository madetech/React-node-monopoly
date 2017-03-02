import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger, Button} from 'react-bootstrap';
import Deed from '../Deed';

class Landed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let result, s;
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        if(p)
            s = this.props.squareConfig.squares[p.position];

        if(s && !this.props.component) {
            result = <div>{this.props.text}</div>
        } else {
            result =  <div>{this.props.text}
                <Deed square={s} linkValue={this.props.linkValue}/>.
                {this.props.show2 && this.props.component2 && <Button onClick={this.props.onclick2()} title={this.props.title2}>
                    {this.props.value2}
                </Button>}
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