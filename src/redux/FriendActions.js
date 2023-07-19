import { createSlice } from '@reduxjs/toolkit'

export const friendRequestSlice = createSlice({
    name: "friendRequest",
    initialState : {
       count: 0,
       arr: []
    },
    reducers: {
        setRequest: (state, action) => {
            state.arr = action.payload.requests
            state.count = action.payload.count
        },
        addRequest: (state, action) => {
            state.arr = [action.payload, ...state.arr]
            state.count += 1
        },
        removeRequest: (state, action) => {
            for(let i = 0; i < state.arr.length; i++) {
                if (state.arr[i].id == action.payload) {
                    state.arr.splice(i, 1)
                }
            }
            state.count -= 1
        },
        //delete
        //accept
    }
})
export const {setRequest, addRequest, removeRequest} = friendRequestSlice.actions
export default friendRequestSlice.reducer