import axios from "axios";
import FormData from 'form-data'


export function searchByLocation(query) {
    return axios({
        method: "get",
        params: {location: query},
        withCredentials: true,
        url: "http://localhost:4000/groceriesByLocation",
    })
}


export function addGrocery(destination) {
    let data = new FormData();
    data.append('img', destination.img, destination.img);
    data.append('title', destination.title)
    data.append('quantity', destination.quantity)
    data.append('price', destination.price)
    return axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/grocery",
        data: data,
    })
}

export function addToCart(grocery) {
    return axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/addToCart",
        data: {grocery: grocery}
    })
}

export function getCart(){
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/cart"
    })
}



export function getGrocery() {
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/groceries",
    })

}

export function makePayment(data) {
    return axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/confirm",
        data: data,
    })
}

export function getOrders() {
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/orders",
    })
}

export function getMyOrders() {
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/myorders",
    })
}

export function acceptOrder(id) {
    return axios({
        method: "get",
        params: {id: id},
        withCredentials: true,
        url: "http://localhost:4000/acceptorder",
    })
}

export function declineOrder(id) {
    return axios({
        method: "get",
        params: {id: id},
        withCredentials: true,
        url: "http://localhost:4000/declineorder",
    })
}

