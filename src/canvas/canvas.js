import { CURSOR_RADIUS } from "common/constants";

class Canvas {

    #canvas
    #ctx
    #handleMouseDown
    #handleMouseMove
    #handleMouseUp
    #hue = 255
    #x = 0
    #y = 0
    #isDrawing = false

    constructor(){

        this.#canvas = document.getElementById("canvas")
        this.#ctx = this.#canvas.getContext("2d")

        this.#ctx.lineWidth = 2;
        this.#ctx.strokeStyle = "white"

        this.#handleMouseDown = e => {
            this.#x = e.offsetX;
            this.#y = e.offsetY;
            this.#isDrawing = true;
        }

        this.#handleMouseMove = e => {
            if (this.#isDrawing) {
                this.#x = e.offsetX;
                this.#y = e.offsetY;

                const arr = this.#ctx.getImageData(this.#x, this.#y, 1, 1).data
                console.log([arr[0], arr[1], arr[2]])

                // redraw canvas
                this.draw([this.#hue, 100, 50])
            }
        }

        this.#handleMouseUp = e => {
            if (this.#isDrawing) {
                this.#isDrawing = false;
            }
        }

        this.draw([this.#hue, 100, 50])
        this.#canvas.addEventListener('mousedown', this.#handleMouseDown)
        this.#canvas.addEventListener('mousemove', this.#handleMouseMove)
        window.addEventListener('mouseup', this.#handleMouseUp)
    }

    removeEventListeners() {
        this.#canvas.removeEventListener('mousedown', this.#handleMouseDown)
        this.#canvas.removeEventListener('mousemove', this.#handleMouseMove)
        window.removeEventListener('mouseup', this.#handleMouseUp)
    }

    draw(state) {

        this.#hue = state[0]
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        const gradGrey = this.#ctx.createLinearGradient(0,0,0,this.#canvas.height)
        gradGrey.addColorStop(0,"white")
        gradGrey.addColorStop(1,"black")

        this.#ctx.fillStyle = gradGrey;
        this.#ctx.fillRect(0,0,this.#canvas.width, this.#canvas.height);

        const gradHue = this.#ctx.createLinearGradient(0,0,this.#canvas.width, 0)
        gradHue.addColorStop(0, `hsla(${state[0]}, ${state[1]}%, ${state[2]}%, 0)`)
        gradHue.addColorStop(1, `hsla(${state[0]}, ${state[1]}%, ${state[2]}%, 1)`)

        this.#ctx.fillStyle = gradHue;
        this.#ctx.globalCompositeOperation = "multiply";
        this.#ctx.fillRect(0,0,this.#canvas.width, this.#canvas.height);
        this.#ctx.globalCompositeOperation = "source-over";
        this.drawCursor()
    }

    drawCursor() {
        const cursor = new Path2D()
        cursor.arc(this.#x, this.#y, CURSOR_RADIUS, 0, Math.PI * 2, true)

        this.#ctx.fillStyle = this.#hue
        this.#ctx.beginPath()
        this.#ctx.stroke(cursor)
        this.#ctx.fill()
    }
}

export default Canvas