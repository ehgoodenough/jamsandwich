import Pixi from "pixi.js"
import Keyboard from "../utility/Keyboard"

export default class Scene extends Pixi.Container {
    constructor() {
        super()
        this.addChild(new Wolf())
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
}

const FRICTION = 0.8
const GRAVITY = 0.5

export class Wolf extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.fromImage(require("../../images/white.png")))
        
        this.anchor.x = 0.5
        this.anchor.y = 1
        
        this.position.x = 200
        this.position.y = 100
        
        this.velocity = new Pixi.Point()
        
        this.speed = 4
    }
    update(delta) {
        if(Keyboard.isDown("A")) {
            this.velocity.x = -this.speed
        } if(Keyboard.isDown("D")) {
            this.velocity.x = +this.speed
        } if(Keyboard.isJustDown("<space>")) {
            this.velocity.y = -10
        }
        
        this.velocity.y += GRAVITY
        
        if(this.position.y + this.velocity.y > state.frame.height) {
            this.position.y = state.frame.height
            this.velocity.y = 0
        }
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        this.velocity.x *= FRICTION
    }
}
