import { Action, ThemeState } from '../models';
import TYPE from '../action/type';

export const initialThemeState: ThemeState = {
    theme: 'light',
    backgroundImage: '',
};

export default (state = initialThemeState, action: Action) => {
    switch (action.type) {
        case TYPE.SET_THEME:
            return Object.assign({}, state, {theme: action.payload});
        case TYPE.SET_BING_DAILY:
            return Object.assign({}, state, { backgroundImage: action.payload })
        default: 
            return state;
    }
};
