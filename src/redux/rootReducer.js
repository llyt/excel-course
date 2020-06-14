import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE
} from './types'

export function rootReducer(state, action) {
  let key
  let value
  switch (action.type) {
    case TABLE_RESIZE:
      key = action.data.type + 'State'
      return {
        ...state,
        [key]: {
          ...state[key],
          [action.data.id]: action.data.value
        }
      }
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        dataState: {
          ...state.dataState,
          [action.data.id]: action.data.value
        }
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }

    case APPLY_STYLE:
      key = 'stylesState'
      value = state[key] || {}
      action.data.ids.forEach((id) => {
        value[id] = {...value[id], ...action.data.value}
      })
      return {
        ...state,
        [key]: value,
        currentStyles: {
          ...state.currentStyles,
          ...action.data.value
        }
      }

    case CHANGE_TITLE:
      return {
        ...state,
        title: action.data
      }

    default: return state
  }
}
