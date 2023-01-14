import { API } from "../../backend"
import { getToken } from "../../localStorage"

export const insertChat = (chatInfo) => {
    return fetch(`${API}/chat` , {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        },
        body:JSON.stringify(chatInfo)
    })
    .then(response => response.json())
    .catch(err => err)
}
export const getChatByChatIdApi = (chatId) => {
    return fetch(`${API}/chat/friendChat/${chatId}` , {
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

export const getChatIdApi = (friendId) => {
    return fetch(`${API}/chat/${friendId}` , {
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
export const updateMessageStatus = (messageId) => {
    return fetch(`${API}/chat/friendChat/${messageId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            token:getToken()
        }
    })
    .then(response => response.json())
    .catch(err => err)
}
export const getChatFriendsIdsApi = () => {
    return fetch(`${API}/chat/chatList` , {
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