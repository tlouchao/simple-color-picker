import React  from "react"
import {vec3ToGreyWeighted, vec3ToHexString} from "../colorspace/utils"

const PaletteSingle = (props) => {

    return (
        <div id={props.id} style={{backgroundColor: props.bgColor}} className='palette-single'>
            <span style={{color: props.lbColor}} className='palette-single-hex-color'>{props.bgColor}</span>
        </div>
    )
}

export default PaletteSingle