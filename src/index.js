import ReactDOM from 'react-dom/client'
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('app'))



root.render(
         <Provider store={store}>
        <BrowserRouter>
         <App />
        </BrowserRouter>
        </Provider>  
)