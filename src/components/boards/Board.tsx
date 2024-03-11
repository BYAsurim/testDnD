import s from "../../app/App.module.scss";
import {Item} from "./item/Item.tsx";
import {boardsActions, BoardType, ItemType} from "./model/boardsReducer.ts";
import React from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

type Props = {
    board: BoardType,
}
export const Board = ({board}: Props) => {
    const dispatch = useAppDispatch()

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()

    }

    function dragStarthandler(board: BoardType, item: ItemType) {
        dispatch(boardsActions.setCurrentBoard({currentBoard: board}))
        dispatch(boardsActions.setCurrentItem({currentItem: item}))
    }

    return (
        <div className={s.root}>
            <h3 className={s.title}>
                {board.title}:
            </h3>
            {board.items.map((item: ItemType) => {
                return <div key={item.id}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragStart={() => dragStarthandler(board, item)}
                            draggable={true}
                >
                    <Item key={board.id} item={item}/>
                </div>
            })}
        </div>)
};

