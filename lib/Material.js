/**
 * material
 * @abstract
 */
export class Material {
    constructor() { }

    /**
     * scatter from surface
     */
    scatter(ray, hitRecord) {
        return false;
    }
}