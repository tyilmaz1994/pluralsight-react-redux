import * as types from "./actionTypes";
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from '../actions/apiStatusActions';

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses,
    }
}

export function loadCourses() {
    return function(dispatch) {
        dispatch(beginApiCall())
        return courseApi.getCourses().then(_courses => {
            dispatch(loadCoursesSuccess(_courses));
        }).catch(_error => {
            dispatch(apiCallError());
            throw _error;
        })
    }
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSE_SUCCESS,
        course,
    }
}

export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course,
    }
}

export function saveCourse(course) {
    return function(dispatch) {
    //return function(dispatch, getState) {
        dispatch(beginApiCall())
        return courseApi.saveCourse(course).then(_savedCourse => {
            course.id 
                ? dispatch(updateCourseSuccess(_savedCourse))
                : dispatch(createCourseSuccess(_savedCourse));
        })
        .catch(_error => {
            dispatch(apiCallError());
            throw _error;
        })
    }
}

export function deleteCourseOptimistic(course) {
    return {
        type: types.DELETE_COURSE_OPTIMISTIC,
        course,
    }
}

export function deleteCourse(course) {
    return function(dispatch) {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    }
}