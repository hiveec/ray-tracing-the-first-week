
/**
 * utils 
 */


export const degree = 0.01745329251994329577;   //Math.PI / 180;
export const radian = 57.29577951308232088;     //180 / Math.PI;
export const EPSILON = 1e-8;

/**
 * degree to radian
 */
export function degToRad(a) {
    return a * degree;
}

/**
 * radian to degree
 */
export function radToDeg(a) {
    return a * radian;
}

/**
 * random number
 */
export function rand(min = 0, max = 1) {
    return min + (max - min) * Math.random();
}