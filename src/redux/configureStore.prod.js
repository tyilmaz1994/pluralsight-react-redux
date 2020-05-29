import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configuteStore(initialState) {
    return createStore(
        rootReducer, 
        initialState, 
        applyMiddleware(thunk),
    );
}