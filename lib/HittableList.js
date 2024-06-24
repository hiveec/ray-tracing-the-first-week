import { Hittable } from "./Hittable";

/**
 * list of hittable objects
 */
export class HittableList extends Hittable {

    constructor(objects = []) {
        super()
        this.objects = objects;
    }

    add(object) {
        this.objects.push(object)
    }

    hit(ray, tmin, tmax) {
        let record = null, hitted = false, closest = tmax
        for (let i = 0; i < this.objects.length; i++) {
            let hit = this.objects[i].hit(ray, tmin, closest)
            if (!hit) continue
            hitted = true, closest = hit.t, record = hit;
        }
        return record
    }
}