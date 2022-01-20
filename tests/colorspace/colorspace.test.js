import Base from "colorspace/Base"
import { RGB, CMYK, HSV, HSB } from "colorspace/Colorspace"
import { VEC3_LEN, MAX_PCT, MAX_UINT8, MAX_DEG } from "common/constants"

describe("Do not instantiate abstract class Base", () => {

    test("constructor", () => {
        expect(() => new Base()).toThrow(TypeError)
        expect(() => new Base()).toThrow("abstract class Base")
    })

    test("static methods", () => {
        expect(() => Base.type).toThrow(TypeError)
        expect(() => Base.type).toThrow("override this abstract method")
        expect(() => Base.maxlen).toThrow("override this abstract method")
        expect(() => Base.maxval).toThrow("override this abstract method")
        expect(() => Base.maxdeg).toThrow("override this abstract method")
    })
})

describe("RGB and CMYK constructor valid params", () => {

    const rvec = [255, 128, 0]
    const r1 = new RGB(rvec)
    const r2 = new RGB(rvec[0], rvec[1], rvec[2])

    const cvec = [100, 0, 25, 75]
    const c1 = new CMYK(cvec)
    const c2 = new CMYK(cvec[0], cvec[1], cvec[2], cvec[3])

    test(`RGB Array - Internal vec should be equal to ${rvec.toString()}`, () => {
        expect(r1.vec).toEqual(rvec)
    })

    test(`RGB Spread operator - Internal vec should be equal to ${rvec.toString()}`, () => {
        expect(r2.vec).toEqual(rvec)
    })

    test(`CMYK Array - Internal vec should be equal to ${cvec.toString()}`, () => {
        expect(c1.vec).toEqual(cvec)
    })

    test(`CMYK Spread operator - Internal vec should be equal to ${cvec.toString()}`, () => {
        expect(c2.vec).toEqual(cvec)
    })
})

describe("HSV and HSB constructor valid params", () => {

    const vvec = [180, 75, 25]
    const v1 = new HSV(vvec)
    const v2 = new HSV(vvec[0], vvec[1], vvec[2])

    const bvec = [360, 100, 50]
    const b1 = new HSB(bvec)
    const b2 = new HSB(bvec[0], bvec[1], bvec[2])

    test(`HSV Array - Internal vec should be equal to ${vvec.toString()}`, () => {
        expect(v1.vec).toEqual(vvec)
    })

    test(`HSV Spread operator - Internal vec should be equal to ${vvec.toString()}`, () => {
        expect(v2.vec).toEqual(vvec)
    })

    test(`HSB Array - Internal vec should be equal to ${bvec.toString()}`, () => {
        expect(b1.vec).toEqual(bvec)
    })

    test(`HSB Spread operator - Internal vec should be equal to ${bvec.toString()}`, () => {
        expect(b2.vec).toEqual(bvec)
    })
})

describe("Call validateArgs directly with zero args", () => {
    test(`RGB`, () => {
        const rvec = new RGB([255, 128, 0])
        expect(() => rvec._validateArgs()).toThrow(RangeError)
        expect(() => rvec._validateArgs()).toThrow(`no arguments provided`)
    })
})

