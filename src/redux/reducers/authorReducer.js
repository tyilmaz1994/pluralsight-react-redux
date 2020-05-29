import { LOAD_AUTHORS_SUCCESS, DELETE_AUTHOR_OPTIMISTIC } from "../actions/actionTypes";
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
    switch (action.type) {
        case LOAD_AUTHORS_SUCCESS:
            return action.authors;
        case DELETE_AUTHOR_OPTIMISTIC:
            debugger;
            return state.filter(_author => _author.id !== action.author.id);
        default:
            return state;
    }
}