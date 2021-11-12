import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import {$} from '@core/dom'
import { matrix } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (shouldResize(event)) {
     resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        console.log('just a click', $target.id(true))
        console.log('with shift', this.selection.current.id(true))
        const target = $target.id(true)
        const current = this.selection.current.id(true)


        const $cells = matrix(target, current).map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)

        
      } else {
        this.selection.select($target)
      }
    }
  }

  prepare() {
    console.log('prepare')
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    console.log('init')

    // this.selection = new TableSelection()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    console.log(this)
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
