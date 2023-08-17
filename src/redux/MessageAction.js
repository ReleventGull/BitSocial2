import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "Messages",
    initialState: {
        arr: [],
        color: ''
    },
    reducers: {
        setMessages: (state, action) => {
            console.log(action.payload.messages)
            state.arr = action.payload.messages
            state.color = action.payload.color
        },
        addMessage: (state, action) => {
            state.arr.push(action.payload)
        }
    }
})

export const {setMessages,addMessage} = messageSlice.actions
export default messageSlice.reducer