import * as csutils from "colorspace/utils"

const arr_u = Uint8ClampedArray.from([255, 128, 0])
const arr_f = Float64Array.from([1, .5, 0])
const black = Float64Array.from([0, 0, 0])
const white = Float64Array.from([1, 1, 1])

describe("Uint8 to Normalized test", () => {
    const arr_u2 = csutils.vec3ToNormalized(arr_u)
    for(let i = 0; i < arr_u.length; i++) {
        test(`${arr_u2[i]} should be equal/approx equal ${arr_f[i]}`, () => {
            expect((arr_u2[i])).toBeCloseTo(arr_f[i], 2)
        })
    }
})

describe("Normalized to Uint8 test", () => {
    const arr_f2 = csutils.vec3ToUint8(arr_f)
    for(let i = 0; i < arr_f.length; i++) {
        test(`${arr_f2[i]} should be equal/approx equal ${arr_u[i]}`, () => {
            expect((arr_f2[i])).toBe(arr_u[i])
        })
    }
})