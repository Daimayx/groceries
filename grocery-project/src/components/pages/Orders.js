import React, {Component, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {getOrders, acceptOrder, declineOrder} from "../../context/Database";
import {GroceryComponent} from "./GroceryComponent";

export default function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then(res => {
            res.data.forEach(val => {
                const order = {
                    id: val._id,
                    grocery: val.groceries,
                    city: val.city,
                    country: val.country,
                    paymentMethod:val.paymentMethod,
                    postalCode:val.postalCode,
                    province:val.province,
                    street:val.street,
                    user: val.user,
                    status: val.status,
                }
                console.log(order)
                console.log(orders)
                setOrders(orders => [...orders, order])
            })
        })
    }, [])

    function acceptBtnClicked(order) {
        acceptOrder(order.id).then(res => {
            console.log(res)
            alert("Order accepted")
            window.location.reload(false);
        })
    }

    function declineBtnClicked(order) {
        declineOrder(order.id).then(res => {
            alert("Order declined")
            window.location.reload(false);
        })
    }

    return (
        <div className="min-vh-100">
        <div className=" card-body text-center">Orders</div>
        <div className="container-fluid">
            {
             orders.map((order) => {
                 return <div className="card m-1">
                         <div className="card-header">
                             Grocery: {order.grocery.title}
                             <br/>
                             Ordered By: {order.user}
                         </div>
                         <div className="card-body">
                             <form onSubmit={(event) => event.preventDefault()}>
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
                                     <label className="col-sm-2 col-form-label">Country</label>
                                     <div className="col-sm-10">
                                         <input type="text" className="form-control" id="inputEmail3"
                                                placeholder={order.country} disabled/>
                                     </div>
                                 </div>

                                 <div className="form-group row">
                                     <label className="col-sm-2 col-form-label">Items</label>
                                     <div className="col-sm-10">
                                         <div className="form-control" id="inputEmail3">
                                             <p>
                                                 {order.grocery.map(grocery => {
                                                     return <div>
                                                         {grocery.title}<br/>
                                                     </div>
                                                 })}
                                             </p>
                                         </div>
                                     </div>
                                 </div>

                                 {order.status==="pending"? <div className="m-auto w-50">
                                     <button className="btn btn-primary btn-success w-25 m-1" onClick={()=> acceptBtnClicked(order)}>ACCEPT</button>
                                     <button className="btn btn-primary btn-danger w-25 m-1" onClick={() => declineBtnClicked(order)}>DECLINE</button>
                                 </div>:<div className="form-group row">
                                     <label className="col-sm-2 col-form-label">Status</label>
                                     <div className="col-sm-10">
                                         <input type="text" className="form-control" id="inputEmail3"
                                                placeholder={order.status} disabled/>
                                     </div>
                                 </div>}
                             </form>
                         </div>
                     </div>
             })
            }
        </div>
        </div>
    );
}
