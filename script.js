const container = document.getElementById('container');
let currentMode = 'black';

// --- CREATE GRID FUNCTION ---
function createGrid(size) {
  container.innerHTML = ''; // Clear old grid
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Each square listens for mouseover events
    square.addEventListener('mouseover', () => colorSquare(square));

    container.appendChild(square);
  }
}

// --- COLOR FUNCTION ---
function colorSquare(square) {
  if (currentMode === 'black') {
    square.style.backgroundColor = 'black';
    square.style.opacity = 1;
  } else if (currentMode === 'rainbow') {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    square.style.opacity = 1;
  } else if (currentMode === 'darken') {
    let opacity = parseFloat(square.style.opacity) || 0;
    square.style.backgroundColor = 'black';
    square.style.opacity = Math.min(opacity + 0.1, 1);
  } else if (currentMode === 'erase') {
    square.style.backgroundColor = '';
    square.style.opacity = '';
  }
}

// --- BUTTON: CHANGE GRID SIZE ---
const resizeBtn = document.getElementById('resize');
resizeBtn.addEventListener('click', () => {
  let newSize = parseInt(prompt('Enter grid size (max 100):'));
  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert('Please enter a number between 1 and 100!');
  }
});

// --- BUTTON: CLEAR GRID ---
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear Grid';
clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.square').forEach(square => {
    square.style.backgroundColor = '';
    square.style.opacity = '';
  });
});
document.body.insertBefore(clearBtn, container);

// --- COLOR MODE BUTTONS ---
document.getElementById('blackMode').onclick = () => currentMode = 'black';
document.getElementById('rainbowMode').onclick = () => currentMode = 'rainbow';
document.getElementById('darkenMode').onclick = () => currentMode = 'darken';
document.getElementById('eraseMode').onclick = () => currentMode = 'erase';
// --- INITIAL GRID ---
createGrid(16);