import { VEC4_LEN, MAX_PCT } from "common/constants"
import Base from "./Base"
import Type from "./Type"

class CMYK extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return Type.CMYK }
    static get maxlen(){ return VEC4_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return null }

    /* https://www.rapidtables.com/convert/color/rgb-to-cmyk.html */
    static from(that){
        if (that.constructor.type == Type.RGB){
            const rnorm = that.normalize()
            const k = 1 - Math.max(rnorm[0], rnorm[1], rnorm[2])
            const c = (1 - rnorm[0] - k) / (1 - k)
            const m = (1 - rnorm[1] - k) / (1 - k)
            const y = (1 - rnorm[2] - k) / (1 - k)
            return new CMYK({"vec": [c, m, y, k], "isInt": false})
        } else {
            throw(new Error("not yet implemented"))
        }
    }
}

export default CMYK