import React from "react"

export default class TitleScreen extends React.Component {
    render() {
        return (
            <div className="title screen">
                <h1><b>Wear</b>wolf</h1>
                <h2>Check out this awful graphic design!</h2>
                <hr/>
                <div className={this.props.title.cursor == 0 ? "selected" : null}>Story (coming soon!)</div>
                <div className={this.props.title.cursor == 1 ? "selected" : null}>Sandbox</div>
            </div>
        )
    }
}
