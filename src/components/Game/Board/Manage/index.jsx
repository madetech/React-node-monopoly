import React, { Component, PropTypes } from 'react';
import  * as playerActions  from 'redux/actions/playerRowActions';
import  * as squareActions from 'redux/actions/squareActions';
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
        let sel = newSelection[Object.keys(newSelection)[0]];
        this.setState({selection: sel});
    }

    componentWillReceiveProps(newProps) {
        this.setState({selection: {}});
    }

    myRenderer(row) {
        return <div style={{display:"flex"}}>
                <span><div style={{backgroundColor:row.color, height:"15px", width:"15px"}}></div></span>
                <span style={{width:"100px", textAlign:"center"}}><Deed square={row} linkValue={row.name}/></span>
        </div>
    }

    mortgage = (sq) => {
        let p = this.props.playersConfig.players[sq.owner];

        if (sq.house > 0 || sq.hotel > 0 || sq.mortgage) {
            return false;
        }

        let mortgagePrice = Math.round(sq.price * 0.5);
        let unmortgagePrice = Math.round(sq.price * 0.6);

        sq.mortgage = true;
        p.money += mortgagePrice;

        this.props.addAlert(p.name + " mortgaged " + sq.name + " for $" + mortgagePrice + ".");

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
        this.props.dispatch(squareActions.updateSquare(sq.id, sq));

        //this.props.updateOwned();
        this.props.updateMoney();
    }

    unmortgage = (sq) => {
        let p = this.props.playersConfig.players[sq.owner];

        let unmortgagePrice = Math.round(sq.price * 0.6);
        let mortgagePrice = Math.round(sq.price * 0.5);

        if (unmortgagePrice > p.money || !sq.mortgage) {
            return false;
        }

        p.pay(unmortgagePrice, 0);
        sq.mortgage = false;

        this.props.addAlert(p.name + " unmortgaged " + sq.name + " for $" + unmortgagePrice + ".");

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
        this.props.dispatch(squareActions.updateSquare(sq.id, sq));

        //this.props.updateOwned();
        return true;
    }
    
    buyHouse = () => {
        let sq = this.state.selection;
        let p = this.props.playersConfig.players[sq.owner];
        let houseSum = 0;
        let hotelSum = 0;

        if (p.money - sq.houseprice < 0) {
            if (sq.house == 4) {
                return false;
            } else {
                return false;
            }
        } else {
            for (let i = 0; i < 40; i++) {
                if (this.props.squareConfig.squares[i].hotel === 1) {
                    hotelSum++;
                } else {
                    houseSum += this.props.squareConfig.squares[i].house;
                }
            }

            if (sq.house < 4) {
                if (houseSum >= 32) {
                    return false;
                } else {
                    sq.house++;
                    this.props.addAlert(p.name + " placed a house on " + sq.name + ".");
                }
            } else {
                if (hotelSum < 12) {
                    sq.house = 5;
                    sq.hotel = 1;
                    this.props.addAlert(p.name + " placed a hotel on " + sq.name + ".");
                }
            }

            p.pay(sq.houseprice, 0);

            this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
            this.props.dispatch(squareActions.updateSquare(sq.id, sq));

            //updateOwned();
            this.props.updateMoney();
        }
    }

    sellHouse = () => {
        let sq = this.state.selection;
        let p = this.props.playersConfig.players[sq.owner];

        if (sq.hotel === 1) {
            sq.hotel = 0;
            sq.house = 4;
            this.props.addAlert(p.name + " sold the hotel on " + sq.name + ".");
        } else {
            sq.house--;
            this.props.addAlert(p.name + " sold a house on " + sq.name + ".");
        }

        p.money += sq.houseprice * 0.5;

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
        this.props.dispatch(squareActions.updateSquare(sq.id, sq));

        this.props.updateMoney();
    }

    buyHouseClick = () => {
        let s = this.state.selection;
        let p = this.props.playersConfig.players[s.owner];
        let houseSum = 0;
        let hotelSum = 0;

        if (p.money < s.houseprice) {
            if (s.house === 4) {
                this.props.popup("<p>You need $" + (s.houseprice - p.money) + " more to buy a hotel for " + s.name + ".</p>");
                return;
            } else {
                this.props.popup("<p>You need $" + (s.houseprice - p.money) + " more to buy a house for " + s.name + ".</p>");
                return;
            }
        }

        for (let i = 0; i < 40; i++) {
            if (this.props.squareConfig.squares[i].hotel === 1) {
                hotelSum++;
            } else {
                houseSum += this.props.squareConfig.squares[i].house;
            }
        }

        if (s.house < 4 && houseSum >= 32) {
            this.props.popup("<p>All 32 houses are owned. You must wait until one becomes available.</p>");
        } else if (s.house === 4 && hotelSum >= 12) {
            this.props.popup("<p>All 12 hotels are owned. You must wait until one becomes available.</p>");
        } else
            this.buyHouse();
    }

    sellHouseClick = () => {
        this.sellHouse();
    }

    mortgageClick = () => {
        let s = this.state.selection;
        let owner = this.props.playersConfig.players[this.props.game.currentPlayer];
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

    showButtons() {
        let sq = this.state.selection;
        let allGroupUninproved = true, allGroupUnmortgaged = true;
        let buyhousebutton = {disabled:true,show:true}, sellhousebutton = {disabled:true, show:false}, mortgagebutton = {show:true};

        if (sq.groupNumber >= 3) {

            buyhousebutton.show = true;
            sellhousebutton.show = true;
            buyhousebutton.disabled = false;
            sellhousebutton.disabled = false;

            buyhousebutton.value = "Buy house ($" + sq.houseprice + ")";
            sellhousebutton.value = "Sell house ($" + (sq.houseprice * 0.5) + ")";
            buyhousebutton.title = "Buy a house for $" + sq.houseprice;
            sellhousebutton.title = "Sell a house for $" + (sq.houseprice * 0.5);

            if (sq.house == 4) {
                buyhousebutton.value = "Buy hotel ($" + sq.houseprice + ")";
                buyhousebutton.title = "Buy a hotel for $" + sq.houseprice;
            }
            if (sq.hotel == 1) {
                buyhousebutton.show = false;
                sellhousebutton.value = "Sell hotel ($" + (sq.houseprice * 0.5) + ")";
                sellhousebutton.title = "Sell a hotel for $" + (sq.houseprice * 0.5);
            }

            let maxhouse = 0;
            let minhouse = 5;
            let max = sq.group.length;
            //
            for (let j = 0; j < max; j++) {
                if (this.props.squareConfig.squares[sq.group[j]].house > 0) {
                    allGroupUninproved = false;
                    break;
                }
            }

            for (let i = 0; i < max; i++) {
                let s = this.props.squareConfig.squares[sq.group[i]];

                if (s.owner !== sq.owner) {
                    buyhousebutton.disabled = true;
                    sellhousebutton.disabled = true;
                    buyhousebutton.title = "Before you can buy a house, you must own all the properties of this color-group.";
                } else {
                    if (s.house > maxhouse)
                        maxhouse = s.house;
                    if (s.house < minhouse)
                        minhouse = s.house;
                    if (s.house > 0)
                        allGroupUninproved = false;
                    if (s.mortgage)
                        allGroupUnmortgaged = false;
                }
            }

            if (!allGroupUnmortgaged) {
                buyhousebutton.disabled = true;
                buyhousebutton.title = "Before you can buy a house, you must unmortgage all the properties of this color-group.";
            }

            // Force even building
            if (sq.house > minhouse) {
                buyhousebutton.disabled = true;
                if (sq.house == 1) {
                    buyhousebutton.title = "Before you can buy another house, the other properties of this color-group must all have one house.";
                } else if (sq.house == 4) {
                    buyhousebutton.title = "Before you can buy a hotel, the other properties of this color-group must all have 4 houses.";
                } else {
                    buyhousebutton.title = "Before you can buy a house, the other properties of this color-group must all have " + sq.house + " houses.";
                }
            }
            if (sq.house < maxhouse) {
                sellhousebutton.disabled = true;
                if (sq.house == 1) {
                    sellhousebutton.title = "Before you can sell house, the other properties of this color-group must all have one house.";
                } else {
                    sellhousebutton.title = "Before you can sell a house, the other properties of this color-group must all have " + sq.house + " houses.";
                }
            }

            if (sq.house === 0 && sq.hotel === 0) {
                sellhousebutton.show = false;
            } else {
                mortgagebutton.show = false;

            }

            // Before a property can be mortgaged or sold, all the properties of its color-group must unimproved.
            if (!allGroupUninproved) {
                mortgagebutton.title = "Before a property can be mortgaged, all the properties of its color-group must unimproved.";
                mortgagebutton.disabled = true;
            }
        }

        let buttons = [];
        if(buyhousebutton.show)
            buttons.push(<Button onClick={this.buyHouseClick}
                                 {...buyhousebutton}>
                {buyhousebutton.value || "By House ($" + this.state.selection.houseprice + ")"}
            </Button>);
        if(sellhousebutton.show)
            buttons.push( <Button onClick={this.sellHouseClick}
                                  {...sellhousebutton}>
                {sellhousebutton.value || "Sell House ($" + this.state.selection.houseprice + ")"}
            </Button>);
        if(mortgagebutton.show)
            buttons.push( <Button onClick={this.mortgageClick}
                                  title={"Mortgage " + this.state.selection.name + " for $" + (this.state.selection.price * 0.5) + "."}
                                  {...mortgagebutton}>
                {mortgagebutton.value || "Mortgage ($" + this.state.selection.price * 0.5 + ")"}
            </Button>);

        return <ButtonToolbar>
            {buttons}
        </ButtonToolbar>
    }

    getData(){
        let index=this.props.game.currentPlayer;
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

        let buttons = () => {
            if(this.state.selection && this.state.selection.price) {
                if (this.state.selection.mortgage) {
                    return <ButtonToolbar>
                        <Button onClick={this.mortgageClick} title={"Unmortgage " + this.state.selection.name + " for $" + Math.round(this.state.selection.price * 0.6) + "."}>
                            Unmortgage (${Math.round(this.state.selection.price * 0.6)})</Button>
                    </ButtonToolbar>
                } else {
                    return this.showButtons()
                }
            }
            return null;
        }

        if(!this.props.playersConfig.players[this.props.game.currentPlayer]) return null;

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