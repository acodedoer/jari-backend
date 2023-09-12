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
        <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Add Saying</Link>
            <Link to={"/view"}>View Sayings</Link>
            {!cookies.access_token?(<Link to={"/auth"}>Login/Register</Link>):<button onClick={logout}>Logout</button>}
        </div>
    )
}