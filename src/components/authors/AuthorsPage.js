import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import List from '../common/List';
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import { toast } from 'react-toastify';

function AuthorsPage({ deleteAuthor, loadAuthors, authors, courses }) {
  
    const headers = ['id','name'];
    const title = 'Authors';
    const slug = 'author';

    useEffect(() => {
debugger;
        if(authors.length == 0) {
            loadAuthors().catch(_err => {

                console.log(_err);
            })
        }

    }, [authors.length])


    const handleDelete = (author) => {
        deleteAuthor(author).then(() => {
            toast.success('record deleted');
        }).catch(_err => {
            toast.error('record delete was failed: ' + _err);
        });
    }

    return (
            <List 
              headers={headers} 
              title={title} 
              properties={headers} 
              dataSource={authors} 
              onDelete={handleDelete}
              slug={slug}
            />
    );

}


AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired,
}

//const mapStateToProps = (state, ownProps) => {
const mapStateToProps = (state) => {

    return {
        authors: state.authors,
    };
};

const dispatchToProps = {
    
    loadAuthors,
    deleteAuthor,
};

export default connect(mapStateToProps, dispatchToProps)(AuthorsPage);