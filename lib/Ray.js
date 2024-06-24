import { Vec3 } from "./Vec3";

/**
 * Ray
 */
export class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    at(t) {
        return this.origin.add(this.direction.scale(t));
    }
}