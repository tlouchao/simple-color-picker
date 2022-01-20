import React  from "react"
import {vec3ToGreyWeighted, vec3ToHexString} from "../colorspace/vecUtils"

const PaletteSingle = (props) => {

    const hexColor = ((vec3ToGreyWeighted(props.bgColor)) > .5) ? "black" : "white"
    const hexString = vec3ToHexString(props.bgColor)

    return (
        <div style={{backgroundColor: hexString}} className='palette-single'>
            <span style={{color: hexColor}} className='palette-single-hex-color'>{hexString}</span>
        </div>
    )
}

export default PaletteSingle