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
                    currentPlayer: '🗷',
                    winner: null,
                },
            ],

            showingHistoryIndex: 0,
        };
    }

    playAt(i) {
        // Lấy ra dữ liệu hiện tại
        const showHistoryIndex = this.state.showingHistoryIndex;
        const showHistory = this.state.history[showHistoryIndex];

        // Sao chép mảng dữ liệu
        const squares = showHistory.squares.slice();

        // Nếu đã kết thúc ván hoặc đã chọn ô thì bỏ qua
        if (showHistory.winner || squares[i]) return;

        // Gán dữ liệu mới vào ô
        let currentPlayer = showHistory.currentPlayer;
        squares[i] = currentPlayer;
        currentPlayer = currentPlayer == '🗷' ? '🗹' : '🗷';

        // Kiểm tra xem đã thắng hay chưa
        const winner = calculateWinner(squares);

        // Cập nhật lại state
        this.setState({
            // Sử dụng slide để bỏ tất cả các state sau đó (nếu có)
            history: this.state.history.slice(0, showHistoryIndex + 1).concat([
                {
                    squares: squares,
                    currentPlayer: currentPlayer,
                    winner: winner,
                },
            ]),
            showingHistoryIndex: showHistoryIndex + 1,
        });
    }

    handleClick(i) {
        this.playAt(i);
    }

    render() {
        // Lấy dữ liệu tại vị trí hiện tại
        const showHistoryIndex = this.state.showingHistoryIndex;
        const showHistory = this.state.history[showHistoryIndex];

        // Tính toán dữ liệu sẽ log ra
        const moves = this.state.history.map((step, stepIndex) => {
            const description =
                stepIndex == 0 ? 'Bắt đầu ' : `Lượt đi số #${stepIndex}, đến lượt của ${step.currentPlayer}`;

            return (
                <li
                    className={`list-group-item history-select ${
                        this.state.showingHistoryIndex == stepIndex ? 'active' : ''
                    }`}
                    key={stepIndex}
                    onClick={() => this.setState({ showingHistoryIndex: stepIndex })}
                >
                    {description}
                </li>
            );
        });

        // Tính toán trạng thái (thắng / thua)
        let status;

        if (showHistory.winner) {
            status = 'Người chiến thắng: ' + showHistory.winner;
        } else {
            status = `Người chơi hiện tại: ${showHistory.currentPlayer}`;
        }

        // Render ra kết quả
        return (
            <div className="container game">
                <div className="row m-3">
                    <div className="col-12">
                        <div className="display-4">Tic Tac Toe</div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
                        <Board
                            squares={showHistory.squares}
                            currentPlayer={showHistory.currentPlayer}
                            winner={showHistory.winner}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <div className="lead d-flex justify-content-between align-items-center">
                            <div>{status}</div>
                            <i class="small">2 người chơi</i>
                        </div>
                        <ol className="list-group">{moves}</ol>
                    </div>
                </div>

                <br />

                {this.state.history.length > 1 ? (
                    <div className="row justify-content-end">
                        <div className="">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    this.setState({
                                        history: this.state.history.slice(0, 1),
                                        showingHistoryIndex: 0,
                                    });
                                }}
                            >
                                Xóa hết
                            </button>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default Game;
