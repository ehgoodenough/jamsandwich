/////////////////////////
///// Initializing /////
///////////////////////

var state = new Object({
    frame: {
        width: 400,
        height: 300
    }
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
import ThreeRenderer from "./scripts/render/ThreeRenderer.js"
import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame frame={this.state.frame}>
                    <div>Hello World!</div>
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
    render.setState(state)
})
