import { useState } from "react"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import ConfirmEmail from "./ConfirmEmail"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"
import * as cognito from '../cognito'
import {useNavigate} from 'react-router-dom'
import '../index.css'



export default function Page() {
   
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("login")

  const handleSignup = async ({ username, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    setErrorMessage("")

    try {
      await cognito.signUp({ username, email, password })
      setPage("confirm")
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Error signing up")
    }
  }

  const handleConfirmEmail = async ({ username, code }) => {
    try {
      await cognito.confirmUser({ username, code })
      setPage("login")
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Error confirming email")
    }
  }

  const handleLogin = async ({username, password}) => {
    try {
      await cognito.signIn({ username, password })
      navigate("/home")
    } catch (error) {
      console.error(error)
      setErrorMessage("Error logging in")
    }
  }

  const handleForgot = async ({username}) => {
    try {
        await cognito.forgotPassword({username})
        console.log("Sent");
        setPage("resetpassword")
        setErrorMessage("")
    } catch (error){
        console.error(error)
        setErrorMessage("Username doesn't exist.")
    }
  }

  const handleReset = async ({username, code, newPassword}) => {
    try {
        await cognito.resetPassword({username, code, newPassword})
        setPage("login")
        setErrorMessage("")
    } catch (error){
        console.error(error)
        setErrorMessage("Username doesn't exist.")
    }
  }

  let currentForm = null

  switch (page) {
    case "signup":
      currentForm = <SignupForm onSubmit={handleSignup} />
      break
    case "confirm":
      currentForm = <ConfirmEmail onSubmit={handleConfirmEmail} />
      break
    case "login":
      currentForm = <LoginForm onSubmit={handleLogin} />
      break
    case "resetpassword":
      currentForm = <ResetPassword onSubmit={handleReset} />
      break
    case "forgotpassword":
      currentForm = <ForgotPassword onSubmit={handleForgot} />
      break
  }


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {currentForm}
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
      {
        page === "signup" && (
          <button onClick={() => setPage("login")}>Login</button>
        )
      }{
        page === "login" && (
          <div>
            <span className = "my-5">Don't have an account?</span> <button className = "text-blue-500" onClick={() => setPage("signup")}>Signup</button>
            <div>
                <button className = "text-blue-500 my-5" onClick={() => setPage("forgotpassword")}>Forgot your password?</button>
            </div>
          </div>
        )
      }
    </div>
  )
}