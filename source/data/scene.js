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
            color: 0xF4A460
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
