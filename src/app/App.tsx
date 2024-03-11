import s from './App.module.scss'
import {Board} from "../components/boards/Board.tsx";
import {useSelector} from "react-redux";
import {AppRootState} from "./store.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import React from "react";
import {boardsActions, BoardType} from "../components/boards/model/boardsReducer.ts";


export const App = () => {

    const boards = useSelector((state: AppRootState) => state.boards)
    const currentBoard = useSelector((state: AppRootState) => state.boards.currentBoard)
    const currentItem = useSelector((state: AppRootState) => state.boards.currentItem)
    const dispatch = useAppDispatch()

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType) {
        e.preventDefault()
        const dropId = +e.target.id
        if (currentBoard && currentItem) {
            if (currentBoard.items.length === 0) {
                board.items.push(currentItem)
            }
        }
        if (currentItem) dispatch(boardsActions.dropItem({item: currentItem, board, dropId}))
    }

    return (
        <div className={s.app}>
            {
                boards.boards.map(board => {
                    return <div key={board.id}
                                onDrop={(e) => {
                                    dropCardHandler(e, board)
                                }}>
                        <Board board={board}
                               key={board.id}/>
                    </div>
                })
            }

        </div>
    );
};

