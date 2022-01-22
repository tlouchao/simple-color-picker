import { RGB, CMYK, HSV, HSL } from "colorspace/colorspace"

describe("RGB conversion 1", () => {
    const orange = new RGB({"isInt": true, "vec": [255, 128, 0]})
    test(`CMYK from RGB`, () => {
        const cmyk = CMYK.from(orange)
        expect(cmyk.vec).toEqual([0, 50, 100, 0])
    })
    test(`HSV from RGB`, () => {
        const hsv = HSV.from(orange)
        expect(hsv.vec).toEqual([30, 100, 100])
    })
    test(`HSL from RGB`, () => {
        const hsl = HSL.from(orange)
        expect(hsl.vec).toEqual([30, 100, 50])
    })
})

describe("RGB conversion 2", () => {
    const blue = new RGB({"isInt": true, "vec": [0, 100, 200]})
    test(`CMYK from RGB`, () => {
        const cmyk = CMYK.from(blue)
        expect(cmyk.vec).toEqual([100, 50, 0, 22])
    })
    test(`HSV from RGB`, () => {
        const hsv = HSV.from(blue)
        expect(hsv.vec).toEqual([210, 100, 78])
    })
    test(`HSL from RGB`, () => {
        const hsl = HSL.from(blue)
        expect(hsl.vec).toEqual([210, 100, 39])
    })
})

describe("RGB conversion 3", () => {
    const green = new RGB({"isInt": true, "vec": [64, 216, 128]})
    test(`CMYK from RGB`, () => {
        const cmyk = CMYK.from(green)
        expect(cmyk.vec).toEqual([70, 0, 41, 15])
    })
    test(`HSV from RGB`, () => {
        const hsv = HSV.from(green)
        expect(hsv.vec).toEqual([145, 70, 85])
    })
    test(`HSL from RGB`, () => {
        const hsl = HSL.from(green)
        expect(hsl.vec).toEqual([145, 66, 55])
    })
})