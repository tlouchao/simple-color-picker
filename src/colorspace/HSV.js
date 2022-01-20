import { VEC3_LEN, MAX_PCT, MAX_DEG } from "common/constants"
import Base from "./Base"

class HSV extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return "HSV" }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_PCT }
    static get maxdeg(){ return MAX_DEG }
}

export default HSV