import "./styles.scss"

import { generateGrid, calculateNextState } from "./components";

let grid = generateGrid(50, 50)

document.body.appendChild(grid)

let started = false
let interval_code: any

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (!started) {
            interval_code = setInterval(() => {
                calculateNextState(grid)
            }, 100)
            started = true
        } else {
            clearInterval(interval_code)
            started = false
        }
    }
    
})
