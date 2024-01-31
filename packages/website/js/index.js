'use strict';

const socket = io('http://localhost:3004');
const $table = document.querySelector('#grid-table');
const $colorPicker = document.querySelector('#color-picker');

const renderTable = (grid) => {

  // clear table before handling
  $table.innerHTML = ''

  // iterate over grid
  for (let i = 0; i < grid.length; i++) {
    const gridRow = grid[i];
    
    // create row for each line in grid
    const $tr = document.createElement('tr');

    // iterate over row
    for (let j = 0; j < gridRow.length; j++) {
      const color = gridRow[j];
      
      // create cell for each
      const $td = document.createElement('td');

      // Apply color to cell
      $td.style.backgroundColor = color;

      // make cell focusable
      $td.tabIndex = 0

      // Add keyboard navigation
      $td.addEventListener('keydown', (e) => handleKeyboardNavigation(e, $td, j));

      // Add click event listener to each cell
      $td.addEventListener('click', () => {
        const selectedColor = $colorPicker.value;
        updateCellColor(selectedColor, i, j);
      });

      // add cell to row
      $tr.appendChild($td);
    }

    // add row to table
    $table.appendChild($tr);
  }

};

const handleKeyboardNavigation = (event, cell, colIndex) => {
  switch (event.key) {
    case 'ArrowLeft':
      // Navigate to the left cell
      const leftCell = cell.previousElementSibling;
      if (leftCell) leftCell.focus();
      break;
    case 'ArrowRight':
      // Navigate to the right cell
      const rightCell = cell.nextElementSibling;
      if (rightCell) rightCell.focus();
      break;
    case 'ArrowUp':
      // Navigate to the cell above
      const upperRow = cell.parentElement.previousElementSibling;
      const upperCell = upperRow?.children[colIndex];
      if (upperCell) upperCell.focus();
      break;
    case 'ArrowDown':
      // Navigate to the cell below
      const lowerRow = cell.parentElement.nextElementSibling;
      const lowerCell = lowerRow?.children[colIndex];
      if (lowerCell) lowerCell.focus();
      break;
    case 'Enter':
      // Trigger click event
      cell.click();
      break;
  }
};

const updateCellColor = (color, rowIndex, colIndex) => {
  socket.emit('updateCell', { color, rowIndex, colIndex });
};

socket.on('canvasUpdate', (updatedCanvas) => {
  renderTable(updatedCanvas);
});
