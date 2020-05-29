import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm'; 
import { newCourse } from "../../../tools/mockData";
import Spinner from './../common/Spinner';

export function ManageCoursePage ({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {

    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if(courses.length === 0) {
            loadCourses().catch(_error => {
                alert('error while loading courses. detail: ' + _error);
            });
        }
        else {
            setCourse({ ...props.course });
        }

        if(authors.length === 0) {
            loadAuthors().catch(_error => {
                alert('error while loading authors. detail: ' + _error);
            })
        }

    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse((_prevState) => ({
            ..._prevState,
            [name]: name === 'authorId' ? parseInt(value, 10) : value,
        }));
    }
    
    function handleSave(event) {
        event.preventDefault();

        if(formIsValid() == false) {
            return;
        }
        
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('course saved.');
            history.push('/courses');
        }).catch(_error => {
            setSaving(false);
            setErrors({ onSave: _error.message });
        });
    }

    function formIsValid() {

        const { title, authorId, category } = course;
        const errors = {};

        if(!title) {
            errors.title = "Title is required.";
        }

        if(!authorId) {
            errors.author = "Author is required.";
        }

        if(!category) {
            errors.category = "Category is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }
    debugger;

    return (
        props.match.params.slug && (authors.length === 0 || courses.length === 0)
            ? <Spinner />
            : (
                <CourseForm 
                    course={course} 
                    authors={authors} 
                    errors={errors} 
                    onChange={handleChange} 
                    onSave={handleSave}
                    saving={saving}
                />
            )
    );
}

ManageCoursePage.propTypes = {
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired, 
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export function getCourseBySlug(courses, slug) {
    return courses.find(_course => _course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {

    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;

    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadAuthors,
    loadCourses,
    saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
