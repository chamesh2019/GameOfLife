function generateCell(x: number, y: number): HTMLElement {
    let cell = document.createElement("div");
    
    cell.classList.add("cell");
    cell.id = `cell-${x}-${y}`

    cell.dataset.x = String(x);
    cell.dataset.y = String(y);

    if (Math.random() < 0.1) {
        cell.dataset.alive = "true";
    } else {
        cell.dataset.alive = "false";
    }
    return cell;
}
function getNeibours(cell: HTMLElement): HTMLElement[] {
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    let neibours: HTMLElement[] = [];

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) {
                continue;
            }
            let neibour = document.getElementById(`cell-${i}-${j}`);
            if (neibour) {
                neibours.push(neibour);
            }
        }
    }

    neibours = neibours.filter((neibour) => neibour.dataset.alive === "true");

    return neibours;
}

function updateCell(cell: HTMLElement) {
    if (cell.dataset.alive === "true") {
        cell.classList.add("alive");
    } else {
        cell.classList.remove("alive");
    }
}

export function generateGrid(rows: number, cols: number): HTMLElement {
    let grid = document.createElement("div");
    grid.classList.add("grid");
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid.appendChild(generateCell(i, j));
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            updateCell(<HTMLElement>grid.children[i * cols + j]);
        }
    }
    return grid;
}
    
export function calculateNextState(grid: HTMLElement){
    let cells = grid.querySelectorAll(".cell");

    for (let i = 0; i < cells.length; i++) {
        let cell = <HTMLElement>cells[i];
        
        let neibours = getNeibours(cell);

        if (neibours.length < 2 || neibours.length > 3) {
            cell.dataset.alive = "false";

        } else if (neibours.length === 3) {
            cell.dataset.alive = "true";
        }
    
    }

    for (let i = 0; i < cells.length; i++) {
        let cell = <HTMLElement>cells[i];
        updateCell(cell);
    }

}

