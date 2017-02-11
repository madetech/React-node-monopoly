import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MoneyBar from './MoneyBar';
import Board from './Board';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MoneyBar/>
                <Board/>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {playersConfig: state.playersConfig};
}

//connect component with global state
export default connect(mapStateToProps)(Game);