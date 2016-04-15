import React from "react"
import ReactDOM from "react-dom"

import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

class Mount extends React.Component {
    render() {
        return (
            <AspectRatioFrame width={40} height={30}>
                <div>Hello World!</div>
            </AspectRatioFrame>
        )
    }
}

ReactDOM.render(<Mount/>, document.getElementById("mount"))
