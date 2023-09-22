import { useState } from "react"
import { AuthState } from "../types"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"

export const Auth = () => {
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