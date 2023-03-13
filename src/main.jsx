import React from 'react'
import ReactDOM from 'react-dom/client'
import {AuthProvider} from './Auth/AuthContext'
import App from "./App"
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
