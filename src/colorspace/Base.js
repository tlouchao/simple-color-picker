import { MAX_NM } from 'common/constants'
import { Type } from './colorspace'

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

    static get maxlen(){throw(new TypeError("override this abstract method"))}
    static get maxval(){throw(new TypeError("override this abstract method"))}
    static get maxdeg(){throw(new TypeError("override this abstract method"))}
    static get maxnm(){ return MAX_NM }
    
    static from(that){throw(new TypeError("override this abstract method"))}
    
    // Getter (no setter)
    get vec() { return this.#vec }

    _validateArgs(args){  

        // Handle spread operator
        if (args.length == this.constructor.maxlen) {
            try { return this._validateArgsInner(args, true) } catch (err) { throw (err) }

        } else if (args.length != 1) {
            throw(new RangeError(`${args} please provide a vector with length ${this.constructor.maxlen}`))
            
        } else {
            // Get nested argument
            args = args[0]

            // Handle array
            if (Array.isArray(args)) {
                try { return this._validateArgsInner(args, true) } catch (err) { throw (err) }

            // Handle key value pairs
            } else if ("isInt" in args && "vec" in args && 
                Object.keys(args).length == 2 && Array.isArray(args["vec"])){
                try { return this._validateArgsInner(args["vec"], args["isInt"]) } catch (err) { throw (err) }

            } else {
                throw new TypeError("please provide a length 2 object with \"isInt\" and \"vec\" keys, " +
                "or an integer array, or integer args")
            }
        }
    }

    _validateArgsInner(arr, isInt){

        const maxlen = this.constructor.maxlen
        const maxval = this.constructor.maxval
        const maxdeg = this.constructor.maxdeg
        const maxnm = this.constructor.maxnm

        // Check for empty vector
        if (arr.length == 0){
            return this.randomize()

        // Check for dimensions of vector
        } else if (arr.length != maxlen){
            throw(new RangeError(`${arr} please provide a vector with length ${maxlen}`))
                
        } else {
            let res = []
            // Filter bad RGB/CMYK values
            if (this instanceof Type['RGB'] || this instanceof Type['CMYK']) {
                let filtered = []
                if (isInt){
                    // handle integer values
                    filtered = arr.filter(x => !(0 <= x && x <= maxval) || !(Number.isInteger(x)))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${arr} does not contain integer(s) from 0-${maxval} inclusive`))
                    } else {
                        res = arr
                    }
                } else {
                    // handle normalized values
                    filtered = arr.filter(x => !(0 <= x && x <= maxnm))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${arr} does not contain normalized values from 0.0-${maxnm} inclusive`))
                    } else {
                        res = Array.from(arr.map(x => Math.round(x * maxval)))
                    }
                }

            // Filter bad HSV/HSL values
            } else if (this instanceof Type['HSV'] || this instanceof Type['HSL']) {
                if (isInt){
                    // handle integer values
                    const [hue, sat, vb] = arr
                    if ((!(0 <= hue && hue <= maxdeg) || !(Number.isInteger(hue))) ||
                        (!(0 <= sat && sat <= maxval) || !(Number.isInteger(sat))) ||
                        (!(0 <= vb && vb <= maxval) || !(Number.isInteger(vb)))) {
                        throw(new TypeError(`${arr} does not contain hue as an integer from 0-${maxdeg} inclusive, ` +
                            `or saturation/value/brightness as an integer from 0-${maxval} inclusive`))
                    } else { // mixed array
                        res = arr
                    }
                } else {
                    // handle normalized values
                    const filtered = arr.filter(x => !(0 <= x && x <= maxnm))
                    if (!(filtered && filtered.length == 0)){
                        throw(new TypeError(`${arr} does not contain normalized values from 0.0-${maxnm} inclusive`))
                    } else { // mixed array
                        const hue = Math.round(arr[0] * maxdeg)
                        const sat = Math.round(arr[1] * maxval)
                        const vb = Math.round(arr[2] * maxval)
                        res = Array.from([hue, sat, vb])
                    }
                }
            } else {
                throw(new Error("unknown validation args error"))
            }
            return res
        }
    }

    randomize(){
        if (this instanceof Type['RGB'] || this instanceof Type['CMYK']) {
            return Array.from({ length: this.constructor.maxlen },
                () => Math.round(Math.random() * this.constructor.maxval))    
        } else if (this instanceof Type['HSV'] || this instanceof Type['HSL']) {
            const hue = Math.round(Math.random() * this.constructor.maxdeg)
            const sat = Math.round(Math.random() * this.constructor.maxval)
            const vb = Math.round(Math.random() * this.constructor.maxval)
            return Array.from([hue, sat, vb])
        }
    }

    normalize(){
        const buf = Float64Array.from(this.vec)
        if (this instanceof Type['RGB'] || this instanceof Type['CMYK']) {
            return buf.map(x => x / this.constructor.maxval)
        } else if (this instanceof Type['HSV'] || this instanceof Type['HSL']) {
            buf[0] = this.vec[0] / this.constructor.maxdeg
            buf[1] = this.vec[1] / this.constructor.maxval
            buf[2] = this.vec[2] / this.constructor.maxval
            return buf
        }
    }
}

export default Base