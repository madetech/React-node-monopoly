export const SET_TEXT = 'SET_TEXT';

export const SET_SHOW = 'SET_SHOW';

export const SET_ACTION = 'SET_ACTION';

export const SET_OPTION = 'SET_OPTION';

export const SET_POPUP_CONFIG = 'SET_POPUP_CONFIG';

export function setText(text){
	return {type: SET_TEXT, text: text};
}

export function setShow(show){
	return {type: SET_SHOW, show: show};
}

export function setAction(action){
	return {type: SET_ACTION, action: action};
}

export function setOption(option){
	return {type: SET_OPTION, option: option};
}

export function setPopupConfig(config) { 
	return {type: SET_POPUP_CONFIG, config: config};
}
