import {FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS} from './constants';

export function fetchUser() {
    return {
        type: FETCH_USER
    }
};

export function userDataLoaded(userData) {
    return {
        type: FETCH_USER_SUCCESS,
        userData
    }
}

export function userDataLoadError(error) {
   return {
       type: FETCH_USER_ERROR,
       error,
   }
}