import * as React from 'react';
import {useNavigate} from "react-router";


export function BikeComponent(props) {
    console.log(props.bike)
    const bike = props.bike
    const navigate = useNavigate()
    const toComponentB=()=>{
        navigate('../checkout',{state:bike});
    }
    return (
        <>
            <div className="col-md-6 col-lg-6 col-xl-4">
                <div className="card text-black">
                    <img src={bike.image}
                         className="card-img-top" alt="Apple Computer"/>
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">{bike.title}</h5>
                            <p className="text-muted mb-4">{bike.desc}</p>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <span>Price Per Day: </span><span>${bike.pricePerDay}/Per day</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Price Per Week: </span><span>${bike.pricePerWeek}/Per week</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Location: </span><span>{bike.location}</span>
                            </div>

                        </div>
                        <div className="text-center">
                            <button onClick={toComponentB}><span>Order Now</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};