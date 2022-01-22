import { MAX_NM } from 'common/constants'
import Type from './Type'

class Base {
    #vec
    constructor(args) {
        if (new.target === Base){
            throw new TypeError("abstract class Base")
        }
        if (args === undefined || args.length == 0){ 
            this.#vec = this.randomize()
        } else {
            try { this.#vec = this._validateArgs(args) } catch(err) { throw(err) }
        }
    }

    static get type(){throw(new TypeError("override this abstract method"))}
    static get maxlen(){throw(new TypeError("override this abstract method"))}
    static get maxval(){throw(new TypeError("override this abstract method"))}
    static get maxdeg(){throw(new TypeError("override this abstract method"))}
    static get maxnm(){ return MAX_NM }
    
    static from(that){throw(new TypeError("override this abstract method"))}
    
    // Getter (no setter)
    get vec() { return this.#vec }

    // Print string
    toString() {
        return `${this.constructor.type}: ${this.vec}`
    }

    _validateArgs(args){

        // Check for object keys and length
        if (!(("isInt" in args) && ("vec" in args) && (Object.keys(args).length == 2))){
            throw(new TypeError("please provide a length 2 object with \"isInt\" and \"vec\" keys"))
        }

        // Check for empty vector
        if (args["vec"] === undefined || args["vec"].length == 0){
            return this.randomize()
        
        } else {

            const cstype = this.constructor.type
            const maxlen = this.constructor.maxlen
            const maxval = this.constructor.maxval
            const maxdeg = this.constructor.maxdeg
            const maxnm = this.constructor.maxnm

            // Check for dimensions of vector
            if (args["vec"].length != maxlen){
                    throw(new RangeError(`please provide a vector with length ${maxlen}`))
            }

            let res = []
            // Filter bad RGB/CMYK values
            if (cstype == Type.RGB || cstype == Type.CMYK) {
                let filtered = []
                if (args["isInt"]){
                    // handle integer values
                    filtered = args["vec"].filter(x => !(0 <= x && x <= maxval) || !(Number.isInteger(x)))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${args["vec"]} does not contain integer(s) from 0-${maxval} inclusive`))
                    } else {
                        res = args["vec"]
                    }
                } else {
                    // handle normalized values
                    filtered = args["vec"].filter(x => !(0 <= x && x <= maxnm))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${args["vec"]} does not contain normalized values from 0.0-${maxnm} inclusive`))
                    } else {
                        res = Array.from(args["vec"].map(x => Math.round(x * maxval)))
                    }
                }

            // Filter bad HSV/HSL values
            } else if (cstype == Type.HSV || cstype == Type.HSL) {
                if (args["isInt"]){
                    // handle integer values
                    const [hue, sat, vb] = args["vec"]
                    if ((!(0 <= hue && hue <= maxdeg) || !(Number.isInteger(hue))) ||
                        (!(0 <= sat && sat <= maxval) || !(Number.isInteger(sat))) ||
                        (!(0 <= vb && vb <= maxval) || !(Number.isInteger(vb)))) {
                        throw(new TypeError(`${args["vec"]} does not contain hue as an integer from 0-${maxdeg} inclusive, ` +
                            `or saturation/value/brightness as an integer from 0-${maxval} inclusive`))
                    } else { // mixed array
                        res = args["vec"] 
                    }
                } else {
                    // handle normalized values
                    const filtered = args["vec"].filter(x => !(0 <= x && x <= maxnm))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${args["vec"]} does not contain normalized values from 0.0-${maxnm} inclusive`))
                    } else { // mixed array
                        const hue = Math.round(args["vec"][0] * maxdeg)
                        const sat = Math.round(args["vec"][1] * maxval)
                        const vb = Math.round(args["vec"][2] * maxval)
                        res = Array.from([hue, sat, vb])
                    }
                }
            } else {
                throw(new Error("unknown validation args error"))
            }
            return res
        }
    }

    set reset(fn){
        if (Object.getOwnPropertyNames(this).includes(fn.name)){
            this.#vec = fn()
        } else {
            throw new TypeError("not a class method")
        }
    }

    randomize(){
        const cstype = this.constructor.type
        if (cstype == Type.RGB || cstype == Type.CMYK) {
            return Array.from({ length: this.constructor.maxlen },
                () => Math.round(Math.random() * this.constructor.maxval))    
        } else if (cstype == Type.HSV || cstype == Type.HSL) {
            const hue = Math.round(Math.random() * this.constructor.maxdeg)
            const sat = Math.round(Math.random() * this.constructor.maxval)
            const vb = Math.round(Math.random() * this.constructor.maxval)
            return Array.from([hue, sat, vb])
        }
    }

    normalize(){
        const cstype = this.constructor.type
        const buf = Float64Array.from(this.vec)
        if (cstype == Type.RGB || cstype == Type.CMYK) {
            return buf.map(x => x / this.constructor.maxval)
        } else if (cstype == Type.HSV || cstype == Type.HSL) {
            buf[0] = this.vec[0] / this.constructor.maxdeg
            buf[1] = this.vec[1] / this.constructor.maxval
            buf[2] = this.vec[2] / this.constructor.maxval
            return buf
        }
    }
}

export default Base