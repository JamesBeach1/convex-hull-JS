const points = []
let max = 50
let stack = []

const width = 500
const height = 500
const margin = 80

let start
let slider
let sliderLen = 160

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function setup() {
    createCanvas(width, height)

    slider = createSlider(2, 150, max, 1)
    slider.position((width - sliderLen) / 2, height + margin)
    slider.style('width', '160px')

    for (let i = 0; i <= max; i += 1) {
        points.push(new Point(random(margin , width - margin), random(margin ,height - margin)))
    }

    points.sort((a, b) => b.y - a.y);

}

function draw() { 
    max = slider.value()

    while(points.length != max){
        if(points.length > max){
            points.splice(random(points.length), 1)
        }

        else{
            points.push(new Point(random(margin , width - margin), random(margin ,height - margin)))
        }
    }
    clear()
    stack = []
    
    text(max + " Points", 25, 25)

    stroke(0, 255, 0);
    strokeWeight(8);
    for (let p of points) {
        point(p.x, p.y);
    }

    start = points[0]
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
    let i
    for (i = 0; i < stack.length - 1; i += 1) {
        line(stack[i].x, stack[i].y, stack[i + 1].x, stack[i + 1].y)
    }
    line(stack[i].x, stack[i].y, start.x, start.y)
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
