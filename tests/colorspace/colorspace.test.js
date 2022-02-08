import { RGB, CMYK, HSV, HSL } from "colorspace/colorspace"
import Base from "colorspace/Base"
import * as constants from "common/constants"

describe("Do not instantiate abstract class Base", () => {

    test("constructor", () => {
        expect(() => new Base()).toThrow(TypeError)
        expect(() => new Base()).toThrow("abstract class Base")
    })

    test("static methods", () => {
        expect(() => Base.maxlen).toThrow("override this abstract method")
        expect(() => Base.maxval).toThrow("override this abstract method")
        expect(() => Base.maxdeg).toThrow("override this abstract method")
        expect(() => Base.from(new RGB())).toThrow("override this abstract method")
    })
})

describe("RGB and CMYK constructor valid key value params", () => {

    const rvec = [255, 128, 0]
    const r1 = new RGB({"isInt": true, "vec": rvec})

    const cvec = [100, 0, 25, 75]
    const c1 = new CMYK({"isInt": true, "vec": cvec})

    const rnorm = [1, .5, 0]
    const r1tmp = new RGB({"isInt": false, "vec": rnorm})

    const cnorm = [1, 0, .25, .75]
    const c1tmp = new CMYK({"isInt": false, "vec": cnorm})

    test(`RGB Array - Internal vec should be equal to ${rvec.toString()}`, () => {
        expect(r1.vec).toEqual(rvec)
    })
    test(`CMYK Array - Internal vec should be equal to ${cvec.toString()}`, () => {
        expect(c1.vec).toEqual(cvec)
    })
    test(`RGB Array - Normalized vec should be equal/approx equal to ${rnorm.toString()}`, () => {
        const rn1 = r1tmp.normalize()
        for(let i = 0; i < rn1.length; i++) {
            expect((rn1[i])).toBeCloseTo(rnorm[i], 2)
        }
    })
    test(`CMYK Array - Normalized vec should be equal/approx equal to ${cnorm.toString()}`, () => {
        const cn1 = c1tmp.normalize()
        for(let i = 0; i < cn1.length; i++) {
            expect((cn1[i])).toBeCloseTo(cnorm[i], 2)
        }
    })
})

describe("RGB and CMYK constructor valid integer array params", () => {

    const rvec = [255, 128, 0]
    const r1 = new RGB(rvec)
    const r2 = new RGB(rvec[0], rvec[1], rvec[2])

    const cvec = [100, 0, 25, 75]
    const c1 = new CMYK(cvec)
    const c2 = new CMYK(cvec[0], cvec[1], cvec[2], cvec[3])

    test(`RGB Array - Internal vec should be equal to ${rvec.toString()}`, () => {
        expect(r1.vec).toEqual(rvec)
    })
    
    test(`RGB Array Spread Op - Internal vec should be equal to ${rvec.toString()}`, () => {
        expect(r2.vec).toEqual(rvec)
    })
    
    test(`CMYK Array - Internal vec should be equal to ${cvec.toString()}`, () => {
        expect(c1.vec).toEqual(cvec)
    })

    test(`CMYK Array Spread Op - Internal vec should be equal to ${cvec.toString()}`, () => {
        expect(c2.vec).toEqual(cvec)
    })
})

describe("HSV and HSL constructor valid key value params", () => {

    const vvec = [180, 75, 25]
    const v1 = new HSV({"isInt": true, "vec": vvec})

    const bvec = [360, 100, 50]
    const b1 = new HSL({"isInt": true, "vec": bvec})

    const vnorm = [.5, .75, .25]
    const v1tmp = new HSV({"isInt": false, "vec": vnorm})

    const bnorm = [1, 1, .5]
    const b1tmp = new HSL({"isInt": false, "vec": bnorm})

    test(`HSV Array - Internal vec should be equal to ${vvec.toString()}`, () => {
        expect(v1.vec).toEqual(vvec)
    })

    test(`HSL Array - Internal vec should be equal to ${bvec.toString()}`, () => {
        expect(b1.vec).toEqual(bvec)
    })
    test(`HSV Array - Normalized vec should be equal/approx equal to ${vnorm.toString()}`, () => {
        const vn1 = v1tmp.normalize()
        for(let i = 0; i < vn1.length; i++) {
            expect((vn1[i])).toBeCloseTo(vnorm[i], 2)
        }
    })
    test(`HSL Array - Normalized vec should be equal/approx equal to ${bnorm.toString()}`, () => {
        const bn1 = b1tmp.normalize()
        for(let i = 0; i < bn1.length; i++) {
             expect((bn1[i])).toBeCloseTo(bnorm[i], 2)
        }
    })
})

