import React from "react"

import PixiRenderer from "./PixiRenderer.js"

export default class GameScreen extends React.Component {
    render() {
        return (
            <div className="game screen">
                <PixiRenderer display={this.props.scene} frame={this.props.frame}/>
                <DialogueBox dialogue={this.props.scene.dialogue}/>
                <AchievementList achievements={this.props.scene.player.achievements}/>
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
                <div className="text">
                    {this.text}
                </div>
            </div>
        )
    }
    get style() {
        if(!!this.props.dialogue) {
            return {
                top: "16px"
            }
        } else {
            return {
                top: "-100px"
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
