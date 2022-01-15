import React from "react"
import PaletteSingle from "./PaletteSingle"

function Palette() {
    // TODO: write rgbUtils function to replace hardcoded values
    let paletteBgcolors = ['#FF3366', '#FF5F58', '#F3CA3E', '#2AC940', '#3399FF']
    let paletteArr = []
    for (let i = 0; i < 5; i++) {
        let ps = <PaletteSingle key={'ps' + i} style={{backgroundColor: paletteBgcolors[i]}} />
        paletteArr.push(ps)
    }
    return (
    <div className='palette'>
        {paletteArr}
    </div>)
}

export default Palette