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

        {cookies.access_token?
            <Link to={"/create"} className={`rounded-md mr-8 group flex flex-row ${location.pathname==="/create"? "bg-primary":"hover:text-primary"} p-1 px-4`}>
                <PlusIcon className={`h-6 w-6 text-white ${location.pathname!="/create"?"group-hover:text-primary":""}`}/>
                <p className={`text-white ${location.pathname!="/create"?"group-hover:text-primary":""} `}>New</p>
            </Link>
            :null
        }

        {!cookies.access_token?(
            <Link to={"/auth"} className={`rounded-md flex flex-row ${location.pathname==="/auth"? "bg-primary":"hover:text-primary"} p-1 px-4`}  >
                <ArrowRightOnRectangleIcon className={`h-6 w-6 text-white`}/>
                <p className='text-white'>Login</p>
            </Link>):
            (<button onClick={logout} className='flex flex-row group'>
                <ArrowLeftOnRectangleIcon className="group-hover:text-primary  h-6 w-6 text-white"/>
                <p className='text-white group-hover:text-primary'>Logout</p>
            </button>)
        }
        </div>
    </header>
    )
}