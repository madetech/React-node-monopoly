import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, FormControl, Col, Row, ButtonToolbar } from 'react-bootstrap';

class Win extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('win', this.props)
       /* this.popup("<p>Congratulations, " + newProps.playersConfig.players[i].name + ", you have won the game.</p><div>");
        this.props.dispatch(playerActions.eliminatePlayer(newProps.playersConfig.players[i].id));*/
        let player;
        for(let i in this.props.playersConfig.players)
            player = this.props.playersConfig.players[i];

        return <Row>
            <Col md={12}>
                <h1 className="text-center">Congratulations</h1>
                <p className="text-center">{player.name}, you have won the game.</p>
            </Col>
        </Row>
    }
}

function mapStateToProps(state) {
    return {
        playersConfig  : state.playersConfig
    };
}

//connect component with global state
export default connect(mapStateToProps)(Win);