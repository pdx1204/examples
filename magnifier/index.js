let box1 = document.querySelector(".box1"),
    move = document.querySelector(".move"),
    box2 = document.querySelector(".box2");

let x = 0, y = 0;
box1.addEventListener("mouseenter", function (e) {

    if(e.offsetX >= 50 && e.offsetX <= 430) {

        x = e.offsetX - 50;
    } else {
        if(e.offsetX < 50) {

            x = 0;
        } else {
            x = 380;
        }
    }
    if(e.offsetY >= 50 && e.offsetY <= 220) {

        y = e.offsetY - 50;
    } else {
        if(e.offsetY < 50) {

            y = 0;
        } else {

            y = 170;
        }
    }
    move.style.left = x + "px";
    move.style.top = y + "px";
    box2.style.backgroundPosition = -(x / 0.25) + "px " + -(y / 0.25) + "px";
    move.setAttribute("class", "move block");
    box2.setAttribute("class", "box2 block");
}, false)

move.addEventListener("mousemove", function (e) {

    /*当鼠标相对于move水平方向偏移距离小于50
    且move相对于父元素box1水平方向偏移距离大于0时
    move相对于父元素box1的水平方向偏移距离减少*/
    if(e.offsetX < 50 && this.offsetLeft > 0) {

        x = this.offsetLeft - (50 - e.offsetX);
    }
    /*当鼠标相对于move水平方向偏移距离大于50
    且move相对于父元素box1水平方向偏移距离小于380时
    move相对于父元素box1的水平方向偏移距离增加*/
    if(e.offsetX > 50 && this.offsetLeft < 380) {

        x = e.offsetX - 50 + this.offsetLeft;
    }
    if(e.offsetY < 50 && this.offsetTop > 0) {

        y = this.offsetTop - (50 - e.offsetY);
    }
    if(e.offsetY > 50 && this.offsetTop < 170) {

        y = e.offsetY - 50 + this.offsetTop;
    }
    this.style.left = x + "px";
    this.style.top = y + "px";
    box2.style.backgroundPosition = -(x / 0.25) + "px " + -(y / 0.25) + "px";
}, false)

box1.addEventListener("mouseleave", function (e) {

    move.setAttribute("class", "move none");
    box2.setAttribute("class", ".box2 none");
}, false)