import { Material } from "./Material";
import { Vec3 } from "./Vec3";
import { Ray } from "./Ray";

/**
 * lambertian material
 */
export class Lambertian extends Material {
    constructor(albedo) {
        super()
        this.albedo = albedo;
    }

    scatter(ray, hitRecord) {
        let scatterDirection = hitRecord.normal.add(Vec3.randInUnit());

        if (Vec3.nearZero(scatterDirection))
            scatterDirection = hitRecord.normal;

        return {
            scattered: new Ray(hitRecord.position, scatterDirection),
            attenuation: this.albedo
        };
    }
}