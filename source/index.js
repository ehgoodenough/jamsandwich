/////////////////////////
///// Initializing /////
///////////////////////

import Scene from "./scripts/game/Scene.js"

import scene from "./data/scene.js"

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
                    this.startGame()
                }
            }
        },
        startGame: function() {
            state.scene = new Scene(scene, state.frame)
        }
    }
}

if(STAGE == "DEVELOPMENT") {
    window.state = state
    window.state.title.startGame()
}

//////////////////////
///// Rendering /////
////////////////////

import React from "react"
import ReactDOM from "react-dom"

import GameScreen from "./scripts/render/GameScreen.js"
import TitleScreen from "./scripts/render/TitleScreen.js"
import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame frame={this.state.frame}>
                    {!!this.state.scene ? (
                        <GameScreen scene={this.state.scene} frame={this.state.frame}/>
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
