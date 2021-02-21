import React from 'react';
import './Board.css';

import Square from '../square/Square.js';

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let status;

        if (this.props.winner) {
            status = 'Winner: ' + this.props.winner;
        } else {
            status = `Current player: ${this.props.currentPlayer}`;
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
