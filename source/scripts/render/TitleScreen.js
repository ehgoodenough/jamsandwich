import React from "react"

import Logo from "../../images/logo2e.png"

export default class TitleScreen extends React.Component {
    render() {
        return (
            <div className="title screen">
                <img src={Logo}/>
                <div style={{fontSize: "20em"}}>Hit spacebar to start!</div>
            </div>
        )
    }
}
