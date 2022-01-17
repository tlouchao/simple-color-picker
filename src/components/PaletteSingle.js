import React  from "react"
import {rgbToGreyWeighted, rgbToHexString} from "../helpers/colorUtils"

const PaletteSingle = (props) => {

    const hexColor = ((rgbToGreyWeighted(props.bgColor)) > .5) ? "black" : "white"
    const hexString = rgbToHexString(props.bgColor)

    return (
        <div style={{backgroundColor: hexString}} className='palette-single'>
            <span style={{color: hexColor}} className='palette-single-hex-color'>{hexString}</span>
        </div>
    )
}

export default PaletteSingle