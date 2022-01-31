import React, {useEffect, useState} from "react"
import { MAX_UINT8 } from "common/constants"
import * as canvas from "canvas/canvas"
import {RGB, HSV} from "colorspace/colorspace"
import Type from "colorspace/Type"

const ColorPicker = () => {
    
    // TODO: Support spread operator and array
    const [currentColor, setCurrentColor] = useState(new RGB({"isInt": true, "vec": [0, 127, 0]}))

    useEffect(() => {
        let hsv = HSV.from(currentColor)
        canvas.drawCanvasBg(hsv.vec[0])
        }, [])

    // Render component
    return (
        <div id='color-picker-wrapper'>
            <div id='color-picker'>
                <div id='header'><h1>Color Picker</h1></div>
                <div id='canvas-wrapper'>
                    <div id='square' style={{'backgroundColor': currentColor.getHexString()}}></div>
                    <canvas id='canvas' width='400' height='200'></canvas>
                </div>
                <div id='conversions-wrapper'>
                    <div><input id='slider' type='range' min='0' max={MAX_UINT8} onChange={(e) => console.log(e.currentTarget.value)}></input></div>
                    <div id='hex' className='txt-format'><h2>Hex</h2></div>
                    <div id='conversions'>
                        {Object.keys(Type).map(k => 
                        <div id={k} key={"cv " + k}className='cvelem txt-format'><h2>{k}</h2></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker