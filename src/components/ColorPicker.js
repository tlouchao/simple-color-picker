import React, {createRef, useEffect, useState} from "react"
import {MAX_DEG, CURSOR_RADIUS} from "common/constants"
import {RGB, HSV, HSL, Type} from "colorspace/colorspace"

const ColorPicker = () => {
    
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isDrawing, setIsDrawing] = useState(false)

    const [currentColor, setCurrentColor] = useState(new RGB(127, 0, 0))
    const canvasRef = createRef()

    useEffect(() => {

        // event listeners and draw initial canvas on mount
        if (canvasRef.current) {
            canvasRef.current.addEventListener('onMouseDown', handleMouseDown)
            canvasRef.current.addEventListener('onMouseMove', handleMouseMove)
            canvasRef.current.addEventListener('onMouseUp', handleMouseUp)
            draw(currentColor)
        }

        // remove event listeners on unmount
        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeEventListener('onMouseDown', handleMouseDown)
                canvasRef.current.removeEventListener('onMouseMove', handleMouseMove)
                canvasRef.current.removeEventListener('onMouseUp', handleMouseUp)
            }
        }
    }, [currentColor])

    const handleChangeSlider = (e) => {
        const hue = parseInt(e.target.value)
        const hsvTmp = HSV.from(currentColor)
        const hsv = new HSV(hue, hsvTmp.vec[1], hsvTmp.vec[2])
        setCurrentColor(RGB.from(hsv))
    }

    // mouseevent handlers
    const handleMouseDown = (e) => {
        if (canvasRef.current) {
            setX(e.offsetX)
            setY(e.offsetY)
            setIsDrawing(true)
        }
    }

    const handleMouseMove = (e) => {
        if (isDrawing && canvasRef.current) {
            console.log(e)
            setX(e.offsetX)
            setY(e.offsetY)
            const ctx = canvasRef.current.getContext('2d')
            const arr = ctx.getImageData(x, y, 1, 1).data
            console.log([arr[0], arr[1], arr[2]])
            setCurrentColor(RGB.from(new HSL(arr[0], arr[1], arr[2])))
        }
    }

    const handleMouseUp = (e) => {
        if (isDrawing && canvasRef.current) {
            setIsDrawing(false)
        }
    }

    const draw = (cc) => {
        if (canvasRef.current){

            const canvas = canvasRef.current
            const ctx = canvasRef.current.getContext('2d')

            const hslTmp = HSL.from(cc)
            const hsl = new HSL(hslTmp.vec[0], 100, 50)

            ctx.lineWidth = 2
            ctx.strokeStyle = "white"
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradGrey = ctx.createLinearGradient(0,0,0,canvas.height)
            gradGrey.addColorStop(0,"white")
            gradGrey.addColorStop(1,"black")

            ctx.fillStyle = gradGrey;
            ctx.fillRect(0,0,canvas.width, canvas.height);

            const gradHue = ctx.createLinearGradient(0,0,canvas.width, 0)
            gradHue.addColorStop(0, `hsla(${hsl.vec[0]}, ${hsl.vec[1]}%, ${hsl.vec[2]}%, 0)`)
            gradHue.addColorStop(1, `hsla(${hsl.vec[0]}, ${hsl.vec[1]}%, ${hsl.vec[2]}%, 1)`)

            ctx.fillStyle = gradHue;
            ctx.globalCompositeOperation = "multiply";
            ctx.fillRect(0,0,canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";
            drawCursor(hsl)
        }
    }

    const drawCursor = (hsl) => {
        if (canvasRef.current){
            const ctx = canvasRef.current.getContext('2d')

            const cursor = new Path2D()
            cursor.arc(x, y, CURSOR_RADIUS, 0, Math.PI * 2, true)

            ctx.fillStyle = hsl.vec[0]
            ctx.beginPath()
            ctx.stroke(cursor)
            ctx.fill()
        }
    }

    return (
        <div id='color-picker-wrapper'>
            <div id='color-picker'>
                <div id='header'><h1>Color Picker</h1></div>
                <div id='canvas-wrapper'>
                    <div id='square' style={{'backgroundColor': currentColor.toHexString()}}></div>
                    <canvas id='canvas' width='400' height='200' ref={canvasRef} />
                </div>
                <div id='conversions-wrapper'>
                    <div><input id='slider' type='range' min='0' max={MAX_DEG} onChange={handleChangeSlider}></input></div>
                    <div id='hex' className='txt-format'>
                        <h2>Hex</h2>
                        <p>{currentColor.toHexString()}</p>
                        </div>
                    <div id='conversions'>
                        {Object.keys(Type).map(k => 
                            <div id={k} key={"cv " + k}className='cvelem txt-format'>
                                <h2>{k}</h2>
                                <p>{(k == 'RGB') ? currentColor.toString() : Type[k].from(currentColor).toString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker