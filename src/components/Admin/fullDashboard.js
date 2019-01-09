import React from "react"
import "./Dashboard.css"
import { db } from "../../firebase"
export class FullDashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            complaintsList: [],
            tableData: [],
            loaded: false
        }
        this.getList()
    }

    getList = () => {
        db.ref("complaints/").once("value").then(res => {

            return this.setState({ complaintsList: res.val() })

        }).then(() => {
            console.log(this.state.complaintsList)
            this.populateTable()

        })
    }
    populateTable = () => {

        Object.keys(this.state.complaintsList).forEach((element) => {
            var templist = this.state.tableData
            var compText = this.state.complaintsList[element].ComplaintTopic;

            for (var i = 0; i < this.state.complaintsList[element].ComplaintTopic.length - 1; i++) {
                compText[i] += ", "
            }
            templist.push((<tr onClick={() => { this.props.history.push("/Dashboard/" + element) }} className="td" key={element} >
                <td>{this.state.complaintsList[element].name}</td>
                <td><i className="material-icons">{"star ".repeat(this.state.complaintsList[element].Stars)}</i></td>
                <td> {compText} </td>
                <td>{this.state.complaintsList[element].PhoneNumber ? <a href={"tel:" + this.state.complaintsList[element].PhoneNumber} ><i className="material-icons" style={{ fontSize: "20px", paddingTop: "4px" }} >phone</i>{this.state.complaintsList[element].PhoneNumber}</a> : "-"}</td>

            </tr >))
            i++
            this.setState({ tableData: templist, loaded: true })
        });
    }
    RenderList = () => {
        if (this.state.loaded) {
            return (<div>
                <h4 className="blue-text thin">Complaints Summary</h4>
                <h6>Total no of Complaints: 7</h6>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stars</th>
                            <th>Complaint Topics</th>
                            <th>Phone Number </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData}
                    </tbody>
                </table>
            </div>)
        }
        else {
            return (<div className="center" style={{ padding: "5%" }}>
                <h4 className="green-text">Loading Please Wait</h4>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>)
        }
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue">
                        <a href="#" className="brand-logo center">Complaints Dashboard</a>
                        <ul id="nav" className="right ">
                            <li><a href="#" onClick={this.props.Logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="row">
                    <div className="card col s10 offset-s1  ">
                        {this.RenderList()}
                    </div>
                </div>
            </div>
        )
    }
}