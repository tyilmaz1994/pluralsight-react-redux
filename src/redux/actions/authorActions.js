import * as types from '../actions/actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors,
    };
}

export function deleteAuthorOptimistic(author) {
    return {
        type: types.DELETE_AUTHOR_OPTIMISTIC,
        author,
    }
}

export function loadAuthors() {
    return function(dispatch) {
        dispatch(beginApiCall())
        return authorApi.getAuthors().then(_authors => {
            dispatch(loadAuthorsSuccess(_authors));
        }).catch(_error => {
            dispatch(apiCallError());
            throw _error;
        })
    }
}

export function deleteAuthor(author) {
    return function(dispatch) {
        dispatch(deleteAuthorOptimistic(author));
        return authorApi.deleteAuthor(author.id);
    }
}