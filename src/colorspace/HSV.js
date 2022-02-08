import { VEC3_LEN, MAX_PCT, MAX_DEG } from "common/constants"
import { Type } from "./colorspace"
import Base from "./Base"

class HSV extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }

    /* https://www.rapidtables.com/convert/color/rgb-to-hsv.html */
    static from(that){
        if (that instanceof Type['RGB']){
            const rnorm = that.normalize()
            const cmax = Math.max(rnorm[0], rnorm[1], rnorm[2])
            const cmin = Math.min(rnorm[0], rnorm[1], rnorm[2])
            const delta = cmax - cmin
            let hue, saturation, value
            if (delta == 0) {
                hue = 0
            } else if (cmax == rnorm[0]){
                hue = (HSV.maxdeg / 6) * (((rnorm[1] - rnorm[2]) / delta) % 6)
            } else if (cmax == rnorm[1]){
                hue = (HSV.maxdeg / 6) * (((rnorm[2] - rnorm[0]) / delta) + 2)
            } else if (cmax == rnorm[2]){
                hue = (HSV.maxdeg / 6) * (((rnorm[0] - rnorm[1]) / delta) + 4)
            } else {
                throw(new Error(`unknown ${this.constructor.type} conversion error`))
            }
            hue = (hue >= 0) ? Math.round(hue) : Math.round(hue + HSV.maxdeg)
            saturation = Math.round(((cmax == 0) ? 0 : (delta / cmax)) * HSV.maxval)
            value = Math.round(cmax * HSV.maxval)
            return new HSV(hue, saturation, value)
        } else {
            throw(new Error("not yet implemented"))
        }
    }
}

export default HSV