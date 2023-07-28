import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './FriendActions'
import unReadReducer from './Unread'
import chatState from './ChatAction'

export default configureStore({
    reducer: {
        friendCount : friendReducer,
        unreadCount: unReadReducer,
        chat: chatState
    }
})

