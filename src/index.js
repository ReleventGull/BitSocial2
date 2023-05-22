import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <BrowserRouter>
         <App />
        </BrowserRouter>
    </React.StrictMode>
)