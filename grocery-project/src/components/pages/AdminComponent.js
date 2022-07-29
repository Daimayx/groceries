import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import AddBike from "./AddBike";



export default function AdminComponent() {
    const {logout, currentUser, getCurrentUser} = useAuth()
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
            <div className="pd-1">
                <div className="row align-content-end">
                    <button onClick={()=> navigation("../../orders")} className="btn btn-primary" >
                        View Orders
                    </button>
                </div>
                <div className="row">
                    <AddBike/>
                </div>
            </div>
        </>
    );
}