import { Vec3 } from "./Vec3";
import { rand } from "./utils";

export class Color extends Vec3 {
    constructor(r, g, b) {
        super(r, g, b)
    }
    get r() { return this.e[0]; }
    get g() { return this.e[1]; }
    get b() { return this.e[2]; }

    toString() {
        return `[${this.x * 255}, ${this.y * 255}, ${this.z * 255}]`
    }

    static rand(min, max) {
        return new Color(rand(min, max), rand(min, max), rand(min, max));
    }

    static interpolate(fromColor, toColor, t) {
        return new Color(fromColor.r * (1 - t) + toColor.r * t,
            fromColor.g * (1 - t) + toColor.g * t,
            fromColor.b * (1 - t) + toColor.b * t);
    }

    static average(colors) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let i = 0; i < colors.length; i++) {
            r += colors[i].r;
            g += colors[i].g;
            b += colors[i].b;
        }
        let f = 1 / colors.length;
        return new Color(r * f, g * f, b * f);
    }

    static linearToGamma(color) {
        return new Color(Math.sqrt(color.r), Math.sqrt(color.g), Math.sqrt(color.b));
    }
}