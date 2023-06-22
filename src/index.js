import ReactDOM from 'react-dom/client'
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('app'))



root.render(

        <BrowserRouter>
         <App />
        </BrowserRouter>

)