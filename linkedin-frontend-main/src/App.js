import { Link } from "react-router-dom";


import React from "react";
import { getToken } from "./localStorage";
import { signout } from "./auth/helper";
export class App extends React.Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>LinkedIn App</p>
         
          {getToken()
          ?<div>
             <Link to="/updateProfile"><button>Update Profile</button></Link>
              <Link to="/"><button onClick={() => (signout())}>Sign OUt</button></Link>
          </div>

          : <div>
            <Link to="/signup"><button>signup</button></Link>
          <Link to="/signIn"><button>signIn</button></Link>
          </div>
}
        </header>
       
        <Link to="/posts"><button>Posts</button></Link>
        
        <Link to="/createPost"><button>Create Post</button></Link>
        <br />
        <Link to="/suggestFriends"><button>Suggest Friends</button></Link>
        
        <Link to="/requestFriend"><button>Request Friend</button></Link>
        <br />

        <Link to="/feeds"><button>Feeds</button></Link>
        <br />

        <Link to="/trends"><button>Trends</button></Link>
        <br />

        <Link to="/chatList"><button>Chat</button></Link>

      </div>
    );
  }
}
export default App;
