import * as csutils from "colorspace/utils"

const arr_u = Uint8ClampedArray.from([255, 128, 0])
const arr_f = Float64Array.from([1, .5, 0])
const black = Float64Array.from([0, 0, 0])
const white = Float64Array.from([1, 1, 1])

describe("Random Normalized", () => {
    const arr_f1 = csutils.randomVec3Normalized()
    for(let i = 0; i < arr_u.length; i++) {
        test(`${arr_f1[i]} should be within range 0-1 inclusive`, () => {
            expect(arr_f1[i]).toBeGreaterThanOrEqual(0)
            expect(arr_f1[i]).toBeLessThan(1)
        })
    }
})

describe("Random Uint8", () => {
    const arr_u1 = csutils.randomVec3Uint8()
    for(let i = 0; i < arr_f.length; i++) {
        test(`${arr_u1[i]} should be within range 0-255 inclusive`, () => {
            expect(arr_u1[i]).toBeGreaterThanOrEqual(0)
            expect(arr_u1[i]).toBeLessThanOrEqual(255)
        })
    }
})

describe("Uint8 to Normalized", () => {

    const notarr = 128
    const arr_u2 = csutils.vec3ToNormalized(arr_u)

    test("not an array", () => {
        expect(() => csutils.vec3ToNormalized(notarr)).toThrow(TypeError)
    })
    for(let i = 0; i < arr_u.length; i++) {
        test(`${arr_u2[i]} should be equal/approx equal ${arr_f[i]}`, () => {
            expect((arr_u2[i])).toBeCloseTo(arr_f[i], 2)
        })
    }

})

describe("Normalized to Uint8", () => {

    const notarr = 128
    const arr_f2 = csutils.vec3ToUint8(arr_f)

    test("not an array", () => {
        expect(() => csutils.vec3ToUint8(notarr)).toThrow(TypeError)
    })
    for(let i = 0; i < arr_f.length; i++) {
        test(`${arr_f2[i]} should be equal/approx equal ${arr_u[i]}`, () => {
            expect((arr_f2[i])).toBe(arr_u[i])
        })
    }
})