import React, { useContext } from 'react'
import AuthContext from '../../components/contexts/authContext'
import { useNavigate } from 'react-router-dom';


const Index = () => {
    
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={()=>{
                logout();
                navigate("/home");
            }}>
                Logout
            </button>
        </div>
    )
}

export default Index