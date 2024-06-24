import { Material } from "./Material";
import { Vec3 } from "./Vec3";
import { Ray } from "./Ray";

/**
 * metal material
 */
export class Metal extends Material {
    constructor(albedo, fuzz = 0) {
        super()
        this.albedo = albedo;
        this.fuzz = fuzz
    }

    scatter(ray, hitRecord) {
        let reflected = Vec3.reflect(ray.direction, hitRecord.normal).unit().add(Vec3.randInUnit().scale(this.fuzz));
        return {
            scattered: new Ray(hitRecord.position, reflected),
            attenuation: this.albedo
        };
    }
}