import React from "react";
import { Link } from "react-router-dom";
import {getUserId } from "../localStorage";
import { getAllFriendsIdsApi, getUserByUserIdApi } from "./helper/friend";

export class MyFriends extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendsIds :[],
            friends:{}
        }

    }
    async getFriendsIds() {
        const friendsIds = await getAllFriendsIdsApi(getUserId())
        const state = this.state
        state.friendsIds = friendsIds
        this.setState(()=>({state}))
        friendsIds.forEach(friendid => {
            this.getUserByUserIdApi(friendid)
        })
        

    }
    async getUserByUserIdApi(userId){
        const user = await getUserByUserIdApi(userId)
        const state = this.state
        state.friends[userId] = user
        this.setState(()=> ({state}))
    }
    componentDidMount(){
        this.getFriendsIds()
    }
    render() {
        return (
            <div style={{textAlign:"center"}}>
                <h1>My Friends</h1>
                <h4>Total Friends {this.state.friendsIds?.length}</h4>
                {this.state.friendsIds.map((ids , i) => {
                    return (
                        <div key={i}>
                            {i + 1}) {this.state.friends[ids]?.name.toUpperCase()}
                            <Link style={{marginLeft:"10px"}} to={`/chat/${ids}`} >Send Message</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}