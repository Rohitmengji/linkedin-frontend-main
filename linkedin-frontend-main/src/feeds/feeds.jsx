import React from "react";
import { getUserByUserIdApi } from "../friends/helper/friend";
import { getToken } from "../localStorage";
import { getPostByPostIdApi } from "../post/helper/post";
import { getPostsByUserId } from "./helper/feeds";

export class feeds extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            names:{},
            post:{}
        }
        
    }
    async getposts(){
        const posts = await getPostsByUserId(getToken())
        const state = this.state
        state.posts = posts
        this.setState(() => ({state}))
        posts.forEach(post => {
            this.getUserByUserId(post.userId)

        })
        posts.forEach(post => {
            this.getPostByPostId(post.postId)
        })
    }
    async getUserByUserId(userId) {
        const userName = await getUserByUserIdApi(userId)
        const state = this.state
        state.names[userId] = userName.name
        this.setState(() => ({ state }))
    }
    async getPostByPostId(postId) {
        const post = await getPostByPostIdApi(postId , getToken())
        const state = this.state
        state.post[postId] = post
        this.setState(() => ({state}))
    }





    componentDidMount(){
        this.getposts()
    }
    render() {
        
        return (
            <div style={{textAlign:"center"}}>
                <h1>Feeds</h1>
                {/* eslint-disable-next-line */}
                {this.state.posts.map((post, index) =>{{
                    
                    return (
                        <div key={index} >
                            <h5> {index+1})Name: {this.state.names[post.userId]}</h5>
                            <div>
                                <h2>ImageUrl : {this.state.post[post.postId]?.imageUrl}</h2>
                                <h5>Text : {this.state.post[post.postId]?.text}</h5>
                            </div>
                        </div> 
                    )
                }})}
            </div>
        )
    }
}