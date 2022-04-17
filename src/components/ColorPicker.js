import React, {useEffect, useState, useRef} from "react"
import {MAX_DEG, CURSOR_RADIUS} from "common/constants"
import {RGB, HSV, HSL, Type} from "colorspace/colorspace"

const ColorPicker = () => {
    
    const [hue, setHue] = useState(0) // retain hue info if converted to greyscale
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isDrawing, setIsDrawing] = useState(false)

    const [currentColor, setCurrentColor] = useState(new RGB(127, 0, 0))
    const canvasRef = useRef(null)

    /*
    useEffect(() => {
        window.addEventListener('onMouseUp', handleMouseUp)
        return() => {
            window.removeEventListener('onMouseUp', handleMouseUp)
        }
    })
*/
    useEffect(() => {
        if (canvasRef && canvasRef.current){draw()} 
    }, [hue, currentColor])

    const handleChangeSlider = (e) => {
        // hue only modified w/ slider
        setHue(parseInt(e.target.value))
        const hsvTmp = HSV.from(currentColor)
        const hsv = new HSV(hue, hsvTmp.vec[1], hsvTmp.vec[2])
        setCurrentColor(RGB.from(hsv))
    }

    // mouseevent handlers
    const handleMouseDown = (e) => {
        setX(Math.min(400, Math.max(0, Math.round(e.clientX - canvasRef.current.getBoundingClientRect().left))))
        setY(Math.min(200, Math.max(0, Math.round(e.clientY - canvasRef.current.getBoundingClientRect().top))))
        setIsDrawing(true)
    }

    const handleMouseMove = (e) => {
        if (isDrawing) {
            setX(Math.min(400, Math.max(0, Math.round(e.clientX - canvasRef.current.getBoundingClientRect().left))))
            setY(Math.min(200, Math.max(0, Math.round(e.clientY - canvasRef.current.getBoundingClientRect().top))))
            console.log(x)
            console.log(y)
            const ctx = canvasRef.current.getContext('2d')
            const arr = ctx.getImageData(x, y, 1, 1).data
            console.log("Array: " + [arr[0], arr[1], arr[2]])
            setCurrentColor(new RGB(arr[0], arr[1], arr[2]))
        }
    }

    const handleMouseUp = (e) => {
        setIsDrawing(false)
    }

    const draw = () => {
        if (canvasRef.current){

            const canvas = canvasRef.current
            const ctx = canvasRef.current.getContext('2d')

            const hsl = new HSL(hue, 100, 50)

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
            drawCursor()
        }
    }

    const drawCursor = () => {
        if (canvasRef.current){
            const ctx = canvasRef.current.getContext('2d')

            const cursor = new Path2D()
            cursor.arc(x, y, CURSOR_RADIUS, 0, Math.PI * 2, true)

            ctx.fillStyle = hue
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
                    <canvas id='canvas' width='400' height='200' ref={canvasRef}
                    onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>
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