import { API } from "../../backend"
import { getToken } from "../../localStorage"

export const getAllUsersApi = () => {
    return fetch(`${API}/auth/users` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => err)
}

export const addFriendRequestApi = (friendWithUserId) => {
    return fetch(`${API}/requestFriend` , {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        },
        body:JSON.stringify(friendWithUserId)
    })
    .then(response => response.json())
    .catch(err => err)
}

export const getAllFriendRequestApi = () => {
    return fetch(`${API}/requestFriend` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        },
    })
    .then(response => response.json())
    .catch(err => err)
}

export const getUserByUserIdApi = (userId) => {

    return fetch(`${API}/auth/${userId}` , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        }
    })
    .then(response => {
        return  response.json()
    })
    .catch(err => err)
}

export const updateFriendStatusApi = (friendWithUserId) => {
    return fetch(`${API}/requestFriend/status` , {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        },
        body:JSON.stringify({friendWithUserId:friendWithUserId})
    })
    .then(response => response.json())
    .catch(err => err)
}

export const deleteFriendRequestApi = (userId) => {
    return fetch(`${API}/requestFriend/delete` , {
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        },
        body:JSON.stringify({userId:userId})
    })
    .then(response => response.json())
    .catch(err => err)
}

export const getAllFriendsIdsApi = (userId ) => {
    return fetch(`${API}/friend/${userId}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        }
    })
    .then(response => response.json())
    .catch(err => err)
}