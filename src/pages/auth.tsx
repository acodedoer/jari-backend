import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    return <Login/>
}

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event:SubmitEvent) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/auth/register", {
                username,
                password
            }).then((res)=>alert(res.data.message))
            .catch(()=>alert("Error connecting to Server!"))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <AuthForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} label={"Register"} onSubmit={onSubmit} />
    )
}

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event:SubmitEvent) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/auth/login", {
                username,
                password
            })
            .then((res)=>{
                setCookies("access_token", res && res.data.token);
                window.localStorage.setItem("jariUserID", res && res.data.userID)
                navigate("/")
            })
            .catch(({response})=>{
                if(response.status === 401) alert(response.data.message)
                else alert("Connection Error!")
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <AuthForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} label={"Login"} onSubmit={onSubmit} />
    )
}

const AuthForm = ({username, setUsername, password, setPassword, label, onSubmit}:any) => {
    return(
        <div id="registeration-form-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>

                <button type="submit">{label}</button>
            </form>
        </div>
    )
}