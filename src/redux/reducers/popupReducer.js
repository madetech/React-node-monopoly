import { SET_TEXT, SET_SHOW, SET_ACTION, SET_OPTION, SET_POPUP_CONFIG } from '../actions/popupActions';

const initialState = { text: '', show: false , action: '', option: '', image: '' };

export default function(state=initialState, action){
	switch (action.type) {
		case SET_TEXT:
			return Object.assign({ ...state, text: action.text });
		case SET_SHOW:
			return Object.assign({ ...state, show: action.show });
		case SET_ACTION:
			return Object.assign({ ...state, action: action.action });
		case SET_OPTION:
			return Object.assign({ ...state, option: action.option });
		case SET_POPUP_CONFIG:
			console.log('config',action.config)
			return Object.assign({ ...state, ...action.config });
		default:
			return state;
	}
} 