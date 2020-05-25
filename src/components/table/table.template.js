const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, col) {
    return `
    <div
      class='cell'
      data-col='${col}'
      data-id='${row}:${col}'
      data-type='cell'
      contenteditable>
    </div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class='column' data-type='resizable' data-col=${index}>
      ${col}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}

function createRow(content, number) {
  const resizer = number ?
    `<div class='row-resize' data-resize='row'></div>` :
    ''
  return `
    <div class='row' data-type='resizable'>
      <div class='row-info'>
        ${number ? number : ''}
        ${resizer}
      </div>
      <div class='row-data'>${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A
  const rows = []
  // Create a first row with letters A, B, C, ...
  const cols = new Array(colsCount + 1)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(cols))

  // Create remaining rows
  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount + 1)
        .fill('')
        .map(toCell(row)) // Hm... that's no delicious
        .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
