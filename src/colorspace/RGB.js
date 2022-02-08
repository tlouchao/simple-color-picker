import { VEC3_LEN, MAX_UINT8 } from "common/constants"
import { Type } from "./colorspace"
import Base from "./Base"

class RGB extends Base {
    #vec
    constructor(...args) {
        super(args)
    }

    static get maxlen(){ return VEC3_LEN }
    static get maxval(){ return MAX_UINT8 }
    static get maxdeg(){ return null }

    /*https://www.rapidtables.com/convert/color/hsl-to-rgb.html*/
    /*https://www.rapidtables.com/convert/color/hsv-to-rgb.html*/
    static from(that){
        if (that instanceof Type['HSL'] || that instanceof Type['HSV']){
            const hue = that.vec[0]
            const hnorm = that.normalize()
            const step = that.constructor.maxdeg / 6
            let c, x, m
            if (that instanceof Type['HSL']){
                c = (1 - Math.abs((2 * hnorm[2]) - 1)) * hnorm[1]
                x = c * (1 - Math.abs(((hue / step) % 2) - 1))
                m = hnorm[2] - (c / 2)
            } else if (that instanceof Type['HSV']){
                c = hnorm[2] * hnorm[1]
                x = c * (1 - Math.abs(((hue / step) % 2) - 1))
                m = hnorm[2] - c
            }
            let rgbtmp = []
            switch (true) {
                case (0 <= hue && hue < step * 1) || hue == that.constructor.maxdeg: // 60
                    rgbtmp = [c, x, 0]
                    break
                case step * 1 <= hue && hue < step * 2: // 120
                    rgbtmp = [x, c, 0]
                    break
                case step * 2 <= hue && hue < step * 3: // 180
                    rgbtmp = [0, c, x]
                    break
                case step * 3 <= hue && hue < step * 4: // 240
                    rgbtmp = [0, x, c]
                    break
                case step * 4 <= hue && hue < step * 5: // 300
                    rgbtmp = [x, 0, c]
                    break
                case step * 5 <= hue && hue < that.constructor.maxdeg: // 360
                    rgbtmp = [c, 0, x]
                    break
                default:
                    throw new Error(`unknown ${this.constructor.type} conversion error`)
            }
            const rgb = Array.from(rgbtmp, x => Math.round((x + m) * RGB.maxval))
            return new RGB(rgb)
        } else {
            throw(new Error("not implemented"))
        }
    }

    toString() {
        return `${this.vec[0]}, ${this.vec[1]}, ${this.vec[2]}`
    }

    toHexString(){
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