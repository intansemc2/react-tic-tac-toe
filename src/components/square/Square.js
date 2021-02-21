import React from 'react';

import './Square.css';

function Square(props) {
    return (
        <button className="btn btn-outline-secondary square" onClick={props.onClick}>
            <div className="content">{props.value}</div>
        </button>
    );
}

export default Square;
