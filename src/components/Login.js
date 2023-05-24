import {useState} from 'react'

const Login = () => {
    const [action, setAction] = useState('register')
    return (
        <div className="loginPage">
                <div className="loginContainer">
                    <div className="loginTop1">
                        <h1>Welcome</h1>
                    </div>  
                    <div className="formLogin">
                        <div className="inputBox">
                            <label>Username</label>
                            <input></input>
                        </div>
                        <div className="inputBox">
                            <label>Password</label>
                            <input></input>
                        </div> 
                        {action !== 'register' ? null:
                        <div className="inputBox">
                            <label>Confirm Password</label>
                            <input></input>
                        </div> 
                        }
                        <button className="loginButton">{action !== 'register' ? "Login" : "Register"}</button>
                        <div className="loginRegisterSwitch">   
                            <h3>{action !== 'register' ? "Don't have an account?" : "Already have an account?"}</h3>
                            <button onClick={() => {action == 'register' ? setAction('login') : setAction('register')}}className="switchRegisterButton">{action !== 'register' ? "Register" : "Login"}</button>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default Login