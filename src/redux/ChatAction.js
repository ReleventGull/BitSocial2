import { createSlice } from '@reduxjs/toolkit'

export const chatStateSlice = createSlice({
    name: "chatState",
    initialState: {
        arr: []
    },
    reducers: {
        setChats: (state, action) => {
            state.arr = action.payload
        },
        addChat: (state, action) => {
            state.arr.push(action.payload)
        }
    }
})

export const {setChats} = chatStateSlice
export default chatStateSlice.reducer