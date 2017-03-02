/**
 * Created by avv123avv on 07.02.17.
 * Combine all reducers
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { counter, setup , playersConfig, squareConfig, gameFunctionality, popupConfig, trade, auction, chanceCard, communityChestCard } from './reducers';

export default function (initialState = {}) {
    
    const rootReducer = combineReducers({
    	counter, 
    	setup , 
    	playersConfig,
    	squareConfig,
    	gameFunctionality,
    	popupConfig,
    	trade,
		auction,
        chanceCard,
        communityChestCard
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}