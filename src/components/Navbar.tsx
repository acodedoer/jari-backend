import {Link, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => {
        setCookies("access_token","");
        window.localStorage.setItem("jariUserID","");
        navigate("./auth")
    }

    return(
    <header className='w-full fixed flex flex-row justify-center p-3 bg-secondary'>
        <div className="w-6/12 flex flex-row justify-around">
            <Link to={"/"} className='text-white rounded-md hover:text-white bg-primary p-1'>Home</Link>
            <Link to={"/create"} className='text-white rounded-md hover:text-primary p-1' >Add Saying</Link>
            <Link to={"/view"} className='text-white rounded-md hover:text-primary p-1' >View Sayings</Link>
            {!cookies.access_token?(<Link to={"/auth"} className='text-white rounded-md hover:text-primary p-1' >Login/Register</Link>):<button onClick={logout}>Logout</button>}
        </div>
    </header>
    )
}