import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { ArrowRightOnRectangleIcon, PlusIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = () => {
        setCookies("access_token","");
        window.localStorage.setItem("jariUserID","");
        navigate("./auth")
    }

    return(
    <header className='w-full fixed flex flex-row justify-between p-3 px-8 bg-secondary z-50'>
            <Link to={"/"} className={`text-white rounded-md ${location.pathname==="/"? "bg-primary":"hover:text-primary"} p-1 px-4`}>jari</Link>
        <div className="flex flex-row justify-center items-center">
        {cookies.access_token?<Link to={"/create"} ><PlusIcon className={`rounded-md h-6 w-6 text-white mr-8 ${location.pathname==="/create"? "bg-primary":"hover:text-primary"}`}/></Link>:null}
            {!cookies.access_token?(<Link to={"/auth"}  ><ArrowRightOnRectangleIcon className={`rounded-md ${location.pathname==="/auth"? "bg-primary":"hover:text-primary"} h-6 w-6 text-white`}/></Link>):(<ArrowLeftOnRectangleIcon onClick={logout} className="rounded-md hover:text-primary  h-6 w-6 text-white"/>)}
        </div>
    </header>
    )
}