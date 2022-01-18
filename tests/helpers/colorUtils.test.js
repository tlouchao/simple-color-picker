import * as cutils from "../../src/helpers/colorUtils"

const arr_u = Uint8ClampedArray.from([255, 128, 0])
const arr_f = Float64Array.from([1, .5, 0])
const black = Float64Array.from([0, 0, 0])
const white = Float64Array.from([1, 1, 1])

describe("Uint8 to Normalized test", () => {
    const arr_u2 = cutils.rgbToNormalized(arr_u)
    for(let i = 0; i < arr_u.length; i++) {
        test(`${arr_u2[i]} should be equal/approx equal ${arr_f[i]}`, () => {
            expect((arr_u2[i])).toBeCloseTo(arr_f[i], 2)
        })
    }
})

describe("Normalized to Uint8 test", () => {
    const arr_f2 = cutils.rgbToUint8(arr_f)
    for(let i = 0; i < arr_f.length; i++) {
        test(`${arr_f2[i]} should be equal/approx equal ${arr_u[i]}`, () => {
            expect((arr_f2[i])).toBe(arr_u[i])
        })
    }
})

describe("RGB to hex string test", () => {
    const arr_u_hexstr = '#FF8000'
    test(`${arr_u} should equal ${arr_u_hexstr}`, () => {
        expect(cutils.rgbToHexString(arr_u)).toBe(arr_u_hexstr)
    })
})

describe("RGB to greyscale weighted test set", () => {
    const black_gs = 0
    test(`${black} greyscale weighted value should equal ${black_gs}`, () => {
        expect(cutils.rgbToGreyWeighted(black)).toBeCloseTo(black_gs, 15)
    })
    const white_gs = 1
    test(`${white} greyscale weighted value should equal ${white_gs}`, () => {
        expect(cutils.rgbToGreyWeighted(white)).toBeCloseTo(white_gs, 15)
    })
    const arr_f_gs = (1 * .299) + (.5 * .587) + (0 * .114)
    test(`${arr_f} greyscale weighted value should equal ${arr_f_gs}`, () => {
        expect(cutils.rgbToGreyWeighted(arr_f)).toBeCloseTo(arr_f_gs, 15)
    })
})

