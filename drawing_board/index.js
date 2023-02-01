let sketchpad = document.querySelector("#sketchpad");
let ctx = sketchpad.getContext("2d");
let clear = document.querySelector("input[type=button]");//获取清屏按钮

ctx.lineCap = "round";
ctx.lineJoin = "round";
sketchpad.onmousedown = function (e) {

    let x = e.offsetX;
    let y = e.offsetY;

    ctx.strokeStyle = document.querySelector("#color").value;
    ctx.lineWidth = document.querySelector("#width").value;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    sketchpad.onmousemove = function (e) {

        let x = e.offsetX;
        let y = e.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
sketchpad.addEventListener("mouseup", function (e) {

    sketchpad.onmousemove = null;
}, false);
clear.onclick = function () {

    ctx.clearRect(0, 0, 800, 500);
}
