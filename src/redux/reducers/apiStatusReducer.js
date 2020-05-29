import { BEGIN_API_CALL, API_CALL_ERROR } from "./../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsWithSuccess(type) {
    return type.substring(type.length - 7) === "SUCCESS";
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
    if(action.type === BEGIN_API_CALL) {
        return state + 1;
    } else if(action.type === API_CALL_ERROR || actionTypeEndsWithSuccess(action.type)) {
        return state - 1;
    }

    return state;
}