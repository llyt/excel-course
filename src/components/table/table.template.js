
const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class='cell' contenteditable></div>
  `
}

function toColumn(element) {
  return `
    <div class='column'>
      ${element}
    </div>
  `
}

function createRow(content, number) {
  return `
    <div class='row'>
      <div class='row-info'>${number ? number : ''}</div>
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
  for (let i = 0; i < rowsCount; i += 1) {
    const cells = new Array(colsCount + 1)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
