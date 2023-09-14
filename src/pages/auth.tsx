import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    const[register, setRegister] = useState(false);

    return (
        <div className="w-full h-screen -top-[25px] flex flex-col items-center justify-center">
            {register? 
                <Register setRegister={setRegister}/>
                :<Login setRegister={setRegister}/>
            }
        </div>
    )
}

const Register = ({setRegister}:any) => {
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
        <AuthForm setRegister={setRegister} username={username} password={password} setPassword={setPassword} setUsername={setUsername} label={"Register"} onSubmit={onSubmit} />
    )
}

const Login = ({setRegister}:any) => {
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
        <AuthForm setRegister={setRegister} username={username} password={password} setPassword={setPassword} setUsername={setUsername} label={"Login"} onSubmit={onSubmit} />
    )
}

const AuthForm = ({setRegister, username, setUsername, password, setPassword, label, onSubmit}:any) => {
    return(
        <>
        <h2 className="text-2xl mt-4">{label}</h2>
        <div id="registeration-form-container" className="flex flex-col w-[400px] bg-white m-4 p-4 align-center rounded-md drop-shadow-md">
            <form onSubmit={onSubmit} className="flex flex-col w-full align-center">
            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary">
                Username
              </label>
              <div className="mt-2">
                <input
                    value={username} onChange={(event)=>setUsername(event.target.value)}
                  id="usernam"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-secondary shadow-sm ring-1 ring-background placeholder:text-background sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                    value={password} onChange={(event)=>setPassword(event.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-secondary shadow-sm ring-1 ring-background placeholder:text-background sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                {label}
              </button>
            </div>
            </form>
            <p className="text-center mb-4">or</p>
            <div>
              <button
                onClick={()=>setRegister(label==="Register"?false:true)}
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                {label==="Register"?"Login":"Register"}
              </button>
            </div>
        </div>
        </>
    )
}