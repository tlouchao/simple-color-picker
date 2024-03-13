import { VEC3_LEN, MAX_PCT, MAX_DEG } from "../common/constants"
import { Type } from "./colorspace"
import Base from "./Base"

class HSL extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }

    /* https://www.rapidtables.com/convert/color/rgb-to-hsl.html */
    static from(that){
        if (that instanceof Type['RGB']){
            const rnorm = that.normalize()
            const cmax = Math.max(rnorm[0], rnorm[1], rnorm[2])
            const cmin = Math.min(rnorm[0], rnorm[1], rnorm[2])
            const delta = cmax - cmin
            let hue, saturation, lightness
            if (delta == 0){
                hue = 0
            } else if (cmax == rnorm[0]){
                hue = (HSL.maxdeg / 6) * (((rnorm[1] - rnorm[2]) / delta) % 6)
            } else if (cmax == rnorm[1]){
                hue = (HSL.maxdeg / 6) * (((rnorm[2] - rnorm[0]) / delta) + 2)
            } else if (cmax == rnorm[2]){
                hue = (HSL.maxdeg / 6) * (((rnorm[0] - rnorm[1]) / delta) + 4)
            } else {
                throw(new Error(`unknown ${this.constructor.type} conversion error`))
            }
            lightness = ((cmax + cmin) / 2)
            saturation = ((cmax == 0 || lightness == 1) ? 0 : (delta / (1 - Math.abs((2 * lightness) - 1))))
            hue = (hue >= 0) ? Math.round(hue) : Math.round(hue + HSL.maxdeg)
            lightness = Math.round(lightness * HSL.maxval)
            saturation = Math.round(saturation * HSL.maxval)
            return new HSL(hue, saturation, lightness)
        } else {
            throw(new Error("not implemented"))
        }
    }

    toString() {
        let hnorm = this.normalize()
        hnorm = hnorm.map(x => Math.round(x * 100))
        return `${this.vec[0]}\xB0, ${hnorm[1]}%, ${hnorm[2]}%`
    }
}

export default HSL