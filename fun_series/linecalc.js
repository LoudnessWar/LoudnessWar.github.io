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



function linedrag(elem){


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
