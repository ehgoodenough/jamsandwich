/////////////////////////
///// Initializing /////
///////////////////////

import Scene from "./scripts/game/Scene.js"

var state = {
    frame: {
        width: 600,
        height: 337.5
    },
    title: {
        cursor: 0,
        update: function() {
            if(Keyboard.isDown("W")
            || Keyboard.isDown("<up>")) {
                this.cursor = 0
            }
            if(Keyboard.isDown("S")
            || Keyboard.isDown("<down>")) {
                this.cursor = 1
            }
            if(Keyboard.isJustDown("<space>")) {
                if(this.cursor == 1) {
                    state.scene = new Scene({
                        map: require("./maps/city.json"),
                        frame: state.frame,
                    })
                }
            }
        }
    }
}

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

class TitleScreen extends React.Component {
    render() {
        return (
            <div className="title screen">
                <h1><b>Wear</b>wolf</h1>
                <h2>Check out this awful graphic design!</h2>
                <hr/>
                <div className={this.props.title.cursor == 0 ? "selected" : null}>
                    Story (coming soon!)
                    </div>
                <div className={this.props.title.cursor == 1 ? "selected" : null}>
                    Sandbox
                </div>
            </div>
        )
    }
}

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame frame={this.state.frame}>
                    {!!this.state.scene ? (
                        <PixiRenderer display={this.state.scene} frame={this.state.frame}/>
                    ) : (
                        <TitleScreen title={this.state.title}/>
                    )}
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
    if(!!state.scene) {
        state.scene.update(delta)
    } else {
        state.title.update(delta)
    }
    
    
    render.setState(state)
})
