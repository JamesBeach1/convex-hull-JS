const points = []
const stack = []
const max = 20

const width = 500
const height = 500
const margin = 50

let start

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function setup() {
    createCanvas(width, height)
    for (let i = 0; i <= max; i += 1) {
        points.push(new Point(random(width - margin), random(height - margin)))
    }

    points.sort((a, b) => b.y - a.y);
    start = points[0]

}

function draw() {
    stroke(0, 255, 0);
    strokeWeight(8);
    for (let p of points) {
        point(p.x, p.y);
    }

    stroke(255, 0, 0)
    point(start.x, start.y)

    points.sort((a, b) => getPolarAngle(start, b) - getPolarAngle(start, a))

    for (let i = 0; i < points.length; i += 1) {
        while (stack.length > 1 && (ccw(stack[stack.length - 2], stack[stack.length - 1], points[i]) <= 0)) {
            stack.pop()
        }
        stack.push(points[i])
    }

    strokeWeight(1)
    for (let i = 0; i < stack.length - 1; i += 1) {
        line(stack[i].x, stack[i].y, stack[i + 1].x, stack[i + 1].y)
    }
}

function getPolarAngle(p0, p1) {
    let yspan = p1.y - p0.y
    let xspan = p1.x - p0.x
    return Math.atan2(yspan, xspan)
}

function ccw(a, b, c) {
    return (b.y - a.y) * (c.x - b.x) -
        (b.x - a.x) * (c.y - b.y)
}
