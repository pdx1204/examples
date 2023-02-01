var ul = document.getElementsByTagName("ul")[0],
  screen = document.getElementById("screen"),
  input = document.getElementsByTagName("input")[0],
  span = document.getElementsByTagName("span")[0];

ul.addEventListener("click", Features, false);

function Features(e) {
  var ev = e || window.event; //ie浏览器兼容
  if (ev.target !== this) {
    input.style.borderColor = "#4d90fe";
    var btnValue = ev.target.innerHTML; //获取点击按钮中的值
    var textValue = screen.innerHTML.split(""); //获取文本框中的字符数组

    if (btnValue.match(/\+|\×|\÷/)) {
      var lastOneChar = textValue[textValue.length - 1]; //获取字符数组中倒数第一个值
      var lastTwoChar = textValue[textValue.length - 2]; //获取字符数组中倒数第二个值
      var result =
        lastTwoChar === "+" || lastTwoChar === "×" || lastTwoChar === "÷";
    } else {
      var lastOneChar = textValue[textValue.length - 1];
      var textValue1 = screen.innerHTML.split(/\+|\-|\×|\÷/); //获取每一个数字
      var textValue2 = screen.innerHTML.replace(/[0-9.]/g, "").split(""); //获取每一个加减乘除符号
    }

    switch (btnValue) {
      //左括号
      case "(":
        if (textValue.length === 1 && lastOneChar === "0") {
          screen.innerHTML = btnValue;
        } else screen.innerHTML += btnValue;
        break;
      //右括号
      case ")":
        var lCount = 0;
        var rCount = 0;
        var Surplus;
        for (var i = 0; i < textValue.length; i++) {
          if (textValue[i] === "(") lCount++;
          if (textValue[i] === ")") rCount++;
        }
        Surplus = lCount - rCount;
        //当Surplus>0且最后一个字符为0-9、)、%时，添加右括号
        if (Surplus && lastOneChar.match(/[0-9]|\)|\%/)) {
          screen.innerHTML += btnValue;
        }
        break;
      //百分号
      case "%":
        if (textValue.length === 1 && lastOneChar === "0") {
          screen.innerHTML += btnValue;
        } else if (lastOneChar !== "(") {
          screen.innerHTML += btnValue;
        }
        if (lastOneChar.match(/\+|\-|\×|\÷/)) {
          textValue[textValue.length - 1] = btnValue;
          screen.innerHTML = textValue.join("");
        }
        break;
      //清除
      case "C":
        if (textValue.length > 1) {
          textValue.pop();
          screen.innerHTML = textValue.join("");
        } else screen.innerHTML = "0";
        span.innerHTML = "";
        break;
      //加
      case "+":
        if (result && lastOneChar === "-");
        else {
          //倒数第二个值为乘除加且倒数第一个值为减时，不进行任何操作
          switch (lastOneChar) {
            case "+":
              break;

            case "-":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "×":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "÷":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            default:
              if (lastOneChar === "(") {
                screen.innerHTML += "0" + btnValue;
              } else screen.innerHTML += btnValue;
              break;
          }
        }
        break;
      //减
      case "-":
        switch (lastOneChar) {
          case "+":
            screen.innerHTML += btnValue;
            break;

          case "-":
            break;

          case "÷":
            screen.innerHTML += btnValue;
            break;

          case "×":
            screen.innerHTML += btnValue;
            break;

          default:
            if (lastOneChar === "(") {
              screen.innerHTML += "0" + btnValue;
            } else screen.innerHTML += btnValue;
            break;
        }
        break;
      //乘
      case "×":
        if (result && lastOneChar === "-");
        else {
          switch (lastOneChar) {
            case "+":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "-":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "×":
              break;

            case "÷":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            default:
              if (lastOneChar === "(") {
                screen.innerHTML += "0" + btnValue;
              } else screen.innerHTML += btnValue;
              break;
          }
        }
        break;
      //除
      case "÷":
        if (result && lastOneChar === "-");
        else {
          switch (lastOneChar) {
            case "+":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "-":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "×":
              textValue[textValue.length - 1] = btnValue;
              screen.innerHTML = textValue.join("");
              break;

            case "÷":
              break;

            default:
              if (lastOneChar === "(") {
                screen.innerHTML += "0" + btnValue;
              } else screen.innerHTML += btnValue;
              break;
          }
        }
        break;
      //等于（有问题）！！！！！！！！！！！！！！！！！！！！
      case "=":
        if (!lastOneChar.match(/\+|\-|\×|\÷/)) {
          span.innerHTML = screen.innerHTML + btnValue;
          var sum = Number(textValue1[0]);
          for (var i = 0; i < textValue2.length; i++) {
            switch (textValue2[i]) {
              case "+":
                sum += Number(textValue1[i + 1]);
                break;

              case "-":
                sum -= Number(textValue1[i + 1]);
                break;

              case "×":
                sum *= Number(textValue1[i + 1]);
                break;

              case "÷":
                sum /= Number(textValue1[i + 1]);
                break;
            }
          }
          screen.innerHTML = sum;
        }
        break;
      //小数点
      case ".":
        var flag = textValue1[textValue1.length - 1].includes("."); //查找最后一个数字中是否有小数点
        if (
          !flag &&
          lastOneChar !== "+" &&
          lastOneChar !== "-" &&
          lastOneChar !== "×" &&
          lastOneChar !== "÷"
        )
          screen.innerHTML += btnValue;
        break;
      //数字
      default:
        if (span.innerHTML !== "") {
          if (
            lastOneChar === "+" &&
            lastOneChar === "-" &&
            lastOneChar === "×" &&
            lastOneChar === "÷"
          ) {
            screen.innerHTML = "";
            span.innerHTML = "";
          }
        }
        if (textValue.length === 1 && lastOneChar === "0")
          screen.innerHTML = btnValue;
        else if (lastOneChar === "0") {
          var flag1 = textValue1[textValue1.length - 1].indexOf("0"); //返回最后一个数字中0首次出现的位置
          var flag2 = textValue1[textValue1.length - 1].indexOf("."); //返回最后一个数字中.首次出现的位置
          if (flag1 || flag2 !== -1) {
            screen.innerHTML += btnValue;
          }
        } else screen.innerHTML += btnValue;
        break;
    }
  }
}
