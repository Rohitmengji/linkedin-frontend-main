import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "../localStorage";
import { getTrendCountByHashtagApi, getTrendsApi } from "./helper/trends";

export class Trends extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            trends:[],
            count:{}
        }
    }
    async getTrends(){
        const trends = await getTrendsApi(getToken())
        let state = this.state
        state.trends = trends
        this.setState(()=> ({state}))
        this.state.trends.forEach(trend => {
            this.getTrendsCount(trend.slice(1))
        })
    }
    async getTrendsCount(hashtag) {
        const count = await getTrendCountByHashtagApi(hashtag , getToken())
        const state = this.state
        state.count[hashtag] = count.count
        this.setState(()=> ({state}))
    }
    componentDidMount(){
    this.getTrends()
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
                <h1>Trends</h1>
                {this.state.trends.map((trend , i ) => {
                    return(
                        <div key={i}>
                           {i+1}) <Link style={{marginRight:"10px"}}  to={`/trend/${trend.slice(1)}`}> {trend}</Link> 
                           count: {this.state.count[trend.slice(1)]}
                        <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}