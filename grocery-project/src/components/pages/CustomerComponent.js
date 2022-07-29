import React, {Component, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {getMyOrders} from "../../context/Database";
import {BikeComponent} from "./BikeComponent";


export default function CustomersComponent() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getMyOrders().then(res => {
            res.data.forEach(val => {
                const bike = {
                    id: val.bike._id.toString(),
                    title: val.bike.title,
                    location: val.bike.location,
                    desc: val.bike.description,
                    image: val.bike.img,
                    pricePerWeek: val.bike.pricePerWeek,
                    pricePerDay: val.bike.pricePerDay
                }
                const order = {
                    id: val._id,
                    bike: bike,
                    city: val.city,
                    country: val.country,
                    paymentMethod: val.paymentMethod,
                    postalCode: val.postalCode,
                    province: val.province,
                    street: val.street,
                    status: val.status,
                }
                console.log(order)
                console.log(orders)
                setOrders(orders => [...orders, order])
            })
        })
    }, [])

    return (
        <div className="min-vh-100">
            <div className=" card-body text-center">Orders</div>
            <div className="container-fluid">
                {
                    orders.map((order) => {
                        return <div className="card m-1">
                            <div className="card-header">
                                {order.bike.title}
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Street</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputEmail3"
                                                   placeholder={order.street} disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">City</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputEmail3"
                                                   placeholder={order.city} disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Postal Code</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputEmail3"
                                                   placeholder={order.postalCode} disabled/>
                                        </div>
                                    </div>



                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Status</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputEmail3"
                                                   placeholder={order.status} disabled/>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}
