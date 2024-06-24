import { rand, EPSILON } from "./utils";
/**
 * vec3
 */
export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.e = new Float64Array([x, y, z]);
    }
    get x() { return this.e[0] }
    get y() { return this.e[1] }
    get z() { return this.e[2] }
    set x(n) { this.e[0] = n }
    set y(n) { this.e[1] = n }
    set z(n) { this.e[2] = n }

    negate() {
        return new this.constructor(-this.x, -this.y, -this.z)
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    add(v) {
        return new this.constructor(this.x + v.x, this.y + v.y, this.z + v.z)
    }
    subtract(v) {
        return new this.constructor(this.x - v.x, this.y - v.y, this.z - v.z)
    }
    multiply(v) {
        return new this.constructor(this.x * v.x, this.y * v.y, this.z * v.z)
    }
    scale(t) {
        return new this.constructor(this.x * t, this.y * t, this.z * t)
    }
    dot(v) {
        return this.e[0] * v.e[0]
            + this.e[1] * v.e[1]
            + this.e[2] * v.e[2];
    }
    cross(v) {
        return new this.constructor(
            this.e[1] * v.e[2] - this.e[2] * v.e[1],
            this.e[2] * v.e[0] - this.e[0] * v.e[2],
            this.e[0] * v.e[1] - this.e[1] * v.e[0]);
    }
    unit() {
        return this.scale(1 / this.length())
    }

    /**
     * get vector in the unit sphere
     * @returns 
     */
    static randInUnit() {
        while (true) {
            let p = Vec3.rand(-1, 1);
            if (p.lengthSquared() >= 1) {
                continue;
            }
            return p.unit();
        }
    }
    /**
     * get vector in the unit disk
     */
    static randInDisk(){
        return Vec3.randInUnit();
    }

    /**
     *  get vector in the same hemisphere as the normal
     * @param {*} normal 
     * @returns 
     */
    static randOnHemisphere(normal) {
        while (true) {
            let p = Vec3.randInUnit();
            if (p.dot(normal) >= 0.0) {
                return p;
            }
            return p.negate();
        }
    }

    static rand(min = 0, max = 1) {
        return new Vec3(rand(min, max), rand(min, max), rand(min, max))
    }

    /**
     * return true if the vector is close to zero in all dimensions
     */
    static nearZero(v) {
        return (Math.abs(v.x) < EPSILON) && (Math.abs(v.y) < EPSILON) && (Math.abs(v.z) < EPSILON);
    }

    /**
     * return the reflection vector of v around n
     */
    static reflect(v, n) {
        // v - 2*dot(v,n)*n;
        return v.subtract(n.scale(2 * v.dot(n)));
    }

    /**
     * return the refraction vector of v around n
     */
    static refract(v, n, etaiOverEta) {
        let cosTheta = Math.min(v.scale(-1).dot(n), 1.0);
        let rOutPerp = v.add(n.scale(cosTheta)).scale(etaiOverEta);
        let rOutParallel = n.scale(-Math.sqrt(Math.abs(1.0 - rOutPerp.lengthSquared())));
        return rOutPerp.add(rOutParallel);
    }

   
}