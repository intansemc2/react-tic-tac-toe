import React from 'react';

import './Square.css';

function Square(props) {
    return (
        <button
            className={`btn btn-${props.isWinner ? 'success' : 'outline-secondary'} ${
                props.isActive || props.isWinner ? 'active' : ''
            } square`}
            onClick={props.onClick}
        >
            <div className="content">{props.value}</div>
        </button>
    );
}

export default Square;
