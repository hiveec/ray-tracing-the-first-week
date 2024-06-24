
/**
 * hittable object 
 * @abstract
 */
export class Hittable {

    constructor() { }

    /**
     * @param {Ray} ray 
     * @param {number} tmin 
     * @param {number} tmax 
     * @returns {HitRecord}
     */
    hit(ray, tmin, tmax) { }

}