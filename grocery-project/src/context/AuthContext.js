import React, {useContext, useState, useEffect} from "react"
import axios from "axios";

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/user",
        }).then ( (res) => {
            console.log(res)
            setCurrentUser(res.data.user)
        })
    }, [1])

    function signup(username, password, role) {
        return axios({
            method: "POST",
            data: {
                username: username,
                password: password,
                role: role,
            },
            withCredentials: true,
            url: "http://localhost:4000/register",
        })
    }

    function login(username, password) {
        return axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        })
    }
    async function getCurrentUser(){
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/user",
        }).then ( (res) => {
            console.log(res)
            setCurrentUser(res.data.user)
        })
    }

    function addText(text) {

        const value = {
            "title": text,
            complete: false
        }
    }


    function logout() {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:4000/logout",
        }).then ( (res) => {
            setCurrentUser(res.data.user)
        })
    }

    function resetPassword(email) {

    }


    useEffect(() => {
        /*const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
*/
        //return unsubscribe
    }, [])

    const value = {
        currentUser,
        setCurrentUser,
        getCurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        addText,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}