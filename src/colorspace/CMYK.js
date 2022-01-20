import { VEC4_MAX, PERCENT_MAX } from "common/constants"
import Colorspace from "./Colorspace"

class CMYK extends Colorspace {
    #vec
    constructor(...args) {
        super(args)
    }

    validateArgs(args){
        return this._validateArgsInner(PERCENT_MAX, VEC4_MAX, args)
    }

    randomize() {
        return this._randomizeInner(PERCENT_MAX, VEC4_MAX)
    }

    normalize(){
        return this._normalizeInner(PERCENT_MAX)
    }
}

export default CMYK