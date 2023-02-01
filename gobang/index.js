let canvas = document.querySelector("#mycanvas");
let btnNewGame = document.querySelector("#game-new");
let btnUndo = document.querySelector("#undo");

if (canvas.getContext) {

    let ctx = canvas.getContext("2d");

    //判断下黑白棋、棋子总个数、所有黑棋坐标、所有白棋坐标
    let flagDown = true, countPiece = 0, coordAllBPiece = [], coordAllWPiece = [];
    //X坐标、Y坐标
    const X = 0, Y = 1;

    ctx.lineWidth = 4;
    initCheckerBoard(ctx);

	EventUtil.addHandler(canvas, "mousedown", function (event) {
		let e = event ? event : window.event;
        let clickX = e.offsetX;                 //获取鼠标点击的x坐标
        let clickY = e.offsetY;                 //获取鼠标点击的y坐标
        for (let i = 52; i < canvas.width; i += 54) {
            for (let j = 52; j < canvas.height; j += 54) {
                if ((clickX >= i - 25 && clickX <= i + 25) && (clickY >= j - 25 && clickY <= j + 25)) {
                    if (countPiece === 169) return;          //判断棋盘是否已满
                    if (flagDown) {
                        for (let k in coordAllBPiece) {
                            if (coordAllBPiece[k][0] === i && coordAllBPiece[k][1] === j) return;
                        }
                        for (let k in coordAllWPiece) {
                            if (coordAllWPiece[k][0] === i && coordAllWPiece[k][1] === j) return;
                        }
                        coordAllBPiece.push([i, j]);            //记录黑子坐标
                        ctx.fillStyle = "#000";
                        flagDown = false;
                    } else {
                        for (let k in coordAllBPiece) {
                            if (coordAllBPiece[k][0] === i && coordAllBPiece[k][1] === j) return;
                        }
                        for (let k in coordAllWPiece) {
                            if (coordAllWPiece[k][0] === i && coordAllWPiece[k][1] === j) return;
                        }
                        coordAllWPiece.push([i, j]);            //记录白子坐标
                        ctx.fillStyle = "#fff";
                        flagDown = true;
                    }
                    //绘制棋子
                    ctx.beginPath();
                    ctx.arc(i, j, 25, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                    countPiece++;                           //落子后棋子数加一
                    return;
                }
            }
        }
	}, false);

	EventUtil.addHandler(canvas, "mouseup", function () {
		//满足条件的黑棋坐标、满足条件的白棋坐标
        let coordBPiece = [], coordWPiece = [];
        let flagBForward = false, flagBReverse = false, flagWForward = false, flagWReverse = false, flagFR = false;
        for (let i = -8; i < 9; i++) {
            flagBForward = diagonalPR(ctx, coordAllBPiece, coordBPiece, true, i, "黑");
            flagBReverse = diagonalPR(ctx, coordAllBPiece, coordBPiece, false, i, "黑");
            flagWForward = diagonalPR(ctx, coordAllWPiece, coordWPiece, true, i, "白");
            flagWReverse = diagonalPR(ctx, coordAllWPiece, coordWPiece, false, i, "白");
            //console.log(flagWForward, flagWReverse, flagBReverse, flagBForward);
            if (flagBForward || flagBReverse || flagWForward || flagWReverse) {
                flagFR = true;
                break;
            }
        }
        let allFlag =
            sameXY(ctx, coordAllBPiece, coordBPiece, X, Y, "黑") ||
            sameXY(ctx, coordAllBPiece, coordBPiece, Y, X, "黑") ||
            sameXY(ctx, coordAllWPiece, coordWPiece, X, Y, "白") ||
            sameXY(ctx, coordAllWPiece, coordWPiece, Y, X, "白") ||
            flagFR;
        if (allFlag) {
            flagDown = true;
            countPiece = 0;
            coordAllBPiece = [];
            coordAllWPiece = [];
            initCheckerBoard(ctx);
        }
	}, false);

    btnNewGame.onclick = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flagDown = true;
        countPiece = 0;
        coordAllBPiece = [];
        coordAllWPiece = [];
        initCheckerBoard(ctx);
    };

    btnUndo.onclick = function () {
        if(countPiece) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            initCheckerBoard(ctx);
            countPiece--;
            if(countPiece % 2) {
                coordAllWPiece.pop();
                flagDown = false;
            }else {
                coordAllBPiece.pop();
                flagDown = true;
            }
            ctx.fillStyle = "#000";
            for(let i in coordAllBPiece) {
                //绘制棋子
                ctx.beginPath();
                ctx.arc(coordAllBPiece[i][X], coordAllBPiece[i][Y], 25, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }
            ctx.fillStyle = "#fff";
            for(let i in coordAllWPiece) {
                //绘制棋子
                ctx.beginPath();
                ctx.arc(coordAllWPiece[i][X], coordAllWPiece[i][Y], 25, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

}

//初始化棋盘
function initCheckerBoard(ctx) {
    ctx.beginPath();
    for (let i = 52; i < canvas.width; i += 54) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.width);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    for (let i = 52; i < canvas.height; i += 54) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.height, i);
    }
    ctx.closePath();
    ctx.stroke();
}

//x\y坐标相同时
function sameXY(ctx, pieceColor, pColor, sameIndex, index, pieceStyle) {
    let flagUp = true;          //判断是否成龙
    pColor = [];
    for (let i = 52; i < canvas.width; i += 54) {
        pColor = [];                    //存放x\y坐标相同的棋子
        for (let j in pieceColor) {
            if (pieceColor[j][sameIndex] === i) {
                pColor.push(pieceColor[j]);
            }
        }
        if (pColor.length >= 5) {
            //排序
            for (let j = 0; j < pColor.length - 1; j++) {
                for (let k = j + 1; k < pColor.length; k++) {
                    if (pColor[j][index] > pColor[k][index]) {
                        let temp = pColor[j][index];
                        pColor[j][index] = pColor[k][index];
                        pColor[k][index] = temp;
                    }
                }
            }
            //分组
            for (let j = 0; j < pColor.length - 4; j++) {
                flagUp = true;
                let tempPiece = pColor.slice(j, j + 5);
                for (let k = 0; k < tempPiece.length - 1; k++) {
                    if (tempPiece[k][index] + 54 !== tempPiece[k + 1][index]) {
                        flagUp = false;
                        break;
                    }
                }
                if (flagUp) {
                    alert(pieceStyle + "棋胜！");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return flagUp;
                }
            }
        } else {
            flagUp = false;
        }
    }
    return flagUp;
}

//正反对角线
function diagonalPR(ctx, pieceColor, pColor, direction, number, pieceStyle) {
    let flagUp = true;
    pColor = [];
    if (direction) {
        for (let i in pieceColor) {
            //取得对角线上的坐标
            if (pieceColor[i][0] - pieceColor[i][1] === 54 * number) {
                pColor.push(pieceColor[i]);
            }
        }
        if (pColor.length >= 5) {
            //排序
            for (let i = 0; i < pColor.length - 1; i++) {
                for (let j = i + 1; j < pColor.length; j++) {
                    if (pColor[i][0] > pColor[j][0]) {
                        let temp = pColor[i][0];
                        pColor[i][0] = pColor[j][0];
                        pColor[j][0] = temp;
                        temp = pColor[i][1];
                        pColor[i][1] = pColor[j][1];
                        pColor[j][1] = temp;
                    }
                }
            }
            //分组
            for (let i = 0; i < pColor.length - 4; i++) {
                flagUp = true;
                let tempPiece = pColor.slice(i, i + 5);
                for (let j = 0; j < tempPiece.length - 1; j++) {
                    if (tempPiece[j][0] + 54 !== tempPiece[j + 1][0] || tempPiece[j][1] + 54 !== tempPiece[j + 1][1]) {
                        flagUp = false;
                        break;
                    }
                }
                //每次分组查询后flagUp依然为真则结束对局
                if (flagUp) {
                    alert(pieceStyle + "棋胜！");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return flagUp;
                }
            }
        } else {
            flagUp = false;
        }               //pColor.length < 5时，设flagUp为假
    } else {
        for (let i in pieceColor) {
            //取得对角线上的坐标
            if (pieceColor[i][0] + pieceColor[i][1] === ctx.canvas.width + 54 * number) {
                pColor.push(pieceColor[i]);
            }
        }

        if (pColor.length >= 5) {
            //排序
            for (let i = 0; i < pColor.length - 1; i++) {
                for (let j = i + 1; j < pColor.length; j++) {
                    if (pColor[i][1] > pColor[j][1]) {
                        let temp = pColor[i][0];
                        pColor[i][0] = pColor[j][0];
                        pColor[j][0] = temp;
                        temp = pColor[i][1];
                        pColor[i][1] = pColor[j][1];
                        pColor[j][1] = temp;
                    }
                }
            }

            //分组
            for (let i = 0; i < pColor.length - 4; i++) {
                flagUp = true;
                let tempPiece = pColor.slice(i, i + 5);
                for (let j = 0; j < tempPiece.length - 1; j++) {
                    if (tempPiece[j][0] - 54 !== tempPiece[j + 1][0] || tempPiece[j][1] + 54 !== tempPiece[j + 1][1]) {
                        flagUp = false;
                        break;
                    }
                }
                if (flagUp) {
                    alert(pieceStyle + "棋胜！");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return flagUp;
                }
            }
        } else {
            flagUp = false;
        }
    }
    return flagUp;      //返回假
}
