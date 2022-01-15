export const randomRgb = () => {
    const rgb = Array.from({length: 3}, () => Math.floor(Math.random() * 255));
    return rgb;
}

export const rgbToHexString = (rgb) => {
    let hexStr = '#'
    rgb.forEach((x) => hexStr = hexStr.concat(x.toString(16).padStart(2, '0').toUpperCase()))
    return hexStr
}