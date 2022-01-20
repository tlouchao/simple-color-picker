import {VEC3_MAX, MAX_UINT8} from "common/constants"

export const randomVec3Normalized = () => {
    const vec3 = Float64Array.from({length: VEC3_MAX}, () => Math.random());
    return vec3;
}

export const randomVec3Uint8 = () => {
    const vec3 = Uint8ClampedArray.from({length: VEC3_MAX}, () => 
        Math.round(Math.random() * MAX_UINT8))
    return vec3;
}

export const vec3ToNormalized = (vec3) => {
    if (vec3 instanceof Uint8ClampedArray) {
        const buf = Float64Array.from(vec3)
        vec3 = buf.map(x => x / MAX_UINT8)
    }
    return vec3;
}

export const vec3ToUint8 = (vec3) => {
    if (vec3 instanceof Float64Array) {
        const buf = vec3.map(x => x * MAX_UINT8)
        vec3 = Uint8ClampedArray.from(buf)
    }
    return vec3;
}

export const vec3ToHexString = (vec3) => {
    let hexStr = '#'
    vec3 = vec3ToUint8(vec3)
    vec3.forEach((x) => hexStr = hexStr.concat(x.toString(16).padStart(2, '0').toUpperCase()))
    return hexStr
}

export const vec3ToGreyWeighted = (vec3) => {
    vec3 = vec3ToNormalized(vec3)
    const res = (vec3[0] * .299) + (vec3[1] * .587) + (vec3[2] * .114)
    return parseFloat(res.toPrecision(15))
}