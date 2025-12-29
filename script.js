// Etch-a-Sketch - The Odin Project

const container = document.getElementById('container');
const resizeBtn = document.getElementById('resize-btn');
const clearBtn = document.getElementById('clear-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const darkenBtn = document.getElementById('darken-btn');

// Grid size (default 16x16)
let gridSize = 16;

// Drawing modes
let rainbowMode = false;
let darkenMode = false;

// Container size in pixels
const CONTAINER_SIZE = 640;

// Create the grid
function createGrid(size) {
    // Clear existing grid
    container.innerHTML = '';
    
    // Calculate square size
    const squareSize = CONTAINER_SIZE / size;
    
    // Create size x size squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        
        // Set size using Flexbox (width and height)
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Initialize opacity data for darken mode
        square.dataset.opacity = '0';
        
        // Add hover event listener
        square.addEventListener('mouseenter', colorSquare);
        
        container.appendChild(square);
    }
}

// Color a square on hover
function colorSquare(e) {
    const square = e.target;
    
    if (rainbowMode) {
        // Extra credit: Random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (darkenMode) {
        // Extra credit: Progressive darkening
        let currentOpacity = parseFloat(square.dataset.opacity);
        
        if (currentOpacity < 1) {
            currentOpacity += 0.1;
            square.dataset.opacity = currentOpacity.toString();
            
            // If square has a color, darken it; otherwise start with gray
            if (square.style.backgroundColor === '' || 
                square.style.backgroundColor === 'rgb(248, 249, 250)') {
                square.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
            } else {
                // Apply darkening overlay
                square.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
            }
        }
    } else {
        // Default: solid black
        square.style.backgroundColor = '#333';
    }
}

// Generate random RGB color (helper for rainbow mode)
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Clear all button active states
function clearActiveButtons() {
    rainbowBtn.classList.remove('active');
    darkenBtn.classList.remove('active');
}

// Resize button - prompt for new grid size
resizeBtn.addEventListener('click', () => {
    let newSize = prompt('Enter number of squares per side (max 100):');
    
    // Validate input
    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1) {
        alert('Please enter a valid number.');
        return;
    }
    
    if (newSize > 100) {
        alert('Maximum size is 100. Setting to 100.');
        newSize = 100;
    }
    
    gridSize = newSize;
    createGrid(gridSize);
});

// Clear button - reset the grid
clearBtn.addEventListener('click', () => {
    createGrid(gridSize);
});

// Rainbow mode toggle
rainbowBtn.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    darkenMode = false;
    
    clearActiveButtons();
    if (rainbowMode) {
        rainbowBtn.classList.add('active');
    }
});

// Darken mode toggle
darkenBtn.addEventListener('click', () => {
    darkenMode = !darkenMode;
    rainbowMode = false;
    
    clearActiveButtons();
    if (darkenMode) {
        darkenBtn.classList.add('active');
    }
});

// Initialize with 16x16 grid
createGrid(gridSize);

console.log('Etch-a-Sketch loaded! Hover over the grid to draw.');