import React from "react"

import Logo from "../../images/logo2e.png"

export default class TitleScreen extends React.Component {
    render() {
        return (
            <div className="title screen">
                <img src={Logo}/>
                <div className={this.props.title.cursor == 0 ? "selected" : null}>Play</div>
                <div className={this.props.title.cursor == 1 ? "selected" : null}>Credits</div>
            </div>
        )
    }
}
