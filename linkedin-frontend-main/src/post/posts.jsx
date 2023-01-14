import React from "react";
import { Link } from "react-router-dom";
import { createLikeApi, getLikeCountApi, updateLikeApi } from "../like/helper";
import { getToken, getUserId } from "../localStorage";

import { deletePostApi, getMyPostsApi } from "./helper/post";

export class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            likes: {}
        };
        this.getPosts = this.getPosts.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.createLike = this.createLike.bind(this);
        this.getLikeForId = this.getLikeForId.bind(this);
        this.updateLike = this.updateLike.bind(this);
    }

    async getPosts() {
        const posts = await getMyPostsApi(getUserId(), getToken());
        const state = this.state;
        state.posts = posts;
        this.setState(() => ({ state }));
        posts.forEach(post => {
            this.getLikeForId(post.postId)
        });
    }
    async updateLike(postId) {
        await updateLikeApi(postId , getToken())
        this.getLikeForId(postId)
    }
    async deletePost(postId) {
        await deletePostApi(postId, getToken());
        this.getPosts();
    }
    async createLike(postId) {
        const createLike = {
            "likeForId": postId
        }
         await createLikeApi(createLike, getToken())
        this.getLikeForId(postId)
    
    }
    async getLikeForId(postId) {
        const likes = await getLikeCountApi(postId, getToken());
        const state = this.state;
        state.likes[postId] = likes.count;
        this.setState(() => ({ state }));
    }
    componentDidMount() {
        this.getPosts();
    }
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Link to="/myFriends" ><button>My Friends</button></Link>
                <h1>posts</h1>

                {this.state.posts ? (
                    this.state.posts.map((post, index) => {
                        return (
                            <div key={index} style={{ margin: "0 0 10px 0" }}>
                                <h3>
                                    {index + 1}) ImageUrl : {post.imageUrl}
                                </h3>
                                <p>Text : {post.text}</p>
                                <button style={{ marginRight: "15px" }}
                                    onClick={this.state.likes[post.postId] > 0 
                                    ? () => { this.updateLike(post.postId)}
                                    :() => { this.createLike(post.postId) } }>
                                   {this.state.likes[post.postId] > 0 ? "UNLIKE " : "LIKE "}
                                    {this.state.likes[post.postId]}</button>
                                <Link
                                    style={{ marginRight: "20px" }}
                                    to={`/post/${post.postId}`}
                                >
                                    UPDATE
                                </Link>
                                <button
                                    onClick={() => {
                                        this.deletePost(post.postId);
                                    }}
                                >
                                    DELETE
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h1>NO POST FOUND</h1>
                )}
            </div>
        );
    }
}
