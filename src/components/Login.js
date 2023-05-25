import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from '../api/users'
const Login = ({setToken, token}) => {
    const [action, setAction] = useState('register')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
   
    useEffect(() => {
        if(token) {
            navigate('/')
        }
    })
    useEffect(() => {
        setUsername('')
        setPassword('')
        setPassword2('')
        setErrorMessage('')
    }, [action])

    const loginUser = async() => {
        console.log("Did this work")
        const response = await login({username: username, password: password})
        console.log(response)
        if(response.error) {
            setErrorMessage(response.message)
        }else {
            setToken(response.token)
            window.localStorage.setItem('token', response.token)
        }
        
    }
    const registerUser = () => {
        console.log('hi but in register')
    }
    return (
        <div className="loginPage">
                <div className="loginContainer">
                    <div className="loginTop1">
                        <h1>Welcome</h1>
                    </div>  
                    <div className="formLogin">
                        <div className="inputBox">
                            <label>Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="inputBox">
                            <label>Password</label>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div> 
                        {action !== 'register' ? null:
                        <div className="inputBox">
                            <label>Confirm Password</label>
                            <input type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                        </div> 
                        }
                        <h3 className='errorMessage'>{errorMessage}</h3>
                        <button  onClick={action == 'register' ? registerUser : loginUser} className="loginButton">{action !== 'register' ? "Login" : "Register"}</button>
                        <div className="loginRegisterSwitch">   
                            <h3>{action !== 'register' ? "Don't have an account?" : "Already have an account?"}</h3>
                            <button onClick={() => {action == 'register' ? setAction('login') : setAction('register')}} className="switchRegisterButton">{action !== 'register' ? "Register" : "Login"}</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Login