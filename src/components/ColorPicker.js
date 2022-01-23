import React, {useEffect, useState} from "react"
import RGB from "colorspace/RGB"

const ColorPicker = () => {
    
    // Render component
    return (
        <div id='color-picker-wrapper'>
            <div id='color-picker'>
                <div id='header'><h1>Color Picker</h1></div>
                <div id='canvas-wrapper'>
                    <div id='square'></div>
                    <div id='canvas'></div>
                </div>
                <div id='conversions-wrapper'>
                    <div className='ce-0'><input id='slider' type='range'></input></div>
                    <div id='hex' className='ce-1 txt-format'><h2>Hex</h2></div>
                    <div id='conversions' className='ce-2'>
                        <div id='RGB' className='txt-format'><h2>RGB</h2></div>
                        <div id='CMYK' className='txt-format'><h2>CMYK</h2></div>
                        <div id='HSV' className='txt-format'><h2>HSV</h2></div>
                        <div id='HSL' className='txt-format'><h2>HSL</h2></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker