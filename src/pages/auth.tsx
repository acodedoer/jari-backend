import { useEffect, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { TextInput } from "../components/TextInput"

interface RegisterationDetails {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}
const RegisterForm = () => {
    const initialData:RegisterationDetails ={firstname:"", lastname:"", email:"", password:""};
    const [data, setData] = useState<RegisterationDetails>(initialData);
    const navigate = useNavigate();

    const onSubmit = async (event:React.SyntheticEvent<HTMLInputElement>) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/auth/register", data)
            .then((res)=>alert("Registration Complete! Please login using your registered credentials."))
            .then(()=> {setData(initialData)})
            .catch((err)=>alert(err.response.data.message))
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e:any) => {
      setData({...data,[e.target.name]:e.target.value})
    }

    return(
      <form onSubmit={(e:any)=>onSubmit(e)} className="flex flex-col w-full align-center">
        <TextInput
          label={"Firstname"} 
          value={data?.firstname as string} 
          handleChange={handleChange} 
          id={"firstname"} 
          name={"firstname"} 
          type={"text"} 
        />
        
        <TextInput
          label={"Lastname"} 
          value={data?.lastname as string} 
          handleChange={handleChange} 
          id={"lastname"} 
          name={"lastname"} 
          type={"text"} 
        />

        <TextInput
          label={"Email"} 
          value={data?.email as string} 
          handleChange={handleChange} 
          id={"email"} 
          name={"email"} 
          type={"email"} 
        />

        <TextInput
          label={"Password"} 
          value={data?.password as string} 
          handleChange={handleChange} 
          id={"password"} 
          name={"password"} 
          type={"password"} 
        />
        
        <div className="mb-4">
          <button
            type="submit"
            className="bg-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Register
          </button>
        </div>
      </form>
    )
}


const LoginForm = () =>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event:SubmitEvent) => {
      event.preventDefault();
      try{
          await axios.post("http://localhost:8080/auth/login", {
              email,
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
    <form onSubmit={(e:any)=>onSubmit(e)} className="flex flex-col w-full align-center">
      <div className="mb-8">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary">
          Email
        </label>
        <div className="mt-2">
          <input
              value={email} onChange={(event)=>setEmail(event.target.value)}
            id="email"
            name="email"
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
          Login
        </button>
      </div>
    </form>
  )
}

enum AuthState {
  LOGIN = 0,
  REGISTER = 1
};

export const Auth = ({setRegister, username, setUsername, password, setPassword, label, onSubmit}:any) => {
    const [authState, setAuthState] = useState<AuthState>(AuthState.LOGIN);
    return(
      <div className="w-full h-screen -top-[25px] flex flex-col items-center justify-center">
        <h2 className="text-2xl mt-4 text-primary text-center">{authState===AuthState.LOGIN?"Login":"Register"}</h2>
        <div id="registeration-form-container" className="flex flex-col w-[400px] bg-white m-4 p-4 align-center rounded-md drop-shadow-md">
           {authState===AuthState.LOGIN?<LoginForm/>:<RegisterForm/>}
            <div className="w-full flex justify-center">
              <a href="#"
                className="text-sm text-center text-secondary"
                onClick={()=>setAuthState(authState===AuthState.LOGIN?AuthState.REGISTER:AuthState.LOGIN)}
              >
                {authState===AuthState.LOGIN?"Don't have an account? Click here to register!":"Are you an existing user? Click here to login!"}
              </a>
            </div>
        </div>
        </div>
    )
}