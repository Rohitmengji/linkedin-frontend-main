import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUserByUserIdAPI } from "../auth/helper";
import { getChatFriendsIdsApi } from "./helper/chat";

class chatList extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            friendsIds:[],
            friendsName:{}
        }
    }
    async getFriendsIds() {
        const friendsIds = await getChatFriendsIdsApi()
        const state = this.state
        state.friendsIds = friendsIds
        this.setState(() => ({ state}))
        friendsIds.forEach(id => {
            this.getUserById(id)
        })
    }
    async getUserById(userId) {
        const friend = await getUserByUserIdAPI(userId)
        const state = this.state
        state.friendsName[userId] = friend.name.toUpperCase()
        this.setState(() => ({state}))
        console.log(this.state);
    }
    componentDidMount(){
        this.getFriendsIds()
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
                <h2>Chat list</h2>
                {this.state.friendsIds?.map((id , index) => {
                    return(
                        <div style={{marginBottom:"5px"}}  key={index}>
                            {index + 1})<Link to={`/chat/${id}`}>{this.state.friendsName[id]}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default withRouter(chatList)
