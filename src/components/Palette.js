import React, {useEffect, useState} from "react"
import PaletteSingle from "./PaletteSingle"
import RGB from "colorspace/RGB"

const Palette = () => {

    // Lifecycle and state
    const [RGBArr, setRGBArr] = useState(Array.from({length: 5}, () => new RGB()))

    const handleKeyDown = (event) => {
        console.log("Key pressed:" + event.code)
        if (event.code == "Space"){
            setRGBArr(RGBArr.map(() => new RGB()))
        }
    }

    useEffect(() => {       
        window.addEventListener('keydown', handleKeyDown);     
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])
    
    // Render component
    return (
        <div className='palette'>
            {RGBArr.map((rgb, idx) => 
                <PaletteSingle id={"ps" + idx}
                bgColor={rgb.getHexString()}
                lbColor={(rgb.getLuminance()) > .5 ? "black" : "white"} />
            )}
        </div>
    )
}

export default Palette