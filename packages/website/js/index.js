'use strict';

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

const updateCellColor = (color, rowIndex, colIndex) => {
  fetch('http://localhost:3003/canvas', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color, rowIndex, colIndex }),
  })
  .then(res => res.json())
  .then(renderTable)
};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then(renderTable);
