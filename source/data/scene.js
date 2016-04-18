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
        ".": {
            image: require("../images/office/wall_02.png"),
            isPassable: true
        },
        "x": {
            image: require("../images/bedroom/purplefloor_01.png"),
        },
        ">": {
            image: require("../images/bedroom/cyanwall_ceiling_03.png"),
            isPassable: true,
        },
        "<": {
            image: require("../images/bedroom/cyanwall_floor_02.png"),
            isPassable: true,
        },
        "~": {
            image: require("../images/bedroom/cyanwall_01.png"),
            isPassable: true,
        },

        "B": {
            image: require("../images/cafe/floor_03.png"),
        },
        "1": {
            image: require("../images/cafe/molding_ceiling_left_corner.png"),
            isPassable: true,
        },
        "2": {
            image: require("../images/cafe/wallceiling_03.png"),
            isPassable: true,
        },
        "3": {
            image: require("../images/cafe/molding_ceiling_right_corner.png"),
            isPassable: true,
        },
        "4": {
            image: require("../images/cafe/right_molding_03.png"),
            isPassable: true,
        },
        "8": {
            image: require("../images/cafe/left_molding_03.png"),
            isPassable: true,
        },
        "6": {
            image: require("../images/cafe/wallfloor_03.png"),
            isPassable: true,
        },
        "0": {
            image: require("../images/cafe/walltile_03.png"),
            isPassable: true,
        }
    },
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
        {
            x: 9,
            y: 8,
            character: "red",
            image: require("../images/npcs/little_red.gif"),
            dialogue: function() {
                return [
                    "Hello, Wolfgang!"
                ]
            }
        },
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
