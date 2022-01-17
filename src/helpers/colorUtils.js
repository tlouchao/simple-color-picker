export const randomRgbDouble = () => {
    const rgb = Array.from({length: 3}, () => Math.random()); // 0 inclusive, 1 exclusive
    return rgb;
}

export const randomRgbUint8 = () => {
    const rgb = randomRgbDouble().map(x => Math.floor(x * 256));
    return rgb;
}

export const rgbToDouble = (rgb) => {
    if (rgb.every(x => Number.isInteger(x))) {
        rgb = rgb.map(x => x / 255.0)
    }
    return rgb;
}

export const rgbToUint8 = (rgb) => {
    if (rgb.every(x => !(Number.isInteger(x)))) {
        rgb = rgb.map(x => Math.floor(x * 256))
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
    rgb = rgbToDouble(rgb)
    return (rgb[0] * .299) + (rgb[1] * .587) + (rgb[2] * .114)
}