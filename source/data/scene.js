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
            x: 42+9,
            y: 8,
            image: require("../images/office/wastebin.png")
        },
        {
            x: 42+9+3+4,
            y: 8,
            image: require("../images/office2/filingcabinet_01.png")
        },
        {
            x: 42+9+3+2,
            y: 8,
            image: require("../images/office2/watercooler.png")
        },
        {
            x: 42+9+3+4+3+1,
            y: 5,
            image: require("../images/office2/whiteboard_01.png")
        },
        {
            x: 24.4,
            y: 5,
            image: require("../images/cafe2/awning.png")
        },
        {
            x: 29+8,
            y: 5,
            image: require("../images/cafe2/cafe_painting.png")
        },
        {
            x: 29+8,
            y: 8,
            image: require("../images/cafe2/chairs_table.png")
        },
        {
            x: 29,
            y: 8,
            image: require("../images/cafe2/door.png")
        },
        {
            x: 29+8,
            y: 6.5,
            image: require("../images/cafe2/vase_sunflower.png")
        },
        {
            x: 6,
            y: 8,
            image: require("../images/bed2/bed.png")
        },
        {
            x: 6,
            y: 5,
            image: require("../images/bed2/painting.png")
        }

        //bed2
        //roof
    ],
    entities: [
        {
            x: 9,
            y: 8,
            character: "red",
            image: require("../images/npcs/little_red.gif"),
            dialogue: function() {
                return [
                    "Wolfgang?  Is that you?  My memory seems a bit fuzzy.",
                    "It is you!  I forgot that you turn into a wolf sometimes.",
                ]
            },
            scale: 0.5
        },
        {
            x: 11 * 3 * 2 - 6 - 7,
            y: 8,
            character: "boss",
            image: require("../images/npcs/boss.gif"),
            dialogue: function() {
                return [
                    "Hey! You left work early today, didn't you?",
                    "And what're you wearing? Far too casual!",
                ]
            },
            scale: 0.3
        },
        {
            x: 13 + 42 + 14 - 2,
            y: 8 + 9,
            character: "dude1",
            image: require("../images/npcs/dude1.gif"),
            dialogue: function() {
                return [
                    "I don’t like to move around a lot.  I just like to feel the vibe out before I make my grand entrance."
                ]
            },
            scale: 0.6
        },
        {
            x: 17 + 42 + 14 - 2,
            y: 8 + 9,
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
            x: 16 + 42 + 14 - 2,
            y: 8 + 9,
            character: "partygirl",
            image: require("../images/npcs/partyGirl.gif"),
            dialogue: function() {
                return [
                    "Nobody told me this was a costume party...",
                    "Ugh. Are you trying to dance with me?",
                    "All of the weirdoes come out during the full moon…",
                ]
            },
            scale: 0.5
        },
        {
            x: 20 + 10+4+3+1,
            y: 8,
            character: "phonelady",
            image: require("../images/npcs/Phone_Lady.gif"),
            dialogue: function() {
                return [
                    "What do you want?"
                ]
            },
            scale: 0.5
        },
        {
            x: 23 + 42 + 14 + 3,
            y: 8,
            character: "scientist",
            image: require("../images/npcs/scientist.gif"),
            dialogue: function() {
                return [
                    "You want to Visit the moon?  Sorry. He’s depressed tonight.  He wasn’t invited to the Black Hole party coming into our galaxy this week."
                ]
            },
            scale: 0.5
        },
        {
            x: 24 + 42 - 7 + 2,
            y: 8,
            character: "secretary",
            image: require("../images/npcs/secretary.gif"),
            dialogue: function() {
                return [
                    "I’m only here because I have to be.",
                    "My college loans aren’t going to pay themselves.",
                    "I really prefer the night life, you know?",
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
                    "Who do you belong to?",
                    "Dogs aren’t allowed inside the cafe.",
                    "I’m just trying to work over here.",
                    "It’s not easy hiding in the kitchen all day.",
                ]
            },
            scale: 0.5
        },
    ],
    // items: [
    //     {
    //         x: 5,
    //         y: 5,
    //         image: require("../images/items/bowtie.png"),
    //         name: "bowtie",
    //         pin: {
    //             x: 40,
    //             y: 90,
    //         }
    //     },
    //     {
    //         x: 7,
    //         y: 10,
    //         image: require("../images/items/Propellor.png"),
    //         name: "propellor",
    //         pin: {
    //             x: 40,
    //             y: 142,
    //         }
    //     },
    // ]
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
