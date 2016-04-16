import React from "react"
import Pixi from "pixi.js"

export default class PixiRenderer extends React.Component {
    render() {
        return (
            <div className="canvas" ref="canvas"/>
        )
    }
    componentDidMount() {
        this.renderer = Pixi.autoDetectRenderer(this.props.frame.width, this.props.frame.height, {transparent: true})
        this.renderer.roundPixels = true
        
        this.refs.canvas.appendChild(this.renderer.view)
        this.renderer.render(this.props.display)
    }
    componentDidUpdate() {
        this.renderer.render(this.props.display)
    }
}