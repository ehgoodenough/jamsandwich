/////////////////////////
///// Initializing /////
///////////////////////

import Scene from "./scripts/game/Scene.js"

var state = {}
state.frame = {
    width: 600,
    height: 337.5
}
state.scene = new Scene({
    map: require("./maps/city.json"),
    frame: state.frame,
})

if(STAGE == "DEVELOPMENT") {
    window.state = state
}

//////////////////////
///// Rendering /////
////////////////////

import React from "react"
import ReactDOM from "react-dom"

import PixiRenderer from "./scripts/render/PixiRenderer.js"
import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame frame={this.state.frame} color="#5EC3D4">
                    <PixiRenderer display={this.state.scene} frame={this.state.frame}/>
                </AspectRatioFrame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

////////////////////
///// Looping /////
//////////////////

import Loop from "./scripts/utility/Loop.js"

var loop = new Loop(function(delta) {
    state.scene.update(delta)
    render.setState(state)
})
