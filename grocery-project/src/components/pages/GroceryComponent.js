import * as React from 'react';
import {useNavigate} from "react-router";
import {addToCart} from "../../context/Database";


export function GroceryComponent(props) {
    console.log(props.grocery)
    const grocery = props.grocery
    const addGroceryToCart = () => {
        console.log("Adding to cart")
        addToCart(grocery).then(res => {
            console.log(res)
            alert("Grocery added")
        })
    }
    return (
        <>
            <div className="col-md-6 col-lg-6 col-xl-4">
                <div className="card text-black">
                    <img src={grocery.picture} style={{maxWidth: "200px", maxHeight: "300px", margin:"auto"}}
                         className="card-img-top" alt="Grocery"/>
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">{grocery.title}</h5>
                            <p className="text-muted mb-4">Price {grocery.price} per kg</p>
                        </div>
                        <div className="text-center">
                            <button onClick={addGroceryToCart}><span>Add to cart</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};