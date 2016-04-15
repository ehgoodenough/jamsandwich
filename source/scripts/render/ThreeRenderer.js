import React from "react"
import Three from "three"

export default class ThreeComponent extends React.Component {
    render() {
        return (
            <div className="canvas" ref="canvas"/>
        )
    }
    componentDidMount() {
        this.renderer = new Three.WebGLRenderer({alpha: true})
        this.renderer.setSize(this.props.frame.width, this.props.frame.height)
        
        this.refs.canvas.appendChild(this.renderer.domElement)
        this.renderer.render(this.props.scene, this.props.scene.camera)
    }
    componentDidUpdate() {
        this.renderer.render(this.props.scene, this.props.scene.camera)
    }
}

// var scene = new Three.Scene()
// 
// var camera = new Three.PerspectiveCamera(45, 400 / 300, 0.1, 10000)
// camera.position.z = 300
// scene.add(camera)
// scene.camera = camera
// 
// var mesh = new Three.Mesh(new Three.SphereGeometry(50, 16, 16), new Three.MeshLambertMaterial({color: 0xCC0000}))
// scene.add(mesh)
// 
// var light = new Three.PointLight(0xFFFFFF)
// light.position.x = 10
// light.position.y = 50
// light.position.z = 130
// scene.add(light)