describe("RGB and CMYK constructor incorrect number of args", () => {
    
    test(`RGB Array`, () => {
        expect(() => new RGB([1, 2])).toThrow(RangeError)
        expect(() => new RGB([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${RGB.maxlen}`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => new RGB(1, 2)).toThrow(RangeError)
        expect(() => new RGB(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${RGB.maxlen}`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK([1, 2, 3])).toThrow(RangeError)
        expect(() => new CMYK([4, 5])).toThrow(
            `please provide arguments or an array with length ${CMYK.maxlen}`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => new CMYK(1, 2, 3)).toThrow(RangeError)
        expect(() => new CMYK(4, 5)).toThrow(
            `please provide arguments or an array with length ${CMYK.maxlen}`
        )
    })
})

describe("HSV and HSB constructor incorrect number of args", () => {
    
    test(`HSV Array`, () => {
        expect(() => new HSV([1, 2])).toThrow(RangeError)
        expect(() => new HSV([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${HSV.maxlen}`
        )
    })

    test(`HSV Spread operator`, () => {
        expect(() => new HSV(1, 2)).toThrow(RangeError)
        expect(() => new HSV(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${HSV.maxlen}`
        )
    })

    test(`HSB Array`, () => {
        expect(() => new HSB([1, 2])).toThrow(RangeError)
        expect(() => new HSB([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${HSB.maxlen}`
        )
    })

    test(`HSB Spread operator`, () => {
        expect(() => new HSB(1, 2)).toThrow(RangeError)
        expect(() => new HSB(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${HSB.maxlen}`
        )
    })
})

describe("RGB and CMYK constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789

    
    test(`RGB Array`, () => {
        expect(() => new RGB([negint, 128, 255])).toThrow(TypeError)
        expect(() => new RGB([0, 128, notint])).toThrow(
            `${notint} does not contain integer(s) from 0-${RGB.maxval} inclusive`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => new RGB(negint, 128, 255)).toThrow(TypeError)
        expect(() => new RGB(0, 128, notint)).toThrow(
            `${notint} does not contain integer(s) from 0-${RGB.maxval} inclusive`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK([negint, 100, 100, 100])).toThrow(TypeError)
        expect(() => new CMYK([50, 75, 100, notint])).toThrow(
            `${notint} does not contain integer(s) from 0-${CMYK.maxval} inclusive`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => new CMYK(negint, 100, 100, 100)).toThrow(TypeError)
        expect(() => new CMYK(50, 75, 100, notint)).toThrow(
            `${notint} does not contain integer(s) from 0-${CMYK.maxval} inclusive`
        )
    })
})

describe("HSV and HSB constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789
    const bigdeg = 361
    
    test(`HSV Array`, () => {
        expect(() => new HSV([bigdeg, 100, 0])).toThrow(TypeError)
        expect(() => new HSV([270, negint, 0])).toThrow(TypeError)
        expect(() => new HSV([180, 100, notint])).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSV.maxdeg} inclusive, ` + 
            `or saturation/value/brightness as an integer from 0-${HSV.maxval} inclusive`)
    })

    test(`HSV Spread operator`, () => {
        expect(() => new HSV(bigdeg, 100, 0)).toThrow(TypeError)
        expect(() => new HSV(270, negint, 0)).toThrow(TypeError)
        expect(() => new HSV(180, 100, notint)).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSV.maxdeg} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${HSV.maxval} inclusive`)
    })

    test(`HSB Array`, () => {
        expect(() => new HSB([bigdeg, 100, 0])).toThrow(TypeError)
        expect(() => new HSB([270, negint, 0])).toThrow(TypeError)
        expect(() => new HSB([180, 100, notint])).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSB.maxdeg} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${HSB.maxval} inclusive`)
    })

    test(`HSB Spread operator`, () => {
        expect(() => new HSB(bigdeg, 100, 0)).toThrow(TypeError)
        expect(() => new HSB(270, negint, 0)).toThrow(TypeError)
        expect(() => new HSB(180, 100, notint)).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${HSB.maxdeg} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${HSB.maxval} inclusive`)
    })
})

describe("RGB Getters and setters", () => {
    const r1 = new RGB([100, 150, 200])
    test("get private vec", () => {
        expect(r1.vec).toEqual([100, 150, 200])
    })
    test("set private vec", () => {
        r1.vec = [50, 75, 100]
        expect(r1.vec).toEqual([50, 75, 100])
    })
    test("static type", () => {
        expect(RGB.type).toBe("RGB")
    })
    test("static max len", () => {
        expect(RGB.maxlen).toBe(VEC3_LEN)
    })
    test("static max value", () => {
        expect(RGB.maxval).toBe(MAX_UINT8)
    })
    test("static max degrees", () => {
        expect(RGB.maxdeg).toBe(null)
    })
})

describe("HSV Getters and setters", () => {
    const h1 = new HSV([360, 100, 0])
    test("get private vec", () => {
        expect(h1.vec).toEqual([360, 100, 0])
    })
    test("set private vec", () => {
        h1.vec = [90, 75, 25]
        expect(h1.vec).toEqual([90, 75, 25])
    })
    test("static type", () => {
        expect(HSV.type).toBe("HSV")
    })
    test("static max len", () => {
        expect(HSV.maxlen).toBe(VEC3_LEN)
    })
    test("static max value", () => {
        expect(HSV.maxval).toBe(MAX_PCT)
    })
    test("static max degrees", () => {
        expect(HSV.maxdeg).toBe(MAX_DEG)
    })
})

describe("Randomize when no args provided in constructor", () => {

    test("RGB random values are in range", () => {
        const r1 = new RGB()
        console.log("Randomized RGB vec: " + r1.vec)
        expect(r1.vec[0]).toBeGreaterThanOrEqual(0)
        expect(r1.vec[0]).toBeLessThanOrEqual(RGB.maxval)
        expect(r1.vec.length).toBe(RGB.maxlen)
    })

    test("HSV random values are in range", () => {
        const h1 = new HSV() 
        console.log("Randomized HSV vec: " + h1.vec)
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