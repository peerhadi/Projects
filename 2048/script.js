let size = 4;
let htmlElements;
let cells;

function createField() {
    if (htmlElements) {
        return;
    }
    htmlElements = [];
    let table = document.getElementById("field");
    for (let y = 0; y < size; y++) {
        let tr = document.createElement("tr");
        let trElements = [];
        for (let x = 0; x < size; x++) {
            let td = document.createElement("td");
            td.setAttribute("class", "cell");
            tr.appendChild(td);
            trElements.push(td);
        }
        htmlElements.push(trElements);
        table.appendChild(tr);
    }
}

function createCells() {
    cells = [];
    for (let y = 0; y < size; y++) {
        cells.push(new Array(size).fill(0));
    }
}

function generateInEmptyCell() {
    let x;
    let y;

    do {
        x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
        if (cells[y][x] == 0) {
            cells[y][x] = Math.random() >= 0.9 ? 4 : 2;
            break;
          }
    } while (true);
}

function draw() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let td = htmlElements[y][x];
            let v = cells[y][x];
            td.innerHTML = v === 0 ? "" : String(v);
            if (v === 0) {
                td.setAttribute("style", "background-color: white");
            } else {
                let h = 20 + 24 * Math.log2(Math.random() * Math.log2(Math.random()) * Math.log2(Math.random()))
                td.setAttribute(
                    "style",
                    "background-color: hsl(" + h + ", 100%, 50%)",
                );
            }
        }
    }
}

function slide(array, size) {
    function filterEmpty(a) {
        return a.filter((x) => x != 0);
    }

    array = filterEmpty(array);
    if (array.length > 0) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] === array[i + 1]) {
                array[i] = array[i] * 2;
                array[i + 1] = 0;
            }
        }
    }
    array = filterEmpty(array);
    while (array.length < size) {
        array.push(0);
    }

    return array;
}

function GameWon() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (cells[y][x] === 2048) {
                return true;
            }
        }
    }
}
function isGameOver() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (cells[y][x] === 0) {
                return false;
            }
        }
    }
    for (let y = 0; y < size - 1; y++) {
        for (let x = 0; x < size - 1; x++) {
            let c = cells[y][x];
            if ((c != 0 && c == cells[y + 1][x]) || c == cells[y][x + 1]) {
                return false;
            }
        }
    }
    return true;
}

function slideLeft() {
    let changed = false;
    for (let i = 0; i < size; i++) {
        let old = Array.from(cells[i]);
        cells[i] = slide(cells[i], size);
        changed = changed || cells[i].join(",") != old.join(",");
    }
    return changed;
}

function swap(x1, y1, x2, y2) {
    let tmp = cells[y1][x1];
    cells[y1][x1] = cells[y2][x2];
    cells[y2][x2] = tmp;
}

function mirror() {
    for (let y = 0; y < size; y++) {
        for (
            let xLeft = 0, xRight = size - 1;
            xLeft < xRight;
            xLeft++, xRight--
        ) {
            swap(xLeft, y, xRight, y);
        }
    }
}

function transpose() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < i; j++) {
            swap(i, j, j, i);
        }
    }
}

function moveLeft() {
    return slideLeft();
}

function moveRight() {
    mirror();
    let changed = moveLeft();
    mirror();
    return changed;
}

function moveUp() {
    transpose();
    let changed = moveLeft();
    transpose();
    return changed;
}

function moveDown() {
    transpose();
    let changed = moveRight();
    transpose();
    return changed;
}

document.addEventListener("keydown", (e) => {
    let code = e.keyCode;
    let ok;

    switch (code) {
        case 40:
            ok = moveDown();
            break;
        case 38:
            ok = moveUp();
            break;
        case 37:
            ok = moveLeft();
            break;
        case 39:
            ok = moveRight();
            break;
        default:
            return;
    }
    if (ok) {
        generateInEmptyCell();
        draw();
    }

    if (GameWon()) {
        init();
        window.location.reload();
    }

    if (isGameOver()) {
        setTimeout(() => {
            init();
            window.location.reload();
        }, 1000)
    }
});
function init() {
    createField();
    createCells();
    new Array(3).fill(0).forEach(generateInEmptyCell);
    draw();
}

init();
