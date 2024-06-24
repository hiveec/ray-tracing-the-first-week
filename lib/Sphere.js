import { HitRecord } from "./HitRecord";
import { Hittable } from "./Hittable";

export class Sphere extends Hittable {
    constructor(center, radius, material) {
        super();
        this.center = center;
        this.radius = radius;
        this.material = material
    }

    /**
     * @override
     */
    hit(ray, tmin, tmax) {
        try {
            let oc = this.center.subtract(ray.origin);
            let a = ray.direction.lengthSquared();
            let h = ray.direction.dot(oc);
            let c = oc.lengthSquared() - this.radius * this.radius;
            let discriminant = h * h - a * c;
            if (discriminant < 0)
                return false;

            let sqrtd = Math.sqrt(discriminant);
            let t = (h - sqrtd) / a;
            if (t < tmin || t > tmax) {
                t = (h + sqrtd) / a;
                if (t < tmin || t > tmax) {
                    return false;
                }
            }

            let position = ray.at(t);
            let normal = position.subtract(this.center).scale(1 / this.radius);

            let hit = new HitRecord(position, normal, t);
            hit.setFaceNormal(ray, normal);
            hit.material = this.material;

            return hit;
        } catch (err) {
            console.log(err, ray)
        }
    }

}
