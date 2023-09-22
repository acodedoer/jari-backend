import axios from "axios";
import { useState } from "react";
import { TextInput } from "./TextInput";
import { RegisterationDetailsInterface } from "../types";

export const RegisterForm = () => {
    const initialData:RegisterationDetailsInterface ={firstname:"", lastname:"", email:"", password:""};
    const [data, setData] = useState<RegisterationDetailsInterface>(initialData);

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