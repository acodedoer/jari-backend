import {Link} from 'react-router-dom'
export const Navbar = () => {
    return(
        <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Add Saying</Link>
            <Link to={"/view"}>View Sayings</Link>
            <Link to={"/auth"}>Login/Register</Link>

        </div>
    )
}