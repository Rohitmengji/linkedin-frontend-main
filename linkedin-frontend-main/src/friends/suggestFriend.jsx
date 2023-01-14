import React from "react";

import { addFriendRequestApi, getAllUsersApi } from "./helper/friend";

export class suggestFriend extends React.Component {
    constructor(props){
        super(props)
        this.state={
            users:[]
        }
        this.getAllUsers = this.getAllUsers.bind(this)
        this.addFriendRequest = this.addFriendRequest.bind(this)
    }
  async getAllUsers() {
    const users = await getAllUsersApi()
    const state = this.state
    state.users = users
    this.setState(() => ({state}))
    console.log(this.state.users);
  }
  async addFriendRequest(friendId) {
    const friendRequestInfo ={
        friendWithUserId:friendId
    }
    const friendRequest = await addFriendRequestApi(friendRequestInfo )
    console.log("request send" , friendRequest);
  }
  componentDidMount() {
    this.getAllUsers()
  }
    render() {
        return (
            <div>
                {this.state.users.map((user,index) => {
                    return (
                        <div key={index} style={{textAlign:"center" , borderBottom:"10px"}}>
                            <h4>{user.name}</h4>
                            <button onClick={() => {this.addFriendRequest(user._id)}} >Add Request</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}