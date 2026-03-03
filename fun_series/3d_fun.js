const BACKGROUND = "#aeaeaeff";
const FOREGROUND = "#20ff30ff";

console.log(DDD)
DDD.width = 400;
DDD.height = 400;

//like fundementally I am so cooked with java script btw like I have not really used this for something like this is forever
const ctx = DDD.getContext("2d");

console.log(ctx);

function clear() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, DDD.width, DDD.height);
}

function point({x, y}) {
    const s = 10;
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x - s/2, y - s/2, s, s);
}

function line(p1, p2){
    ctx.lineWidth = 3;
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(p) {
    return {
        x: (p.x + 1)/2*DDD.width,
        y: (1 - (p.y + 1)/2)*DDD.height,
    }
}

function project({x, y, z}){
    return{
        x: x/z,
        y: y/z,
    }
}

// let vs = [
//     {x:  0.25, y:  0.25, z: 0.25},
//     {x: -0.25, y:  0.25, z: 0.25},
//     {x: -0.25, y: -0.25, z: 0.25},
//     {x:  0.25, y: -0.25, z: 0.25},

//     {x:  0.25, y:  0.25, z: -0.25},
//     {x: -0.25, y:  0.25, z: -0.25},
//     {x: -0.25, y: -0.25, z: -0.25},
//     {x:  0.25, y: -0.25, z: -0.25},
// ]

// let fs = [
//     [0, 1, 2, 3],
//     [4, 5, 6, 7],
//     [0, 4],
//     [1, 5],
//     [2, 6],
//     [3, 7],
// ]

let vs = [];
let fs = [];

const model = parseOBJ(objText);
vs = model.vertices;
fs = model.faces;

function translate_z({x, y, z}, dz){
    return {x: x, y: y, z: z + dz}
}

function translate_y({x, y, z}, dy){
    return {x: x, y: y + dy, z: z}
}

function rotate_zx({x, y, z}, angel) {
    const c = Math.cos(angel);
    const s = Math.sin(angel);

    return {
        x: x*c-z*s,
        y,
        z: x*s+z*c,
    }
}


const FPS = 60;
let dz = 5;
let dy = -2;
let angle = 0;

function frame(){
    const dt = 1/FPS;
    //dz += 1*dt;
    //dy = 2*Math.sin(dt);
    console.log(dt);
    angle += Math.PI*dt;
    clear();
    // for (const v of vs){
    //     point(screen(project(translate_z(rotate_zx(v, angle), dz))));
    // }

    for (const f of fs){
        for (let i = 0; i < f.length; i++){
            const a = vs[f[i]];
            const b = vs[f[(i + 1)%f.length]];//holy this like blew my mind mainly because how had i never seen this before
            line(
                screen(project(translate_z(translate_y(rotate_zx(a, angle), dy), dz))),
                screen(project(translate_z(translate_y(rotate_zx(b, angle),dy), dz)))
            )
        }
    }

    setTimeout(frame, 1000/FPS);//le recurssive calls its self after timeout
}

//hi first frame run
setTimeout(frame, 1000/FPS);