import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      // console.log(event.target.dataset.resize) 
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      console.log($parent.data.col)

      document.onmousemove = e => {
        // console.log($parent.getCoords())
        if (type === 'col') {
          console.log(e.pageX)
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          // $parent.$el.style.width = value + 'px'
          $parent.css({
            width: value + 'px'
          })
          console.log(delta)
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          // $parent.$el.style.height = value + 'px'
          $parent.css({
            height: value + 'px'
          })
        }
      }

      document.onmouseup = e => {
        document.onmousemove = null
      }
    }
  }

  toHTML() {
    return createTable()
    // return `
    //   <div class="row">

    //     <div class="row-info"></div>

    //     <div class="row-data">
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>
    //       <div class="column">
    //         A
    //       </div>
    //       <div class="column">
    //         B
    //       </div>
    //       <div class="column">
    //         C
    //       </div>

    //     </div>

    //   </div>
      
    //   <div class="row">
    //     <div class="row-info">
    //       1
    //     </div>

    //     <div class="row-data">
    //       <div class="cell selected" contenteditable="">A1</div>
    //       <div class="cell" contenteditable="">B2</div>
    //       <div class="cell" contenteditable="">C3</div>
    //     </div>
    //   </div>

    //   <div class="row">
    //     <div class="row-info">
    //       2
    //     </div>

    //     <div class="row-data">
    //       <div class="cell">A1</div>
    //       <div class="cell">B2</div>
    //       <div class="cell">C3</div>
    //     </div>
    //   </div>
    // `
  }
}
