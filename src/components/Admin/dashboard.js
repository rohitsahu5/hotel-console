import React from "react"
import { FullDashboard } from "./fullDashboard"
import { Switch, Route } from "react-router-dom"
import Materialize from 'materialize-css';
import { firebase } from "../../firebase"
import { Details } from "./Details"
export class Dashboard extends React.Component {
    Logout = () => {
        firebase.auth().signOut()
            .then(() => {
                return Materialize.toast({ html: "Logged Out" })
            })
            .then(this.props.history.push("/"))
    }
    render() {
        return (

            <Switch>
                <Route path="/Dashboard" exact component={FullDashboard} />
                <Route path="/Dashboard/:id" render={(props) => <Details {...props} Logout={this.Logout} />} />

            </Switch>
        )
    }
}