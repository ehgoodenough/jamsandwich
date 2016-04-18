import React from "react"
import Pixi from "pixi.js"

import PixiRenderer from "./PixiRenderer.js"

export default class Container extends React.Component {
    render() {
        window.frame = this.props.frame
        return (
            <div className="container" style={this.style}>
                {this.elements}
            </div>
        )
    }
    get elements() {
        if(!!this.props.display) {
            var elements = new Array()
            this.props.display.children.forEach((child) => {
                if(child instanceof Pixi.Sprite) {
                    elements.push(
                        <Sprite display={child} key={child.id}/>
                    )
                } else if(child instanceof Pixi.Container) {
                    if(child.keepPixi) {
                        elements.push(
                            <PixiRenderer display={child} key={child.id}/>
                        )
                    } else {
                        elements.push(
                            <Container display={child} key={child.id}/>
                        )
                    }
                }
            })
            return elements
        }
    }
    get style() {
        return {
            position: "absolute",
            left: this.props.display.position.x + "em",
            top: this.props.display.position.y + "em",
        }
    }
}

class Sprite extends React.Component {
    render() {
        return (
            <div id={this.id} style={this.style}>
                {this.children}
            </div>
        )
    }
    get id() {
        return this.props.display.id
    }
    get style() {
        return {
            position: this.props.display.fixed ? "fixed" : "absolute",
            left: this.props.display.position.x + "em",
            top: this.props.display.position.y + "em",
            width: this.props.display.width + "em",
            height: this.props.display.height + "em",
            marginLeft: -1 * this.props.display.anchor.x * this.props.display.width + "em",
            marginTop: -1 * this.props.display.anchor.y * this.props.display.height + "em",
            transform: "scaleX(" + this.props.display.direction + ")",
            backgroundImage: "url(" + this.props.display.texture.baseTexture.source.src + ")",
            backgroundColor: this.props.display.color,
            backgroundSize: "contain",
            zIndex: this.props.display.stack || 10
        }
    }
    get children() {
        if(!!this.props.display) {
            var elements = new Array()
            this.props.display.children.forEach((child) => {
                if(child instanceof Pixi.Sprite) {
                    elements.push(
                        <Sprite display={child} key={child.id}/>
                    )
                } else if(child instanceof Pixi.Container) {
                    if(child.keepPixi) {
                        elements.push(
                            <PixiRenderer display={child} key={child.id}/>
                        )
                    } else {
                        elements.push(
                            <Container display={child} key={child.id}/>
                        )
                    }
                }
            })
            return elements
        }
    }
}
