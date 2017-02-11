import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import  * as gameActions  from 'redux/actions/gameActions';
import { connect } from 'react-redux';
import Dice from '../Dice';
import {Player} from 'components/Game/Player';



class ControlBoard extends Component {

    constructor(props) {
        super(props);

        this.state={
            doublecount:    0,
            option:         false, 
            buy:            false,
            manage:         false,
            landed:         false,
            nextButton:     {}
        }
    }

    rollDiceAction(){
        let first  = Math.floor(Math.random() * 6) + 1;
        let second = Math.floor(Math.random() * 6) + 1;

        return { first, second };
    }

    /**
     * Call notify window with bootstrap modal window
     */
    addAlert(){

    }

    rollDice = () =>{
        let dice=this.rollDiceAction();
        this.props.dispatch(gameActions.rollDice(dice));
        
        let config = this.state;
     
        config.hide     = false;
        config.buy      = true;
        config.manage   = false;
     
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let die1 = dice.first;
        let die2 = dice.second;

        config.doublecount++;

        if (die1 == die2) {
            addAlert(p.name + " rolled " + (die1 + die2) + " - doubles.");
        } else {
            addAlert(p.name + " rolled " + (die1 + die2) + ".");
        }

        if (die1 == die2 && !p.jail) {
            updateDice(die1, die2);

            if (config.doublecount < 3) {
                config.nextButton.value = "Roll again";
                config.nextButton.title = "You threw doubles. Roll again.";

            // If player rolls doubles three times in a row, send him to jail
            } else if (config.doublecount === 3) {
                p.jail = true;
                config.doublecount = 0;
                addAlert(p.name + " rolled doubles three times in a row.");
                updateMoney();


                if (p.human) {
                    popup("You rolled doubles three times in a row. Go to jail.", goToJail);
                } else {
                    gotojail();
                }

                return;
            }
        } else {
            config.nextButton.value = "End turn";
            config.nextButton.title = "End turn and advance to the next player.";
            config.doublecount = 0;
        }

        updatePosition();
        updateMoney();
        updateOwned();

        if (p.jail === true) {
            p.jailroll++;

            updateDice(die1, die2);
            if (die1 == die2) {
                // document.getElementById("jail").style.border = "1px solid black";
                // document.getElementById("cell11").style.border = "2px solid " + p.color;
                // $("#landed").hide();
                landed = false;

                p.jail = false;
                p.jailroll = 0;
                p.position = 10 + die1 + die2;
                config.doublecount = 0;

                addAlert(p.name + " rolled doubles to get out of jail.");

                land();
            } else {
                if (p.jailroll === 3) {

                    if (p.human) {
                        popup("<p>You must pay the $50 fine.</p>", function() {
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
                    $("#landed").show();
                    document.getElementById("landed").innerHTML = "You are in jail.";

                    if (!p.human) {
                        popup(p.AI.alertList, game.next);
                        p.AI.alertList = "";
                    }
                }
            }


        } else {
            updateDice(die1, die2);

            // Move player
            p.position += die1 + die2;

            // Collect $200 salary as you pass GO
            if (p.position >= 40) {
                p.position -= 40;
                p.money += 200;
                addAlert(p.name + " collected a $200 salary for passing GO.");
            }

            land();
        }

        this.setState(config);
    }   


    render() {

        return (
            <div>   
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
                <Button type="button" className="btn btn-info" onClick={this.rollDice}>Roll dice</Button>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {playersConfig: state.playersConfig, squareConfig: state.squareConfig, game: state.gameFunctionality};
}

//connect component with global state
export default connect(mapStateToProps)(ControlBoard);