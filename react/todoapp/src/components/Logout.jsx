import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logout() {
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();

    setIsLoggedIn({
        ...isLoggedIn,
        'status': false,
        'username': 'unknown',
    });
    navigate('/');
}

export default Logout;