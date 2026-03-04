//im kinda going into this blind so wish me luck

//consts
const BACKGROUND = "#aeaeaeff";
const FOREGROUND = "#20ff30ff";

//ok so lets just do some basic set up
console.log(CAN);

CAN.width = 400;
CAN.height = 400;

//this is one thing that i dont understand about javascript is why do I need a canvas context
//ok I looked it up the reason that they do it like this is so that you can use multiple different
//contexts in the same window ie like what if you wanted to do both webgl and 2d or smthing
const ctx = CAN.getContext("2d");

console.log(ctx);

//ok nice now lets actually get started
//first lets just make a function to draw a circle
function draw_circle(p) { //editing this to take in coords
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
}

//ok cool
//now i kinda dont like the background being white and this will need to be animated so lets just create a clear
//function to rest the frame whenever we need

function clear(){
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, CAN.width, CAN.height);
}

//the ma of this moment bro

//ok cool we got a circle on the screen
//hmm but the coordinate grid for the canvas doesnt have 0, 0 in the center lets create a function that converts
//the canvas coordinates to something more useable(for me)

//right now the center of the screen for our 400 by 400 canvas is 200 200
//we need this function to take in points (0, 0) and make then usable for
//the canvas ie, 0, 0 needs to be 200, 200! (obvi dynamic)
function screen(p){

    //I think this is nice to see, the coords become normalized from -1 to 1
    //console.log("x: " + (p.x + 1)/2*CAN.width + "y:" + (1 - (p.y + 1)/2)*CAN.height);
    
    //we are not working with integers here like java script not messing around (p.x + 1)/2 if p.x is not 0 or 1 or something and is like .5
    //it know(LOOK BACK AT THIS I COULD BE WRONG) 1.5/2 == to like .75 * 400(the witdth) we get 300

    //for the y the reason we 1 - is because without it the coords would be flipped, i mean think about it bottom right,
    //is where the 400 400 is but also where the neg y is located so we need to account for this because that is how coordinate systems work
    return {
        x: (p.x + 1)/2*CAN.width,
        y: (1 - (p.y + 1)/2)*CAN.height,
    }
}

//ok now lets get our ball moving, we need to give it some more information and values,
//lets create a physics object
//now... how could we do a more functional approach to this...
// direction -> apply_velocity -> update_position -> screen -> draw

//looking at this functional approach, we see that in physics systems, though you
//can take a more functional approach, no one does it so lets not do it either

//so lets create a function to create our ball
function Circle(x, y, speedX, speedY){
    this.x_pos = x;
    this.y_pos = y;


    //fundementally this is a vector
    //let me explain
    //speedX has a direction its the X direction
    //speedY has a direction as well
    //these are both scalars, the dot product of these two is the momentum of the
    //ball
    this.speedX = speedX;
    this.speedY = speedY;

    //we need to edit the position of our object
    //there are a few ways to do this,
    //however in my opinion to achieve idomatic ownership of the code
    //and also to keep generally understandable memory managment
    //using a function inside the Circle function object is the best practice
    //(this is me being a rusty tbh)

    this.updatePosition = function() {
        //console.log("SpeedY update: " + this.speedY);   
        this.x_pos += this.speedX;//I DIDNT HAVE THIS ON THESE AND IT CREATED A SUPER INTRESING GLITCH, THE FUNCTION IS REMAINING WITH ALL ITS PARAMATERS IN THE STACK LIKE ITS NEVER FREED LIKE ITS AN OBJECT IG BUT IT RETAINS THE PARAMETERS LIKE I DIDNT KNOW IT WOULD DO THIS SO IT WAS USING THE SPEEDX FIRST DEFINED
        this.y_pos += this.speedY;
        //console.log("Y_pos update: " + this.y_pos);   
    }

    this.updateSpeed = function(newSpeedX, newSpeedY){
        this.speedX = newSpeedX;
        this.speedY = newSpeedY;
        //console.log("SpeedY: " + this.speedY);    
    }

    this.setPosition = function(newX, newY) {
        this.x_pos = newX;
        this.y_pos = newY;
    }
}

//ok now lets define our ball
//hmm my javascript is bad so im going to test if const will allow me to edit Circles position
var ball = new Circle(0, 0, -0.02, -.01);
var radius = 0.1

function simulate(circle){
    //console.log(circle.y_pos);
    if(circle.y_pos <= -1.0 + radius){ //the +0.05 is to simulate the size of the ball
        //console.log("HIT 1: "  + circle.speedY);
        if (circle.speedY < 0) {
            //console.log("HIT 2");
            circle.updateSpeed(circle.speedX, -circle.speedY);
        }
        //circle.speedY = -circle.speedY;
    }

    if (circle.y_pos >= 1.0  - radius) {
        if (circle.speedY > 0) {
            circle.updateSpeed(circle.speedX, -circle.speedY);
        }
    }

    if(circle.x_pos <= -1.0 + radius){
        //console.log("HIT 1: "  + circle.speedY);
        if (circle.speedX < 0) {
            //console.log("HIT 2");
            circle.updateSpeed(-circle.speedX, circle.speedY);
        }
        //circle.speedY = -circle.speedY;
    }

    if(circle.x_pos >= 1.0 - radius){
        if (circle.speedX > 0) {
            circle.updateSpeed(-circle.speedX, circle.speedY);
        }
    }

    circle.updatePosition();
    return {
        x: circle.x_pos + circle.speedX,
        y: circle.y_pos + circle.speedY,
    }
}

//ok cool so now we move our ball a little when its run with simulate!!!
//ok but we dont just want a single frame of simulate to run we want multiple frames to run
//lets define a rate for our frames to happen a frame rate if you will an FPS maybe we can abbreviate it to

const FPS = 60;

function frame(){
    clear();
    draw_circle(screen(simulate(ball)));
    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);
// clear();
// draw_circle(screen(simulate(ball)));






//a simultion of the merge of the merge sort
let arrz = [0, 1, 4, 2, 7];
console.log(arrz.length / 2);
let arrz1 = arrz.splice(0, arrz.length / 2);
let arrz2 = arrz.splice(0, arrz.length);

console.log(arrz1);
console.log(arrz2);

function merge_sort(arr){
    if (arr.length == 1){
        return arr;
    }
    let midpoint = arr.length / 2; // 7 / 2 for example is like 3.5 when used but that goes to floor when the first parameter of splice
    //or maybe the way splice works is like [) right so its inclusive then exclusive? probalby idk that would make sense
    let arr1 = arr.splice(0, midpoint);
    let arr2 = arr.splice(0, arr.length);

    let merged1 = merge_sort(arr1);
    let merged2 = merge_sort(arr2);

    let merged = merge(merged1, merged2);
    return merged;
}

function merge(arr1, arr2){
    let i = 0;
    let j = 0;
    let merged = [];

    while (i < arr1.length && j < arr2.length){
        if (arr1[i] < arr2[j]){
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }

    if (i < arr1.length){
        while (i < arr1.length){
            merged.push(arr1[i]);
            i++;
        }
    }

    if (j < arr2.length){
        while (j < arr2.length){
            merged.push(arr2[j]);
            j++;
        }
    }

    return merged;
}

arrz = [0, 1, 3, 7, 5, 4, 2, 1, 7 ,0];
console.log(merge_sort(arrz));