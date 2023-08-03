import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "Messages",
    initialState: {
        arr: []
    },
    reducers: {
        setMessages: (state, action) => {
            console.log(action.payload)
            state.arr = action.payload
        }
    }
})

export const {setMessages} = messageSlice.actions
export default messageSlice.reducer