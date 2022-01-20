import { VEC3_MAX, UINT8_MAX } from "common/constants"
import Colorspace from "./Colorspace"

class RGB extends Colorspace {
    #vec
    constructor(...args) {
        super(args)
    }

    validateArgs(args){
        return this._validateArgsInner(UINT8_MAX, VEC3_MAX, args)
    }

    randomize() {
        return this._randomizeInner(UINT8_MAX, VEC3_MAX)
    }

    normalize(){
        return this._normalizeInner(UINT8_MAX)
    }
}

export default RGB