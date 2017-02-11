/**
 * Created by avv123avv on 07.02.17.
 * Simple Redux reducer
 */

import { INCREMENT_COUNTER } from 'redux/actions/counterActions';

const initialState = { value: 0 };

export default function(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return { value: state.value + 1 };
        default:
            return state;
    }
}
