export function getToken() {
    if (isUserExist()) {
        const user = JSON.parse(localStorage.getItem("user")) 
        return user.token
    }
}
export function getUserId() {
  if (isUserExist()) {
    const user = JSON.parse(localStorage.getItem("user")) 
    return user.userId
  }
}

function isUserExist(){
    if (localStorage.getItem("user")) {
        return true
    }
    return false
}

export function removeUser() {
    localStorage.removeItem("user");
}
export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

