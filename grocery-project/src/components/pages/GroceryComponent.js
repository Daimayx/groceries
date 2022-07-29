import * as React from 'react';
import {useNavigate} from "react-router";


export function GroceryComponent(props) {
    console.log(props.grocery)
    const grocery = props.grocery
    const navigate = useNavigate()
    const toComponentB=()=>{
        navigate('../checkout',{state:grocery});
    }
    return (
        <>
            <div className="col-md-6 col-lg-6 col-xl-4">
                <div className="card text-black">
                    <img src={grocery.image}
                         className="card-img-top" alt="Apple Computer"/>
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">{grocery.title}</h5>
                            <p className="text-muted mb-4">{grocery.price}</p>
                        </div>
                        <div className="text-center">
                            <button onClick={toComponentB}><span>Buy Now</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};