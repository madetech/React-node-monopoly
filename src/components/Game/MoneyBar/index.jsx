import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Player} from '../Player';

class MoneyBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let players=[];

        for(let i in this.props.playersConfig.players)
            players.push(<Player key={i} index={i} player={this.props.playersConfig.players[i]}/>);
        
        return (
            <div>
              <div id="moneybarwrap">
                    <div id="moneybar">
                        <table>
                            <tbody>  
                                {players}      
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {playersConfig: state.playersConfig};
}

//connect component with global state
export default connect(mapStateToProps)(MoneyBar);