describe("HSV and HSL constructor valid integer array params", () => {

    const vvec = [180, 75, 25]
    const v1 = new HSV(vvec)
    const v2 = new HSV(vvec[0], vvec[1], vvec[2])

    const bvec = [360, 100, 50]
    const b1 = new HSL(bvec)
    const b2 = new HSL(bvec[0], bvec[1], bvec[2])

    test(`HSV Array - Internal vec should be equal to ${vvec.toString()}`, () => {
        expect(v1.vec).toEqual(vvec)
    })

    test(`HSV Array Spread Op - Internal vec should be equal to ${vvec.toString()}`, () => {
        expect(v2.vec).toEqual(vvec)
    })

    test(`HSL Array - Internal vec should be equal to ${bvec.toString()}`, () => {
        expect(b1.vec).toEqual(bvec)
    })

    test(`HSL Array Spread Op - Internal vec should be equal to ${bvec.toString()}`, () => {
        expect(b2.vec).toEqual(bvec)
    })
})

describe("RGB and CMYK constructor incorrect args object format", () => {
    
    test(`RGB Array`, () => {
        expect(() => new RGB({"isInt": true})).toThrow(TypeError)
        expect(() => new RGB({"foo": true, "bar":[1, 2, 3]})).toThrow(TypeError)
        expect(() => new RGB({"isInt": true, "bar": 0, "vec":[1, 2, 3]})).toThrow(
            "please provide a length 2 object with \"isInt\" and \"vec\" keys, or an integer array, or integer args"
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK({"isInt": true})).toThrow(TypeError)
        expect(() => new CMYK({"foo": true, "bar":[1, 2, 3, 4]})).toThrow(TypeError)
        expect(() => new CMYK({"isInt": true, "bar": 0, "vec":[1, 2, 3, 4]})).toThrow(
            "please provide a length 2 object with \"isInt\" and \"vec\" keys, or an integer array, or integer args"
        )
    })
})

describe("HSV and HSL constructor incorrect args object format", () => {
    
    test(`HSV Array`, () => {
        expect(() => new HSV({"isInt": true})).toThrow(TypeError)
        expect(() => new HSV({"foo": true, "bar":[1, 2, 3]})).toThrow(TypeError)
        expect(() => new HSV({"isInt": true, "bar": 0, "vec":[1, 2, 3]})).toThrow(
            "please provide a length 2 object with \"isInt\" and \"vec\" keys, or an integer array, or integer args"
        )
    })

    test(`HSL Array`, () => {
        expect(() => new HSL({"isInt": true})).toThrow(TypeError)
        expect(() => new HSL({"foo": true, "bar":[1, 2, 3]})).toThrow(TypeError)
        expect(() => new HSL({"isInt": true, "bar": 0, "vec":[1, 2, 3]})).toThrow(
            "please provide a length 2 object with \"isInt\" and \"vec\" keys, or an integer array, or integer args"
        )
    })
})

describe("RGB and CMYK constructor incorrect number of args", () => {
    
    test(`RGB Array`, () => {
        expect(() => new RGB([1, 2, 3, 4])).toThrow(RangeError)
        expect(() => new RGB(5, 6, 7, 8)).toThrow(
            `please provide a vector with length ${RGB.maxlen}`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK([1, 2, 3, 4, 5])).toThrow(RangeError)
        expect(() => new CMYK(6, 7, 8, 9, 10)).toThrow(
            `please provide a vector with length ${CMYK.maxlen}`
        )
    })
})

describe("HSV and HSL constructor incorrect number of args", () => {
    
    test(`HSV Array`, () => {
        expect(() => new HSV([1, 2, 3, 4])).toThrow(RangeError)
        expect(() => new HSV(5, 6, 7, 8)).toThrow(
            `please provide a vector with length ${HSV.maxlen}`
        )
    })

    test(`HSL Array`, () => {
        expect(() => new HSL([1, 2, 3, 4])).toThrow(RangeError)
        expect(() => new HSL(5, 6, 7, 8)).toThrow(
            `please provide a vector with length ${HSL.maxlen}`
        )
    })
})

