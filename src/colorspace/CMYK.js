import { VEC4_LEN, MAX_PCT } from "common/constants"
import Base from "./Base"

class CMYK extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return "CMYK" }
    static get maxlen(){ return VEC4_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return null }

}

export default CMYK