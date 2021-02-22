import React from 'react';
import './Board.css';

import Square from '../square/Square.js';

function Board(props) {
    return (
        <div className="board w-100">
            {props.squares.map((square, i) => {
                let isWinner = props.winner ? props.winner.winKeys.includes(i) : false;
                let isActive = props.selectedAt || props.selectedAt === 0 ? props.selectedAt == i : false;
                return (
                    <Square
                        key={i}
                        value={square}
                        onClick={() => props.onClick(i)}
                        isWinner={isWinner}
                        isActive={isActive}
                    />
                );
            })}
        </div>
    );
}

export default Board;
