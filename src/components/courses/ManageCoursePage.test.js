import React from 'react';
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from './ManageCoursePage';

function renderForm(args) {
    
    const defaultProps = {
        authors,
        courses,
        course: newCourse,
        history:{},
        match:{},
        loadCourses: jest.fn(),
        loadAuthors: () => {},
        saveCourse: () => {},
    };

    const props = { ...defaultProps, ...args };
    return mount(<ManageCoursePage { ...props } />);
}

it("sets error when attempting to save an empty title field", () => {

    const wrapper = renderForm();

    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    console.log(error.text());
    expect(error.text()).toEqual("Title is required.");

});