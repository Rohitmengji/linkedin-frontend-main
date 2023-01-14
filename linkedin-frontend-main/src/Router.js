import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { createPost } from "./post/createPost";
import { Posts } from "./post/posts";
import { signIn } from "./auth/signIn";
import { SignUp } from "./auth/singup";
import updatePost from "./post/updatePost"
import { suggestFriend } from "./friends/suggestFriend";
import { friendRequest } from "./friends/friendRequest";
import { feeds } from "./feeds/feeds";
import { Trends } from "./trends/trends";
import trendHashtag  from "./trends/trendHashtag";
import { updateUser } from "./auth/updateUser";
import { MyFriends } from "./friends/myFriends";
import chat  from "./chat/chat";
import chatList from "./chat/chatList";


export const Routes = () => {
    return (
      <BrowserRouter>
      
       
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signIn" exact component={signIn} />
          <Route path="/updateProfile" exact component={updateUser} />

          <Route path="/posts" exact component={Posts} />
          <Route path="/createPost" exact component={createPost} />
          <Route path="/post/:postId" exact component={updatePost} />

          <Route path="/suggestFriends" exact component={suggestFriend} />
          <Route path="/requestFriend" exact component={friendRequest} />
          <Route path="/myFriends" exact component={MyFriends} />

          <Route path="/feeds" exact component={feeds} />

          <Route path="/trends" exact component={Trends} />
          <Route path="/trend/:hashtag" exact component={trendHashtag} />

          <Route path="/chat/:friendId" exact component={chat} />
          <Route path="/chatList" exact component={chatList}/>
          </Switch>
        </BrowserRouter>
    )
}
