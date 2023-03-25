import {CollisionBlock} from "./collisionBlocks.js";

export function parse2D(array) {
    const rows = [];

    for (let i = 0; i < array.length; i = i + 16) {
        rows.push(array.slice(i, i + 16));
    }

    return rows;
}

export function PSG(Array){
    const objects = []
    Array.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64,
                        },
                    }),
                );
            }
        });
    });
    return objects;
}
