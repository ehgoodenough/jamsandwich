import React from "react"
import ReactDOM from "react-dom"

import PixiRenderer from "./scripts/render/PixiRenderer.js"
import ThreeRenderer from "./scripts/render/ThreeRenderer.js"
import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

var frame = {width: 400, height: 300}

class Mount extends React.Component {
    render() {
        return (
            <AspectRatioFrame frame={frame}>
                <div>Hello World!</div>
            </AspectRatioFrame>
        )
    }
}

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

import Afloop from "afloop"
Afloop(function(delta) {
    render.forceUpdate()
})
