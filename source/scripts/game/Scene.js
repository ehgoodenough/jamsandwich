import Pixi from "pixi.js"
import ShortID from "shortid"

import Keyboard from "../utility/Keyboard"

const UNIT = 32

export default class Scene extends Pixi.Container {
    constructor(scene, frame) {
        super()

        this.frame = frame

        var backgrounds = new Pixi.Container()
        backgrounds.id = "backgrounds"
        // this.addChild(backgrounds)

        this.blocks = new Pixi.Container()
        this.blocks.id = "blocks"
        this.blocks.keepPixi = true
        this.addChild(this.blocks)
        // this.width = scene.map.width
        // this.height = scene.map.height
        for(var key in scene.map.blocks) {
            var tile = scene.map.blocks[key]
            this.blocks.addChild(new Block({
                image: scene.tileset[tile.symbol].image,
                isPassable: scene.tileset[tile.symbol].isPassable,
                isSlab: tile.symbol == "-",
                x: tile.x * UNIT,
                y: tile.y * UNIT,
                w: UNIT, h: UNIT,
            }))
        }

        for(var key in scene.backgrounds) {
            var background = scene.backgrounds[key]
            backgrounds.addChild(new Block({
                x: background.x * UNIT,
                y: background.y * UNIT,
                w: background.w * UNIT,
                h: background.h * UNIT,
                color: background.color,
                behindEverything: true
            }))
        }

        for(var key in scene.entities) {
            var entity = scene.entities[key]
            this.addChild(new Entity(entity))
        }

        this.objs = new Pixi.Container()
        this.objs.id = "objects"
        this.addChild(this.objs)
        for(var key in scene.objects) {
            var obj = scene.objects[key]
            this.objs.addChild(new Obj(obj))
        }

        this.addChild(new Player({
            position: {
                x: 7 * 32,
                y: 10 * 32
            }
        }))

        for(var key in scene.items) {
            var item = scene.items[key]
            this.addChild(new Item(item))
        }

        this.snapCamera()
    }
    snapCamera() {
        var x = (this.player.position.x - (this.frame.width / 2))
        var y = Math.floor(this.player.position.y / this.frame.height) * this.frame.height
        y = Math.min(y, this.height - this.frame.height + 1)
        x = Math.min(x, this.width - this.frame.width + 1)
        x = Math.max(x, 0)
        x *= -1
        y *= -1
        this.position.x = x
        this.position.y = y
    }
    panCamera() {
        var x = (this.player.position.x - (this.frame.width / 2))
        var y = Math.floor(this.player.position.y / this.frame.height) * this.frame.height
        //y = Math.min(y, this.height - this.frame.height)
        x = Math.min(x, this.width - this.frame.width)
        x = Math.max(x, 0)
        x *= -1
        y *= -1
        this.position.x += (x - this.position.x) * 0.05
        if(Math.abs(this.position.x - x) < 1) {
            this.position.x = x
        }
        if(this.player.jumpheight == 0) {
            this.position.y += (y - this.position.y) * 0.1
            if(Math.abs(this.position.y - y) < 1) {
                this.position.y = y
            }
        }
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })

        if(!!this.dialogue) {
            this.dialogue.update(delta)
        }

        this.panCamera()
    }
    addChild(object) {
        super.addChild(object)
        if(object instanceof Player) {
            this.player = object
        }

        if(object instanceof Entity) {
            this[object.character] = object
        }
    }
}

