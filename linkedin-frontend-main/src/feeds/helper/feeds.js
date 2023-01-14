import { API } from "../../backend"

export const getPostsByUserId = (token) => {
    return fetch(`${API}/feeds` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token
        }
    })
    .then(response => response.json())
    .catch(err => err)
}
