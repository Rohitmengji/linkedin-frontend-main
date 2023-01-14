import React from "react";
import { withRouter } from "react-router-dom";
import { getUserByUserIdApi } from "../friends/helper/friend";
import { getToken } from "../localStorage";
import { getPostByPostIdApi } from "../post/helper/post";
import { getTrendByHashtagApi } from "./helper/trends";

 class trendHashtag extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            trends : [],
            hashtag:"",
            post:{},
            names:{}
        }
    }

    async getTrend(){
        const hashtag = this.props.match.params.hashtag
        const trend = await getTrendByHashtagApi(hashtag , getToken())
        const state = this.state
        state.trends = trend
        state.hashtag = hashtag
        this.setState(()=> ({state}))
        trend.forEach(trends => {
            this.getPostByPostId(trends.postId)
        })
    }
    
    async getPostByPostId(postId) {
    const post =  await getPostByPostIdApi(postId , getToken())
    const state = this.state
    state.post[postId] = post
    this.setState(() => ({state}))
    this.getUserByUserId(post.userId)
    }


    async getUserByUserId(userId) {
        const userName = await getUserByUserIdApi(userId)
        const state = this.state
        state.names[userId] = userName.name
        this.setState(() => ({ state }))
    }



    componentDidMount(){
        this.getTrend()
    }
    render () {
        return (
            <div style={{textAlign:"center"}}>
                <h1>single Trend of "{this.state.hashtag}"</h1>
                {this.state.trends.map((post , i) => {
                    return (
                        <div  key={i}>
                             <h1> {i+1})Name: {this.state.names[this.state.post[post.postId]?.userId]}</h1>
                            <div>
                                <h4>ImageUrl : {this.state.post[post.postId]?.imageUrl}</h4>
                                <h6>Text : {this.state.post[post.postId]?.text}</h6>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}

export default withRouter(trendHashtag)