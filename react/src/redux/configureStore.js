/**
 * Created by avv123avv on 07.02.17.
 * Combine all reducers
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { counter, setup , playersConfig, squareConfig, gameFunctionality } from './reducers';

export default function (initialState = {}) {
    
    const rootReducer = combineReducers({
    	counter, 
    	setup , 
    	playersConfig,
    	squareConfig,
    	gameFunctionality
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}