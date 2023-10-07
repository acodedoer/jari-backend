import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { TextInput } from "./TextInput";

export const LoginForm = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const onSubmit = async (event:SubmitEvent) => {
        event.preventDefault();
        try{
            await axios.post(`${process.env.REACT_APP_API_PATH}/auth/login`, {
                email,
                password
            })
            .then((res)=>{
                setCookies("access_token", res && res.data.token);
                window.localStorage.setItem("jariUserID", res && res.data._id)
                navigate("/")
            })
            .catch(({response})=>{
              alert(response.data.message)
            })
        }
        catch(err:any){
            alert(err.message)
        }
    }
  
    return(
      <form onSubmit={(e:any)=>onSubmit(e)} className="flex flex-col w-full align-center">
        <TextInput
          id="email"
          name="email"
          label="Email"
          type="text"
          value={email}
          handleChange={(event: any)=>setEmail(event.target.value)}
        />
  
        <TextInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          handleChange={(event:any)=>setPassword(event.target.value)}
        />
  
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