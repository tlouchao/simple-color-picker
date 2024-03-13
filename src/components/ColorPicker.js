import React, {useEffect, useState, useRef} from "react"
import {MAX_DEG, CURSOR_RADIUS} from "../common/constants"
import {RGB, HSV, HSL, Type} from "../colorspace/colorspace"
import CopyIcon from "../static/imgs/copy-regular.svg"
import CheckIcon from "../static/imgs/check-solid.svg"
import SVG from 'react-inlinesvg'

const ColorPicker = () => {
    
    const canvasRef = useRef(null)
    const width = 400
    const height = 200

    const [hue, setHue] = useState(0)
    const [x, setX] = useState(width)
    const [y, setY] = useState(height / 2)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isHexCopied, setIsHexCopied] = useState(false)
    const [currentColor, setCurrentColor] = useState(new RGB(127, 0, 0))

    useEffect(() => {
        if (canvasRef && canvasRef.current){draw()} 
    }, [hue, currentColor])

    const handleChangeSlider = (e) => {
        const hueTmp = parseInt(e.target.value)
        const hsvTmp = HSV.from(currentColor)
        const hsv = new HSV(parseInt(hueTmp), hsvTmp.vec[1], hsvTmp.vec[2])
        setHue(hueTmp)
        setCurrentColor(RGB.from(hsv))
        if (isHexCopied){
            setIsHexCopied(false)
        }
    }

    const handleClickCopy = (e) => {
        const copyText = e.target.dataset.val
        navigator.clipboard.writeText(copyText)
        setIsHexCopied(true)
    }

    // mouseevent & touchevent handlers
    const handleDown = (e) => {
        setPosHelper(e)
        setIsDrawing(true)
    }

    const handleMove = (e) => {
        if (isDrawing) {
            setPosHelper(e)
            const ctx = canvasRef.current.getContext('2d')
            const arr = ctx.getImageData(x, y, 1, 1).data
            setCurrentColor(new RGB(arr[0], arr[1], arr[2]))
            if (isHexCopied){
                setIsHexCopied(false)
            }
        }
    }

    const handleUp = (e) => {
        setIsDrawing(false)
    }

    const setPosHelper = (e) => {
        if (canvasRef.current) {
            let tmpX;
            let tmpY;
            if (e.type == "touchstart" || e.type == "touchmove"){
                tmpX = e.touches[0].clientX;
                tmpY = e.touches[0].clientY;
            } else if (e.type == "mousedown" || e.type == "mousemove") {
                tmpX = e.clientX;
                tmpY = e.clientY;
            } else {
                console.log("Undefined event: " + e)
            }
            setX(Math.min(width, Math.max(0, Math.round(
                tmpX - canvasRef.current.getBoundingClientRect().left))))
            setY(Math.min(height, Math.max(0, Math.round(
                tmpY - canvasRef.current.getBoundingClientRect().top))))
        }
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
                    <canvas id='canvas' width={width} height={height} ref={canvasRef}
                    onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp}
                    onTouchStart={handleDown} onTouchMove={handleMove} onTouchEnd={handleUp}/>
                </div>
                <div id='conversions-wrapper'>
                    <div><input id='slider' type='range' defaultValue='0' min='0' max={MAX_DEG} onChange={handleChangeSlider}></input></div>
                    <div id='hex' className='txt-format'>
                        <div id='hex-string'>
                            <h2>Hex</h2>
                            <p>{currentColor.toHexString()}</p>
                        </div>
                        <div id='copy-icon' data-val={currentColor.toHexString()} onClick={handleClickCopy}>
                            {isHexCopied ? <SVG src={CheckIcon}/> : <SVG src={CopyIcon}/> }
                        </div>
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