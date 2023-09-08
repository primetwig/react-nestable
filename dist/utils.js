"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNonEmptyNodesIds = exports.listWithChildren = exports.getTransformProps = exports.getTotalScroll = exports.getOffsetRect = exports.closest = exports.isArray = exports.isString = exports.isNumber = exports.isFunction = exports.isUndefined = exports.isDefined = exports.objectType = void 0;
var objectType = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};
exports.objectType = objectType;
var isDefined = function (param) { return typeof param !== "undefined"; };
exports.isDefined = isDefined;
var isUndefined = function (param) { return typeof param === "undefined"; };
exports.isUndefined = isUndefined;
var isFunction = function (param) { return typeof param === "function"; };
exports.isFunction = isFunction;
var isNumber = function (param) { return typeof param === "number" && !isNaN(param); };
exports.isNumber = isNumber;
var isString = function (param) { return (0, exports.objectType)(param) === "String"; };
exports.isString = isString;
var isArray = function (param) { return (0, exports.objectType)(param) === "Array"; };
exports.isArray = isArray;
// closest(e.target, '.field')
var closest = function (target, selector) {
    while (target) {
        if (target.matches && target.matches(selector))
            return target;
        target = target.parentNode;
    }
    return null;
};
exports.closest = closest;
var getOffsetRect = function (elem) {
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
exports.getOffsetRect = getOffsetRect;
var getTotalScroll = function (elem) {
    var top = 0;
    var left = 0;
    while ((elem = elem.parentNode)) {
        top += elem.scrollTop || 0;
        left += elem.scrollLeft || 0;
    }
    return { top: top, left: left };
};
exports.getTotalScroll = getTotalScroll;
var getTransformProps = function (x, y) {
    return {
        transform: "translate(".concat(x, "px, ").concat(y, "px)"),
    };
};
exports.getTransformProps = getTransformProps;
var listWithChildren = function (list, childrenProp) {
    return list.map(function (item) {
        var _a;
        return __assign(__assign({}, item), (_a = {}, _a[childrenProp] = item[childrenProp]
            ? (0, exports.listWithChildren)(item[childrenProp], childrenProp)
            : [], _a));
    });
};
exports.listWithChildren = listWithChildren;
var getAllNonEmptyNodesIds = function (items, _a) {
    var idProp = _a.idProp, childrenProp = _a.childrenProp;
    var childrenIds = [];
    var ids = items
        .filter(function (item) { var _a; return (_a = item[childrenProp]) === null || _a === void 0 ? void 0 : _a.length; })
        .map(function (item) {
        childrenIds = childrenIds.concat((0, exports.getAllNonEmptyNodesIds)(item[childrenProp], { idProp: idProp, childrenProp: childrenProp }));
        return item[idProp];
    });
    return ids.concat(childrenIds);
};
exports.getAllNonEmptyNodesIds = getAllNonEmptyNodesIds;
//# sourceMappingURL=utils.js.map