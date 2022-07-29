import React, {Component, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {addGrocery} from "../../context/Database";


export default function AddGrocery() {
    const [image, setImage] = useState()
    const {currentUser} = useAuth()
    const imageRef = React.createRef()
    const navigation = useNavigate()
    const addNewDestination = (event) => {
        event.preventDefault();

        if (image == null)
            return
        const ext = image.name.substring(image.name.lastIndexOf("."));
        if (!(ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".svg")) {
            imageRef.current.setCustomValidity("file must be jpg, jpeg or png");
            return;
        }
        console.log(event)
        const grocery = {
            title: event.target[0].value,
            quantity: event.target[1].value,
            price: event.target[2].value,
            img: image,
        }

        addGrocery(grocery).then(res => {
            navigation('/store')
        })
        console.log(grocery)
    }

   const changeImage = (event) => {
        setImage(event.target.files[0])
    }

        return (
            <div>
                <h1 className="text-center">Add new Grocery</h1>

                <div className="w-50" style={{margin: "auto"}}>
                    <form onSubmit={addNewDestination}>

                        <div className="align-items-center g-3">
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputTitle">Title</label>
                                <input type="text" className="form-control w-100" id="inputTitle" required placeholder="Title"/>
                            </div>

                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputQuantity">Quantity</label>
                                <input type="number" className="form-control" id="inputQuantity"
                                       placeholder="Quantity" required/>
                            </div>

                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputPrice">Price</label>
                                <input className="form-control" id="inputPrice"
                                       placeholder="Price" name="price" required/>
                            </div>

                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputImage">Image</label>
                                <input type="file" className="form-control" id="inputImage"
                                       placeholder="Image" required onChange={changeImage}/>
                            </div>



                            <div className="col-auto">
                                <button type="submit" onSubmit={addNewDestination} className="btn btn-primary">Post Grocery</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
}
