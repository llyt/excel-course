import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getValue(state, id) {
  return state[id]
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const value = getValue(state.dataState, id)
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div
      class='cell'
      data-col='${col}'
      data-id=${id}
      data-type='cell'
      data-value='${value || ''}'
      style='${styles}; width: ${width}'
      contenteditable
    >
      ${parse(value) || ''}
    </div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div 
      class='column' 
      data-type='resizable' 
      data-col=${index}
      style='width: ${width};'
    >
      ${col}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}

function createRow(content, height, number = 0) {
  const resizer = number ?
    `<div class='row-resize' data-resize='row'></div>` :
    ''
  return `
    <div 
      class='row' 
      data-type='resizable' 
      data-row='${number}'
      style='height: ${height}'
    >
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

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A
  const rows = []
  // Create a first row with letters A, B, C, ...
  const cols = new Array(colsCount + 1)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')
  rows.push(createRow(cols, getHeight(state.rowState)))

  // Create remaining rows
  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount + 1)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(cells, getHeight(state.rowState, row + 1), row + 1))
  }

  return rows.join('')
}
