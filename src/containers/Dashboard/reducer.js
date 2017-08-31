import {FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
    loading: false,
    error: false,
    userData: {},
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            console.log('FETCH_USER');
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_USER_SUCCESS:
            return state
                .setIn(['userData', 'smth'], action.userData)
                .set('loading', false);
        case FETCH_USER_ERROR:
            return state
                .set('error', action.error)
                .set('loading', false);
        default:
            return state;
    }
}

export default appReducer;

appReducer._name = 'AppPageReducer';

