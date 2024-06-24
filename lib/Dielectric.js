import { Material } from "./Material";
import { Vec3 } from "./Vec3";
import { Ray } from "./Ray";
import { Color } from "./Color";
import { rand } from "./utils";

/**
 * dielectric material
 */
export class Dielectric extends Material {
    constructor(ior) {
        super()
        // Refractive index in vacuum or air, or the ratio of the material's refractive index over
        // the refractive index of the enclosing media
        this.ior = ior;
    }

    reflectance(cosine, ior) {
        // Use Schlick's approximation for reflectance.
        let r0 = (1 - ior) / (1 + ior);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow((1 - cosine), 5);

    }

    scatter(ray, hitRecord) {
        let ri = hitRecord.frontFace ? (1.0 / this.ior) : this.ior;
        let directionUnit = ray.direction.unit();

        let cosTheta = Math.min(directionUnit.negate().dot(hitRecord.normal), 1.0);
        let sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);

        let cannotRefract = ri * sinTheta > 1.0
        let direction;
        if (cannotRefract || this.reflectance(cosTheta, ri) > rand()) {
            // Must Reflect
            direction = Vec3.reflect(directionUnit, hitRecord.normal);
        } else {
            // Must Refract
            direction = Vec3.refract(directionUnit, hitRecord.normal, ri);
        }

        return {
            scattered: new Ray(hitRecord.position, direction),
            attenuation: new Color(1, 1, 1)
        };

    }
}