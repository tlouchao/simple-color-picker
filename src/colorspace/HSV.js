import { VEC3_MAX, PERCENT_MAX } from "common/constants"
import Colorspace from "./Colorspace"

class HSV extends Colorspace {
    #vec
    constructor(...args) {
        super(args)
    }

    sanitizeArgs(args){
        return this._sanitizeArgsInner(PERCENT_MAX, VEC3_MAX, args)
    }

    randomize() {
        return this._randomizeInner(PERCENT_MAX, VEC3_MAX)
    }

    normalize(){
        return this._normalizeInner(PERCENT_MAX)
    }
}

export default HSV