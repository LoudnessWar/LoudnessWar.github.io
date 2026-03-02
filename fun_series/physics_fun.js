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
    console.log("x: " + (p.x + 1)/2*CAN.width + "y:" + (1 - (p.y + 1)/2)*CAN.height);
    
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

clear();
draw_circle(screen({x: 0, y: 0}));