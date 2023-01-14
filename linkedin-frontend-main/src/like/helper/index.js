import { API } from "../../backend"

export const createLikeApi = (likeForId , token) =>{
    return fetch(`${API}/like` , {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token 
        },
        body:JSON.stringify(likeForId)
    })
    .then(response => response.json())
    .catch(err => err)

} 

export const getLikeCountApi = (likeForId , token) => {
    return fetch(`${API}/like/count/${likeForId}` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token 
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => err)
}

export const updateLikeApi = (likeForId , token) => {
    return fetch(`${API}/like/${likeForId}` , {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token 
        },
        body:JSON.stringify({status:false})
    })
    .then(response => response.json())
    .catch(err => err)
}