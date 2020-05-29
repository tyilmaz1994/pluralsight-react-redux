import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function List(props) {

    return (
        <>
            <h2>{props.title}</h2>
            
            {
                props.dataSource.length !== 0 && <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        {props.headers.map(_header => { 
                            return (
                                <th key={_header}>{_header}</th>
                            );
                        })}
                    
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dataSource.map(_data => {
                            return (
                                <tr key={_data.id}>
                                    {
                                        props.properties.map(_prop => {
                                            return (
                                                <td key={_prop}> {_data[_prop]} </td>
                                            );
                                        })
                                    }
                                    <td style={{width: '1px'}}>
                                        <button className="btn btn-outline-danger" onClick={() => props.onDelete(_data)}>Delete</button>
                                    </td>
                                    <td style={{width: '1px'}}>
                                        <Link className="btn btn-outline-info" to={'/' + props.slug + '/' + _data.id} >Edit</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            }
        </>
    );
}

export default List;


List.propTypes = {
    title: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
}