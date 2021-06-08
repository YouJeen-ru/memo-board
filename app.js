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