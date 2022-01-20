class Base {
    #vec
    constructor(args) {
        if (new.target === Base) {
          throw new TypeError("abstract class Base")
        }
        if (args.length == 0){
            this.vec = this.randomize()
        } else {
            let validated = []
            try { validated = this.validateArgs(args) } catch(err) { throw(err) }
            this.vec = validated
        }
    }
    
    get vec() { return this.#vec }

    set vec(newVec) { this.#vec = newVec }

    toString(){ return this.vec.toString() }

    // validate params; access static properties thru constructor
    validateArgs(args){

        const maxlen = this.constructor.maxlen
        const maxval = this.constructor.maxval
        const maxdeg = this.constructor.maxdeg
        const cstype = this.constructor.type

        // Check for zero args
        if (args.length == 0) {
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
        }
    }

    randomize(){
        return Arrays.from({length: this.constructor.maxlen}, 
            x => Math.round(Math.random * this.constructor.maxval))
    }

    normalize(){
        return Float64Array.from(this.vec, x => x / this.constructor.maxval)
    }

    static get type(){throw(new Error( "override this abstract method"))}
    static get maxlen(){throw(new Error( "override this abstract method"))}
    static get maxval(){throw(new Error( "override this abstract method"))}
    static get maxdeg(){throw(new Error( "override this abstract method"))}
}

export default Base