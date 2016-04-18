import React from "react"
import Pixi from "pixi.js"

export default class Container extends React.Component {
    render() {
        return (
            <div className="faux-pixi-renderer">
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
                    elements.push(
                        <Container display={child} key={child.id}/>
                    )
                }
            })
            return elements
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
            position: "absolute",
            left: this.props.display.position.x + "px",
            top: this.props.display.position.y + "px",
            width: this.props.display.width + "px",
            height: this.props.display.height + "px",
            marginLeft: -1 * this.props.display.anchor.x * this.props.display.width + "px",
            marginTop: -1 * this.props.display.anchor.y * this.props.display.height + "px",
            transform: "scaleX(" + this.props.display.direction + ")",
            backgroundImage: "url(" + this.props.display.texture.baseTexture.source.src + ")",
            backgroundColor: this.props.display.color,
            backgroundSize: "contain",
        }
    }
    get children() {
        return null
    }
}