export class Sprite extends Pixi.Sprite {
    constructor(image) {
        // Pixi.Texture.fromImage(sprite.image)
        var texture = Pixi.Texture.fromImage(image)
        super(texture)

        this.id = ShortID.generate()
        this.image = image
    }
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
    set x0(x0) {
        this.position.x = x0 + (this.width * this.anchor.x)
    }
    set x1(x1) {
        this.position.x = x1 - (this.width * (1 - this.anchor.x))
    }
    set y0(y0) {
        this.position.y = y0 + (this.height * this.anchor.y)
    }
    set y1(y1) {
        this.position.y = y1 - (this.height * (1 - this.anchor.y))
    }
    isIntersecting(that, delta = new Object()) {
        return this.x0 < that.x1 + (delta.x || 0)
            && this.x1 > that.x0 + (delta.x || 0)
            && this.y0 < that.y1 + (delta.y || 0)
            && this.y1 > that.y0 + (delta.y || 0)
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

const FRICTION = 0.7
const AIR_FRICTION = 0.9
const GRAVITY = 0.55

export class Obj extends Sprite {
    constructor(object) {
        super(object.image)

        this.position.x = object.x * UNIT
        this.position.y = object.y * UNIT

        this.scale.x = 0.5
        this.scale.y = 0.5

        this.anchor.x = 0.5
        this.anchor.y = 1
    }
}

export class Entity extends Sprite {
    constructor(entity) {
        super(entity.image)

        this.position.x = entity.x * UNIT
        this.position.y = entity.y * UNIT

        this.anchor.x = 0.5
        this.anchor.y = 1

        this.scale.x = entity.scale
        this.scale.y = entity.scale

        this.character = entity.character
        if(this.character == "boss") {
            this.floor = this.position.y
            this.vy = 0
        } if(this.character == "partyboy") {
            this.floor = this.position.y
            this.position.y -= Math.random() * 20
            this.vy = 0
        }

        this.dialogue = entity.dialogue
    }
    update(delta) {
        if(this.character == "partyboy") {
            if(this.position.y == this.floor) {
                this.vy = -10
            }

            this.vy += GRAVITY

            if(this.position.y + this.vy >= this.floor) {
                this.position.y = this.floor
                this.vy = 0
            }

            this.position.y += this.vy
        } else if(this.character == "boss") {
            if(this.isAngry == true) {
                if(this.position.y == this.floor) {
                    this.vy = -5
                }

                this.vy += GRAVITY

                if(this.position.y + this.vy >= this.floor) {
                    this.position.y = this.floor
                    this.vy = 0
                }

                this.position.y += this.vy
            } else {
                this.position.y = this.floor
            }
        } else if(this.character == "secretary") {
            this.timer = this.timer || 0

            this.timer += delta

            this.rotation = this.timer < 2 ? 45 : 0

            this.timer %= 5
        }
    }
}

export class Player extends Sprite {
    constructor(player) {
        super(require("../../images/wolf/wolf.gif"))
        this.position.x = 5 * 32 || player.position.x || 0
        this.position.y = 5 * 32 || player.position.y || 0

        this.anchor.x = 0.5
        this.anchor.y = 1

        this.scale.x = 0.5
        this.scale.y = 0.5

        this.velocity = new Pixi.Point()
        this.maxvelocity = new Pixi.Point()

        this.maxvelocity.x = 5
        this.maxvelocity.y = 50

        this.outfit = new Object()

        this.jumpforce = -10
        this.acceleration = 2
        this.direction = -1

        this.jumpheight = 0

        this.achievements = {}

        this.textures = {
            "walk": Pixi.Texture.fromImage(require("../../images/wolf/wolf_walk.gif")),
            "idle": Pixi.Texture.fromImage(require("../../images/wolf/wolf.gif")),
            "air": Pixi.Texture.fromImage(require("../../images/wolf/wolf_midair.gif")),
        }
    }
    update(delta) {
        if(!!this.parent.dialogue) {
            if(Keyboard.isDown("<space>")) {
                this.parent.dialogue.update(delta * 2)
            }
            if(Keyboard.isJustDown("<space>")) {
                this.parent.dialogue.finish()
            }
        } else {
            // poll input for moving.
            if(Keyboard.isDown("A")
            || Keyboard.isDown("<left>")) {
                this.velocity.x -= this.acceleration
                if(this.velocity.x < -this.maxvelocity.x) {
                    this.velocity.x = -this.maxvelocity.x
                }
                this.direction = -1
                this.isMoving = true
            } else if(Keyboard.isDown("D")
            || Keyboard.isDown("<right>")) {
                this.velocity.x += this.acceleration
                if(this.velocity.x > +this.maxvelocity.x) {
                    this.velocity.x = +this.maxvelocity.x
                }
                this.direction = +1
                this.isMoving = true
            } else {
                this.isMoving = false
            }

            // poll input for jumping.
            if(Keyboard.isJustDown("W")
            || Keyboard.isJustDown("<up>")) {
                if(this.jumpheight == 0) {
                    this.velocity.y = this.jumpforce
                }
            }
            // ALLOW DANCING IN THE RAVE
            if(this.position.x > 3 * UNIT
            && this.position.x < 9 * UNIT
            && this.position.y > 21 * UNIT) {
                if(Keyboard.isDown("W")
                || Keyboard.isDown("<up>")) {
                    if(this.jumpheight == 0) {
                        this.velocity.y = this.jumpforce
                    }
                    if(this.outfit.hat && this.outfit.hat.name == "sunglasses") {
                        this.achievements.party = true
                        this.parent.message = "PARTY ANIMAL!!"
                    }
                }
            }

            if(Keyboard.isDown("S")
            || Keyboard.isDown("<down>")) {
                this.isFalling = true
            }
        }

        // applying acceleration by gravity.
        this.velocity.y += GRAVITY

        // enforcing vertical maximum velocity.
        // if(this.velocity.y > +this.maxvelocity.y) {
        //     this.velocity.y = +this.maxvelocity.y
        // }

        // collision with the edges of the world.
        if(this.position.y + this.velocity.y > this.parent.height) {
            this.velocity.y = 0
            this.jumpheight = 0
            this.isFalling = false
            this.y1 = this.parent.height
        }
        if(this.x0 + this.velocity.x < 0) {
            this.velocity.x = 0
            this.x0 = 0
        } if(this.x1 + this.velocity.x > this.parent.width) {
            this.velocity.x = 0
            this.x1 = this.parent.width
        }

        // collision with the blocks of the world.
        this.parent.blocks.children.forEach((child) => {
            if(child instanceof Block) {
                if(!child.isPassable) {
                    if(child.isIntersecting(this, {y: this.velocity.y})) {
                        if(this.velocity.y > 0) {
                            if(this.isFalling && this.jumpheight <= this.height && child.isSlab) {
                                return
                            } else {
                                this.velocity.y = 0
                                this.jumpheight = 0
                                this.isFalling = false
                                //this.y1 = child.y0
                                if(child.isSlab) {
                                    this.y1 = child.y0
                                }
                            }
                        } else if(this.velocity.y < 0) {
                            if(child.isSlab) {
                                return
                            } else {
                                this.velocity.y = 0
                                //this.y0 = child.y1
                                if(child.isSlab) {
                                    this.y0 = child.y1
                                }
                            }
                        }
                    } if(child.isIntersecting(this, {x: this.velocity.x})) {
                        if(!child.isSlab) {
                            if(this.velocity.x > 0) {
                                this.velocity.x = 0
                                this.x1 = child.x0
                            } else if(this.velocity.x < 0) {
                                this.velocity.x = 0
                                this.x0 = child.x1
                            }
                        }
                    }
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

        this.jumpheight += this.velocity.y

        if(this.jumpheight == 0) {
            this.velocity.x *= FRICTION
        } else {
            this.velocity.x *= AIR_FRICTION
        }

        this.parent.children.forEach((child) => {
            if(child instanceof Item) {
                if(this.isIntersecting(child)) {
                    if(Keyboard.isJustDown("<space>")) {
                        // if(child.name == "suit" && this.parent.secretary.timer > 2 && !this.hasWornSuit) {
                        //     this.parent.dialogue = new Dialogue(["Hey! Don't touch that! It's the boss's!"], this.parent.secretary.tint, this.parent)
                        // } else {
                            if(!!this.outfit.hat) {
                                this.outfit.hat.swap(child)
                                child.position.x = child.pinning.x
                                child.position.y = child.pinning.y
                            } else {
                                this.parent.removeChild(child)
                                this.addChild(child)
                                child.position.x = child.pinning.x
                                child.position.y = child.pinning.y
                            }
                        // }
                    }
                }
            } else if(child instanceof Entity) {
                if(this.isIntersecting(child)) {
                    if(Keyboard.isJustDown("<space>")) {
                        if(child.dialogue instanceof Function) {
                            this.parent.dialogue = new Dialogue(child.dialogue(this), child.tint, this.parent)
                        }
                    }
                }
            }
        })

        // if(!this.hasBeenScolded) {
        //     if(this.position.x > 26 * UNIT) {
        //         this.hasBeenScolded = true
        //         // this.parent.boss.isAngry = true
        //         this.parent.dialogue = new Dialogue([
        //             "Hey!!",
        //             "You're late again!",
        //             "And what are you wearing?",
        //             () => {
        //                 // this.parent.boss.isAngry = false
        //             },
        //             "That isn't business professional attire at all!",
        //             "Remember, son, dress for the job you want.",
        //             "Right now, you look " + this.description + "!! :(",
        //         ], 0xF4A460, this.parent)
        //
        //     }
        // }

        // if(Keyboard.isDown("T")) {
        //     this.texture = this.textures.air
        // } else if(Keyboard.isDown("Y")) {
        //     this.texture = this.textures.walk
        // } else {
        //     this.texture = this.textures.idle
        // }

        if(this.jumpheight < 0) {
            this.texture = this.textures.air
        } else if(this.isMoving) {
            this.texture = this.textures.walk
        } else {
            this.texture = this.textures.idle
        }
    }
    addChild(object) {
        super.addChild(object)

        if(object instanceof Item) {
            this.outfit.hat = object

            if(this.outfit.hat.name == "suit") {
                this.hasWornSuit = true
            }
        }
    }
    get description() {
        if(!this.outfit.hat) {
            return "practically naked"
        } else if(this.outfit.hat.name == "sunglasses") {
            return "hungover"
        } else if(this.outfit.hat.name == "pants") {
            return "far too casual"
        }
    }
}

export class Item extends Sprite {
    constructor(item = new Object()) {
        super(item.image)

        this.position.x = item.x * UNIT || 0
        this.position.y = item.y * UNIT || 0

        this.pinning = item.pin

        this.anchor.x = 0.5
        this.anchor.y = 13

        this.scale.x = 0.5
        this.scale.y = 0.5

        this.name = item.name
    }
}

export class Block extends Sprite {
    constructor(block = new Object()) {
        super(block.image || require("../../images/large.png"))

        this.position.x = block.x || 0
        this.position.y = block.y || 0

        this.scale.x = (block.w || UNIT) / UNIT
        this.scale.y = (block.h || UNIT) / UNIT

        this.behindEverything = block.behindEverything

        if(block.color) {
            this.tint = block.color
            this.color = block.color
        }

        this.anchor.x = 0
        this.anchor.y = 0

        this.isSlab = block.isSlab || false
        this.isPassable = block.isPassable || false

        if(this.isSlab) {
            this.scale.y = 0.25
        }
    }
}

export class Dialogue {
    constructor(texts, color, scene) {
        this.texts = texts
        this.color = color
        this.pointer = 1

        this.scene = scene
    }
    update(delta) {
        this.pointer += 30 * delta
    }
    finish() {
        if(this.texts.length > 0 && this.texts[0].length < this.pointer) {
            this.pointer = 1
            this.texts.shift()
            if(this.texts.length == 0) {
                delete this.scene.dialogue
            } else if(this.texts[0] instanceof Function) {
                this.texts[0]()
                this.texts.shift()
                if(this.texts.length == 0) {
                    delete this.scene.dialogue
                }
            }
        }
    }
    get text() {
        if(this.texts.length > 0) {
            return this.texts[0].substring(0, this.pointer)
        }
    }
}
