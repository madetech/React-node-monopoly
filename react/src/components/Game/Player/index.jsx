import React, { Component, PropTypes } from 'react';
// import { colors } from './config';
import { connect } from 'react-redux';
import * as playersActions from 'redux/actions/playerRowActions';


export class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="money-bar-row" style={{...this.props.player.color.css(),'borderStyle': 'solid'}}>
                <td className="moneybararrowcell">{/*img have to be here...*/}</td>
                <td className="moneybarcell">
                	<div><span>{this.props.player.name}</span>:</div>	
                	<div>$<span>{this.props.player.money}</span></div>
                </td>
            </tr>

        );
    }
}

