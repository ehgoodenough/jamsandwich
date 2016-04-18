import React from "react"
import Pixi from "pixi.js"

export default class PixiRenderer extends React.Component {
    render() {
        return (
            <div className="canvas" ref="canvas"/>
        )
    }
    componentDidMount() {
        console.log(this.props.display.children[0].texture.baseTexture.source)
        this.renderer = Pixi.autoDetectRenderer(this.props.display.width, this.props.display.height)
        this.renderer.roundPixels = true

        this.renderer.view.style.width = this.props.display.width + "em"
        this.renderer.view.style.height = this.props.display.height + "em"

        this.refs.canvas.appendChild(this.renderer.view)
        this.renderer.render(this.props.display)
    }
    componentDidUpdate() {
        this.renderer.render(this.props.display)
    }
}
