import React from "react";
import { deleteFriendRequestApi, getAllFriendRequestApi, getUserByUserIdApi, updateFriendStatusApi } from "./helper/friend";

export class friendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendRequest: [],
            names: {}
        }
        this.getAllFriendRequest = this.getAllFriendRequest.bind(this)
        this.getUserByUserId = this.getUserByUserId.bind(this)
    }
    async getAllFriendRequest() {

        const friendRequests = await getAllFriendRequestApi()
        const state = this.state
        state.friendRequest = friendRequests
        this.setState(() => ({ state }))
        friendRequests.forEach(request => {
            this.getUserByUserId(request.userId)
        })
    }
    async getUserByUserId(userId) {
        const userName = await getUserByUserIdApi(userId)
        const state = this.state
        state.names[userId] = userName.name
        this.setState(() => ({ state }))
    }
    async updateFriendStatus(friendWithUserId){
        const updated = await updateFriendStatusApi(friendWithUserId )
        console.log("updated status" , updated);
        this.getAllFriendRequest()
    }
    async deleteFriendRequest(userId){
        const deleted = await deleteFriendRequestApi(userId)
        console.log("updated status" , deleted);
        this.getAllFriendRequest()
    }
    componentDidMount() {
        this.getAllFriendRequest()
    }
    render() {
        console.log("state", this.state);
        return (
            <div>
                <h1>Friend Requests</h1>

                {this.state.friendRequest.map((request, index) => {
                    return (
                        <div style={{ textAlign: "center" }} key={index}>
                            <h4>{this.state.names[request.userId]}</h4>
                            <button onClick={() => {this.updateFriendStatus(request.userId)}}>Accept</button>
                            <button onClick={() => {this.deleteFriendRequest(request.userId)}}>Decline</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}