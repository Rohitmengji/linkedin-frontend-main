import React from "react";
import { Link } from "react-router-dom";
import { signup } from "./helper/index";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      error: "",
      success: false,
      loading:false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitApi = this.submitApi.bind(this);
  }
  async submitApi(params) {
    console.log(this.state, "api called");
    const user = {
      email:this.state.email,
      password:this.state.password,
      name:this.state.name,
    }

    try {
      this.setState({loading:true})
      const data = await signup(user)
      this.setState({ email: "", password: "", name: "" });
      this.setState({error:false , loading:false , success:true})
      console.log(data);
    } catch (error) {
     this.setState({error:true , loading:false , success:false})
    }

  }

   successMessage = () => {
    return (
      <div
       
        style={{ display: this.success ? "" : "none" }}
      >
        New account was created successfully. Please
        <Link to="/login">Login Here</Link>

      </div>
    );
  };
  loadingMessage = () => {
    return (
      this.loading && (
        <div >
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  errorMessage = () => {
    return (
      <div
     
        style={{ display: this.error ? "" : "none" }}
      >
        ERROR

      </div>
    );
  };

  handleOnChange(event) {
    console.log(event.target.value, event.target.name);

    this.setState({ [event.target.name]: event.target.value  , error:false});
  }


  render() {
    return (
      <div>
          {this.loadingMessage()}
            {this.successMessage()}
            {this.errorMessage()}
        <h1>signUp</h1>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={this.handleOnChange}
          value={this.state.email}
        />
        <input type="password" name="password" placeholder="password" onChange={this.handleOnChange} value={this.state.password} />
        <input type="text" name="name" onChange={this.handleOnChange} value={this.state.name} placeholder="name" />
        <button type="submit" onClick={this.submitApi}>
          click
        </button>
      </div>
    );
  }
}

//   root.render(<MarkdownEditor />);
