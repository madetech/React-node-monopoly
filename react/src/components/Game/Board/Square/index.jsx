import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';



class Square extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        //@todo change UI...
        const cardData = (
              <Popover title="" id={"square-"+this.props.index}>
                    <div className="row" style={{backgroundColor:this.props.color, height: "10px"}}></div>
                    <div className="row"><strong>{this.props.name}</strong></div>
                    <div className="row"><span>{`$ ${this.props.price}`||''}</span></div>
              </Popover>
        );



        return (
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={cardData}>
                    <p>{this.props.name}</p>
                </OverlayTrigger>
        );
    }
}

export default Square;