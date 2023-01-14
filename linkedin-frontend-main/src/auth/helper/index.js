import { API } from "../../backend";
import { removeUser } from "../../localStorage";

export const signup = user => {


  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProfileApi = (token , user) => {
  return fetch(`${API}/auth/update` , {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token:token
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
}
export const getUserByUserIdAPI = (userId) => {
  return fetch(`${API}/auth/${userId}` , {
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .catch(err => console.log(err))

}

export const signout = () => {
  
    removeUser()
  }


