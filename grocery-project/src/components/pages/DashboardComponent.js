import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import AddGrocery from "./AddGrocery";
import AdminComponent from "./AdminComponent";
import CustomersComponent from "./CustomerComponent";



export default function DashboardComponent() {
    const {logout, currentUser, getCurrentUser} = useAuth()
    const [isAddDestination, setIsAddDestination] = useState(false)
    const navigation = useNavigate()
    useEffect(()=>{
        getCurrentUser()
    }, [])

    console.log(currentUser)
    async function signout(e) {
        await logout();
        navigation('/')
    }
    return (<>
            <div className="min-vh-100">
            {currentUser.role==="admin"?<AdminComponent/>:<CustomersComponent/>}
            </div>
           <div className="row p-5">
               <a className="btn btn-primary" onClick={signout}>Sign out</a>
           </div>
        </>
    );
}