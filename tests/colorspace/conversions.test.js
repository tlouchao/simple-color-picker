import { RGB, CMYK, HSV, HSL } from "colorspace/colorspace"

describe("RGB conversion 1", () => {
    const orange = new RGB(255, 128, 0)
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
    const blue = new RGB(0, 100, 200)
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
    const green = new RGB(64, 216, 128)
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

describe("HSL conversion", () => {
    const red = new HSL(360, 100, 50)
    const white = new HSL(60, 0, 100)
    const black = new HSL(180, 100, 0)
    test(`RGB from HSL`, () => {
        const rgb1 = RGB.from(red)
        expect(rgb1.vec).toEqual([255, 0, 0])
    })
    test(`RGB from HSL white`, () => {
        const rgb2 = RGB.from(white)
        expect(rgb2.vec).toEqual([255, 255, 255])
    })
    test(`RGB from HSL black`, () => {
        const rgb3 = RGB.from(black)
        expect(rgb3.vec).toEqual([0, 0, 0])
    })
})

describe("HSV conversion", () => {
    const green = new HSV(120, 100, 100)
    const purple = new HSV(300, 100, 50)
    const white = new HSV(0, 0, 100)
    const black = new HSV(240, 0, 0)
    test(`RGB from HSV 1`, () => {
        const rgb1 = RGB.from(green)
        expect(rgb1.vec).toEqual([0, 255, 0])
    })
    test(`RGB from HSV 2`, () => {
        const rgb2 = RGB.from(purple)
        expect(rgb2.vec).toEqual([128, 0, 128])
    })
    test(`RGB from HSV white`, () => {
        const rgb3 = RGB.from(white)
        expect(rgb3.vec).toEqual([255, 255, 255])
    })
    test(`RGB from HSV black`, () => {
        const rgb4 = RGB.from(black)
        expect(rgb4.vec).toEqual([0, 0, 0])
    })
})