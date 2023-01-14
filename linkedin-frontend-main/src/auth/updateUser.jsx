import React from "react";
import { getToken, getUserId } from "../localStorage";
import { getUserByUserIdAPI, updateProfileApi } from "./helper";

export class updateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            imageUrl: "",
            success: false
        }
    this.handleOnchange = this.handleOnchange.bind(this);
    this.submitApi = this.submitApi.bind(this)


    }
    handleOnchange(event) {
        this.setState({ [event.target.name]: event.target.value, success: false });
    }
    async getUser() {
        const user = await getUserByUserIdAPI(getUserId())
        const state = this.state
        state.name = user.name
        state.email = user.email
        state.password = user.password
        state.phoneNumber = user.phoneNumber
        state.imageUrl = user.imageUrl
        this.setState(() => ({ state }))
    }

     async submitApi() {
        console.log(this.state  ,"state");
        const user = {
            name:this.state.name,
            password:this.state.password,
            phoneNumber:this.state.phoneNumber,
            imageUrl:this.state.imageUrl
        }
        const updated = await updateProfileApi(getToken() , user)
        if (updated) {
            const state = this.state
            state.success = true
            this.setState(()=> ({state}))
        }
    }

    componentDidMount() {
        this.getUser()
    }
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Update Profile</h1>

                <input type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleOnchange}
                />
                <br />
                <input type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleOnchange}
                    disabled
                />
                <br />

                <input type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={this.handleOnchange}
                />
                <br />

                <input type="text"
                    name="imageUrl"
                    placeholder="Image Url"
                    value={this.state.imageUrl}
                    onChange={this.handleOnchange}
                />
                <br />

                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleOnchange}
                />
                <br />

                <button onClick={this.submitApi}>Update</button>
        {this.state.success ? <h1>Profile Updated Successfully</h1> : ""}
            
            </div>
        )
    }
}