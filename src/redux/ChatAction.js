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
        }
    }
})

export const {setChats, addChat, removeChat, increaseUnreadMessage, setToRead} = chatStateSlice.actions
export default chatStateSlice.reducer