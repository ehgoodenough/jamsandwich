/////////////////////////
///// Initializing /////
///////////////////////

import Scene from "./scripts/game/Scene.js"

window.state = {}
window.state.frame = {width: 400 * 1.5, height: 225 * 1.5}
window.state.scene = new Scene({
    map: require("./maps/city.json")
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
                    <PixiRenderer frame={this.state.frame} display={this.state.scene}/>
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
import Keyboard from "./scripts/utility/Keyboard.js"

var loop = new Loop(function(delta) {
    state.scene.update(delta)
    render.setState(state)
})
