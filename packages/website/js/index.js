'use strict';

const $table = document.querySelector('#grid-table');

const renderTable = (grid) => {

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

      // add cell to row
      $tr.appendChild($td);
    }

    // add row to table
    $table.appendChild($tr);
  }

};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then(renderTable);
