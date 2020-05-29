import { createStore } from "redux";
import rootReducer from './reducers/index';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

it("should handle creating courses", () => {

    //arrange
    const store = createStore(rootReducer, initialState);
    const course = {
        title: "clean code",
    }

    //act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    //assert
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);

});