import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export default AuthContext;


const AuthContextProvider = ({ children }) => {

    const [data, setData] = useState({
        isLoggedIn: false,
        token: "",
        phoneNumber: "",
        email: "",
        username:""
    });

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const phoneNumber = localStorage.getItem("phoneNumber")
        const email = localStorage.getItem("email")
        const username = localStorage.getItem("username")

        if(token){
            setData({
                isLoggedIn: true,
                token,
                phoneNumber,
                email,
                username
            })
        }

    },[])

    const isLoggedIn = () => {
        return data.isLoggedIn;
    }

    const getToken = () => {
        return data.token;
    }

    const getPhoneNumber = () =>{
        return data.phoneNumber
    }

    const getEmail = () =>{
        return data.email
    }

    const getUsername = ()=>{
        return data.username
    }

    const login = ({token, phoneNumber, email, username}) => {
        setData({
            isLoggedIn: true,
            token: token,
            phoneNumber:phoneNumber,
            email: email,
            username: username
        });

        localStorage.setItem("token", token);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
    }

    const logout = () => {
        setData({
            isLoggedIn: false,
            token: "",
            phoneNumber: "",
            email: "",
            username: ""
        });

        localStorage.removeItem("token")
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
    }

    return (<AuthContext.Provider value={{ isLoggedIn, getToken, getPhoneNumber, getEmail, getUsername, login, logout }}>
        {children}
    </AuthContext.Provider>);
}


export { AuthContextProvider }