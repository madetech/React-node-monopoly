import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import  * as playerActions  from 'redux/actions/playerRowActions';
import  * as gameActions  from 'redux/actions/gameActions';
import  * as popupActions  from 'redux/actions/popupActions';
import { connect } from 'react-redux';
import Dice from '../Dice';
import {Player} from 'components/Game/Player';
import Popup from '../Popup';
import Alert from '../Alert';


class ControlBoard extends Component {

    constructor(props) {
        super(props);

        this.state={
            doublecount:        0,
            option:             false, 
            buy:                false,
            manage:             false,
            showResignbutton:   false, 
        }
    }

    rollDiceAction(){
        let first  = Math.floor(Math.random() * 6) + 1;
        let second = Math.floor(Math.random() * 6) + 1;

        return { first, second };
    }


    addAlert = (message) => this.props.dispatch(gameActions.addAlert(message));

    updateMoney  = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        if(p.money < 0 ) {   
            this.setState({showResignbutton: true});
            let nextButton={...this.props.game.nextButton, show:false};
            this.props.dispatch(gameActions.setNextButton(nextButton)); 
        } else {                
            this.setState({showResignbutton: false});
            let nextButton={...this.props.game.nextButton, show:true};
            this.props.dispatch(gameActions.setNextButton(nextButton));  
        }

