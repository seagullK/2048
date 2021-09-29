import React, {useEffect, useState } from "react";
// import { View, StyleSheet, Text, Dimensions } from "react-native";
// import GestureRecognizer, {
//     swipeDirections
// } from "react-native-swipe-gestures";

import {
    generateRandom,
    getEmptyBoard,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    checkWin,
    isOver,
} from "./GameBoard";
import Modal from "./Modal/Modal";

// import Cell from "./Cell";
//
// var width = Dimensions.get("window").width;

const Cell = ({ number }) => {
    return (
        <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
    );
};

const GameController = () => {
    const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
    const [modalActive, setModalActive] = useState(false);
    const [textMessage, updateText] = useState('');
    // const [points, score] = useState(0);

    const checkEndGame = () => {
        if (checkWin(board)) {
            // let text = document.getElementsByClassName("gameMessage");
            // text.style.visibility = "visible";
            updateText('You win!');
            setModalActive(true);
            // console.log("You win!");
        } else if (isOver(board)) {
            updateText('Game over!');
            setModalActive(true);
            // alert('Game over!');
            // newGame();
            // console.log("Game over!");
        }
    };

    const newGame = () => {
        updateBoard(generateRandom(getEmptyBoard()));
        setModalActive(false);
        // score(0);
    };

    const hasDiff = (board, updatedBoard) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== updatedBoard[i][j]) {
                    return true;
                }
            }
        }
        return false;
    };

    const left = () => {
        const newBoard = moveLeft(board);
        //score(points+2);
         if (!hasDiff(board, newBoard)) {
             checkEndGame();
             return;
         }
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const right = () => {
        const newBoard = moveRight(board);
        if (!hasDiff(board, newBoard)) {
            checkEndGame();
            return;
        }
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const up = () => {
        const newBoard = moveUp(board);
        if (!hasDiff(board, newBoard)) {
            checkEndGame();
            return;
        }
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const down = () => {
        const newBoard = moveDown(board);
        if (!hasDiff(board, newBoard)) {
            checkEndGame();
            return;
        }
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                up();
                break;
            case "ArrowDown":
                down();
                break;
            case "a":
                left();
                break;
            case "d":
                right();
                break;
            case "w":
                up();
                break;
            case "s":
                down();
                break;

            default:
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });



    return (
        <>
            <div className="heading">
                <p>2048</p>
                {/*<div className="score">*/}
                {/*    <p>SCORE</p>*/}
                {/*    <p>{points}</p>*/}
                {/*</div>*/}
            </div>
            <div className="aboutGame">
                <p>Join the numbers and get to the 2048 tile!</p>
                <button type="button" className="btn nav-btn-red" onClick={newGame}>New Game</button>
            </div>
            <div className="game-board">
                {/*<div className="gameMessage">*/}
                {/*    <p>Game over!</p>*/}
                {/*</div>*/}
                <div>
                    {board.map((row, i) => {
                        return (
                            <div key={`row-${i}`} className="row">
                                {row.map((cell, j) => (
                                    <Cell key={`cell-${i}-${j}`} number={cell} />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>{textMessage}</p>
                <button onClick={newGame} >Try again</button>
            </Modal>

        </>
    );

};

export default GameController;