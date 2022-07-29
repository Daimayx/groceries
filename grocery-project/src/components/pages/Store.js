import React, {createRef, useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getBikes, searchByLocation} from "../../context/Database";
import bicycles from "../pictures/bicycles.jpg"
import "../css/search.css"
import {BikeComponent} from "./BikeComponent";

export default function Store() {
    const [bikes, setBikes] = useState([])
    const location = useLocation()
    const [load, setLoading] = useState(1)
    useEffect(() => {
        setBikes([])
        getBikes().then(res => {
            res.data.forEach(data => {
                console.log(data)
                const bike = {
                    id: data._id.toString(),
                    title: data.title,
                    location: data.location,
                    desc: data.description,
                    image: data.img,
                    pricePerWeek: data.pricePerWeek,
                    pricePerDay: data.pricePerDay
                }
                setBikes(bikes => [...bikes, bike])
            })
        })
    }, [load])

    const searchBtnClicked = (event) => {
        event.preventDefault()
        const query = event.target[0].value
        searchByLocation(query).then(res => {
            // removing previous data
            setBikes([])
            console.log(res)
            res.data.forEach(data => {
                console.log(data)
                const bike = {
                    id: data._id.toString(),
                    title: data.title,
                    location: data.location,
                    desc: data.description,
                    image: data.img,
                    pricePerWeek: data.pricePerWeek,
                    pricePerDay: data.pricePerDay
                }
                // adding searched result
                setBikes(bikes => [...bikes, bike])
        })
    })
    }



    console.log(bikes)

    return (
        <div>

            <div className="container-fluid">
                <div className="row" style={{backgroundColor: "yellow"}}>
                    <div className="col-sm p-5" style={{minHeight: "70vh"}}>
                        <div style={{width: "40%", fontSize: "3rem", fontFamily: "'Gideon Roman', cursive"}}>
                            Life is a <b style={{fontSize: "1.2em"}}>Shared</b> Ride
                        </div>
                        <div>
                            <div className="input-group ps-5">
                                <div className="container">
                                    <br/>
                                    <div className="row justify-content-center">
                                        <div >
                                            <form className="card mt-5" onSubmit={searchBtnClicked}>
                                                <div className="card-body row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <i className="fas fa-search h4 text-body"/>
                                                    </div>
                                                    <div className="col mx-2">
                                                        <input
                                                            className="form-control form-control-lg form-control-borderless"
                                                            type="search" list="brow" placeholder="Search Location"/>
                                                        <datalist id="brow">
                                                            <option value="Riyad"/>
                                                            <option value="Dubai"/>
                                                        </datalist>
                                                    </div>

                                                    <div className="col-auto">
                                                        <button className="btn btn-lg btn-success"
                                                                type="submit">Search</button>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm align-content-center p-0" style={{minHeight: "70vh"}}>
                        <img width="70%" height="80%" src={bicycles}
                             style={{marginTop: "5%", marginLeft: "14%", borderRadius: "100px 0 100px 0"}}/>
                    </div>
                </div>
            </div>

            <div className="p-2 row py-4">
                {bikes.map((bike) => {
                    return <BikeComponent key={bike.id} bike={bike}/>
                })}
            </div>
        </div>
    );
}