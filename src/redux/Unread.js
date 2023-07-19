import { createSlice } from '@reduxjs/toolkit'

export const unRead = createSlice ({
    name: "UnreadCount",
    initialState: {
        count: 0
    },
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload
        },
        increaseCount: (state) => {
            state.count += 1
        },
        decreaseCount: (state) => {
            state.count -=1
        },

        deleteCount: (state) => {
            state.count = 0
        }
    }
})

export const {setCount, increaseCount, decreaseCount, deleteCount} = unRead.actions
export default unRead.reducer