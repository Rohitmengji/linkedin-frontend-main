import { API } from "../../backend";

export const getMyPostsApi = (userId , token ) => {
    return fetch(`${API}/post?userId=${userId}` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            token:`${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err)
    )
}

export const createPostApi = (post , token) => {
    return fetch(`${API}/post` , {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token
        },
        body:JSON.stringify(post)
    })
    .then(response => response.json())
    .catch(err => err)
}

export const getPostByPostIdApi = (postId , token) => {
    return fetch(`${API}/post/${postId}` , {
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

export const updatePostAPi = (updaePost , postId , token) =>{
    return fetch(`${API}/post/${postId}` , {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token
        },
        body:JSON.stringify(updaePost)
    })
    .then(response => response.json())
    .catch(err => err)
    
}

export const deletePostApi = (postId , token) => {
    return fetch(`${API}/post/${postId}` , {
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:token
        }
    })
    .then(response => response.json())
    .catch(err => err)

}