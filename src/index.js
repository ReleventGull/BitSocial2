import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('app'))
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

root.render(
    <React.StrictMode>
        <BrowserRouter>
         <App socket={socket}/>
        </BrowserRouter>
    </React.StrictMode>
)