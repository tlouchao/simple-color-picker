import {VEC3_LEN, MAX_UINT8} from "../common/constants"

export const randomVec3Normalized = () => {
    const vec3 = Float64Array.from({length: VEC3_LEN}, () => Math.random());
    return vec3;
}

export const randomVec3Uint8 = () => {
    const vec3 = Uint8ClampedArray.from({length: VEC3_LEN}, () => 
        Math.round(Math.random() * MAX_UINT8))
    return vec3;
}

export const vec3ToNormalized = (vec3) => {
    if (vec3 instanceof Uint8ClampedArray) {
        const buf = Float64Array.from(vec3)
        vec3 = buf.map(x => x / MAX_UINT8)
    } else {
        throw new TypeError(`${vec3} is not a uint8 clamped array`)
    }
    return vec3;
}

export const vec3ToUint8 = (vec3) => {
    if (vec3 instanceof Float64Array) {
        const buf = vec3.map(x => x * MAX_UINT8)
        vec3 = Uint8ClampedArray.from(buf)
    } else {
        throw new TypeError(`${vec3} is not a float64 array`)
    }
    return vec3;
}