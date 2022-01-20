import Base from "colorspace/Base"
import { RGB, CMYK, HSV, HSB } from "colorspace/Colorspace"
import { VEC3_LEN, VEC4_LEN, MAX_PCT, MAX_UINT8, MAX_DEG } from "common/constants"

test("Do not instantiate abstract class Base", () => {
    expect(() => new Base()).toThrow(TypeError)
    expect(() => new Base()).toThrow("abstract class Base")
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

describe("RGB and CMYK constructor incorrect number of args", () => {
    
    test(`RGB Array`, () => {
        expect(() => new RGB([1, 2])).toThrow(RangeError)
        expect(() => new RGB([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => new RGB(1, 2)).toThrow(RangeError)
        expect(() => new RGB(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK([1, 2, 3])).toThrow(RangeError)
        expect(() => new CMYK([4, 5])).toThrow(
            `please provide arguments or an array with length ${VEC4_LEN}`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => new CMYK(1, 2, 3)).toThrow(RangeError)
        expect(() => new CMYK(4, 5)).toThrow(
            `please provide arguments or an array with length ${VEC4_LEN}`
        )
    })
})

describe("HSV and HSB constructor incorrect number of args", () => {
    
    test(`HSV Array`, () => {
        expect(() => new HSV([1, 2])).toThrow(RangeError)
        expect(() => new HSV([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })

    test(`HSV Spread operator`, () => {
        expect(() => new HSV(1, 2)).toThrow(RangeError)
        expect(() => new HSV(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })

    test(`HSB Array`, () => {
        expect(() => new HSB([1, 2])).toThrow(RangeError)
        expect(() => new HSB([4, 5, 6, 7])).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })

    test(`HSB Spread operator`, () => {
        expect(() => new HSB(1, 2)).toThrow(RangeError)
        expect(() => new HSB(4, 5, 6, 7)).toThrow(
            `please provide arguments or an array with length ${VEC3_LEN}`
        )
    })
})

describe("RGB and CMYK constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789

    
    test(`RGB Array`, () => {
        expect(() => new RGB([negint, 128, 255])).toThrow(TypeError)
        expect(() => new RGB([0, 128, notint])).toThrow(
            `${notint} does not contain integer(s) from 0-${MAX_UINT8} inclusive`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => new RGB(negint, 128, 255)).toThrow(TypeError)
        expect(() => new RGB(0, 128, notint)).toThrow(
            `${notint} does not contain integer(s) from 0-${MAX_UINT8} inclusive`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => new CMYK([negint, 100, 100, 100])).toThrow(TypeError)
        expect(() => new CMYK([50, 75, 100, notint])).toThrow(
            `${notint} does not contain integer(s) from 0-${MAX_PCT} inclusive`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => new CMYK(negint, 100, 100, 100)).toThrow(TypeError)
        expect(() => new CMYK(50, 75, 100, notint)).toThrow(
            `${notint} does not contain integer(s) from 0-${MAX_PCT} inclusive`
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
            `${[180, 100, notint]} does not contain hue as an integer from 0-${MAX_DEG} inclusive, ` + 
            `or saturation/value/brightness as an integer from 0-${MAX_PCT} inclusive`)
    })

    test(`HSV Spread operator`, () => {
        expect(() => new HSV(bigdeg, 100, 0)).toThrow(TypeError)
        expect(() => new HSV(270, negint, 0)).toThrow(TypeError)
        expect(() => new HSV(180, 100, notint)).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${MAX_DEG} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${MAX_PCT} inclusive`)
    })

    test(`HSB Array`, () => {
        expect(() => new HSB([bigdeg, 100, 0])).toThrow(TypeError)
        expect(() => new HSB([270, negint, 0])).toThrow(TypeError)
        expect(() => new HSB([180, 100, notint])).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${MAX_DEG} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${MAX_PCT} inclusive`)
    })

    test(`HSB Spread operator`, () => {
        expect(() => new HSB(bigdeg, 100, 0)).toThrow(TypeError)
        expect(() => new HSB(270, negint, 0)).toThrow(TypeError)
        expect(() => new HSB(180, 100, notint)).toThrow(
            `${[180, 100, notint]} does not contain hue as an integer from 0-${MAX_DEG} inclusive, ` +
            `or saturation/value/brightness as an integer from 0-${MAX_PCT} inclusive`)
    })
})