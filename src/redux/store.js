import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './FriendActions'
import unReadReducer from './Unread'
import chatState from './ChatAction'
import userReducer from './UserAction'
import messageReducer from './MessageAction'
export default configureStore({
    reducer: {
        friendCount : friendReducer,
        unreadCount: unReadReducer,
        chat: chatState,
        user: userReducer,
        messages: messageReducer
    }
})

