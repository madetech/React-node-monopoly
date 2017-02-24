import React, { Component, PropTypes } from 'react';
import  * as tradeActions  from 'redux/actions/tradeActions';
import { connect } from 'react-redux';

import { Button, Modal, FormControl } from 'react-bootstrap';

class TradeModal extends Component{
    constructor(props) {
        super(props);
    }

    handlePlayerChange = (e)=>{
    	this.props.dispatch(tradeActions.setSecondPlayer(e.target.value));
    }

    handleBidOneChange =(e)=>{
		this.props.dispatch(tradeActions.setBidOne({amount:e.target.value}))
    }

    handleBidTwoChange =(e)=>{
    	this.props.dispatch(tradeActions.setBidTwo({amount:e.target.value}))
    }

    onHide =()=>{
		this.props.dispatch(tradeActions.hideWindow());
		this.props.dispatch(tradeActions.resetState())
    }

    render() {
    	let currentPlayer = this.props.playersConfig.players[this.props.game.currentPlayer];
    	let playersSelect = [];

    	for( let i in this.props.playersConfig.players ) {
    		if(i!=this.props.game.currentPlayer)
    			playersSelect.push(
    				<option 
                            key={i} 
                            value={i} 
                            /*selected={this.props.players.length && player_types[i].type == this.props.players[this.props.index].type}*/    
                        >
                            {this.props.playersConfig.players[i].name}
                    </option>
                )
    	}

        let cardForTrade = [];
    	if(this.props.game.playerToOwned) {
            let playerToOwned = this.props.game.playerToOwned.filter(item => item.player == this.props.game.currentPlayer);
            if (playerToOwned.length > 0) playerToOwned = playerToOwned[0];

            cardForTrade = playerToOwned.owned.map(owned => this.props.squareConfig.squares[owned]);
        }

    	let cardUI=cardForTrade.map(card => 
    		(
    			<div className="row">
    				<div className="col-md-2" style={{backgroundColor: card.color}}></div>
    				<div className="col-md-10">{card.name}</div>
    			</div>
    		)
    	);
    	if(!cardUI) cardUI='dsadasd';



		const modalInstance = (
			<Modal show={this.props.trade.show} onHide={()=>this.onHide()}>
			    <Modal.Body>
			        <div className="row">
			       		<div className="col-md-6">{currentPlayer.name}</div>

		                <div className="col-md-6">
					         <FormControl componentClass="select" value={this.props.trade.secondPlayer} onChange={this.handlePlayerChange}>
		                        {playersSelect}
		                    </FormControl>
		                </div>

		            </div>
		            <div className="row">
		              <div className="col-md-6">
		              	{cardUI}
		              </div>
		            </div>
		            <div className="row">
			       		<div className="col-md-6">
			       		 	$ 
		                    <FormControl
		                        type="text"
		                        placeholder="Enter text"
		                        value={this.props.trade.bidOne}
		                        onChange={this.handleBidOneChange}
		                    />

                    	</div>
		                <div className="col-md-6">
					       	$ 
		                    <FormControl
		                        type="text"
		                        placeholder="Enter text"
		                        value={this.props.trade.bidTwo}
		                        onChange={this.handleBidTwoChange}
		                    />
		                </div>
		            </div>
			    </Modal.Body>

			    <Modal.Footer>
			    	<Button>Propose Trade</Button>
			    	<Button onClick={()=>this.onHide()}>Cancel Trade</Button>
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
    			trade 			: state.trade,
                squareConfig    : state.squareConfig,
                game            : state.gameFunctionality
    };
}

//connect component with global state
export default connect(mapStateToProps)(TradeModal);