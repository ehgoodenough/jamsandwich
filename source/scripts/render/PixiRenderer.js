import React from "react"
import Pixi from "pixi.js"

export default class PixiRenderer extends React.Component {
    render() {
        return (
            <div className="canvas" ref="canvas" style={this.style}/>
        )
    }
    componentDidMount() {
        this.renderer = Pixi.autoDetectRenderer(this.props.display.width + 32, this.props.display.height + 32, {transparent: true})
        this.renderer.roundPixels = true

        this.renderer.view.style.width = this.props.display.width + 32 + "em"
        this.renderer.view.style.height = this.props.display.height + 32 + "em"

        this.refs.canvas.appendChild(this.renderer.view)
        this.renderer.render(this.props.display)
    }
    componentDidUpdate() {
        this.renderer.render(this.props.display)
    }
    get style() {
        return {
            position: "absolute",
            zIndex: 10
        }
    }
}
