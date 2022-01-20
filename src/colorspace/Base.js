class Base {
    #vec
    constructor(args) {
        if (new.target === Base) {
          throw new TypeError("abstract class Base")
        } else {
            this.vec = args
        }
    }

    static get type(){throw(new TypeError("override this abstract method"))}
    static get maxlen(){throw(new TypeError("override this abstract method"))}
    static get maxval(){throw(new TypeError("override this abstract method"))}
    static get maxdeg(){throw(new TypeError("override this abstract method"))}
    
    get vec() { return this.#vec }

    set vec(newVec) {
        if (newVec === undefined || newVec.length == 0){
            this.#vec = this.randomize()
        } else {
            try { this.#vec = this._validateArgs(newVec) } catch(err) { throw(err) }
        }
    }

    // validate params; access static properties thru constructor
    _validateArgs(args){

        const cstype = this.constructor.type
        const maxlen = this.constructor.maxlen
        const maxval = this.constructor.maxval
        const maxdeg = this.constructor.maxdeg

        // Check for zero args
        if (args === undefined) {
            throw(new RangeError(`no arguments provided`))
        
        // Check for array
        } else if (args.length == 1) {
            if (args[0].length != maxlen){
                throw(new RangeError(`please provide arguments or an array with length ${maxlen}`))
            } else {
            args = args[0]
            }

        // Check for spread operator
        } else if (args.length != maxlen) {
            throw(new RangeError(`please provide arguments or an array with length ${maxlen}`))
        }

        // Filter bad values; access static property thru constructor
        if (cstype == "RGB" || cstype == "CMYK"){
            const filtered = args.filter(x => !(0 <= x && x <= maxval) || !(Number.isInteger(x)))
            if (!(filtered && filtered.length == 0)){
                throw(new TypeError(`${filtered} does not contain integer(s) from 0-${maxval} inclusive`))
            } else {
                return Array.from(args)
            }
        } else if (cstype == "HSV" || cstype == "HSB") {
            const [hue, sat, vb] = args
            if ((!(0 <= hue && hue <= maxdeg) || !(Number.isInteger(hue))) ||
                (!(0 <= sat && sat <= maxval) || !(Number.isInteger(sat))) ||
                (!(0 <= vb && vb <= maxval) || !(Number.isInteger(vb)))) {
                throw(new TypeError(`${args} does not contain hue as an integer from 0-${maxdeg} inclusive, ` +
                    `or saturation/value/brightness as an integer from 0-${maxval} inclusive`))
            } else {
                return Array.from(args) // mixed array
            }
        } else {
            throw(new Error("unknown validation args error"))
        }
    }

    randomize(){
        const cstype = this.constructor.type
        if (cstype == "RGB" || cstype == "CMYK") {
            return Array.from({ length: this.constructor.maxlen },
                () => Math.round(Math.random() * this.constructor.maxval))    
        } else if (cstype == "HSV" || cstype == "HSB") {
            const hue = Math.round(Math.random() * this.constructor.maxdeg)
            const sat = Math.round(Math.random() * this.constructor.maxval)
            const vb = Math.round(Math.random() * this.constructor.maxval)
            return Array.from([hue, sat, vb])
        }
    }

    normalize(){
        const cstype = this.constructor.type
        const buf = Float64Array.from(this.vec)
        if (cstype == "RGB" || cstype == "CMYK") {
            return buf.map(x => x / this.constructor.maxval)
        } else if (cstype == "HSV" || cstype == "HSB") {
            buf[0] = this.vec[0] / this.constructor.maxdeg
            buf[1] = this.vec[1] / this.constructor.maxval
            buf[2] = this.vec[2] / this.constructor.maxval
            return buf
        }
    }
}

export default Base