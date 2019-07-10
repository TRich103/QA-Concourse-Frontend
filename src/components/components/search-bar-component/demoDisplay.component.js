import React, { Component } from 'react';
import ReactTable from "react-table";
import PropTypes from "prop-types";

const Display = ({results = []}) => (
    <div>
        {results.map(result => {
            result = JSON.stringify(result)
            return(
                <span key={result}>{result}<br/></span>
            )
        })

        }
    </div>
)

Display.propTypes = {
    results: PropTypes.array
}

export default Display;


