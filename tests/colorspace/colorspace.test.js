import RGB from "colorspace/RGB"
import CMYK from "colorspace/CMYK"
import { VEC3_MAX, VEC4_MAX, PERCENT_MAX, UINT8_MAX } from "common/constants"

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

describe("RGB and CMYK constructor incorrect number of args", () => {
    
    test(`RGB Array`, () => {
        expect(() => {new RGB([1, 2])}).toThrow(RangeError)
        expect(() => {new RGB([4, 5, 6, 7])}).toThrow(
            `please provide arguments or an array with length ${VEC3_MAX}`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => {new RGB(1, 2)}).toThrow(RangeError)
        expect(() => {new RGB(4, 5, 6, 7)}).toThrow(
            `please provide arguments or an array with length ${VEC3_MAX}`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => {new CMYK([1, 2, 3])}).toThrow(RangeError)
        expect(() => {new CMYK([4, 5])}).toThrow(
            `please provide arguments or an array with length ${VEC4_MAX}`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => {new CMYK(1, 2, 3)}).toThrow(RangeError)
        expect(() => {new CMYK(4, 5)}).toThrow(
            `please provide arguments or an array with length ${VEC4_MAX}`
        )
    })
})

describe("RGB and CMYK constructor bad values args", () => {

    const negint = -1
    const notint = 5.6789

    
    test(`RGB Array`, () => {
        expect(() => {new RGB([negint, 128, 255])}).toThrow(TypeError)
        expect(() => {new RGB([0, 128, notint])}).toThrow(
            `${notint} does not contain integer(s) from 0-${UINT8_MAX} inclusive`
        )
    })

    test(`RGB Spread operator`, () => {
        expect(() => {new RGB(negint, 128, 255)}).toThrow(TypeError)
        expect(() => {new RGB(0, 128, notint)}).toThrow(
            `${notint} does not contain integer(s) from 0-${UINT8_MAX} inclusive`
        )
    })

    test(`CMYK Array`, () => {
        expect(() => {new CMYK([negint, 100, 100, 100])}).toThrow(TypeError)
        expect(() => {new CMYK([50, 75, 100, notint])}).toThrow(
            `${notint} does not contain integer(s) from 0-${PERCENT_MAX} inclusive`
        )
    })

    test(`CMYK Spread operator`, () => {
        expect(() => {new CMYK(negint, 100, 100, 100)}).toThrow(TypeError)
        expect(() => {new CMYK(50, 75, 100, notint)}).toThrow(
            `${notint} does not contain integer(s) from 0-${PERCENT_MAX} inclusive`
        )
    })
})