import React from 'react'
import Console from 'react-console-component'
 
export default class AdminPage extends React.Component {

    echo = (text) =>  {
        this.refs.console.log(text)
        this.refs.console.return();
        console.log(this.refs.console)
    }

    render () {
        return (
            <div className="row justify-content-md-center">
                <div className="col-6">
                <Console ref="console"
                        handler={this.echo}
                        autofocus={true}
                />
                </div>
            </div>
            
                    
        )
    }
}