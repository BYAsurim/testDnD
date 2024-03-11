import {configureStore} from '@reduxjs/toolkit'
import {boardsReducer} from "../components/boards/model/boardsReducer.ts";

export const store = configureStore({
    reducer: {
        boards:boardsReducer
    },
})


export type AppRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch