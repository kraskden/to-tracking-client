import React, { Component } from 'react'
import SummaryTable from '../../summary/SummaryTable'
import TrackApi from '../../net/TrackApi'
import SummaryParser from '../../user/parsers/Summary'
import { Link } from 'react-router-dom'

export default class AccCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            summary: [[], []]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            console.log("OK")
            this.fetchSummary()
        }
    }

    componentDidMount() {
        this.fetchSummary()
    }

    fetchSummary = () => {
        TrackApi.getLastTrack(this.props.user, "weekly").then((res) => {
            this.setState({
                summary: SummaryParser.makeShortSummary(res["weekly"][0])
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="col-mb-4 mt-3 pl-3 pr-3">
                <div className={`card border-bold border-primary h-100`}> 
                    <div className={`card-header text-center font-weight-bold `}>
                    <Link to={`/user/${this.props.user}`}>{this.props.user}</Link>
                    </div>
                    <div className="card-body p-3 ">
                        <div className="card-text"> 
                            <SummaryTable 
                            objs={this.state.summary}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}