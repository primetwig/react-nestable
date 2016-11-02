"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var closest = exports.closest = function closest(target, selector) {
    // closest(e.target, '.field')
    while (target) {
        if (target.matches && target.matches(selector)) return target;
        target = target.parentNode;
    }
    return null;
};

var getOffsetRect = exports.getOffsetRect = function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    // (4)
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
};

var listWithChildren = exports.listWithChildren = function listWithChildren(list) {
    return list.map(function (item) {
        return _extends({}, item, {
            children: item.children ? listWithChildren(item.children) : []
        });
    });
};