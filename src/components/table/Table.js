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

      document.onmousemove = e => {
        // console.log($parent.getCoords())
        console.log(e.pageX)
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
        console.log(delta)
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
