import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import {$} from '@core/dom'
import { matrix, nextSelector } from './table.functions'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch({type: 'TEST'})
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      console.log('Resize data', data)
    } catch (e) {
      console.log(e)
    }
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (shouldResize(event)) {
     this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        console.log('just a click', $target.id(true))
        console.log('with shift', this.selection.current.id(true))
        // const target = $target.id(true)
        // const current = this.selection.current.id(true)


        const $cells = matrix(target, current).map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)

        
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
    console.log(event)
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  prepare() {
    console.log('prepare')
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    console.log(this)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      console.log('Table from Formula', text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    // this.$subscribe(state => {
    //   console.log('TableState', state)
    // })
  }

  toHTML() {
    return createTable(20, this.store.getState())
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