        if(this.props.game.landed.text == "") this.props.dispatch(gameActions.setLanded({show:false}));
    }

    updatePosition = () => {

        this.props.dispatch(gameActions.updatePlayerToSquare({
            player: this.props.game.currentPlayer,
            square: this.props.playersConfig.players[this.props.game.currentPlayer].position
        }));

        // Reset borders
        // document.getElementById("jail").style.border = "1px solid black";
        // document.getElementById("jailpositionholder").innerHTML = "";
        // for (var i = 0; i < 40; i++) {
        //     document.getElementById("cell" + i).style.border = "1px solid black";
        //     document.getElementById("cell" + i + "positionholder").innerHTML = "";

        // }

        // var sq, left, top;

        // for (var x = 0; x < 40; x++) {
        //     sq = square[x];
        //     left = 0;
        //     top = 0;

        //     for (var y = turn; y <= pcount; y++) {

        //         if (player[y].position == x && !player[y].jail) {

        //             document.getElementById("cell" + x + "positionholder").innerHTML += "<div class='cell-position' title='" + player[y].name + "' style='background-color: " + player[y].color + "; left: " + left + "px; top: " + top + "px;'></div>";
        //             if (left == 36) {
        //                 left = 0;
        //                 top = 12;
        //             } else
        //                 left += 12;
        //         }
        //     }

        //     for (var y = 1; y < turn; y++) {

        //         if (player[y].position == x && !player[y].jail) {
        //             document.getElementById("cell" + x + "positionholder").innerHTML += "<div class='cell-position' title='" + player[y].name + "' style='background-color: " + player[y].color + "; left: " + left + "px; top: " + top + "px;'></div>";
        //             if (left == 36) {
        //                 left = 0;
        //                 top = 12;
        //             } else
        //                 left += 12;
        //         }
        //     }
        // }

        // left = 0;
        // top = 53;
        // for (var i = turn; i <= pcount; i++) {
        //     if (player[i].jail) {
        //         document.getElementById("jailpositionholder").innerHTML += "<div class='cell-position' title='" + player[i].name + "' style='background-color: " + player[i].color + "; left: " + left + "px; top: " + top + "px;'></div>";

        //         if (left === 36) {
        //             left = 0;
        //             top = 41;
        //         } else {
        //             left += 12;
        //         }
        //     }
        // }

        // for (var i = 1; i < turn; i++) {
        //     if (player[i].jail) {
        //         document.getElementById("jailpositionholder").innerHTML += "<div class='cell-position' title='" + player[i].name + "' style='background-color: " + player[i].color + "; left: " + left + "px; top: " + top + "px;'></div>";
        //         if (left === 36) {
        //             left = 0;
        //             top = 41;
        //         } else
        //             left += 12;
        //     }
        // }

        // p = player[turn];

        // if (p.jail) {
        //     document.getElementById("jail").style.border = "1px solid " + p.color;
        // } else {
        //     document.getElementById("cell" + p.position).style.border = "1px solid " + p.color;
        // }

        // // for (var i=1; i <= pcount; i++) {
        // // document.getElementById("enlarge"+player[i].position+"token").innerHTML+="<img src='"+tokenArray[i].src+"' height='30' width='30' />";
        // // }

    }


    updateOwned = () => {

    }


    popup = (text, action, option) => {
        let popupConfig = { show: true } ;

        if(text)    popupConfig.text    =   text;
        if(action)  popupConfig.action  =   action;
        if(option)  popupConfig.option  =   option;

        this.props.dispatch(popupActions.setPopupConfig(popupConfig));

    }


    gotojail = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        this.addAlert(p.name + " was sent directly to jail.");

        let landed={};
        landed.text="You are in jail.";
        landed.show=true;

        let nextButton={};
        nextButton.text="End turn";
        nextButton.title="End turn and advance to the next player.";
        nextButton.show=true;

        this.props.dispatch(gameActions.setLanded(landed));
        this.props.dispatch(gameActions.setNextButton(nextButton));

        p.jail = true;
        this.setState({doublecount: 0});

        // document.getElementById("nextbutton").value = "End turn";
        // document.getElementById("nextbutton").title = "End turn and advance to the next player.";

        // if (p.human) {
        //     document.getElementById("nextbutton").focus();
        // }

        this.updatePosition();
        this.updateOwned();

        if (!p.human) {
            //@TODO !!!
            this.popup(p.AI.alertList, game.next);
            p.AI.alertList = "";
        }
    }


    rollDice = () =>{

   
        let dice = this.rollDiceAction();
        this.props.dispatch(gameActions.rollDice(dice));

        
        let config = this.state;
     
        config.hide     = false;
        config.buy      = true;
        config.manage   = false;
     
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let die1 = dice.first;
        let die2 = dice.second;

        config.doublecount++;

        let nextButton={};


        if (die1 == die2) {
            this.addAlert(p.name + " rolled " + (die1 + die2) + " - doubles.");
        } else {
            this.addAlert(p.name + " rolled " + (die1 + die2) + ".");
        }

        if (die1 == die2 && !p.jail) {
            // updateDice(die1, die2);

            if (config.doublecount < 3) {
                nextButton.text = "Roll again";
                nextButton.title = "You threw doubles. Roll again.";
                nextButton.show = true;
                this.props.dispatch(gameActions.setNextButton(nextButton));
            // If player rolls doubles three times in a row, send him to jail
            } else if (config.doublecount === 3) {
                p.jail = true;
                config.doublecount = 0;
                this.addAlert(p.name + " rolled doubles three times in a row.");
                this.updateMoney();


                if (p.human) {
                    this.popup("You rolled doubles three times in a row. Go to jail.", this.gotojail);
                } else {
                    this.gotojail();
                }

                return;
            }
        } else {
            nextButton.text = "End turn";
            nextButton.title = "End turn and advance to the next player.";
            nextButton.show = true;
            this.props.dispatch(gameActions.setNextButton(nextButton));
            
            config.doublecount = 0;
        }

        this.updatePosition();
        this.updateMoney();
        this.updateOwned();

        if (p.jail === true) {
            p.jailroll++;

            // updateDice(die1, die2);
            if (die1 == die2) {
                // document.getElementById("jail").style.border = "1px solid black";
                // document.getElementById("cell11").style.border = "2px solid " + p.color;
        

                this.props.dispatch(gameActions.setLanded({show:false}));

                p.jail = false;
                p.jailroll = 0;
                p.position = 10 + die1 + die2;
                config.doublecount = 0;

                this.addAlert(p.name + " rolled doubles to get out of jail.");

                land();
            } else {
                if (p.jailroll === 3) {

                    if (p.human) {
                        this.popup("<p>You must pay the $50 fine.</p>", function() {
                            payFifty();
                            payfifty();
                            p.position =10 + die1 + die2;
                            land();
                        });
                    } else {
                        payfifty();
                        p.position = 10 + die1 + die2;
                        land();
                    }
                } else {

                    let landed={};
                    landed.text="You are in jail.";
                    landed.show=true;

                    this.props.dispatch(gameActions.setLanded(landed));


                    if (!p.human) {
                        this.popup(p.AI.alertList, game.next);
                        p.AI.alertList = "";
                    }
                }
            }


        } else {
            // updateDice(die1, die2);

            // Move player
            p.position += die1 + die2;

            // Collect $200 salary as you pass GO
            if (p.position >= 40) {
                p.position -= 40;
                p.money += 200;
                this.addAlert(p.name + " collected a $200 salary for passing GO.");
            }

            // this.land();
        }
        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));



        this.setState(config);
    }   


    render() {

        let landed;
        if(this.props.game.landed.show)
            landed = (
                <div id="landed" title={this.props.game.landed.title}>
                    {this.props.game.landed.text}    
                </div>
            );
        return (
            <div>
                <Alert />
                {landed}
                <Dice diceNumber={this.props.game.dice.first}/>
                <Dice diceNumber={this.props.game.dice.second}/>
                <table>
                    <tbody>  
                        <Player 
                            index={this.props.game.currentPlayer} 
                            player={this.props.playersConfig.players[this.props.game.currentPlayer]}
                        />
                    </tbody>
                </table>
                <Popup />
                <Button type="button" className="btn btn-info" onClick={this.rollDice}>Roll dice</Button>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
                playersConfig   : state.playersConfig,
                squareConfig    : state.squareConfig,
                game            : state.gameFunctionality,
                popupConfig     : state.popupConfig
    };
}

//connect component with global state
export default connect(mapStateToProps)(ControlBoard);