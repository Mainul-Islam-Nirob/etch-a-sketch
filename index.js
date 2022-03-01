const initialColor = '#f97316';
const initialMode = 'color-picker';
const initialSize = 16;

let currentColor = initialColor;
let currentMode = initialMode;
let currentSize = initialSize;

let container = document.getElementById("container");
let bgColorPicker = document.getElementById("bg-color-picker");
let penColorPicker = document.getElementById("pen-color-picker");
let sizeRange = document.getElementById("grid-range");
let grayBtn = document.getElementById("gray");
let blackBtn = document.getElementById("black");
let rainbowBtn = document.getElementById("rainbow");
let eraserBtn = document.getElementById("eraser");
let clearBtn = document.getElementById("clear");
let gridLineBtn = document.getElementById("grid");
let gridCircleBtn = document.getElementById("circle-grid");
let gridSize = document.getElementById('gridSize');


function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activeButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

rainbowBtn.onclick = () => setCurrentMode('rainbow');
blackBtn.onclick = () => setCurrentMode('black');
grayBtn.onclick = () => setCurrentMode('gray');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => resetGrid();
sizeRange.onmousemove = (e) => updateGridSize(e.target.value);
sizeRange.onchange = (e) => changeSize(e.target.value);
gridLineBtn.onclick = (e) => toggleGridLine(e);
gridCircleBtn.onclick = (e) => toggleGridCircle(e);

penColorPicker.onchange = (e) => {
    console.log(e.target.value);
    setCurrentColor(e.target.value);
    setCurrentMode('color-picker');
}

bgColorPicker.onchange = (e) => {
    container.style.background = e.target.value;
}


let isDrawing = false;
container.onmousedown = () => (isDrawing = true);
container.onmouseup = () => (isDrawing = false);
container.onmouseleave = () => (isDrawing = false);


function toggleGridLine(e) {
    const boxes = container.querySelectorAll("div");
    boxes.forEach(box => {
        box.classList.toggle("border");
    })
    e.target.classList.toggle('active');
}

function toggleGridCircle(e) {
    const boxes = container.querySelectorAll("div");
    boxes.forEach(box => {
        box.classList.toggle("border-circle");
    })

    e.target.classList.toggle('active');

}

function changeSize(value) {
    setCurrentSize(value);
    updateGridSize(value);
    resetGrid();
}

function updateGridSize(value) {
    gridSize.innerHTML = `${value} x ${value}`;
}

function resetGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    container.innerHTML = '';
    gridCircleBtn.classList.remove("active");
    gridLineBtn.classList.remove("active");

}

function setupGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.addEventListener('mouseover', changeColor);
        gridItem.addEventListener('mousedown', changeColor);
        container.appendChild(gridItem);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !isDrawing) return;
    if (currentMode === 'rainbow') {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }else if (currentMode === 'gray') {
        const randomNum = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${randomNum}, ${randomNum}, ${randomNum})`;
    }
     else if (currentMode === 'color-picker') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'black') {
        e.target.style.backgroundColor = "#000";
    }
     else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'transparent';
    }
}

function activeButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    }else if (currentMode === 'black') {
        blackBtn.classList.remove('active');
    } else if (currentMode === 'gray') {
        grayBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } 

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    }else if (newMode === 'black') {
        blackBtn.classList.add('active')
    } else if (newMode === 'gray') {
        grayBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }  
}

window.onload = () => {
    setupGrid(initialSize)
}
