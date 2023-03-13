import {useState, useEffect} from 'react'
import * as cognito from './cognito'
import {useNavigate} from 'react-router-dom'
import AuthPage from './Auth/Page'
import TodoHomepage from './Todo/TodoHomepage'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import './index.css'





export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<AuthPage/>}/>
        <Route path = "/home" element = {<TodoHomepage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
