import React from "react"

import PixiRenderer from "./PixiRenderer.js"

export default class GameScreen extends React.Component {
    render() {
        return (
            <div className="game screen">
                <PixiRenderer display={this.props.scene} frame={this.props.frame}/>
            </div>
        )
    }
}
