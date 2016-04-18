import Pixi from "pixi.js"

export default {
    map: map(require("raw!./map.txt")),
    tileset: {
        "-": {
            image: require("../images/cafe/floor_03.png"),
        },
        "&": {
            image: require("../images/world/BRICK_0001.png"),
        },
        "X": {
            image: require("../images/office/floor_02.png"),
        },
        "A": {
            image: require("../images/office/wallceiling_02.png"),
            isPassable: true
        },
        "V": {
            image: require("../images/office/wallfloor_02.png"),
            isPassable: true
        },
    },
    backgrounds: [
        {
            x: 0,
            y: 0,
            w: 35,
            h: 9,
            color: 0x7B9BA6,
        },
        {
            x: 0,
            y: 9*1,
            w: 35,
            h: 9,
            color: 0x444444,
        },
        {
            x: 0,
            y: 9*2,
            w: 35,
            h: 9,
            color: 0xCC0000,
        }
    ],
    objects: [
        {
            x: 10,
            y: 8,
            image: require("../images/office/wastebin.png")
        }
    ],
    entities: [
        // {
        //     x: 31,
        //     y: 17,
        //     color: 0xF4A460,
        //     character: "boss",
        //     dialogue: function(player) {
        //         if(player.achievements.promotion) {
        //             return [
        //                 "Congrats on the promotion! You'll make us proud."
        //             ]
        //         } else if(player.outfit.hat && player.outfit.hat.name == "suit") {
        //             return [
        //                 "Oh, what a nice suit!",
        //                 "You deserve a promotion!",
        //                 () => {
        //                     player.achievements.promotion = true
        //                     player.parent.message = "CORPORATE LADDER"
        //                 }
        //             ]
        //         } else {
        //             return [
        //                 "Remember, son, dress for the job you want.",
        //                 "Right now, you look " + player.description + "!",
        //             ]
        //         }
        //     }
        // },
        // {
        //     x: 38,
        //     y: 8,
        //     color: 0xFF69B4,
        //     character: "secretary",
        //     dialogue: function(player) {
        //         if(player.outfit.hat && player.outfit.hat.name == "suit") {
        //             return [
        //                 "Hey, Wolfgang! Nice suit!"
        //             ]
        //         } else {
        //             return [
        //             "Oh, Wolfgang!",
        //             "Did you hear?",
        //             "Uh huh! It was Malinda!",
        //             "And then she...",
        //             "Yup. That's right.",
        //             "...",
        //             "No that's not what I heard at all!",
        //             "Because Sarah says...",
        //             "Oh, my phone is blowing up. One sec.",
        //             ]
        //         }
        //     }
        // },
        // {
        //     x: 6,
        //     y: 28,
        //     color: 0x551A8B,
        //     character: "partyboy",
        //     dialogue: function() {
        //         return ["PAAAAAAAARRRTY!"]
        //     }
        // },
        // {
        //     x: 3,
        //     y: 28,
        //     color: 0x44146f,
        //     character: "partyboy",
        //     dialogue: function() {
        //         return ["PA-PA-PARRRTY!"]
        //     }
        // },
        // {
        //     x: 4,
        //     y: 28,
        //     color: 0x2A0D45,
        //     character: "partyboy",
        //     dialogue: function() {
        //         return ["PAAA~AAARTY!"]
        //     }
        // },
        // {
        //     x: 5.5,
        //     y: 28,
        //     color: 0x44146f,
        //     character: "partyboy",
        //     dialogue: function() {
        //         return ["PARTY PARTY PARTY!"]
        //     }
        // },
        // {
        //     x: 7,
        //     y: 28,
        //     color: 0x551A8B,
        //     character: "partyboy",
        //     dialogue: function() {
        //         return ["I, too, like to party."]
        //     }
        // },
    ],
    items: [
        // {
        //     x: 29,
        //     y: 8,
        //     color: 0xCC0000,
        //     name: "suit",
        // },
        // {
        //     x: 23,
        //     y: 8,
        //     color: 0x551A8B,
        //     name: "sunglasses"
        // },
        // {
        //     x: 14,
        //     y: 11,
        //     color: 0x0000CC,
        //     name: "pants"
        // }
    ]
}

function map(tiles = new String()) {
    tiles = tiles.split("\n")

    var map = {
        width: 0,
        height: 0,
        blocks: {},
    }

    map.height = tiles.length - 1
    for(var y = 0; y < tiles.length; y++) {
        map.width = Math.max(map.width, tiles[y].length)
        for(var x = 0; x < tiles[y].length; x++) {
            if(tiles[y][x] != " ") {
                map.blocks[x + "x" + y] = new Object({
                    symbol: tiles[y][x],
                    x: x, y: y,
                })
            }
        }
    }

    return map
}
