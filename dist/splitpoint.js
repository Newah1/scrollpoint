var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Splitpoint = /** @class */ (function () {
    function Splitpoint(element, options) {
        var _this = this;
        var defaults = {
            absolute: false,
            split_element: null,
            side: "top"
        };
        this.element = element;
        this.options = __assign({}, defaults, options);
        this.dup = this.generate_child();
        this.insert_child();
        window.addEventListener("scroll", function () { _this.on_scroll(); });
        this.dup.className = this.element.className;
        this.dup.classList.add("splitpoint");
        this.clip_dup();
    }
    Splitpoint.prototype.get_side = function (element, side) {
        return element.getBoundingClientRect()[side];
    };
    Splitpoint.prototype.on_scroll = function () {
        this.clip_dup();
    };
    Splitpoint.prototype.clip_dup = function () {
        var element_bottom = this.get_side(this.element, "bottom");
        var split_point = this.get_side(this.options.split_element, this.options.side);
        if (element_bottom >= split_point) {
            var percent_in = this.calculate_percentage((element_bottom - split_point), this.dup.offsetHeight);
            percent_in = Math.round((percent_in - 100) * -1);
            //this.element.style.clipPath = `polygon(0 ${percent_in}%, 100%  ${percent_in}%, 100% 100%, 0% 100%)`;
            this.dup.style.clipPath = "polygon(0 " + percent_in + "%, 100%  " + percent_in + "%, 100% 100%, 0% 100%)";
        }
        else {
            this.revert_clippath(this.dup);
        }
    };
    Splitpoint.prototype.revert_clippath = function (elem) {
        elem.style.clipPath = "polygon(0 /*bottom left */ 100%, 100% /*bottom right*/ 100%, 100% 100%, 0% 100%)";
    };
    Splitpoint.prototype.calculate_percentage = function (num1, num2) {
        return (num1 / num2) * 100;
    };
    Splitpoint.prototype.set_amount_shown_from = function (direction, percentage, element) {
    };
    Splitpoint.prototype.insert_child = function () {
        this.element.appendChild(this.dup);
        return true;
    };
    Splitpoint.prototype.generate_child = function () {
        var child_element;
        child_element = document.createElement(this.element.tagName);
        child_element.innerHTML = this.element.innerHTML;
        child_element.style.clipPath = "polygon(0 /*bottom left */ 100%, 100% /*bottom right*/ 100%, 100% 100%, 0% 100%)";
        if (this.options.absolute) {
            child_element.style.position = "absolute";
            child_element.style.top = "0";
            child_element.style.left = "0";
        }
        return child_element;
    };
    return Splitpoint;
}());
