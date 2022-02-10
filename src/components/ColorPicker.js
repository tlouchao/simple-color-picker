import React, {useEffect, useLayoutEffect, useState} from "react"
import Canvas from "canvas/canvas"
import {MAX_DEG} from "common/constants"
import {RGB, HSV, Type} from "colorspace/colorspace"

const ColorPicker = () => {
    
    const [canvas, setCanvas] = useState(null) // wait for DOM to render before accessing
    const [currentColor, setCurrentColor] = useState(new RGB(127, 0, 0))

    useEffect(() => {
        if (canvas == null) {
            setCanvas(new Canvas())
        }
    }, [])

    useEffect(() => {
        if (canvas != null){
            const hsv = HSV.from(currentColor)
            canvas.draw(hsv.vec)
        }
    }, [canvas, currentColor])

    const handleChangeSlider = (event) => {
        const hue = parseInt(event.target.value)
        const hsv = new HSV(hue, 100, 50)
        setCurrentColor(RGB.from(hsv))
    }

    return (
        <div id='color-picker-wrapper'>
            <div id='color-picker'>
                <div id='header'><h1>Color Picker</h1></div>
                <div id='canvas-wrapper'>
                    <div id='square' style={{'backgroundColor': currentColor.toHexString()}}></div>
                    <canvas id='canvas' width='400' height='200'></canvas>
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