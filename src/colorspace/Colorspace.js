class Colorspace {
    #vec
    constructor(args) {
        if (new.target === Colorspace) {
          throw new TypeError("abstract class Colorspace")
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

    _validateArgsInner(maxval, maxlen, args){

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
        } else if (args.length != maxlen)
            throw(new RangeError(`please provide arguments or an array with length ${maxlen}`))

        // Filter bad values
        const filtered = args.filter(x => !(0 <= x && x <= maxval) || !(Number.isInteger(x)))
        if (!(filtered && filtered.length == 0)){
            throw(new TypeError(`${filtered} does not contain integer(s) from 0-${maxval} inclusive`))
        } else {
            return Array.from(args)
        }
    }

    _randomizeInner(maxval, maxlen){
        return Arrays.from({length: maxlen}, x => Math.round(Math.random * maxval))
    }

    _normalizeInner(maxval){
        return Float64Array.from(this.vec, x => x / maxval)
    }

    validate(args){throw(new Error( "override this abstract method"))}
    randomize(){throw(new Error( "override this abstract method"))}
    normalize(){throw(new Error( "override this abstract method"))}
}

export default Colorspace