describe("RGB and CMYK constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789
    const notnorm = 1.1234

    
    test(`RGB Integer Array`, () => {
        expect(() => new RGB({"isInt": true, "vec":[negint, 128, 255]})).toThrow(TypeError)
        expect(() => new RGB({"isInt": true, "vec":[0, 128, notint]})).toThrow(
            `${[0, 128, notint]} does not contain integer(s) from 0-${RGB.maxval} inclusive`
        )
    })

    test(`CMYK Integer Array`, () => {
        expect(() => new CMYK({"isInt": true, "vec":[negint, 100, 100, 100]})).toThrow(TypeError)
        expect(() => new CMYK({"isInt": true, "vec":[50, 75, 100, notint]})).toThrow(
            `${[50, 75, 100, notint]} does not contain integer(s) from 0-${CMYK.maxval} inclusive`
        )
    })
    test(`RGB Normalized Array`, () => {
        expect(() => new RGB({"isInt": false, "vec":[negint, 0, 1]})).toThrow(TypeError)
        expect(() => new RGB({"isInt": false, "vec":[0, 1, notnorm]})).toThrow(
            `${[0, 1, notnorm]} does not contain normalized values from 0.0-${RGB.maxnm} inclusive`
        )
    })

    test(`CMYK Normalized Array`, () => {
        expect(() => new CMYK({"isInt": false, "vec":[negint, 1, 1, 1]})).toThrow(TypeError)
        expect(() => new CMYK({"isInt": false, "vec":[0, .5, 1, notint]})).toThrow(
            `${[0, .5, 1, notint]} does not contain normalized values from 0.0-${CMYK.maxnm} inclusive`
        )
    })
})

describe("HSV and HSL constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789
    const bigdeg = 361
    const notnorm = 1.1234
    
    test(`HSV Integer Array`, () => {
        expect(() => new HSV({"isInt": true, "vec":[bigdeg, 100, 0]})).toThrow(TypeError)
        expect(() => new HSV({"isInt": true, "vec":[270, negint, 0]})).toThrow(TypeError)
        expect(() => new HSV({"isInt": true, "vec":[180, 100, notint]})).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSV.maxdeg} inclusive, ` + 
            `or saturation/value/brightness as an integer from 0-${HSV.maxval} inclusive`)
    })

    test(`HSL Integer Array`, () => {
        expect(() => new HSL({"isInt": true, "vec":[bigdeg, 100, 0]})).toThrow(TypeError)
        expect(() => new HSL({"isInt": true, "vec":[270, negint, 0]})).toThrow(TypeError)
        expect(() => new HSL({"isInt": true, "vec":[180, 100, notint]})).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSL.maxdeg} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${HSL.maxval} inclusive`)
    })

    test(`HSV Normalized Array`, () => {
        expect(() => new HSV({"isInt": false, "vec":[negint, 0, 1]})).toThrow(TypeError)
        expect(() => new HSV({"isInt": false, "vec":[0, 1, notnorm]})).toThrow(
            `${[0, 1, notnorm]} does not contain normalized values from 0.0-${HSV.maxnm} inclusive`
        )
    })

    test(`HSL Normalized Array`, () => {
        expect(() => new HSL({"isInt": false, "vec":[negint, 0, 1]})).toThrow(TypeError)
        expect(() => new HSL({"isInt": false, "vec":[0, 1, notnorm]})).toThrow(
            `${[0, 1, notnorm]} does not contain normalized values from 0.0-${HSV.maxnm} inclusive`
        )
    })
})

describe("To string", () => {
    const r1 = new RGB([100, 150, 200])
    const c1 = new CMYK([100, 0, 25, 75])
    const v1 = new HSV([360, 100, 0])
    const l1 = new HSL([180, 50, 50])
    test("RGB", () => {
        expect(r1.toString()).toEqual("100, 150, 200")
    })
    test("CMYK", () => {
        expect(c1.toString()).toEqual("100%, 0%, 25%, 75%")
    })
    test("HSV", () => {
        expect(v1.toString()).toEqual("360\xB0, 100%, 0%")
    })
    test("HSL", () => {
        expect(l1.toString()).toEqual("180\xB0, 50%, 50%")
    })
})

describe("RGB Getters", () => {
    const r1 = new RGB([100, 150, 200])
    test("get private vec", () => {
        // console.log(r1.vec)
        expect(r1.vec).toEqual([100, 150, 200])
    })
    const r2 = new RGB({isInt: false, vec: [1, 0, 0]})
    test("get private vec (normalized to int conversion)", () => {
        // console.log(r2.vec)
        expect(r2.vec).toEqual([255, 0, 0])
    })
    test("static max len", () => {
        expect(RGB.maxlen).toBe(constants.VEC3_LEN)
    })
    test("static max value", () => {
        expect(RGB.maxval).toBe(constants.MAX_UINT8)
    })
    test("static max degrees", () => {
        expect(RGB.maxdeg).toBe(null)
    })
})

