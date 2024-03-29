import {createSlice} from '@reduxjs/toolkit'

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: '',
        id: '',
        date_joined: '',
        color: ''
    },
    reducers: {
        setState: (state, action) => {
            console.log("I have set the state", action.payload.id)
            state.name = action.payload.username
            state.id = action.payload.id
            state.date_joined = action.payload.date_joined
            state.color = action.payload.color
        }
    }
})

export const {setState} = userReducer.actions
export default userReducer.reducer