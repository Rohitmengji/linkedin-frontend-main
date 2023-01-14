import React from "react";
import {  withRouter } from "react-router-dom";
import { getToken } from "../localStorage";
import { getPostByPostIdApi, updatePostAPi } from "./helper/post";

class updatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      text: "",
      postId:"",
      success:false
    };
    this.getPost = this.getPost.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.submitApi = this.submitApi.bind(this)

  }
  handleOnchange(event) {
    this.setState({ [event.target.name]: event.target.value , success: false});
  }
  async getPost() {
    const postId = this.props.match.params.postId;

    const post = await getPostByPostIdApi(postId, getToken());
    const state = this.state;
    state.imageUrl = post.imageUrl;
    state.text = post.text;
    state.postId = postId
    this.setState(() => ({ state }));

    // console.log(postId );
  }

  async submitApi() {
    console.log(this.state, "state");
    const post = {
        text:this.state.text,
        imageUrl:this.state.imageUrl
    }
    await updatePostAPi(post , this.state.postId , getToken() )
    const state = this.state
    state.text = ""
    state.imageUrl = ""
    state.success = true
    this.setState(() => ({state}))
    console.log(this.state , "updated state");
  }
  componentDidMount() {
    this.getPost();
  }

  render() {
    return (
      <div>
        <h1>update post</h1>
        <input
          type="text"
          name="imageUrl"
          placeholder="ImageUrl"
          value={this.state.imageUrl}
          onChange={this.handleOnchange}
        />
        <input
          type="text"
          name="text"
          placeholder="Text"
          value={this.state.text}
          onChange={this.handleOnchange}
        />
        <button onClick={this.submitApi}>update</button>

        {this.state.success ? <h1>Post Updated Successfully</h1> : ""}
      </div>
    );
  }
}

export default withRouter(updatePost);