describe("HSV Getters", () => {
    const h1 = new HSV([360, 100, 0])
    test("get private vec", () => {
        // console.log(h1.vec)
        expect(h1.vec).toEqual([360, 100, 0])
    })
    const h2 = new HSV({isInt: false, vec: [1, 1, 0]})
    test("get private vec (normalized to int conversion)", () => {
        // console.log(h2.vec)
        expect(h2.vec).toEqual([360, 100, 0])
    })
    test("static max len", () => {
        expect(HSV.maxlen).toBe(constants.VEC3_LEN)
    })
    test("static max value", () => {
        expect(HSV.maxval).toBe(constants.MAX_PCT)
    })
    test("static max degrees", () => {
        expect(HSV.maxdeg).toBe(constants.MAX_DEG)
    })
})

describe("Randomize when no args provided in constructor", () => {

    test("RGB random values are in range", () => {
        const r1 = new RGB()
        // console.log("Randomized RGB vec: " + r1.vec)
        expect(r1.vec[0]).toBeGreaterThanOrEqual(0)
        expect(r1.vec[0]).toBeLessThanOrEqual(RGB.maxval)
        expect(r1.vec.length).toBe(RGB.maxlen)
    })

    test("HSV random values are in range", () => {
        const h1 = new HSV() 
        // console.log("Randomized HSV vec: " + h1.vec)
        expect(h1.vec[0]).toBeGreaterThanOrEqual(0)
        expect(h1.vec[0]).toBeLessThanOrEqual(HSV.maxdeg)
        expect(h1.vec[1]).toBeGreaterThanOrEqual(0)
        expect(h1.vec[1]).toBeLessThanOrEqual(HSV.maxval)
        expect(h1.vec.length).toBe(HSV.maxlen)
    })
})

describe("Randomize when no args provided at object key \"vec\"", () => {
    test("RGB random values are in range", () => {
        const r1 = new RGB({"isInt": true, "vec": []}) 
        // console.log("Randomized RGB vec: " + r1.vec)
        expect(r1.vec[0]).toBeGreaterThanOrEqual(0)
        expect(r1.vec[0]).toBeLessThanOrEqual(RGB.maxval)
        expect(r1.vec.length).toBe(RGB.maxlen)
    })

    test("HSV random values are in range", () => {
        const h1 = new HSV({"isInt": true, "vec": []}) 
        // console.log("Randomized HSV vec: " + h1.vec)
        expect(h1.vec[0]).toBeGreaterThanOrEqual(0)
        expect(h1.vec[0]).toBeLessThanOrEqual(HSV.maxdeg)
        expect(h1.vec[1]).toBeGreaterThanOrEqual(0)
        expect(h1.vec[1]).toBeLessThanOrEqual(HSV.maxval)
        expect(h1.vec.length).toBe(HSV.maxlen)
    })
})

describe("Normalize RGB and HSV vectors", () => {

    const rvec = [255, 128, 0]
    const rnorm = [1, .5, 0]
    const r1 = new RGB(rvec)
    const rn1 = r1.normalize()
    for(let i = 0; i < rvec.length; i++) {
        test(`RGB: ${rn1[i]} should be equal/approx equal ${rnorm[i]}`, () => {
            expect((rn1[i])).toBeCloseTo(rnorm[i], 2)
        })
    }

    const hvec = [180, 75, 25]
    const hnorm = [.5, .75, .25]
    const h1 = new HSV(hvec)
    const hn1 = h1.normalize()
    for(let i = 0; i < hvec.length; i++) {
        test(`HSV: ${hn1[i]} should be equal/approx equal ${hnorm[i]}`, () => {
            expect((hn1[i])).toBeCloseTo(hnorm[i], 2)
        })
    }
})

describe("RGB luminance", () => {
    const black_gs = 0
    const brgb = new RGB(0, 0, 0)
    test(`${brgb} luminance value should equal ${black_gs}`, () => {
        expect(brgb.getLuminance()).toBeCloseTo(black_gs, 15)
    })
    const white_gs = 1
    const wrgb = new RGB(255, 255, 255)
    test(`${wrgb} luminance value should equal ${white_gs}`, () => {
        expect(wrgb.getLuminance()).toBeCloseTo(white_gs, 15)
    })
    const orange_gs = (1 * .299) + (.5 * .587) + (0 * .114)
    const orgb = new RGB(255, 128, 0)
    test(`${orgb} luminance value should equal ${orange_gs}`, () => {
        expect(orgb.getLuminance()).toBeCloseTo(orange_gs, 2)
    })
})

describe("RGB hex string", () => {
    const r1 = new RGB(255, 0, 255)
    test("hex string", () => {
        expect(r1.toHexString()).toEqual("#FF00FF")
    })
})