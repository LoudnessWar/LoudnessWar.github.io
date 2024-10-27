const dragable = document.querySelectorAll(".draggable");//could make one node here that combines both and makes the sisters to the draggable the stings
const lines = document.querySelectorAll(".line");
const map = new Map();

for(i = 0; i < lines.length; i++){
    if(dragable.item(i+1) != null){
        map.set(lines[i], {start: new drag(dragable[i], document), end: new drag(dragable[i+1], document)});
        //console.log(lines[i]);
        // drag(map.get(lines[i]).start, i);
        // drag(map.get(lines[i]).end, i);
    }
}   

map.keys().forEach(element => {
    //console.log(element);
    linedrag(element);
});


// for(i = 0; i < map.size; i++){
//     linedrag(map);
// }

// map.forEach((elem) => {
//     //console.log(elem);
//     linedrag(elem);
// });

bruh = new drag(dragable.item(2), document);

// dragerator = dragable.entries();
// linerator = lines.entries();

// while(dragerator.has)
// // test.forEach((elem) => {
// //     drag(elem);
// // })

// for(i = 0; i < dragable.length; i++){
//     drag(dragable[i], i);
// }

//console.log(lines)


//hmm I am not fond of doing it like this it I wish drag was a static function t
//that I could attach to the class so anything with the class would have the properties of drag ie oop
//but this uuuh more functional approach is what I have now so whatever its like not important enough to change
// const test2 = document.querySelector("#mydiv");
// console.log(test);
// drag(test);
// drag(test2);


// function drag(elem){
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     elem.onmousedown = moveMouse;


//     function moveMouse(e){
//         e = e || window.Event;
//         e.preventDefault();
//         pos3 = e.clientX;
//         pos4 = e.clientY;

//         console.log(pos3 + " x " + pos4 + " y");

//         document.onmouseup = closeDragElement;
//         document.onmousemove = elementDrag;
//     }

//     function elementDrag(e) 
//     {
//             //console.log("moved");
//             e = e || window.Event;
//             e.preventDefault();
//             pos1 = pos3 - e.clientX;
//             pos2 = pos4 - e.clientY;
//             pos3 = e.clientX;
//             pos4 = e.clientY;
//             // set the element's new position:
//             elem.style.top = (elem.offsetTop - pos2) + "px";
//             elem.style.left = (elem.offsetLeft - pos1) + "px";
//             //getLine(elem, node, pos2, pos1);
//             // if(node % 2 == 0){
//             //     lines.item(node).style.top = (elem.offsetTop - pos2)*(.5)  - (.5)*(dragable.item(node).offsetLeft - pos2) + "px"
//             //     //lines.item(node).style.left = (elem.offsetLeft - pos2) + "px"
//             //     console.log(node)
//             // } else {
//             //     //lines.item(node).style.top = (elem.offsetTop - pos2) + "px"
//             //     lines.item(node-1).style.left = (elem.offsetLeft - pos2)*(.5) - (.5)*(dragable.item(node).offsetLeft - pos2)+ "px"
//             //     console.log(node-1)
//             // }
//             //console.log(pos3 + " x " + pos4 + " y");

//     }

//     function getx(){
//         return pos1;
//     }

//     function closeDragElement() {
//         document.onmouseup = null;
//         document.onmousemove = null;
//       }
// }




function linedrag(elem){
    //let startdrag = drag(elem.start);
    //console.log(elem.start.pos1);
    //console.log(elem.moveMouse());
    //console.log(elem.start.moveMouse());
    // let enddrag = drag(elem.end);
    //document.onmouseup = startup;
    // if (startdrag != null){
    //     document.onmouseup = startdrag.getx;
    // }

    let startdrag = map.get(elem).start;
    let enddrag = map.get(elem).end;
    //console.log(startdrag.getx());

    document.onmouseup = startup;

    function startup(e){
        console.log("test")
        e = e || window.Event;
        e.preventDefault();
        
        console.log(enddrag.getx() + "yippeee")
    }

}
function getLine(elem, node, pos2, pos1){
            //if(node % 2 == 0){
                lines.item(node).style.top = (elem.offsetTop - pos2)*(.5)  - (.5)*(dragable.item(node).offsetLeft - pos2) + "px";
                //lines.item(node).style.left = (elem.offsetLeft - pos2) + "px"
                //console.log(node)
            //} else {
                //lines.item(node).style.top = (elem.offsetTop - pos2) + "px"
                lines.item(node-1).style.left = (elem.offsetLeft - pos1)*(.5) - (.5)*(dragable.item(node).offsetLeft - pos1)+ "px";
                //console.log(node-1)
            //}
}
// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     console.log(pos3 + "3");
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }
// }