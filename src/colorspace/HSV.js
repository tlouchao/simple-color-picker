import { VEC3_LEN, MAX_PCT, MAX_DEG } from "common/constants"
import Base from "./Base"
import Type from "./Type"

class HSV extends Base {
    #vec
    constructor(args) {
        super(args)
    }

    static get type(){ return Type.HSV }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }

    /* https://www.rapidtables.com/convert/color/rgb-to-hsv.html */
    static from(that){
        if (that.constructor.type == Type.RGB){
            const rnorm = that.normalize()
            const cmax = Math.max(rnorm[0], rnorm[1], rnorm[2])
            const cmin = Math.min(rnorm[0], rnorm[1], rnorm[2])
            const delta = cmax - cmin
            let hue, saturation, value
            if (cmax == rnorm[0]){
                hue = (HSV.maxdeg / 6) * (((rnorm[1] - rnorm[2]) / delta) % 6)
            } else if (cmax == rnorm[1]){
                hue = (HSV.maxdeg / 6) * (((rnorm[2] - rnorm[0]) / delta) + 2)
            } else if (cmax == rnorm[2]){
                hue = (HSV.maxdeg / 6) * (((rnorm[0] - rnorm[1]) / delta) + 4)
            } else {
                throw(new Error(`unknown ${HSV.type} conversion error`))
            }
            hue = Math.round(hue)
            saturation = Math.round(((cmax == 0) ? 0 : (delta / cmax)) * HSV.maxval)
            value = Math.round(cmax * HSV.maxval)
            return new HSV({"isInt": true, "vec": [hue, saturation, value]})
        } else {
            throw(new Error("not yet implemented"))
        }
    }
}

export default HSV