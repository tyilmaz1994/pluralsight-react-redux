import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC } from "../actions/actionTypes";
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case CREATE_COURSE_SUCCESS:
            return  [...state, {...action.course}];
        case UPDATE_COURSE_SUCCESS:
            return  state.map(_course => _course.id === action.course.id ? action.course : _course);
        case LOAD_COURSES_SUCCESS:
            return action.courses;
        case DELETE_COURSE_OPTIMISTIC:
            return state.filter(_course => _course.id !== action.course.id);
        default:
            return state;
    }
}