export default {
    world: worldify(require("raw!./tiles.txt")),
    tileset: {
        "o": 0x78AB46,
        "X": 0xFFCC00,
        "-": 0x000000
    },
    backgrounds: [
        {
            x: 0,
            y: 17,
            w: 43,
            h: 12,
            color: 0x663300,
        },
        {
            x: 24,
            y: 2,
            w: 19,
            h: 18,
            color: 0x444444,
        }
    ],
    entities: [
        {
            x: 31,
            y: 17,
            color: 0xF4A460,
            character: "boss",
            dialogue: function(player) {
                if(player.achievements.promotion) {
                    return [
                        "Congrats on the promotion! You'll make us proud."
                    ]
                } else if(player.outfit.hat && player.outfit.hat.name == "suit") {
                    player.achievements.promotion = true
                    return [
                        "Oh, what a nice suit!",
                        "You deserve a promotion!",
                    ]
                } else {
                    return [
                        "Remember, son, dress for the job you want.",
                        "Right now, you look " + player.description + "!",
                    ]
                }
            }
        },
        {
            x: 38,
            y: 8,
            color: 0xFF69B4,
            character: "secretary",
            dialogue: function() {
                return [
                    "Oh, Wolfgang!",
                    "Did you hear?",
                    "Uh huh! It was Malinda!",
                    "And then she...",
                    "Yup. That's right.",
                    "...",
                    "No that's not what I heard at all!",
                    "Because Sarah says...",
                    "Oh, my phone is blowing up. One sec.",
                ]
            }
        },
        {
            x: 6,
            y: 28,
            color: 0x551A8B,
            character: "partyboy",
            dialogue: function() {
                return ["PAAAAAAAARRRTY!"]
            }
        },
        {
            x: 3,
            y: 28,
            color: 0x44146f,
            character: "partyboy",
            dialogue: function() {
                return ["PA-PA-PARRRTY!"]
            }
        },
        {
            x: 4,
            y: 28,
            color: 0x2A0D45,
            character: "partyboy",
            dialogue: function() {
                return ["PAAA~AAARTY!"]
            }
        },
        {
            x: 5.5,
            y: 28,
            color: 0x44146f,
            character: "partyboy",
            dialogue: function() {
                return ["PARTY PARTY PARTY!"]
            }
        },
        {
            x: 7,
            y: 28,
            color: 0x551A8B,
            character: "partyboy",
            dialogue: function() {
                return ["I, too, like to party."]
            }
        },
    ],
    items: [
        {
            x: 29,
            y: 8,
            color: 0xCC0000,
            name: "suit",
        },
        {
            x: 23,
            y: 8,
            color: 0x551A8B,
            name: "sunglasses"
        },
        {
            x: 14,
            y: 11,
            color: 0x0000CC,
            name: "pants"
        }
    ]
}

function worldify(tiles = new String()) {
    tiles = tiles.split("\n")
    
    var world = {
        tiles: {},
        width: 0,
        height: 0,
    }
    
    world.height = tiles.length - 1
    for(var y = 0; y < tiles.length; y++) {
        world.width = Math.max(world.width, tiles[y].length)
        for(var x = 0; x < tiles[y].length; x++) {
            if(tiles[y][x] != " ") {
                world.tiles[x + "x" + y] = new Object({
                    symbol: tiles[y][x],
                    x: x, y: y,
                })
            }
        }
    }
    
    return world
}
