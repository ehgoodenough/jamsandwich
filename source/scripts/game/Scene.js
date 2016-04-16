import Pixi from "pixi.js"
import Keyboard from "../utility/Keyboard"

export default class Scene extends Pixi.Container {
    constructor() {
        super()
        this.addChild(new Wolf())
        this.addChild(new Item({
            color: 0xCC0000,
            position: {x: 20, y: state.frame.height}
        }))
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
}

const FRICTION = 0.7
const NO_FRICTION = 0.9
const GRAVITY = 0.5
const MAX_VELOCITY = 5

export class Sprite extends Pixi.Sprite {
    get x0() {
        return this.position.x - (this.width * this.anchor.x) 
    }
    get x1() {
        return this.position.x + (this.width * this.anchor.x) 
    }
    get y0() {
        return this.position.y - (this.height * this.anchor.y) 
    }
    get y1() {
        return this.position.y + (this.height * this.anchor.y) 
    }
}

export class Wolf extends Sprite {
    constructor() {
        super(Pixi.Texture.fromImage(require("../../images/white.png")))
        
        this.anchor.x = 0.5
        this.anchor.y = 1
        
        this.position.x = 200
        this.position.y = 100
        
        this.velocity = new Pixi.Point()
        
        this.speed = 4
        this.jump = 10
    }
    update(delta) {
        if(Keyboard.isDown("A")
        || Keyboard.isDown("<left>")) {
            this.velocity.x -= this.speed
            if(this.velocity.x < -MAX_VELOCITY) {
                this.velocity.x = -MAX_VELOCITY
            }
        }
        if(Keyboard.isDown("D")
        || Keyboard.isDown("<right>")) {
            this.velocity.x += this.speed
            if(this.velocity.x > +MAX_VELOCITY) {
                this.velocity.x = +MAX_VELOCITY
            }
        }
        if(Keyboard.isDown("W")
        || Keyboard.isDown("<up>")
        || Keyboard.isDown("<space>")) {
            if(this.isOnGround == true) {
                this.isOnGround = false
                this.velocity.y = -this.jump
            }
        }
        
        this.velocity.y += GRAVITY
        
        if(this.position.y + this.velocity.y > state.frame.height) {
            this.position.y = state.frame.height
            this.velocity.y = 0
            this.isOnGround = true
        }
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if(this.isOnGround == true) {
            this.velocity.x *= FRICTION
        } else {
            this.velocity.x *= NO_FRICTION
        }
        
        this.parent.children.forEach((child) => {
            if(child instanceof Item) {
                if(this.isIntersecting(child)) {
                    console.log("collision!")
                }
            }
        })
    }
    isIntersecting(that) {
        // return this.x0 < sprite.x1
        //     && this.x1 > sprite.x0
        //     && this.y0 < sprite.y1
        //     && this.y1 > sprite.y0
        if(this.x1 < that.x0) {return false}
        if(this.x0 > that.x1) {return false}
        if(this.y1 < that.y0) {return false}
        if(this.y0 > that.y1) {return false}
        return true
    }
}

export class Item extends Sprite {
    constructor(item = new Object()) {
        super(Pixi.Texture.fromImage(require("../../images/small.png")))
        this.tint = item.color
        
        this.anchor.x = 0.5
        this.anchor.y = 1
        
        this.position.x = item.position.x
        this.position.y = item.position.y
    }
}

// todo: can pick up stuff
// todo: collision with world
// todo: stretch and shrink via velocity
// todo: variable jumping, double jumping
// todo: sliding down walls slowly
