import { VEC3_LEN, MAX_UINT8 } from "common/constants"
import Base from "./Base"
import Type from "./Type"

class RGB extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get type(){ return Type.RGB }
    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_UINT8 }
    static get maxdeg(){ return null }

    static from(that){throw(new TypeError("override this method"))}

    getHexString(){
        let hexStr = '#'
        this.vec.forEach((x) => hexStr = hexStr.concat(x.toString(16).padStart(2, '0').toUpperCase()))
        return hexStr
    }

    getLuminance(){
        const norm = this.normalize()
        const res = (norm[0] * .299) + (norm[1] * .587) + (norm[2] * .114)
        return parseFloat(res.toPrecision(15))
    }
}

export default RGB