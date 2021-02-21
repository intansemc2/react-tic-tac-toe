import React from 'react';
import './Game.css';

import Board from '../board/Board.js';

class Game extends React.Component {
    render() {
        return (
            <div className="container game">
                <div className="row">
                    <div className="col-sm-12 col-md-6 game-board">
                        <Board />
                    </div>

                    <div className="col-sm-12 col-md-6 game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
