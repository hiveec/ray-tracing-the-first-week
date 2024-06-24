/**
 * real-valued intervals with a minimum and a maximum
 */
export class Interval {
    constructor(min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
        this.min = min;
        this.max = max;
    }
    contains(t) {
        return (this.min <= t) && (t <= this.max);
    }
    surrounds(t) {
        return (this.min < t) && (t < this.max);
    }
    clamp(t) {
        if (t < this.min) return this.min;
        if (t > this.max) return this.max;
        return t;
    }
    size() {
        return this.max - this.min;
    }
}