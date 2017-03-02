import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import  * as playerActions  from 'redux/actions/playerRowActions';

class Deed extends Component {
    constructor(props) {
        super(props);

    }

    //different monopoly versions
    //@todo version
    utiltext() {
        return '    If one "Utility" is owned rent is 4 times amount shown on dice.<br /><br />    If both "Utilitys" are owned rent is 10 times amount shown on dice.';
    }

    //@todo version
    transtext() {
        return 	'<div style={{fontSize: "14px", line-height: "1.5"}}>Rent<span style={{float: "right"}}>$25.</span><br />If 2 Railroads are owned<span style={{float: "right"}}>50.</span><br />If 3     "     "     "<span style={{float: "right"}}>100.</span><br />If 4     "     "     "<span style={{float: "right"}}>200.</span></div>';
    }

    render() {
        const cardData = (
            <Popover id="popover-deed">
                <div id="deed" style={{display: "none;", top: "426px;", left: "467px;"}}>
                    {(() => { if(!this.props.square.mortgage && this.props.square.groupNumber >=3) { return <div id="deed-normal" style={{display: "block;"}}>
                        <div id="deed-header" style={{backgroundColor: this.props.square.color}}>
                            <div style={{margin: "5px", fontSize: "11px"}}>T I T L E  D E E D</div>
                            <div id="deed-name">{this.props.square.name}</div>
                        </div>
                        <table id="deed-table">
                            <tbody><tr>
                                <td colSpan={2}>
                                    RENT $<span id="deed-baserent">{this.props.square.baserent}</span>.
                                </td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "left"}}>With 1 House</td>
                                <td style={{textAlign: "right"}}>$   
                                    <span id="deed-rent1">{this.props.square.rent1}</span>.</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "left"}}>With 2 Houses</td>
                                <td style={{textAlign: "right"}}><span id="deed-rent2">{this.props.square.rent2}</span>.</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "left"}}>With 3 Houses</td>
                                <td style={{textAlign: "right"}}><span id="deed-rent3">{this.props.square.rent3}</span>.</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "left"}}>With 4 Houses</td>
                                <td style={{textAlign: "right"}}><span id="deed-rent4">{this.props.square.rent4}</span>.</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div style={{marginBottom: "8px"}}>With HOTEL $<span id="deed-rent5">{this.props.square.rent5}</span>.</div>
                                    <div>Mortgage Value $<span id="deed-mortgage">{this.props.square.price / 2}</span>.</div>
                                    <div>Houses cost $<span id="deed-houseprice">{this.props.square.houseprice}</span>. each</div>
                                    <div>Hotels, $<span id="deed-hotelprice">{this.props.square.houseprice}</span>. plus 4 houses</div>
                                    <div style={{fontSize: "9px", fontStyle: "italic", marginTop: "5px"}}>If a player owns ALL the Lots of any Color-Group, the rent is Doubled on Unimproved Lots in that group.</div>
                                </td>
                            </tr>
                            </tbody></table>
                    </div>}})()}
                    {(() => { if(this.props.square.mortgage) return<div id="deed-mortgaged">
                        <div id="deed-mortgaged-name">{this.props.square.name}</div>
                        <p>•</p>
                        <div>MORTGAGED</div>
                        <div> for $<span id="deed-mortgaged-mortgage">{this.props.square.price/2}</span></div>
                        <p>•</p>
                        <div style={{fontStyle: "italic", fontSize: "13px", margin: "10px"}}>Card must be turned this side up if property is mortgaged</div>
                    </div>})()}

                    {(() => { if(!this.props.square.mortgage && (this.props.square.groupNumber == 2 || this.props.square.groupNumber == 1)) {
                        let text = this.props.square.groupNumber == 2 ? this.utiltext() : '';
                        text = this.props.square.groupNumber == 1 ? this.transtext() : text;
                        return(<div id="deed-special">
                        <div id="deed-special-name">{this.props.square.name}</div>
                        <div id="deed-special-text"><div style={{fontSize: "14px", lineHeight: "1.5"}}>{text}
                            <span style={{float: "right"}}>$25.
                            </span><br/>If 2 Railroads are owned<span style={{float: "right"}}>50.
                            </span><br/>If 3     "     "     "<span style={{float: "right"}}>100.
                            </span><br/>If 4     "     "     "<span style={{float: "right"}}>200.
                            </span></div></div>
                        <div id="deed-special-footer">
                            Mortgage Value
                            <span style={{float: "right"}}>$<span id="deed-special-mortgage">{this.props.square.price/2}</span>.</span>
                        </div>
                    </div>)}})()}
                </div>
            </Popover>
        );

        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={cardData}>
                <a href="javascript:void(0);" className="statscellcolor">
                    {this.props.linkValue}
                </a>
            </OverlayTrigger>
        );
    }
}

export default Deed;