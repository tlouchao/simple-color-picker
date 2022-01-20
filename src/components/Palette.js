import React, {useEffect, useState} from "react"
import PaletteSingle from "./PaletteSingle"
import {randomVec3Uint8} from "colorspace/vecUtils"

const Palette = () => {

    // Define helper and event listener functions
    const setRandomBgColor = (x) => { 
        x = <PaletteSingle bgColor={randomVec3Uint8()} /> 
        return x
    }

    const handleKeyDown = (event) => {
        console.log("Key pressed:" + event.code)
        if (event.code == "Space"){
            setPaletteArr(paletteArr.map(setRandomBgColor))
        }
      }

    // Lifecycle and state
    const [paletteArr, setPaletteArr] = useState(Array.from({length: 5}, setRandomBgColor))

    useEffect(() => {       
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])
    
    // Render component
    return (
        <div className='palette'>
            {paletteArr}
        </div>
    )
}

export default Palette