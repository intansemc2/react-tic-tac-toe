import React from 'react';
import './Board.css';

import Square from '../square/Square.js';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            isPlayerX: true,
            winner: null,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (this.winner || squares[i]) return;

        squares[i] = this.state.isPlayerX ? '🗷' : '🗹';
        this.setState({ squares: squares, isPlayerX: !this.state.isPlayerX });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.state.squares[a] &&
                this.state.squares[a] === this.state.squares[b] &&
                this.state.squares[a] === this.state.squares[c]
            ) {
                return this.state.squares[a];
            }
        }
        return null;
    }

    render() {
        let status;

        this.winner = this.calculateWinner();
        if (this.winner) {
            status = 'Winner: ' + this.winner;
        } else {
            status = `Current player: ${this.state.isPlayerX ? '🗷' : '🗹'}`;
        }

        return (
            <div>
                <div className="lead">{status}</div>

                <div className="board">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}

                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}

                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
