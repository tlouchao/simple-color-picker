import React  from "react"

const PaletteSingle = (props) => {
    return (
        <div style={{backgroundColor: props.bgColor}} className='palette-single'>
            <span className='palette-single-hex-color'>{props.bgColor}</span>
        </div>
    )
}

export default PaletteSingle