import { API } from "../../backend"

export const getTrendsApi = (token) => {
    return fetch(`${API}/trends` , {
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

export const getTrendByHashtagApi = (hashtag , token) => {
    return fetch(`${API}/trends/hashtag/${hashtag}` , {
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


export const getTrendCountByHashtagApi = (hashtag , token) => {
    return fetch(`${API}/trends/count/${hashtag}` , {
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

