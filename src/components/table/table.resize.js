import {$} from '@core/dom'

export function resizeHandler(event, $root) {
  const type = event.target.dataset.resize
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  let value

  $resizer.css({
    opacity: 1,
  })

  const eventDispatcher = {
    'col': (e) => {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        bottom: '-5000px',
        right: -delta + 'px'
      })
    },
    'row': (e) => {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px',
        right: '-5000px'
      })
    }
  }

  document.onmousemove = eventDispatcher[type]

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => $(el).css({width: value + 'px'}))
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
