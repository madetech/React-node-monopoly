import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar } from 'react-bootstrap';

import  * as auctionActions  from 'redux/actions/auctionActions';
import  * as squareActions from 'redux/actions/squareActions';
import  * as playerActions  from 'redux/actions/playerRowActions';

import Deed from '../Deed';

class Auction extends Component {
    constructor(props) {
        super(props);
        this.state = {bid:0};
    }

    componentWillReceiveProps(newProps) {
        this.setPlayers();
        if(this.props.auction.show && newProps.auction.playersAuction.length > 0) {
            //check if finalize auction
            let biddingCount = 0;
            newProps.auction.playersAuction.map((player) => player.bidding ? biddingCount++ : null)
            if (biddingCount <= 1)
                this.finalizeAuction();
        }
    }

    componentDidMount() {
        this.setPlayers();
    }

    setPlayers() {
        if(this.props.auction.playersAuction.length < 1) {
            let players = this.props.playersConfig.players;
            this.props.dispatch(auctionActions.setPlayersAuction(players))
        }
    }

    onHide =()=>{
        this.setState({bid:0});
        this.props.dispatch(auctionActions.hideWindow());
        this.props.dispatch(auctionActions.resetState())
    }

    onClickBid = () => {
        let sq = this.props.squareConfig.squares[this.props.auction.currentPropertyAuction];
        let player=this.props.playersConfig.players[this.props.auction.currentPlayerAuction];

        if(this.state.bid > player.money) {
            this.props.popup("You don't have enough money to bid $" + this.state.bid + ".")
        }
        else if(this.state.bid < 0) {
            this.props.popup("Please enter a bid.");
        }
        else if(this.state.bid <= this.props.auction.highestBid.bid ) {
            this.props.popup("Your bid must be greater than highest bid. ($" + this.props.auction.highestBid.bid + ")");
        }
        else {
            this.bid(sq, player);
        }
    }

    bid(sq, player) {
        this.props.dispatch(auctionActions.setHighestBid({
            playerId: player.id,
            bid: this.state.bid
        }));
        this.doAuction();
    }

    pass(player) {
        player.bidding = false;
        this.props.dispatch(auctionActions.updatePlayersAuction(player));
        this.doAuction();
    }

    doAuction() {
        let player=this.props.playersConfig.players[this.props.auction.currentPlayerAuction];

        if (this.props.auction.highestBid.playerId === -1) {
            this.props.dispatch(auctionActions.setHighestBid({
                bid: this.state.bid,
                playerId: player.id
            }));
        }

        //for (let i in this.props.auction.playersAuction) {
        let id = player.id;
        let tryId = 0;
        while(true) {
            //@TODO REMOVE AFTER DEBUG
            if(tryId > 50) break;
            let currentPlayer = id++;
            tryId++;
            if(currentPlayer >= this.props.playersConfig.players.length) {
                for(let i in this.props.playersConfig.players) {
                    currentPlayer = this.props.playersConfig.players[i].id;
                    break;
                }
            }
            if (this.props.auction.playersAuction[currentPlayer] &&
                this.props.auction.playersAuction[currentPlayer].bidding &&
                this.props.auction.playersAuction[currentPlayer].id != player.id) {

                this.props.dispatch(auctionActions.updateCurrentPlayersAuction(currentPlayer));

                /*if (this.props.auction.highestBid.playerId == currentPlayer) {
                 this.finalizeAuction();
                 } else {*/
                //@todo AI
                /*var p = player[currentbidder];

                 if (!p.human) {
                 var bid = p.AI.bid(auctionproperty, highestbid);

                 if (bid === -1 || highestbid >= p.money) {
                 p.bidding = false;

                 window.alert(p.name + " exited the auction.");
                 continue;

                 } else if (bid === 0) {
                 window.alert(p.name + " passed.");
                 continue;

                 } else if (bid > 0) {
                 this.auctionBid(bid);
                 window.alert(p.name + " bid $" + bid + ".");
                 continue;
                 }
                 return;
                 } else {
                 break;
                 }*/
                break;
                //}
            }
        }
    }

    onClickPass = () => {
        this.pass(this.props.playersConfig.players[this.props.auction.currentPlayerAuction]);
    }

    onClickExit = () => {
        this.props.dispatch(auctionActions.exitPlayersAuction(this.props.auction.currentPlayerAuction));
        this.doAuction();
    }

    finalizeAuction() {
        let p = this.props.playersConfig.players[this.props.auction.highestBid.playerId];
        let sq = this.props.squareConfig.squares[this.props.auction.currentPropertyAuction];

        if (this.props.auction.highestBid.bid > 0) {
            p.pay(this.props.auction.highestBid.bid, 0);
            sq.owner = this.props.auction.highestBid.playerId;
            this.props.addAlert(p.name + " bought " + sq.name + " for $" + this.props.auction.highestBid.bid + ".");
        }

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.auction.highestBid.playerId, playerEntity: p}));
        this.props.dispatch(squareActions.updateSquare(this.props.auction.currentPropertyAuction, sq));
        this.props.dispatch(auctionActions.resetState());

        for(let i in this.props.playersConfig.players) {
            let player = this.props.playersConfig.players[i];
            player.bidding = true;
            this.props.dispatch(playerActions.updatePlayer({playerNumber:i, playerEntity: player}));
        }

        this.onHide();

        // if (!game.auction()) {
        //     play();
        // }
    }

    handleBid = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({bid:value});
    }

    showButtons() {
        return <ButtonToolbar>
            <Button
                title="Place your bid."
                onClick={()=>this.onClickBid()}>Bid</Button>
            <Button
                title="Skip bidding this time."
                onClick={()=>this.onClickPass()}>Pass</Button>
            <Button
                title="Stop bidding."
                onClick={()=>this.onClickExit()}>Exit Auction</Button>
        </ButtonToolbar>
    }

    render() {
        let sq = this.props.squareConfig.squares[this.props.auction.currentPropertyAuction];
        let player=this.props.playersConfig.players[this.props.auction.currentPlayerAuction];
        if(!player) return null;
        let playerBid = this.props.auction.highestBid.playerId > -1 ? `$(Player ${this.props.auction.highestBid.playerId})` : '(N/A)';

        // console.log('player',player)
        const modalInstance = (
            <Modal show={this.props.auction.show} onHide={()=>this.onHide()} backdrop="static">
                <Modal.Body>
                    <Row>
                        <Col md={12} >
                            <p className="text-center"><b>Auction</b> <Deed square={sq} linkValue={sq.name}/></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >
                            <p className="text-center">{`Highest Bid = $ ${this.props.auction.highestBid.bid} ${playerBid}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >
                            <p className="text-center">{`${player.name}, it is your turn to bid.`}</p>
                        </Col>
                    </Row>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                        value={this.state.bid}
                        onChange={this.handleBid}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {this.showButtons()}
                </Modal.Footer>
            </Modal>
        );

        return <div>
            {modalInstance}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        playersConfig   : state.playersConfig,
        auction 		: state.auction,
        squareConfig    : state.squareConfig,
        game            : state.gameFunctionality
    };
}

//connect component with global state
export default connect(mapStateToProps)(Auction);