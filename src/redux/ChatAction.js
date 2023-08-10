import { createSlice } from '@reduxjs/toolkit'
import { getChatById } from '../api/chat'
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
        },
        removeChat: (state, action) => {
            for(let i = 0; i < state.arr.length; i++) {
                if(action.payload == state.arr[i].id) {
                    state.arr.splice(i, 1)
                }
            }
        },
        increaseUnreadMessage: (state, action) => {
            for(let i = 0; i < state.arr.length; i++) {
                if (action.payload == state.arr[i].id){
                    state.arr[i].count ++
                }
            }
        },
        setToRead: (state, action) => {
            for(let i = 0; i < state.arr.length; i++) {
                if (action.payload == state.arr[i].id){
                    state.arr[i].count = 0 
                }
            }
        },
        shiftToTop: (state, action) => {
            for(let i = 0; i < state.arr.length; i++) {
                if(action.payload == state.arr[i].id) {
                    const chat = state.arr.splice(i, 1)
                    state.arr.unshift(chat[0])
                }
            }
        },
    }
})

export const {checkForExisting, setChats, addChat, removeChat, increaseUnreadMessage, setToRead, shiftToTop} = chatStateSlice.actions
export default chatStateSlice.reducer