import React from 'react';
import './Game.css';

import Board from '../board/Board.js';
import calculateWinner from '../helpers/calculate-winner.js';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            currentPlayer: '🗷',
            winner: null,
        };
    }

    handleClick(i) {
        const lastHistoryIndex = this.state.history.length - 1;
        const lastHistory = this.state.history[lastHistoryIndex];

        const squares = lastHistory.squares.slice();

        if (this.state.winner || squares[i]) return;

        let currentPlayer = this.state.currentPlayer;
        squares[i] = currentPlayer;
        currentPlayer = currentPlayer == '🗷' ? '🗹' : '🗷';

        this.setState({
            history: this.state.history.concat([
                {
                    squares: squares,
                },
            ]),
            currentPlayer: currentPlayer,
        });
    }

    render() {
        const lastHistoryIndex = this.state.history.length - 1;
        const lastHistory = this.state.history[lastHistoryIndex];

        this.state.winner = calculateWinner(lastHistory.squares);

        return (
            <div className="container game">
                <div className="row">
                    <div className="col-sm-12 col-md-6 game-board">
                        <Board
                            squares={lastHistory.squares}
                            currentPlayer={this.state.currentPlayer}
                            winner={this.state.winner}
                            onClick={(i) => this.handleClick(i)}
                        />
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
