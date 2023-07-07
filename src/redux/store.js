import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './FriendActions'

export default configureStore({
    reducer: {
        friendCount : friendReducer
    }
})

