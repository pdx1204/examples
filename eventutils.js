const EventUtil = {
    addHandler: function (element, type, handler, flag) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, flag);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler, flag) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, flag);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    offsetLeft: function (event) {
        var type = event["type"];
        var pattern = /click|dbclick|contextmenu|mouse/;
        if (pattern.test(type)) {
            return event.offsetX;
        } else {
            return undefined;
        }
    },
    offsetTop: function (event) {
        var type = event["type"];
        var pattern = /click|dbclick|contextmenu|mouse/;
        if (pattern.test(type)) {
            return event.offsetY;
        } else {
            return undefined;
        }
    },
    scrollLeft: function (event) {
        var type = event["type"];
        if (type === "scroll") {
            return window.pageXOffset || document.documentElement.scrollLeft;
        } else {
            return undefined;
        }
    },
    scrollTop: function (event) {
        var type = event["type"];
        if (type === "scroll") {
            return window.pageYOffset || document.documentElement.scrollTop;	//兼容ie9以下的ie版本
        } else {
            return undefined;
        }
    }
};