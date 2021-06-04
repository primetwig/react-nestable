"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNonEmptyNodesIds = exports.listWithChildren = exports.getTransformProps = exports.getTotalScroll = exports.getOffsetRect = exports.closest = exports.isArray = exports.isString = exports.isNumber = exports.isFunction = exports.isUndefined = exports.isDefined = exports.objectType = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var objectType = function objectType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

exports.objectType = objectType;

var isDefined = function isDefined(param) {
  return typeof param != "undefined";
};

exports.isDefined = isDefined;

var isUndefined = function isUndefined(param) {
  return typeof param == "undefined";
};

exports.isUndefined = isUndefined;

var isFunction = function isFunction(param) {
  return typeof param == "function";
};

exports.isFunction = isFunction;

var isNumber = function isNumber(param) {
  return typeof param == "number" && !isNaN(param);
};

exports.isNumber = isNumber;

var isString = function isString(str) {
  return objectType(str) === "String";
};

exports.isString = isString;

var isArray = function isArray(arr) {
  return objectType(arr) === "Array";
};

exports.isArray = isArray;

var closest = function closest(target, selector) {
  // closest(e.target, '.field')
  while (target) {
    if (target.matches && target.matches(selector)) return target;
    target = target.parentNode;
  }

  return null;
};

exports.closest = closest;

var getOffsetRect = function getOffsetRect(elem) {
  // (1)
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docElem = document.documentElement; // (2)

  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft; // (3)

  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0; // (4)

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
};

exports.getOffsetRect = getOffsetRect;

var getTotalScroll = function getTotalScroll(elem) {
  var top = 0;
  var left = 0;

  while (elem = elem.parentNode) {
    top += elem.scrollTop || 0;
    left += elem.scrollLeft || 0;
  }

  return {
    top: top,
    left: left
  };
};

exports.getTotalScroll = getTotalScroll;

var getTransformProps = function getTransformProps(x, y) {
  return {
    transform: 'translate(' + x + 'px, ' + y + 'px)'
  };
};

exports.getTransformProps = getTransformProps;

var listWithChildren = function listWithChildren(list, childrenProp) {
  return list.map(function (item) {
    return _objectSpread(_objectSpread({}, item), {}, _defineProperty({}, childrenProp, item[childrenProp] ? listWithChildren(item[childrenProp], childrenProp) : []));
  });
};

exports.listWithChildren = listWithChildren;

var getAllNonEmptyNodesIds = function getAllNonEmptyNodesIds(items, _ref) {
  var idProp = _ref.idProp,
      childrenProp = _ref.childrenProp;
  var childrenIds = [];
  var ids = items.filter(function (item) {
    return item[childrenProp].length;
  }).map(function (item) {
    childrenIds = childrenIds.concat(getAllNonEmptyNodesIds(item[childrenProp], {
      idProp: idProp,
      childrenProp: childrenProp
    }));
    return item[idProp];
  });
  return ids.concat(childrenIds);
};

exports.getAllNonEmptyNodesIds = getAllNonEmptyNodesIds;