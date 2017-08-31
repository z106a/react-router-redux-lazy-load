import {combineReducers} from 'redux';

import authReducer from './authReducer';

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

export default function createReducer(asyncReducers) {
    return combineReducers({
      // route: routeReducer,
      auth: authReducer,
      todos: todos,
      ...asyncReducers,
  });
}
