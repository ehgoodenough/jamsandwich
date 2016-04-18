import React from "react"

import Credits from "../../images/credits.png"

export default class CreditsScreen extends React.Component {
    render() {
        return (
            <div className="credits screen">
                <img src={Credits}/>
                <div id="thanks">
                    <span style={{fontSize: "50em"}}>
                        Thank you for playing!!
                    </span>
                </div>
            </div>
        )
    }
}
