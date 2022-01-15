import React, {useEffect, useState} from "react"
import PaletteSingle from "./PaletteSingle"
import * as cutils from "../helpers/colorUtils"

const Palette = () => {

    // Define helper and event listener functions
    const setRandomBgColor = (x) => { 
        x = <PaletteSingle bgColor={cutils.rgbToHexString(cutils.randomRgb())} /> 
        return x
    }

    const handleKeyDown = (event) => {
        console.log("Key pressed:" + event.code)
        const isSpacePressed = event.code == "Space"
        if (isSpacePressed){
            setPaletteArr(paletteArr.map(setRandomBgColor))
        }
      }

    // Set effects and state
    const [paletteArr, setPaletteArr] = useState(Array.from({length: 5}, setRandomBgColor))

    useEffect(() => {       
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])
    
    // Render Component
    return (
        <div className='palette'>
            {paletteArr}
        </div>
    )
}

export default Palette