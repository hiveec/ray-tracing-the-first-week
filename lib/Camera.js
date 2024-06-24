
import { Point } from './Point';
import { Vec3 } from './Vec3'
import { Ray } from './Ray';
import { rand, degToRad } from './utils';
import { Color } from './Color';

const _UP = new Vec3(0, 1, 0);
const _OFFSET = new Vec3(0, 0, 0);
/**
 * perspective camera
 */
export class Camera {
    constructor(canvasWidth, canvasHeight, fov = 60, focalLength = 1) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fov = degToRad(fov);
        this.focalLength = focalLength;

        this.position = new Point(0, 0, 0)
        this.target = new Point(0, 0, -1)

        this.horizontal = new Vec3(0, 0, 0);
        this.vertical = new Vec3(0, 0, 0);
        this.lowerLeftCorner = new Point(0, 0, 0)

        this.samplesPerPixel = 1;
        this.dirty = true;
    }
    setSampleCount(samplesPerPixel) {
        this.samplesPerPixel = samplesPerPixel;
    }

    setFov(fov) {
        this.fov = degToRad(fov);
        this.dirty = true;
    }
    setPosition(v) {
        this.position = v;
        this.dirty = true;
    }
    setTarget(v) {
        this.target = v;
        this.dirty = true;
    }

    lookAt(position, target) {
        position && (this.position = position);
        target && (this.target = target);
        this.dirty = true;
    }

    update() {
        if (!this.dirty) return;
        this.dirty = false;

        let aspect = this.canvasWidth / this.canvasHeight;
        let viewportHeight = 2 * Math.tan(0.5 * this.fov) * this.focalLength;
        let viewportWidth = viewportHeight * aspect;

        //directions
        let forward = this.position.subtract(this.target).unit();
        let right = _UP.cross(forward).unit();
        let up = forward.cross(right).unit();
        //
        this.horizontal = right.scale(viewportWidth);
        this.vertical = up.scale(viewportHeight);
        this.lowerLeftCorner = this.position
            .subtract(this.horizontal.scale(0.5))
            .subtract(this.vertical.scale(0.5))
            .subtract(forward.scale(this.focalLength));
    }

    getRay(u, v) {
        this.update();
        let offset = _OFFSET;

        let direction = this.lowerLeftCorner
            .add(this.horizontal.scale(u))
            .add(this.vertical.scale(v))
            .subtract(this.position);

        return new Ray(this.position, direction.unit());
    }

    render(hittableList, maxDepth = 50) {
        const width = this.canvasWidth, height = this.canvasHeight;
        var pixels = new Array(width * height * 4)
        let offset = 0, ray = null;
        for (var j = height - 1; j >= 0; j--) {
            for (var i = 0; i < width; i++) {
                let colors = [];
                //multisamples per pixel
                for (let s = 0; s < this.samplesPerPixel; s++) {
                    const v = (j + rand() - 0.5) / (height - 1);
                    const u = (i + rand() - 0.5) / (width - 1);
                    ray = this.getRay(u, v);
                    let tempColor = this.rayColor(ray, hittableList, maxDepth);
                    colors.push(tempColor)
                }
                let color = Color.average(colors);
                color = Color.linearToGamma(color)

                pixels[offset + 0] = color.r * 255;
                pixels[offset + 1] = color.g * 255;
                pixels[offset + 2] = color.b * 255;
                pixels[offset + 3] = 255;
                offset += 4
            }
        }
        return new ImageData(new Uint8ClampedArray(pixels), width, height)
    }


    rayColor(ray, hittableList, depth) {
        // If we've exceeded the ray bounce limit, no more light is gathered.
        if (depth <= 0)
            return new Color(0, 0, 0);

        let record = hittableList.hit(ray, 0.001, Number.POSITIVE_INFINITY);
        if (record) {
            let scatteredRay, attenuationColor;
            let scatterResult = record.material.scatter(ray, record)

            if (scatterResult) {
                scatteredRay = scatterResult.scattered;
                attenuationColor = scatterResult.attenuation;
                let rc = rayColor(scatteredRay, hittableList, depth - 1)
                return rc.multiply(attenuationColor)
            }
            return new Color(0, 0, 0)
        }

        let a = 0.5 * (ray.direction.y + 1.0);
        return Color.interpolate(new Color(1, 1, 1), new Color(0.5, 0.7, 1.0), a)
    }

}