import axios from "axios";
import FormData from 'form-data'


export function searchByLocation(query) {
    return axios({
        method: "get",
        params: {location: query},
        withCredentials: true,
        url: "http://localhost:4000/bikesByLocation",
    })
}


export function addBike(destination) {
    let data = new FormData();
    data.append('img', destination.img, destination.img);
    data.append('title', destination.title)
    data.append('location', destination.location)
    data.append('desc', destination.bike_description)
    data.append('pricePerDay', destination.pricePerDay)
    data.append('pricePerWeek', destination.pricePerWeek)

    return axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/bike",
        data: data,
    })
}

export function getBikes() {

    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/bikes",
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

export function getOrders(){
    return axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/orders",
    })
}

export function getMyOrders(){
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

