let index, flag, span, countNum;
//获取所有的li元素
const allLis = document.getElementsByTagName("li");

// 初始化两个数字
for (let i = 0; i < 2; i++) {
  foundEmpty();
}
document.addEventListener("keydown", move, false);
document.addEventListener("keyup", isFill, false);

// 寻找li元素中无内容的li元素
function foundEmpty() {
  flag = true;
  while (flag) {
    index = parseInt(Math.random() * allLis.length);
    if (!allLis[index].innerHTML) {
      flag = false;
    }
    if (!flag) {
      span = document.createElement("span");
      countNum = Math.pow(2, Math.round(Math.random() + 1));
      switchbgColor(countNum, span);
      span.innerText = countNum;
      allLis[index].appendChild(span);
    }
  }
}
// 设置每个数字的背景颜色
function switchbgColor(countNum, span) {
  switch (countNum) {
    case 2:
      span.setAttribute("class", "");
      span.setAttribute("class", "onebg");
      break;
    case 4:
      span.setAttribute("class", "");
      span.setAttribute("class", "twobg");
      break;
    case 8:
      span.setAttribute("class", "");
      span.setAttribute("class", "threebg");
      break;
    case 16:
      span.setAttribute("class", "");
      span.setAttribute("class", "fourbg");
      break;
    case 32:
      span.setAttribute("class", "");
      span.setAttribute("class", "fivebg");
      break;
    case 64:
      span.setAttribute("class", "");
      span.setAttribute("class", "sixbg");
      break;
    case 128:
      span.setAttribute("class", "");
      span.setAttribute("class", "sevenbg");
      break;
    default:
      span.setAttribute("class", "");
      span.setAttribute("class", "sevenbg");
      break;
  }
}
// 移动元素
function move(ev) {
  const e = ev || window.ev;
  switch (e.keyCode) {
    case 37:
      moveLeft();
      changeLeft();
      moveLeft();
      break;
    case 38:
      moveTop();
      changeTop();
      moveTop();
      break;
    case 39:
      moveRight();
      changeRight();
      moveRight();
      break;
    case 40:
      moveBottom();
      changeBottom();
      moveBottom();
      break;
    default:
      return;
  }
  foundEmpty();
}
// 判断游戏是否结束
function isFill() {
  let k;
  //判断元素是否已满
  flag = true; /* 默认已满 */
  for (let i = 0; i < allLis.length; i++) {
    if (!allLis[i].innerHTML) {
      flag = false;
      break;
    }
  }
  //当元素已满时，判断是否有相同的
  if (flag) {
    let j;
    for (j = 0; j <= 12; j += 4) {
      for (k = j; k < 3 + j; k++) {
        if (allLis[k].innerHTML && allLis[k + 1].innerHTML) {
          if (
            allLis[k].children[0].innerHTML ===
            allLis[k + 1].children[0].innerHTML
          ) {
            flag = false;
            break;
          }
        }
      }
      if (!flag) {
        break;
      }
    }
    for (j = 0; j < 4; j++) {
      for (k = j; k < 12 + j; k += 4) {
        if (allLis[k].innerHTML && allLis[k + 4].innerHTML) {
          if (
            allLis[k].children[0].innerHTML ===
            allLis[k + 4].children[0].innerHTML
          ) {
            flag = false;
            break;
          }
        }
      }
      if (!flag) {
        break;
      }
    }
  }
  if (flag) {
    return alert("游戏结束");
  }
}

