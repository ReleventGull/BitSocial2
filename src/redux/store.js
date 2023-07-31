import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './FriendActions'
import unReadReducer from './Unread'
import chatState from './ChatAction'
import userReducer from './UserAction'
export default configureStore({
    reducer: {
        friendCount : friendReducer,
        unreadCount: unReadReducer,
        chat: chatState,
        user: userReducer
    }
})

