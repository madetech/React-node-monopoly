export const SHOW_WINDOW_AUCTION 				= 'SHOW_WINDOW_AUCTION';
export const HIDE_WINDOW_AUCTION 				= 'HIDE_WINDOW_AUCTION';
export const SET_HIGHEST_BID 					= 'SET_HIGHEST_BID';
export const SET_PLAYERS_AUCTION 				= 'SET_PLAYERS_AUCTION';
export const ADD_PROPERTY_TO_AUCTION_QUEUE 		= 'ADD_PROPERTY_TO_AUCTION_QUEUE';
export const EXIT_PLAYERS_AUCTION 				= 'EXIT_PLAYERS_AUCTION';
export const RESET_STATE 						= 'RESET_STATE';
export const SET_C_P_AUCTION					= 'SET_C_P_AUCTION';
export const UPDATE_CURRENT_PLAYERS_AUCTION		= 'UPDATE_CURRENT_PLAYERS_AUCTION';
export const UPDATE_PLAYERS_AUCTION				= 'UPDATE_PLAYERS_AUCTION';
export const UPDATE_PLAYERS_AUCTION_BIDDING		= 'UPDATE_PLAYERS_AUCTION_BIDDING';


export function showWindow(){
	return { type: SHOW_WINDOW_AUCTION }
}

export function hideWindow(){
	return { type: HIDE_WINDOW_AUCTION }
}

export function setHighestBid(highestBid){
	return { type: SET_HIGHEST_BID, highestBid: highestBid }
}

export function setPlayersAuction(players) {
	return {type:SET_PLAYERS_AUCTION, players: players}
}

export function addPropertyToAuctionQueue(data){
	return { type: ADD_PROPERTY_TO_AUCTION_QUEUE, data:data}
}

export function setCurrentPropertyAuction(current){
    return { type: SET_C_P_AUCTION, current:current}
}

export function exitPlayersAuction(index){
	return { type: EXIT_PLAYERS_AUCTION, index:index }
}

export function updateCurrentPlayersAuction(current){
    return { type: UPDATE_CURRENT_PLAYERS_AUCTION, current:current }
}

export function updatePlayersAuction(player){
    return { type: UPDATE_PLAYERS_AUCTION, data:player }
}

export function updatePlayersAuctionBidding(){
    return { type: UPDATE_PLAYERS_AUCTION_BIDDING }
}
export function resetState(){
	return { type: RESET_STATE }
}