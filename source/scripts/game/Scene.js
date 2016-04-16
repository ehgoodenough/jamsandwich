import Pixi from "pixi.js"
import Keyboard from "../utility/Keyboard"

export default class Scene extends Pixi.Container {
    constructor() {
        super()
        this.addChild(new Wolf({
            position: {
                x: 200,
                y: 90
            }
        }))
        this.addChild(new Item({
            color: 0xCC0000,
            position: {
                x: 20,
                y: state.frame.height - 64
            }
        }))
        this.addChild(new Item({
            color: 0x00CC00,
            position: {
                x: state.frame.width - 20,
                y: 100 - 5
            }
        }))
        this.addChild(new Item({
            color: 0x0000CC,
            position: {
                x: state.frame.width / 2,
                y: state.frame.height
            }
        }))
        this.addChild(new Block({
            position: {
                x: 0,
                y: state.frame.height
            }
        }))
        this.addChild(new Block({
            position: {
                x: state.frame.width - 64,
                y: state.frame.height
            }
        }))
        this.addChild(new Slab({
            position: {
                x: 0,
                y: 100
            }
        }))
        this.addChild(new Slab({
            position: {
                x: state.frame.width - 64,
                y: 100
            }
        }))
        this.addChild(new Slab({
            position: {
                x: state.frame.width / 2 - 32,
                y: 100
            }
        }))
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
        
        if(!!this.wolf) {
            var x = (this.wolf.position.x - (state.frame.width / 2)) * -1
            var y = (this.wolf.position.y - (state.frame.height * 0.66)) * -1
            if(y < 0) {
                y = 0
            }
            this.position.x += (x - this.position.x) * 0.05
            if(Math.abs(this.position.x - x) < 1) {
                this.position.x = x
            }
            if(this.wolf.jumpheight == 0) {
                this.position.y += (y - this.position.y) * 0.1
                if(Math.abs(this.position.y - y) < 1) {
                    this.position.y = y
                }
            }
        }
    }
    addChild(object) {
        super.addChild(object)
        if(object instanceof Wolf) {
            this.wolf = object
        }
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
        return this.position.x + (this.width * (1 - this.anchor.x))
    }
    get y0() {
        return this.position.y - (this.height * this.anchor.y) 
    }
    get y1() {
        return this.position.y + (this.height * (1 - this.anchor.y))
    }
    isIntersecting(that, diff = {}) {
        return this.x0 < that.x1 + (diff.x || 0)
            && this.x1 > that.x0 + (diff.x || 0) 
            && this.y0 < that.y1 + (diff.y || 0)
            && this.y1 > that.y0 + (diff.y || 0)
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
    constructor(wolf) {
        super(Pixi.Texture.fromImage(require("../../images/white.png")))
        
        this.anchor.x = 0.5
        this.anchor.y = 1
        
        this.position.x = wolf.position.x
        this.position.y = wolf.position.y
        
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
        
        if(Keyboard.isJustDown("W")
        || Keyboard.isJustDown("<up>")) {
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
        
        this.parent.children.forEach((child) => {
            if(child instanceof Block) {
                if(child.isIntersecting(this, {y: this.velocity.y})) {
                    this.velocity.y = 0
                    this.jumpheight = 0
                } if(child.isIntersecting(this, this.velocity)) {
                    this.velocity.x = 0
                }
            }
        })
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // if(this.velocity.y == 0) {
        //     this.scale.x += (1 - this.scale.x) * 0.25
        //     this.scale.y += (1 - this.scale.y) * 0.25
        // } else if(this.velocity.y < 0) {
        //     this.scale.x += (0.8 - this.scale.x) * 0.25
        //     this.scale.y += (1.2 - this.scale.y) * 0.25
        // } else if(this.velocity.y > 0) {
        //     this.scale.x += (1.2 - this.scale.x) * 0.25
        //     this.scale.y += (0.8 - this.scale.y) * 0.25
        // }
        
        if(this.velocity.y < 0) {
            this.jumpheight += Math.abs(this.velocity.y)
        } else if(this.velocity.y > 0) {
            this.jumpheight = -1
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
        
        this.anchor.x = 0
        this.anchor.y = 1
        
        this.position.x = block.position.x
        this.position.y = block.position.y
    }
}

export class Slab extends Block {
    constructor(slab) {
        super(slab)
        
        this.scale.y = 0.1
    }
    isIntersecting(that, diff = {}) {
        if(diff.y < 0) {
            return false
        } else {
            return super.isIntersecting(that, diff)
        }
    }
}

// todo: fix high resolution breaking frame
// todo: let players drop down from slabs
// todo: fix little bump when collide with block
// todo: variable jumping, double jumping
// todo: sliding down walls slowly
