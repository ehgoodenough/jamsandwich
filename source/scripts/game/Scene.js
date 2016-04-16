import Pixi from "pixi.js"
import Keyboard from "../utility/Keyboard"

export default class Scene extends Pixi.Container {
    constructor() {
        super()
        this.addChild(new Wolf())
        this.addChild(new Item({
            color: 0xCC0000,
            position: {
                x: 20,
                y: state.frame.height
            }
        }))
        this.addChild(new Item({
            color: 0x00CC00,
            position: {
                x: state.frame.width - 20,
                y: state.frame.height
            }
        }))
        this.addChild(new Item({
            color: 0x0000CC,
            position: {
                x: state.frame.width / 2,
                y: state.frame.height
            }
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
const AIR_FRICTION = 0.9
const GRAVITY = 0.55
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
    isIntersecting(that) {
        return this.x0 < that.x1
            && this.x1 > that.x0
            && this.y0 < that.y1
            && this.y1 > that.y0
    }
    swap(that) {
        var x = this.position.x
        var y = this.position.y
        this.position.x = that.position.x
        this.position.y = that.position.y
        that.position.x = x
        that.position.y = y
        
        var parent = this.parent
        this.parent.removeChild(this)
        that.parent.addChild(this)
        that.parent.removeChild(that)
        parent.addChild(that)
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
        
        this.speed = 2
        this.jump = 10
        this.jumpheight = 0
        
        this.outfit = {}
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
        || Keyboard.isDown("<up>")) {
            if(this.jumpheight == 0) {
                this.velocity.y = -this.jump
            }
        }
        
        this.velocity.y += GRAVITY
        
        if(this.position.y + this.velocity.y > state.frame.height) {
            this.position.y = state.frame.height
            this.velocity.y = 0
            this.jumpheight = 0
        }
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if(this.velocity.y == 0) {
            this.scale.x += (1 - this.scale.x) * 0.25
            this.scale.y += (1 - this.scale.y) * 0.25
        } else if(this.velocity.y < 0) {
            this.scale.x += (0.8 - this.scale.x) * 0.25
            this.scale.y += (1.2 - this.scale.y) * 0.25
        } else if(this.velocity.y > 0) {
            this.scale.x += (1.2 - this.scale.x) * 0.25
            this.scale.y += (0.8 - this.scale.y) * 0.25
        }
        
        if(this.velocity.y < 0) {
            this.jumpheight += Math.abs(this.velocity.y)
        }
        
        if(this.jumpheight == 0) {
            this.velocity.x *= FRICTION
        } else {
            this.velocity.x *= AIR_FRICTION
        }
        
        this.parent.children.forEach((child) => {
            if(child instanceof Item) {
                if(this.isIntersecting(child)) {
                    if(Keyboard.isJustDown("<space>")) {
                        if(!!this.outfit.hat) {
                            this.outfit.hat.swap(child)
                        } else {
                            this.parent.removeChild(child)
                            this.addChild(child)
                            child.position.x = 0
                            child.position.y = -this.height
                        }
                    }
                }
            }
        })
    }
    addChild(object) {
        super.addChild(object)
        
        if(object instanceof Item) {
            this.outfit.hat = object
        }
    }
}

export class Item extends Sprite {
    constructor(item = new Object()) {
        super(Pixi.Texture.fromImage(require("../../images/medium.png")))
        this.tint = item.color
        
        this.anchor.x = 0.5
        this.anchor.y = 1
        
        this.position.x = item.position.x
        this.position.y = item.position.y
    }
}

export class Block extends Sprite {
    constructor(block = new Object()) {
        super(Pixi.Texture.fromImage(require("../../images/black.png")))
    }
}

// todo: collision with world
// todo: variable jumping, double jumping
// todo: sliding down walls slowly
