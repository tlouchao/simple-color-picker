import { VEC3_LEN, MAX_PCT, MAX_DEG } from "common/constants"
import Base from "./Base"
import Type from "./Type"

class HSL extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return Type.HSL }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }

    /* https://www.rapidtables.com/convert/color/rgb-to-hsl.html */
    static from(that){
        if (that.constructor.type == Type.RGB){
            const rnorm = that.normalize()
            const cmax = Math.max(rnorm[0], rnorm[1], rnorm[2])
            const cmin = Math.min(rnorm[0], rnorm[1], rnorm[2])
            const delta = cmax - cmin
            let hue, saturation, lightness
            if (cmax == rnorm[0]){
                hue = (HSL.maxdeg / 6) * (((rnorm[1] - rnorm[2]) / delta) % 6)
            } else if (cmax == rnorm[1]){
                hue = (HSL.maxdeg / 6) * (((rnorm[2] - rnorm[0]) / delta) + 2)
            } else if (cmax == rnorm[2]){
                hue = (HSL.maxdeg / 6) * (((rnorm[0] - rnorm[1]) / delta) + 4)
            } else {
                throw(new Error(`unknown ${HSV.type} conversion error`))
            }
            lightness = ((cmax + cmin) / 2)
            saturation = ((cmax == 0) ? 0 : (delta / (1 - Math.abs((2 * lightness) - 1))))
            hue = Math.round(hue)
            lightness = Math.round(lightness * HSL.maxval)
            saturation = Math.round(saturation * HSL.maxval)
            return new HSL({"vec": [hue, saturation, lightness], "isInt": true})
        } else {
            throw(new Error("not yet implemented"))
        }
    }
}

export default HSL