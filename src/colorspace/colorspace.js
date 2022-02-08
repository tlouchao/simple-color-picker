import RGB from "./RGB"
import CMYK from "./CMYK"
import HSV from "./HSV"
import HSL from "./HSL"

export {default as RGB} from "./RGB"
export {default as CMYK} from "./CMYK"
export {default as HSV} from "./HSV"
export {default as HSL} from "./HSL"

export const Type = Object.freeze({
    RGB, CMYK, HSV, HSL
})