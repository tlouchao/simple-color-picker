import {VEC3_LEN, UINT8_MAX} from '../common/constants'

export const randomRgbNormalized = () => {
    const rgb = Float64Array.from({length: VEC3_LEN}, () => Math.random());
    return rgb;
}

export const randomRgbUint8 = () => {
    const rgb = Uint8ClampedArray.from({length: VEC3_LEN}, () => 
        Math.floor(Math.random() * (UINT8_MAX + 1)))
    return rgb;
}

export const rgbToNormalized = (rgb) => {
    if (rgb instanceof Uint8ClampedArray) {
        const buf = Float64Array.from(rgb)
        rgb = buf.map(x => x / UINT8_MAX)
    }
    return rgb;
}

export const rgbToUint8 = (rgb) => {
    if (rgb instanceof Float64Array) {
        const buf = rgb.map(x => x * (UINT8_MAX + 1))
        rgb = Uint8ClampedArray.from(buf)
    }
    return rgb;
}

export const rgbToHexString = (rgb) => {
    let hexStr = '#'
    rgb = rgbToUint8(rgb)
    rgb.forEach((x) => hexStr = hexStr.concat(x.toString(16).padStart(2, '0').toUpperCase()))
    return hexStr
}

export const rgbToGreyWeighted = (rgb) => {
    rgb = rgbToNormalized(rgb)
    const res = (rgb[0] * .299) + (rgb[1] * .587) + (rgb[2] * .114)
    return parseFloat(res.toPrecision(15))
}