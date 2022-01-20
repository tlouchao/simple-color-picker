import { VEC3_LEN, MAX_UINT8 } from "common/constants"
import Base from "./Base"

class RGB extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return "RGB" }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_UINT8 }
    static get maxdeg(){ return null }
}

export default RGB