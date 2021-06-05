"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NestableItem = /*#__PURE__*/function (_Component) {
  _inherits(NestableItem, _Component);

  var _super = _createSuper(NestableItem);

  function NestableItem() {
    var _this;

    _classCallCheck(this, NestableItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "renderCollapseIcon", function (_ref) {
      var isCollapsed = _ref.isCollapsed;
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        className: (0, _classnames["default"])('nestable-item-icon', {
          'icon-plus-gray': isCollapsed,
          'icon-minus-gray': !isCollapsed
        })
      });
    });

    return _this;
  }

  _createClass(NestableItem, [{
    key: "render",
    value: function render() {
      var _cx;

      var _this$props = this.props,
          item = _this$props.item,
          isCopy = _this$props.isCopy,
          options = _this$props.options,
          index = _this$props.index,
          depth = _this$props.depth;
      var dragItem = options.dragItem,
          renderItem = options.renderItem,
          handler = options.handler,
          idProp = options.idProp,
          childrenProp = options.childrenProp,
          _options$renderCollap = options.renderCollapseIcon,
          renderCollapseIcon = _options$renderCollap === void 0 ? this.renderCollapseIcon : _options$renderCollap;
      var isCollapsed = options.isCollapsed(item);
      var isDragging = !isCopy && dragItem && dragItem[idProp] === item[idProp];
      var hasChildren = item[childrenProp] && item[childrenProp].length > 0;
      var rowProps = {};
      var handlerProps = {};
      var wrappedHandler;

      if (!isCopy) {
        if (dragItem) {
          rowProps = _objectSpread(_objectSpread({}, rowProps), {}, {
            onMouseEnter: function onMouseEnter(e) {
              return options.onMouseEnter(e, item);
            }
          });
        } else {
          handlerProps = _objectSpread(_objectSpread({}, handlerProps), {}, {
            draggable: true,
            onDragStart: function onDragStart(e) {
              return options.onDragStart(e, item);
            }
          });
        }
      }

      if (handler) {
        wrappedHandler = /*#__PURE__*/_react["default"].createElement("span", _extends({
          className: "nestable-item-handler"
        }, handlerProps), handler); // wrappedHandler = React.cloneElement(handler, handlerProps);
      } else {
        rowProps = _objectSpread(_objectSpread({}, rowProps), handlerProps);
      }

      var collapseIcon = hasChildren ? /*#__PURE__*/_react["default"].createElement("span", {
        onClick: function onClick() {
          return options.onToggleCollapse(item);
        }
      }, renderCollapseIcon({
        isCollapsed: isCollapsed
      })) : null;
      var baseClassName = 'nestable-item' + (isCopy ? '-copy' : '');
      var itemProps = {
        className: (0, _classnames["default"])(baseClassName, baseClassName + '-' + item[idProp], (_cx = {
          'is-dragging': isDragging
        }, _defineProperty(_cx, baseClassName + '--with-children', hasChildren), _defineProperty(_cx, baseClassName + '--children-open', hasChildren && !isCollapsed), _defineProperty(_cx, baseClassName + '--children-collapsed', hasChildren && isCollapsed), _cx))
      };
      var content = renderItem({
        collapseIcon: collapseIcon,
        depth: depth,
        handler: wrappedHandler,
        index: index,
        item: item
      });
      if (!content) return null;
      return /*#__PURE__*/_react["default"].createElement("li", itemProps, /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: "nestable-item-name"
      }, rowProps), content), hasChildren && !isCollapsed && /*#__PURE__*/_react["default"].createElement("ol", {
        className: "nestable-list"
      }, item[childrenProp].map(function (item, i) {
        return /*#__PURE__*/_react["default"].createElement(NestableItem, {
          key: i,
          index: i,
          depth: depth + 1,
          item: item,
          options: options,
          isCopy: isCopy
        });
      })));
    }
  }]);

  return NestableItem;
}(_react.Component);

_defineProperty(NestableItem, "propTypes", {
  item: _propTypes["default"].object,
  isCopy: _propTypes["default"].bool,
  options: _propTypes["default"].object,
  index: _propTypes["default"].number,
  depth: _propTypes["default"].number
});

_defineProperty(NestableItem, "defaultProps", {
  depth: 0
});

var _default = NestableItem;
exports["default"] = _default;