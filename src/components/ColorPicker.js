import React, {useEffect, useState} from "react"
import Type from "colorspace/Type"
import * as cjs from "canvas/canvas"
import {RGB, HSV} from "colorspace/colorspace"

const ColorPicker = () => {
    
    const [selectedColor, useSelectedColor] = useState(new RGB({"isInt": true, "vec": [255, 0, 0]}))

    useEffect(() => {
        cjs.drawCanvasBg(HSV.from(selectedColor)[0]) // get the hue channel
      });

    // Render component
    return (
        <div id='color-picker-wrapper'>
            <div id='color-picker'>
                <div id='header'><h1>Color Picker</h1></div>
                <div id='canvas-wrapper'>
                    <div id='square'></div>
                    <canvas id='canvas' width='400' height='200'></canvas>
                </div>
                <div id='conversions-wrapper'>
                    <div><input id='slider' type='range'></input></div>
                    <div id='hex' className='txt-format'><h2>Hex</h2></div>
                    <div id='conversions'>
                        {Object.keys(Type).map(k => 
                        <div id={k} className='cvelem txt-format'><h2>{k}</h2></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker