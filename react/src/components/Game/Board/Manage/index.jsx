import React, { Component, PropTypes } from 'react';
import  * as tradeActions  from 'redux/actions/tradeActions';
import { connect } from 'react-redux';
import BootstrapTable from 'reactjs-bootstrap-table';
import { Button, Modal, FormControl, Col, Row, ButtonToolbar } from 'react-bootstrap';
import Deed from '../Deed';

class Manage extends Component {
    constructor(props) {
        super(props);
        this.state={selection: {}};
    }

    onChange = (newSelection) => {
        console.log('newSelection',newSelection)
        let sel = newSelection[Object.keys(newSelection)[0]];
        this.setState({selection: sel});
    }

    componentWillReceiveProps(newProps) {
        this.setState({selection: {}});
    }

    myRenderer(row) {
        console.log('row',row)
        return <div style={{display:"flex"}}>
                <span><div style={{backgroundColor:row.color, height:"15px", width:"15px"}}></div></span>
                <span style={{width:"100px", textAlign:"center"}}><Deed square={row} linkValue={row.name}/></span>
        </div>
    }

    mortgage = (s) => {
        console.log('mortage',s)
    }

    unmortgage = (s) => {
        console.log('unmortgage',s)
    }

    mortgageClick = () => {
        let s = this.props.squareConfig.squares[this.props.playersConfig.players[this.props.game.currentPlayer].position];
        let owner = this.props.playersConfig.players[this.props.game.currentPlayer];
console.log('mortgageClick',owner)
        if (s.mortgage) {
            if (owner.money < Math.round(s.price * 0.6)) {
                this.props.popup("<p>You need $" + (Math.round(s.price * 0.6) - owner.money) + " more to unmortgage " + s.name + ".</p>");

            } else {
                this.props.popup("<p>" + owner.name + ", are you sure you want to unmortgage " + s.name + " for $" + Math.round(s.price * 0.6) + "?</p>", ()=>this.unmortgage(s), "Yes/No");
            }
        } else {
            this.props.popup("<p>" + owner.name + ", are you sure you want to mortgage " + s.name + " for $" + Math.round(s.price * 0.5) + "?</p>", ()=>this.mortgage(s), "Yes/No");
        }
    }

    unmortgageClick = () => {

    }

    getData(){
        let index=this.props.game.currentPlayer;
        let player=this.props.playersConfig.players[this.props.game.currentPlayer];
        let square=this.props.squareConfig.squares;

        let squareOwner = [];
        square.map((sq,i) => {
            if(sq.owner == index) {
                squareOwner.push({id:i, ...sq});
            }
        });

        return squareOwner;
    }

    render() {
        let data = this.getData();

        let columns = [
            {name:"color", display: "Color", renderer: this.myRenderer},
        ];

        let buttons = ()=> {console.log('button',this.state.selection);
            if(this.state.selection && this.state.selection.price) {
                if (this.state.selection.mortgage) {

                } else {
                    return <ButtonToolbar>
                        <Button disabled={true}>By House (${this.state.selection.houseprice})</Button>
                        <Button onClick={this.mortgageClick} title={"Mortgage " + this.state.selection.name + " for $" + (this.state.selection.price * 0.5) + "."}>Mortgage
                            (${this.state.selection.price * 0.5})</Button>
                    </ButtonToolbar>
                }
            }
            console.log('this selected', this.state.selection)
            return null
        }

        // let data = [
        //     {id:1, color: "#FFFFFF" ,name: "Select1"},
        //     {id:2, color: "#453586" ,name: "Select2"}
        // ];

        return <div>
                {buttons()}
                <BootstrapTable
                    style={{width:"250px"}}
                    columns={columns}
                    data={data}
                    onChange={(row)=>this.onChange(row)}
                    headers={false}
                    select="single"
                    selected={this.state.selection}>
                <div className="alert-danger" style={{width:"250px"}}>{this.props.playersConfig.players[this.props.game.currentPlayer].name} you don't have any properties.</div>
                </BootstrapTable>
            </div>
    }
}

function mapStateToProps(state) {
    return {
        playersConfig   : state.playersConfig,
        squareConfig    : state.squareConfig,
        game            : state.gameFunctionality,
    }
}

export default connect(mapStateToProps)(Manage);