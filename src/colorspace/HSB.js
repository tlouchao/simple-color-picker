import { VEC3_LEN, MAX_PCT, MAX_DEG } from "common/constants"
import Base from "./Base"

class HSB extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return "HSB" }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }
}

export default HSB