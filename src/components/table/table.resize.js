import {$} from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    // console.log(event.target.dataset.resize) 
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [sideProp]: '-5000px'
    })

    console.log($parent.data.col)

    document.onmousemove = e => {
      // console.log($parent.getCoords())
      if (type === 'col') {
        console.log(e.pageX)
        const delta = e.pageX - coords.right

        $resizer.css({right: -delta + 'px'})
        value = coords.width + delta
        // $parent.$el.style.width = value + 'px'
        // $parent.css({
        //   width: value + 'px'
        // })
        // console.log(delta)
        // cells.forEach(el => el.style.width = value + 'px')
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px'
        })
        // $parent.$el.style.height = value + 'px'
        // $parent.css({
        //   height: value + 'px'
        // })
      }
    }

    document.onmouseup = e => {
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null
      })

      document.onmousemove = null
      document.onmouseup = null
    }
  })
}