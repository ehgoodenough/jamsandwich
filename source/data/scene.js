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
            x: 42,
            y: 8,
            image: require("../images/office/wastebin.png")
        }
    ],
    entities: [
        {
            x: 9,
            y: 8,
            character: "red",
            image: require("../images/npcs/little_red.gif"),
            dialogue: function() {
                return [
                    "Hello, Wolfgang!"
                ]
            },
            scale: 0.5
        },
        {
            x: 11,
            y: 8,
            character: "boss",
            image: require("../images/npcs/boss.gif"),
            dialogue: function() {
                return [
                    "You're late, Wolfgang!"
                ]
            },
            scale: 0.3
        },
        {
            x: 13,
            y: 8,
            character: "dude1",
            image: require("../images/npcs/dude1.gif"),
            dialogue: function() {
                return [
                    "sup, Wolfgang!"
                ]
            },
            scale: 0.6
        },
        {
            x: 17,
            y: 8,
            character: "dude2",
            image: require("../images/npcs/dude2.gif"),
            dialogue: function() {
                return [
                    "Sup, Wolfgang!"
                ]
            },
            scale: 0.5
        },
        {
            x: 16,
            y: 8,
            character: "partygirl",
            image: require("../images/npcs/partyGirl.gif"),
            dialogue: function() {
                return [
                    "Hoo haa!"
                ]
            },
            scale: 0.5
        },
        {
            x: 20,
            y: 8,
            character: "phonelady",
            image: require("../images/npcs/Phone_Lady.gif"),
            dialogue: function() {
                return [
                    "Hoo haa!"
                ]
            },
            scale: 0.5
        },
        {
            x: 23,
            y: 8,
            character: "scientist",
            image: require("../images/npcs/scientist.gif"),
            dialogue: function() {
                return [
                    "exactly"
                ]
            },
            scale: 0.5
        },
        {
            x: 24,
            y: 8,
            character: "secretary",
            image: require("../images/npcs/secretary.gif"),
            dialogue: function() {
                return [
                    "exactly"
                ]
            },
            scale: 0.5
        },
        {
            x: 30,
            y: 8,
            character: "waiter",
            image: require("../images/npcs/waiter_sleepy200x.gif"),
            dialogue: function() {
                return [
                    "nope"
                ]
            },
            scale: 0.5
        },
    ],
    items: [
        {
            x: 5,
            y: 5,
            image: require("../images/items/bowtie.png"),
            name: "suit",
            pin: {
                x: 40,
                y: 30,
            }
        },
        {
            x: 7,
            y: 5,
            image: require("../images/items/Propellor.png"),
            name: "suit",
            pin: {
                x: 40,
                y: 10,
            }
        },
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
