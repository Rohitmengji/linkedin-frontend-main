import React from "react";
import { getToken } from "../localStorage";

import {createPostApi} from "./helper/post"

export class createPost extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
        imageUrl:"",
        text:"",
        postCreated:false
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.submitApi = this.submitApi.bind(this)

  }

  handleOnChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value , postCreated:false}) 
   
  }
  async submitApi() {
  const post = this.state
 
  const createdPost = await createPostApi(post ,getToken())
  const state = this.state
  state.text = ""
  state.imageUrl = ""
  state.postCreated  = true
  this.setState(() => ({
    state
  }))
  console.log(createdPost , "created post" , "state" , this.state);
  }



  render() {
    return (<div>
        <h1>createPost</h1>
        <input type="text"
        placeholder="Image Url"
        name="imageUrl"
        value={this.state.imageUrl}
        onChange={this.handleOnChange}
        />

        <input type="text" 
        name="text"
        placeholder="Text"
        value={this.state.text}
        onChange={this.handleOnChange} />

        <button onClick={this.submitApi}>Create Post</button>
        
        {this.state.postCreated ? <h1>Post Created Successfully </h1> : ""}
        </div>
        )
  }
}
