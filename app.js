const board = document.querySelector('.board')
const selectionDiv = document.querySelector('.selection')

// Tracking variables

let mouseClicked = false

let movingMemo = false
let resizingMemo = false


//Mouse coordinate variables

let offsetXStart = 0
let offsetYStart = 0
let offsetXEnd = 0
let offsetYEnd = 0


//Current offset used to style selection div

let offsetXCurrent = 0
let offsetYCurrent = 0

//Board event listeners

board.addEventListener('mousedown', (e) => {
    mouseClicked = true

    offsetXStart = e.offsetX
    offsetYStart = e.offsetY

    if (!movingMemo) {
        selectionDiv.style.top = `${offsetYStart}px`
        selectionDiv.style.left = `${offsetXStart}px`
        board.style.cursor = 'crosshair'
    }
})

board.addEventListener('mouseup', (e) => {

    mouseClicked = false
    offsetXEnd = e.offsetX
    offsetYEnd = e.offsetY
    let width = offsetXEnd - offsetXStart
    let height = offsetYEnd - offsetYStart

    selectionDiv.style.width = '0px'
    selectionDiv.style.height = '0px'
    board.style.cursor = 'default'

})

board.addEventListener('mousemove', (e) => {

    if (mouseClicked && !movingMemo && !resizingMemo) {
        offsetXCurrent = e.offsetX - offsetXStart
        offsetYCurrent = e.offsetY - offsetYStart

        selectionDiv.style.width = `${offsetXCurrent}px`
        selectionDiv.style.height = `${offsetYCurrent}px`
    }

})

class Memo {
    constructor(id, position, size, content) {
        this.id = id
        this.position = position
        this.size = size
        this.content = content
        this.moving = false
        this.resizing = false
        this.createMemo()
    }

    createMemo() {
        this.div = document.createElement('div')
        this.div.classList.add('memo')

        this.div.style.top = `${this.position.top}px`
        this.div.style.left = `${this.position.left}px`
        this.div.style.height = `${this.position.height}`
        this.div.style.width = `${this.position.width}`

        this.move = document.createElement('div')
        this.move.classList.add('move')
        this.move.addEventListener('mousedown', this.mouseDownMove.bind(this))
        window.addEventListener('mouseup', this.mouseUp.bind(this))
        this.div.appendChild(this.move)

        this.close = document.createElement('close')
        this.close.classList.add('close')
        this.move.appendChild(this.close)
        this.close.addEventListener('click', this.deleteMemo.bind(this))

        this.text = document.createElement('textarea')
        this.text.classList.add('text')
        this.text.value = this.content
        this.text.addEventListener('keyup', this.updateText.bind(this))
        // this.text.addEventListener('blur', updateLocalStorage)
        this.div.appendChild(this.text)

        this.resize = document.createElement('div')
        this.resize.classList.add('resize')
        this.resize.addEventListener('mousedown', this.mouseDownResize.bind(this))
        this.div.appendChild(this.resize)

        board.appendChild(this.div)
    }
}