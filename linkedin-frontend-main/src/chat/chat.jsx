import React from "react";
import { withRouter } from "react-router-dom";
import { getUserByUserIdAPI } from "../auth/helper";
import { getChatByChatIdApi, getChatIdApi, insertChat, updateMessageStatus } from "./helper/chat";


class chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            usersName:"",
            message:"",
            chat:[],
            friendId:"",
            chatId:""

        }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitApi = this.submitApi.bind(this);


    }

    handleOnChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]:event.target.value})
    }
    async getUserName() {
        const userid = this.props.match.params.friendId
        const user = await getUserByUserIdAPI(userid)
        const state = this.state
        state.friendId = userid
        state.usersName = user.name
        this.setState(()=>({state}))
    }
    async submitApi(event){
        event.preventDefault()
        const chatInfo ={
            friendId:this.state.friendId,
            text:this.state.message
        }
        await insertChat(chatInfo)
        const state = this.state
        state.message = ""
        this.setState(()=>({state}))
        this.getChat()

    }
    
    async getChatId() {
        const friendId = this.props.match.params.friendId
        const chatId = await getChatIdApi(friendId)
        const state = this.state
        state.chatId = chatId[0]._id
        this.setState(()=>({state}))
        this.interval = setInterval(() => {
            this.getChat()
        }, 1000);
    
    }
    async getChat() {
     
        const chat = await getChatByChatIdApi(this.state.chatId)
        const state = this.state
        state.chat = chat
        this.setState(()=>({state}))
     
    }
    async DeleteMessage(messageId) {
        await updateMessageStatus(messageId)
        this.getChat()
    }
  
    componentDidMount(){
        this.getUserName()
        this.getChatId()

    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
 
    render(){
        return (
            <div style={{width:"80%" ,margin:"0 auto" ,textAlign:"center"}}>
                <h1 >Chat with {this.state.usersName}</h1>
                <div style={{maxHeight:"70vh" , overflowY:"scroll" }}  >
                    {this.state.chat?.map((chat,index) => {
                        return (
                            <div key={index}>
                                {chat.sendByUserId === this.state.friendId 
                                ? <div>
                                    <p style={{textAlign:"left"}}>{chat.text}
                                
                                    </p>
                               </div>
                                :<div>
                                <p style={{textAlign:"right"}}>{chat.text}
                                {chat.seen
                                    ? <img style={{height:"25px" , marginLeft:"10px"}} src="https://cdn-icons-png.flaticon.com/512/60/60727.png" alt="" />
                                    : <img style={{height:"25px" , marginLeft:"10px"}} src="https://static.thenounproject.com/png/1821229-200.png" alt="" />}
                                <button onClick={() => {this.DeleteMessage(chat._id)}}>D</button>
                               </p>
                            </div> 
                                }
                             
                            </div>
                        )
                    })}
                </div>
                <form action="">
                <input type="text"
                 name="message"
                 placeholder="Send Message"
                 value={this.state.message}
                 onChange={this.handleOnChange} />
                 <button onClick={this.submitApi}>Send</button>
                </form>
            </div>
        )
    }
}

export default withRouter(chat)