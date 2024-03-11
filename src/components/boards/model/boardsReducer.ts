import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const initialState = {
    currentBoard: null as BoardType | null,
    currentItem: null as ItemType | null,
    boards: [
        {
            id: 1, title: 'users', items: [
                {id: 1, name: "John"},
                {id: 2, name: "Alice"},
                {id: 3, name: "Michael"},
                {id: 4, name: "Emily"}
            ]
        },
        {
            id: 2, title:
                'mentors', items:
                [
                    {id: 101, name: "David"},
                    {id: 102, name: "Sophia"},
                    {id: 103, name: "Oliver"},
                    {id: 104, name: "Emma"},
                ]
        },
        {
            id: 3, title:
                'Programmer', items:
                [
                    {id: 201, name: "Daniel"},
                    {id: 202, name: "Isabella"},
                    {id: 203, name: "Liam"},
                    {id: 204, name: "Ava"},
                ]
        }
    ] as BoardType[]
}


export const slice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setCurrentBoard: (state, action: PayloadAction<{ currentBoard: BoardType | null }>) => {
            state.currentBoard = action.payload.currentBoard
        },
        setCurrentItem: (state, action: PayloadAction<{ currentItem: ItemType | null }>) => {
            state.currentItem = action.payload.currentItem
        },
        dropItem: (state, action: PayloadAction<{ board: BoardType, item: ItemType, dropId: number }>) => {

            if (state.currentBoard && state.currentItem) {
                const board = state.boards.find(b => b.id === state.currentBoard?.id)
                if (board) {
                    const currentIndex = board.items.findIndex((i: ItemType) => i.id === action.payload.item.id)
                    board.items.splice(currentIndex, 1)
                }
                const dropBoard = state.boards.find(b => b.id === action.payload.board.id)
                if (dropBoard) {
                    const dropIndex = dropBoard.items.findIndex(i => i.id === action.payload.dropId)
                    dropBoard.items.splice(dropIndex, 0, action.payload.item)
                }
                state.currentBoard = null
                state.currentItem = null
            }
        }
    }
})

export const boardsActions = slice.actions;
export const boardsReducer = slice.reducer

//types
export type BoardType = {
    id: number
    title: string
    items: ItemType[]
}
export type ItemType = {
    id: number
    name: string
}