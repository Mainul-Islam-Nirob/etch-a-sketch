const container = document.getElementById("container");
let isDrawing = false;

console.log(isDrawing, "drawing");

container.addEventListener("mousedown", () =>{
    isDrawing = true
    console.log("mousedown");
})
container.addEventListener("mouseup", () => {
    isDrawing = false
    console.log("mouseup");
})
container.addEventListener("mouseleave", () => {
    isDrawing = false
    console.log("mouseLeave");
})

console.log(isDrawing);

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.setAttribute('draggable', 'false');
        container.appendChild(cell).className = "grid-item";
    };
};


makeRows(16, 16)

function reSet() {
    const boxes = container.querySelectorAll(".grid-item");
    boxes.forEach(box => box.remove());
}

function reSize() {
    let range = document.getElementById("grid-range");
    range.addEventListener("input", (e) => {

        let size = e.target.value
        let gridSizeContainer = document.getElementsByClassName("grid-size");

        gridSizeContainer[0].innerText = size
        gridSizeContainer[1].innerText = size

        reSet()
        makeRows(size, size);
        grayColor()
        blackColor()
        rainbow()
        eraser()
        penColor()
        clear()
        clearGridLine()
        bgColor()

    })

}


reSize();


function grayColor() {
    const boxes = container.querySelectorAll(".grid-item")
    let grayBtn = document.getElementById("gray");

    grayBtn.addEventListener('click', () => {

        grayBtn.classList.toggle('btn-on');

        boxes.forEach( box => box.addEventListener('mouseover', () => {
            let randomNum = Math.floor(Math.random() * 255);
            if (isDrawing) {
            box.style.background = `rgb(${randomNum}, ${randomNum}, ${randomNum})`
            }
        }))
        
    })

}

grayColor()

function blackColor() {
    const boxes = container.querySelectorAll(".grid-item")
    let blackBtn = document.getElementById("black");
    blackBtn.addEventListener('click', () => {
        blackBtn.classList.toggle('btn-on');

        boxes.forEach(box => box.addEventListener('mouseover', () => {
            
            console.log(isDrawing);
            if(isDrawing){
                 box.style.background = "black";
            }

        }))

    })

}

blackColor()


function rainbow() {
    const boxes = container.querySelectorAll(".grid-item")
    let rainbowBtn = document.getElementById("rainbow");
    rainbowBtn.addEventListener('click', () => {
        rainbowBtn.classList.toggle('btn-on');

        boxes.forEach(box => box.addEventListener('mouseover', () => {

            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            if (isDrawing) {
            box.style.background = `rgb(${r}, ${g}, ${b})`
            }
        }))

    })

}

rainbow()


function penColor() {
    const boxes = container.querySelectorAll(".grid-item")
    let penBtn = document.getElementById("pen-color");
    let penContainer = document.getElementById("pen-container");
    let bgContainer = document.getElementById("bg-container");

    penBtn.addEventListener('change', (e) => {
        let color = e.target.value;
        penContainer.style.color = color;
        bgContainer.style.color = color;

        boxes.forEach(box => box.addEventListener('mouseover', () => {
            if (isDrawing) {
            box.style.background = color;
            }
        }))

    })

}

penColor()

function bgColor() {
    const boxes = document.getElementById("container")
    let bgBtn = document.getElementById("bg-color");
    let bgText = document.getElementById("board-text");
    let penText = document.getElementById("pen-text");

    bgBtn.addEventListener('change', (e) => {
            let color = e.target.value;
            container.style.background = color;
        bgText.style.background = color;
        penText.style.background = color;

    })

}

bgColor()



function eraser() {
    const boxes = container.querySelectorAll(".grid-item")
    let eraserBtn = document.getElementById("eraser");
    eraserBtn.addEventListener('click', () => {
        boxes.forEach(box => box.addEventListener('mouseover', () => {
            if (isDrawing) {
            box.style.background = "#fff"
            }
        }))

    })

}

eraser()


function clear() {
    const boxes = container.querySelectorAll(".grid-item")
    let clearBtn = document.getElementById("clear");
    clearBtn.addEventListener('click', () => {
        boxes.forEach(box => {
            box.style.background = "#fff"

        })

    })

}

clear()


function clearGridLine() {
    const boxes = container.querySelectorAll(".grid-item")
    let clearGridBtn = document.getElementById("clear-grid");
    clearGridBtn.addEventListener('click', () => {
        boxes.forEach(box => {
            box.classList.toggle("border");

        })

    })

}

clearGridLine()