function moveLeft() {
  let k;
  //将内容向左移（有相同的就相加）
  for (i = 0; i < allLis.length; i++) {
    if (allLis[i].innerHTML) {
      if (i < 4) {
        for (k = 0; k < i; k++) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 8) {
        for (k = 4; k < i; k++) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 12) {
        for (k = 8; k < i; k++) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 16) {
        for (k = 12; k < i; k++) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      }
    }
  }
}
function moveTop() {
  let k;
  //将内容向上移（有相同的就相加）
  for (i = 0; i < allLis.length; i++) {
    if (allLis[i].innerHTML) {
      if (i % 4 === 0) {
        k = 0;
        while (k < i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k += 4;
        }
      } else if (i % 4 === 1) {
        k = 1;
        while (k < i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k += 4;
        }
      } else if (i % 4 === 2) {
        k = 2;
        while (k < i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k += 4;
        }
      } else if (i % 4 === 3) {
        k = 3;
        while (k < i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k += 4;
        }
      }
    }
  }
}
function moveRight() {
  let k;
  //将内容向右移（有相同的就相加）
  for (i = 15; i >= 0; i--) {
    if (allLis[i].innerHTML) {
      if (i < 4) {
        for (k = 3; k > i; k--) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 8) {
        for (k = 7; k > i; k--) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 12) {
        for (k = 11; k > i; k--) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      } else if (i < 16) {
        for (k = 15; k > i; k--) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
        }
      }
    }
  }
}
function moveBottom() {
  let k;
  //将内容向下移（有相同的就相加）
  for (i = 15; i >= 0; i--) {
    if (allLis[i].innerHTML) {
      if (i % 4 === 0) {
        k = 12;
        while (k > i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k -= 4;
        }
      } else if (i % 4 === 1) {
        k = 13;
        while (k > i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k -= 4;
        }
      } else if (i % 4 === 2) {
        k = 14;
        while (k > i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k -= 4;
        }
      } else if (i % 4 === 3) {
        k = 15;
        while (k > i) {
          if (!allLis[k].innerHTML) {
            span = allLis[i].innerHTML;
            allLis[k].innerHTML = span;
            allLis[i].innerHTML = "";
            break;
          }
          k -= 4;
        }
      }
    }
  }
}
function changeLeft() {
  let k;
  for (k = 0; k < 3; k++) {
    if (allLis[k].innerHTML && allLis[k + 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 1].innerHTML = "";
      }
    }
  }
  for (k = 4; k < 7; k++) {
    if (allLis[k].innerHTML && allLis[k + 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 1].innerHTML = "";
      }
    }
  }
  for (k = 8; k < 11; k++) {
    if (allLis[k].innerHTML && allLis[k + 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 1].innerHTML = "";
      }
    }
  }
  for (k = 12; k < 15; k++) {
    if (allLis[k].innerHTML && allLis[k + 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 1].innerHTML = "";
      }
    }
  }
}
function changeTop() {
  let k;
  for (k = 0; k < 12; k += 4) {
    if (allLis[k].innerHTML && allLis[k + 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 4].innerHTML = "";
      }
    }
  }
  for (k = 1; k < 13; k += 4) {
    if (allLis[k].innerHTML && allLis[k + 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 4].innerHTML = "";
      }
    }
  }
  for (k = 2; k < 14; k += 4) {
    if (allLis[k].innerHTML && allLis[k + 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 4].innerHTML = "";
      }
    }
  }
  for (k = 3; k < 15; k += 4) {
    if (allLis[k].innerHTML && allLis[k + 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k + 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k + 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k + 4].innerHTML = "";
      }
    }
  }
}
function changeRight() {
  let k;
  for (k = 3; k > 0; k--) {
    if (allLis[k].innerHTML && allLis[k - 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 1].innerHTML = "";
      }
    }
  }
  for (k = 7; k > 4; k--) {
    if (allLis[k].innerHTML && allLis[k - 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 1].innerHTML = "";
      }
    }
  }
  for (k = 11; k > 8; k--) {
    if (allLis[k].innerHTML && allLis[k - 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 1].innerHTML = "";
      }
    }
  }
  for (k = 15; k > 12; k--) {
    if (allLis[k].innerHTML && allLis[k - 1].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 1].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 1].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 1].innerHTML = "";
      }
    }
  }
}
function changeBottom() {
  let k;
  for (k = 12; k > 0; k -= 4) {
    if (allLis[k].innerHTML && allLis[k - 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 4].innerHTML = "";
      }
    }
  }
  for (k = 13; k > 1; k -= 4) {
    if (allLis[k].innerHTML && allLis[k - 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 4].innerHTML = "";
      }
    }
  }
  for (k = 14; k > 2; k -= 4) {
    if (allLis[k].innerHTML && allLis[k - 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 4].innerHTML = "";
      }
    }
  }
  for (k = 15; k > 3; k -= 4) {
    if (allLis[k].innerHTML && allLis[k - 4].innerHTML) {
      if (
        allLis[k].children[0].innerHTML === allLis[k - 4].children[0].innerHTML
      ) {
        countNum =
          parseInt(allLis[k].children[0].innerHTML) +
          parseInt(allLis[k - 4].children[0].innerHTML);
        switchbgColor(countNum, allLis[k].children[0]);
        allLis[k].children[0].innerHTML = countNum;
        allLis[k - 4].innerHTML = "";
      }
    }
  }
}
