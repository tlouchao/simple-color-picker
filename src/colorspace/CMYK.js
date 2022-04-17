import { VEC4_LEN, MAX_PCT } from "common/constants"
import { Type } from "./colorspace"
import Base from "./Base"

class CMYK extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get maxlen(){ return VEC4_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return null }

    /* https://www.rapidtables.com/convert/color/rgb-to-cmyk.html */
    static from(that){
        if (that instanceof Type['RGB']){
            const rnorm = that.normalize()
            const k = 1 - Math.max(rnorm[0], rnorm[1], rnorm[2])
            const c = (k == 1) ? (1 - rnorm[0] - k) : (1 - rnorm[0] - k) / (1 - k)
            const m = (k == 1) ? (1 - rnorm[1] - k) : (1 - rnorm[1] - k) / (1 - k)
            const y = (k == 1) ? (1 - rnorm[2] - k) : (1 - rnorm[2] - k) / (1 - k)
            return new CMYK({"vec": [c, m, y, k], "isInt": false})
        } else {
            throw(new Error("not implemented"))
        }
    }

    toString() {
        let cnorm = this.normalize()
        cnorm = cnorm.map(x => Math.round(x * 100))
        return `${cnorm[0]}%, ${cnorm[1]}%, ${cnorm[2]}%, ${cnorm[3]}%`
    }
}

export default CMYK