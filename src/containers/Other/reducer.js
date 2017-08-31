import {FETCH_OTHER} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
    other: []
});

function otherReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_OTHER:
            console.log('FETCH_OTHER');
            return state
        default:
            return state;
    }
}

export default otherReducer;

otherReducer._name = 'OtherPageReducer';

