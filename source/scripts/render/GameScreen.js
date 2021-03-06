import React from "react"

import PixiRenderer from "./PixiRenderer.js"
import FauxPixiRenderer from "./FauxPixiRenderer.js"

export default class GameScreen extends React.Component {
    render() {
        return (
            <div className="game screen">
                <FauxPixiRenderer display={this.props.scene} frame={this.props.frame}/>
                <DialogueBox dialogue={this.props.scene.dialogue}/>
                <div className="message" key={this.props.scene.message}>{this.props.scene.message}</div>
            </div>
        )
    }
}

class DialogueBox extends React.Component {
    render() {
        return (
            <div className="dialogue-box" style={this.style}>
                <div className="portrait" style={this.portrait_style}/>
                <div className="text" style={{fontSize: "20em"}}>
                    {this.text}
                </div>
            </div>
        )
    }
    get style() {
        if(!!this.props.dialogue) {
            return {
                top: "16em"
            }
        } else {
            return {
                top: "-100em"
            }
        }
    }
    get portrait_style() {
        if(!!this.props.dialogue) {
            return {
                backgroundColor: "#" + this.props.dialogue.color.toString(16)
            }
        }
    }
    get text() {
        if(!!this.props.dialogue) {
            return this.props.dialogue.text
        }
    }
}

class AchievementList extends React.Component {
    render() {
        return (
            <div className="achievement-list">
                <div style={{color: this.props.achievements.party ? "red" : "white"}}>Party Animal</div>
                <div style={{color: this.props.achievements.promotion ? "red" : "white"}}>Corporate Ladder</div>
            </div>
        )
    }
}
