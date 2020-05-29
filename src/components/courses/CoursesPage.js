import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {

    state = {
        redirectToAddCoursePage: false,
    }

    componentDidMount() {

        debugger;
        const { courses, authors, actions } = this.props;

        if(courses.length === 0) {
            actions.loadCourses().catch(_error => {
                alert('error while loading courses. detail: ' + _error);
            });
        }

        if(authors.length === 0) {
            actions.loadAuthors().catch(_error => {
                alert('error while loading authors. detail: ' + _error);
            })
        }
    }

    handleDeleteCourse = async (_course) => {

        try { 
            await this.props.actions.deleteCourse(_course);
            toast.success("record is deleted");
        } 
        catch (error) { 
            toast.error("delete failed. " + error.message, { autoClose: false }); 
        }
        
    };

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course"/>}

                <h2>Courses</h2>

                {
                    this.props.loading 
                        ? <Spinner />
                        : (
                            <>
                                <button
                                    style={{ marginBottom: 20 }}
                                    className="btn btn-primary add-course"
                                    onClick={() => this.setState({ redirectToAddCoursePage: true, })}
                                >
                                Add Course
                                </button>
            
                                {
                                    this.props.courses.length > 0 &&

                                    <CourseList 
                                    courses={this.props.courses} 
                                    onDeleteClick={this.handleDeleteCourse}
                                    />
                                }
                                
                            </>
                        )
                }
            </>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 
            ? [] 
            : state.courses.map(_course => {
            return {
                ..._course,
                authorName: state.authors.find(_author => _author.id === _course.authorId).name,
            };
        }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
