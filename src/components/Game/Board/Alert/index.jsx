import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Button, Modal} from 'react-bootstrap';

class Alert extends Component{
    constructor(props) {
        super(props);   
    }

    render() {
        let lines = this.props.gameLog.map((e,index) => (<div key={"alert"+index}>{e}</div>));
        return <div id="alert">
            {lines}
            </div>
    }
}

function mapStateToProps(state) {
    return {...state.gameFunctionality};
}

//connect component with global state
export default connect(mapStateToProps)(Alert);