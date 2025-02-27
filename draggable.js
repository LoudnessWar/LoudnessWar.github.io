test = document.querySelector(".draggable");
console.log(test + " bruh ");

class drag{
    
    constructor(elem, document){
            this.pos1 = 0;
            this.pos2 = 0; 
            this.pos3 = 0;
            this.pos4 = 0;
            this.element = elem;
            //this.document = document;

            this.moveMouse = this.moveMouse.bind(this);
            this.elementDrag = this.elementDrag.bind(this);
            this.closeDragElement = this.closeDragElement.bind(this);

            this.element.onmousedown = this.moveMouse;
            //this.element.onmouseup = this.getx;
            //this.element.onmousemove = this.getx;
            //this.moveMouse = this.moveMouse.bind(this);
            //this.getx = this.getx.bind(this);
    }

    moveMouse(e){
        e = e || window.Event;
        e.preventDefault();
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        console.log(this.pos3 + " x " + this.pos4 + " y");

        document.onmouseup = this.closeDragElement;
        document.onmousemove = this.elementDrag;
    }

    elementDrag(e) 
    {
            //console.log("moved");
            e = e || window.Event;
            e.preventDefault();
            //console.log(bruh);
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            // set the element's new position:
            //console.log(this.pos1 + "one " + this.pos2 + " two " + this.pos3 + " three " + this.pos4 + " pos4")
            this.element.style.top = (this.element.offsetTop - this.pos2) + "px";
            this.element.style.left = (this.element.offsetLeft - this.pos1) + "px";
            //getLine(elem, node, pos2, pos1);
            // if(node % 2 == 0){
            //     lines.item(node).style.top = (elem.offsetTop - pos2)*(.5)  - (.5)*(dragable.item(node).offsetLeft - pos2) + "px"
            //     //lines.item(node).style.left = (elem.offsetLeft - pos2) + "px"
            //     console.log(node)
            // } else {
            //     //lines.item(node).style.top = (elem.offsetTop - pos2) + "px"
            //     lines.item(node-1).style.left = (elem.offsetLeft - pos2)*(.5) - (.5)*(dragable.item(node).offsetLeft - pos2)+ "px"
            //     console.log(node-1)
            // }
            //console.log(pos3 + " x " + pos4 + " y");

    }

    getx(){
        //console.log("1: " + this.pos1 + 1)
        return this.pos1;
    }

    closeDragElement() {
        //console.log("end")
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

    window.onload = function () {
        setTimeout(() => {
            document.getElementById("welcome-screen").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("welcome-screen").style.display = "none";
            }, 1000); // Wait for fade-out
        }, 2000); // Show welcome for 2 seconds
    };


