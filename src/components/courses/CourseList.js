import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th />
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {courses.map(_course => {
            return (
                <tr key={_course.id}>
                    <td>
                        <a
                        className="btn btn-light"
                        href={"http://pluralsight.com/courses/" + _course.slug}
                        >
                        Watch
                        </a>
                    </td>
                    <td>
                        <Link to={"/course/" + _course.slug}>{_course.title}</Link>
                    </td>
                    <td>{_course.authorName}</td>
                    <td>{_course.category}</td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => onDeleteClick(_course)}>
                        Delete
                        </button>
                    </td>
                </tr>
            );
            })}
        </tbody>
    </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
