import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './FriendActions'
import unReadReducer from './Unread'

export default configureStore({
    reducer: {
        friendCount : friendReducer,
        unreadCount: unReadReducer
    }
})

