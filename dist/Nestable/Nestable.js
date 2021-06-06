"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));

var _reactAddonsUpdate = _interopRequireDefault(require("react-addons-update"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _NestableItem = _interopRequireDefault(require("./NestableItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Nestable = /*#__PURE__*/function (_Component) {
  _inherits(Nestable, _Component);

  var _super = _createSuper(Nestable);

  function Nestable(props) {
    var _this;

    _classCallCheck(this, Nestable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "collapse", function (itemIds) {
      var _this$props = _this.props,
          idProp = _this$props.idProp,
          childrenProp = _this$props.childrenProp,
          collapsed = _this$props.collapsed;
      var items = _this.state.items;

      if (itemIds === 'NONE') {
        _this.setState({
          collapsedGroups: collapsed ? (0, _utils.getAllNonEmptyNodesIds)(items, {
            idProp: idProp,
            childrenProp: childrenProp
          }) : []
        });
      } else if (itemIds === 'ALL') {
        _this.setState({
          collapsedGroups: collapsed ? [] : (0, _utils.getAllNonEmptyNodesIds)(items, {
            idProp: idProp,
            childrenProp: childrenProp
          })
        });
      } else if ((0, _utils.isArray)(itemIds)) {
        _this.setState({
          collapsedGroups: (0, _utils.getAllNonEmptyNodesIds)(items, {
            idProp: idProp,
            childrenProp: childrenProp
          }).filter(function (id) {
            return itemIds.indexOf(id) > -1 ^ collapsed;
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startTrackMouse", function () {
      document.addEventListener('mousemove', _this.onMouseMove);
      document.addEventListener('mouseup', _this.onDragEnd);
      document.addEventListener('keydown', _this.onKeyDown);
    });

    _defineProperty(_assertThisInitialized(_this), "stopTrackMouse", function () {
      document.removeEventListener('mousemove', _this.onMouseMove);
      document.removeEventListener('mouseup', _this.onDragEnd);
      document.removeEventListener('keydown', _this.onKeyDown);
      _this.elCopyStyles = null;
    });

    _defineProperty(_assertThisInitialized(_this), "getItemDepth", function (item) {
      var childrenProp = _this.props.childrenProp;
      var level = 1;

      if (item[childrenProp].length > 0) {
        var childrenDepths = item[childrenProp].map(_this.getItemDepth);
        level += Math.max.apply(Math, _toConsumableArray(childrenDepths));
      }

      return level;
    });

    _defineProperty(_assertThisInitialized(_this), "isCollapsed", function (item) {
      var _this$props2 = _this.props,
          collapsed = _this$props2.collapsed,
          idProp = _this$props2.idProp;
      var collapsedGroups = _this.state.collapsedGroups;
      return !!(collapsedGroups.indexOf(item[idProp]) > -1 ^ collapsed);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e, item) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      _this.el = (0, _utils.closest)(e.target, '.nestable-item');

      _this.startTrackMouse();

      _this.onMouseMove(e);

      _this.setState({
        dragItem: item,
        itemsOld: _this.state.items
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (e, isCancel) {
      e && e.preventDefault();

      _this.stopTrackMouse();

      _this.el = null;
      isCancel ? _this.dragRevert() : _this.dragApply();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var _this$props3 = _this.props,
          group = _this$props3.group,
          threshold = _this$props3.threshold;
      var dragItem = _this.state.dragItem;
      var clientX = e.clientX,
          clientY = e.clientY;
      var transformProps = (0, _utils.getTransformProps)(clientX, clientY);
      var elCopy = document.querySelector('.nestable-' + group + ' .nestable-drag-layer > .nestable-list');

      if (!_this.elCopyStyles) {
        var offset = (0, _utils.getOffsetRect)(_this.el);
        var scroll = (0, _utils.getTotalScroll)(_this.el);
        _this.elCopyStyles = _objectSpread({
          marginTop: offset.top - clientY - scroll.top,
          marginLeft: offset.left - clientX - scroll.left
        }, transformProps);
      } else {
        _this.elCopyStyles = _objectSpread(_objectSpread({}, _this.elCopyStyles), transformProps);

        for (var key in transformProps) {
          if (transformProps.hasOwnProperty(key)) {
            elCopy.style[key] = transformProps[key];
          }
        }

        var diffX = clientX - _this.mouse.last.x;

        if (diffX >= 0 && _this.mouse.shift.x >= 0 || diffX <= 0 && _this.mouse.shift.x <= 0) {
          _this.mouse.shift.x += diffX;
        } else {
          _this.mouse.shift.x = 0;
        }

        _this.mouse.last.x = clientX;

        if (Math.abs(_this.mouse.shift.x) > threshold) {
          if (_this.mouse.shift.x > 0) {
            _this.tryIncreaseDepth(dragItem);
          } else {
            _this.tryDecreaseDepth(dragItem);
          }

          _this.mouse.shift.x = 0;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e, item) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      var _this$props4 = _this.props,
          collapsed = _this$props4.collapsed,
          idProp = _this$props4.idProp,
          childrenProp = _this$props4.childrenProp;
      var dragItem = _this.state.dragItem;
      if (dragItem[idProp] === item[idProp]) return;

      var pathFrom = _this.getPathById(dragItem[idProp]);

      var pathTo = _this.getPathById(item[idProp]); // if collapsed by default
      // and move last (by count) child
      // remove parent node from list of open nodes


      var collapseProps = {};

      if (collapsed && pathFrom.length > 1) {
        var parent = _this.getItemByPath(pathFrom.slice(0, -1));

        if (parent[childrenProp].length === 1) {
          collapseProps = _this.onToggleCollapse(parent, true);
        }
      }

      _this.moveItem({
        dragItem: dragItem,
        pathFrom: pathFrom,
        pathTo: pathTo
      }, collapseProps);
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleCollapse", function (item, isGetter) {
      var _this$props5 = _this.props,
          collapsed = _this$props5.collapsed,
          idProp = _this$props5.idProp;
      var collapsedGroups = _this.state.collapsedGroups;

      var isCollapsed = _this.isCollapsed(item);

      var newState = {
        collapsedGroups: isCollapsed ^ collapsed ? collapsedGroups.filter(function (id) {
          return id !== item[idProp];
        }) : collapsedGroups.concat(item[idProp])
      };

      if (isGetter) {
        return newState;
      } else {
        _this.setState(newState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.which === 27) {
        // ESC
        _this.onDragEnd(null, true);
      }
    });

    _this.state = {
      items: [],
      itemsOld: null,
      // snap copy in case of canceling drag
      dragItem: null,
      isDirty: false,
      collapsedGroups: []
    };
    _this.el = null;
    _this.elCopyStyles = null;
    _this.mouse = {
      last: {
        x: 0
      },
      shift: {
        x: 0
      }
    };
    return _this;
  }

  _createClass(Nestable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props6 = this.props,
          items = _this$props6.items,
          childrenProp = _this$props6.childrenProp; // make sure every item has property 'children'

      items = (0, _utils.listWithChildren)(items, childrenProp);
      this.setState({
        items: items
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props7 = this.props,
          itemsNew = _this$props7.items,
          childrenProp = _this$props7.childrenProp;
      var isPropsUpdated = (0, _reactAddonsShallowCompare["default"])({
        props: prevProps,
        state: {}
      }, this.props, {});

      if (isPropsUpdated) {
        this.stopTrackMouse();
        var extra = {};

        if (prevProps.collapsed !== this.props.collapsed) {
          extra.collapsedGroups = [];
        }

        this.setState(_objectSpread({
          items: (0, _utils.listWithChildren)(itemsNew, childrenProp),
          dragItem: null,
          isDirty: false
        }, extra));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopTrackMouse();
    } // ––––––––––––––––––––––––––––––––––––
    // Public Methods
    // ––––––––––––––––––––––––––––––––––––

  }, {
    key: "moveItem",
    value: function moveItem(_ref) {
      var dragItem = _ref.dragItem,
          pathFrom = _ref.pathFrom,
          pathTo = _ref.pathTo;
      var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$props8 = this.props,
          childrenProp = _this$props8.childrenProp,
          confirmChange = _this$props8.confirmChange;
      var dragItemSize = this.getItemDepth(dragItem);
      var items = this.state.items; // the remove action might affect the next position,
      // so update next coordinates accordingly

      var realPathTo = this.getRealNextPath(pathFrom, pathTo, dragItemSize);
      if (realPathTo.length === 0) return; // user can validate every movement

      var destinationPath = realPathTo.length > pathTo.length ? pathTo : pathTo.slice(0, -1);
      var destinationParent = this.getItemByPath(destinationPath);
      if (!confirmChange({
        dragItem: dragItem,
        destinationParent: destinationParent
      })) return;
      var removePath = this.getSplicePath(pathFrom, {
        numToRemove: 1,
        childrenProp: childrenProp
      });
      var insertPath = this.getSplicePath(realPathTo, {
        numToRemove: 0,
        itemsToInsert: [dragItem],
        childrenProp: childrenProp
      });
      items = (0, _reactAddonsUpdate["default"])(items, removePath);
      items = (0, _reactAddonsUpdate["default"])(items, insertPath);
      this.setState(_objectSpread({
        items: items,
        isDirty: true
      }, extraProps));
    }
  }, {
    key: "tryIncreaseDepth",
    value: function tryIncreaseDepth(dragItem) {
      var _this$props9 = this.props,
          maxDepth = _this$props9.maxDepth,
          idProp = _this$props9.idProp,
          childrenProp = _this$props9.childrenProp,
          collapsed = _this$props9.collapsed;
      var pathFrom = this.getPathById(dragItem[idProp]);
      var itemIndex = pathFrom[pathFrom.length - 1];
      var newDepth = pathFrom.length + this.getItemDepth(dragItem); // has previous sibling and isn't at max depth

      if (itemIndex > 0 && newDepth <= maxDepth) {
        var prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1)); // previous sibling is not collapsed

        if (!prevSibling[childrenProp].length || !this.isCollapsed(prevSibling)) {
          var pathTo = pathFrom.slice(0, -1).concat(itemIndex - 1).concat(prevSibling[childrenProp].length); // if collapsed by default
          // and was no children here
          // open this node

          var collapseProps = {};

          if (collapsed && !prevSibling[childrenProp].length) {
            collapseProps = this.onToggleCollapse(prevSibling, true);
          }

          this.moveItem({
            dragItem: dragItem,
            pathFrom: pathFrom,
            pathTo: pathTo
          }, collapseProps);
        }
      }
    }
  }, {
    key: "tryDecreaseDepth",
    value: function tryDecreaseDepth(dragItem) {
      var _this$props10 = this.props,
          idProp = _this$props10.idProp,
          childrenProp = _this$props10.childrenProp,
          collapsed = _this$props10.collapsed;
      var pathFrom = this.getPathById(dragItem[idProp]);
      var itemIndex = pathFrom[pathFrom.length - 1]; // has parent

      if (pathFrom.length > 1) {
        var parent = this.getItemByPath(pathFrom.slice(0, -1)); // is last (by order) item in array

        if (itemIndex + 1 === parent[childrenProp].length) {
          var pathTo = pathFrom.slice(0, -1);
          pathTo[pathTo.length - 1] += 1; // if collapsed by default
          // and is last (by count) item in array
          // remove this node from list of open nodes

          var collapseProps = {};

          if (collapsed && parent[childrenProp].length === 1) {
            collapseProps = this.onToggleCollapse(parent, true);
          }

          this.moveItem({
            dragItem: dragItem,
            pathFrom: pathFrom,
            pathTo: pathTo
          }, collapseProps);
        }
      }
    }
  }, {
    key: "dragApply",
    value: function dragApply() {
      var _this$props11 = this.props,
          onChange = _this$props11.onChange,
          idProp = _this$props11.idProp;
      var _this$state = this.state,
          items = _this$state.items,
          isDirty = _this$state.isDirty,
          dragItem = _this$state.dragItem;
      this.setState({
        itemsOld: null,
        dragItem: null,
        isDirty: false
      });

      if (onChange && isDirty) {
        var targetPath = this.getPathById(dragItem[idProp], items);
        onChange({
          items: items,
          dragItem: dragItem,
          targetPath: targetPath
        });
      }
    }
  }, {
    key: "dragRevert",
    value: function dragRevert() {
      var itemsOld = this.state.itemsOld;
      this.setState({
        items: itemsOld,
        itemsOld: null,
        dragItem: null,
        isDirty: false
      });
    } // ––––––––––––––––––––––––––––––––––––
    // Getter methods
    // ––––––––––––––––––––––––––––––––––––

  }, {
    key: "getPathById",
    value: function getPathById(id) {
      var _this2 = this;

      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.items;
      var _this$props12 = this.props,
          idProp = _this$props12.idProp,
          childrenProp = _this$props12.childrenProp;
      var path = [];
      items.every(function (item, i) {
        if (item[idProp] === id) {
          path.push(i);
        } else if (item[childrenProp]) {
          var childrenPath = _this2.getPathById(id, item[childrenProp]);

          if (childrenPath.length) {
            path = path.concat(i).concat(childrenPath);
          }
        }

        return path.length === 0;
      });
      return path;
    }
  }, {
    key: "getItemByPath",
    value: function getItemByPath(path) {
      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.items;
      var childrenProp = this.props.childrenProp;
      var item = null;
      path.forEach(function (index) {
        var list = item ? item[childrenProp] : items;
        item = list[index];
      });
      return item;
    }
  }, {
    key: "getSplicePath",
    value: function getSplicePath(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var splicePath = {};
      var numToRemove = options.numToRemove || 0;
      var itemsToInsert = options.itemsToInsert || [];
      var lastIndex = path.length - 1;
      var currentPath = splicePath;
      path.forEach(function (index, i) {
        if (i === lastIndex) {
          currentPath.$splice = [[index, numToRemove].concat(_toConsumableArray(itemsToInsert))];
        } else {
          var nextPath = {};
          currentPath[index] = _defineProperty({}, options.childrenProp, nextPath);
          currentPath = nextPath;
        }
      });
      return splicePath;
    }
  }, {
    key: "getRealNextPath",
    value: function getRealNextPath(prevPath, nextPath, dragItemSize) {
      var _this$props13 = this.props,
          childrenProp = _this$props13.childrenProp,
          maxDepth = _this$props13.maxDepth;
      var ppLastIndex = prevPath.length - 1;
      var npLastIndex = nextPath.length - 1;
      var newDepth = nextPath.length + dragItemSize - 1;

      if (prevPath.length < nextPath.length) {
        // move into depth
        var wasShifted = false; // if new depth exceeds max, try to put after item instead of into item

        if (newDepth > maxDepth && nextPath.length) {
          return this.getRealNextPath(prevPath, nextPath.slice(0, -1), dragItemSize);
        }

        return nextPath.map(function (nextIndex, i) {
          if (wasShifted) {
            return i === npLastIndex ? nextIndex + 1 : nextIndex;
          }

          if (typeof prevPath[i] !== 'number') {
            return nextIndex;
          }

          if (nextPath[i] > prevPath[i] && i === ppLastIndex) {
            wasShifted = true;
            return nextIndex - 1;
          }

          return nextIndex;
        });
      } else if (prevPath.length === nextPath.length) {
        // if move bottom + move to item with children --> make it a first child instead of swap
        if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
          var target = this.getItemByPath(nextPath);

          if (newDepth < maxDepth && target[childrenProp] && target[childrenProp].length && !this.isCollapsed(target)) {
            return nextPath.slice(0, -1).concat(nextPath[npLastIndex] - 1).concat(0);
          }
        }
      }

      return nextPath;
    }
  }, {
    key: "getItemOptions",
    value: function getItemOptions() {
      var _this$props14 = this.props,
          renderItem = _this$props14.renderItem,
          renderCollapseIcon = _this$props14.renderCollapseIcon,
          handler = _this$props14.handler,
          idProp = _this$props14.idProp,
          childrenProp = _this$props14.childrenProp;
      var dragItem = this.state.dragItem;
      return {
        dragItem: dragItem,
        idProp: idProp,
        childrenProp: childrenProp,
        renderItem: renderItem,
        renderCollapseIcon: renderCollapseIcon,
        handler: handler,
        onDragStart: this.onDragStart,
        onMouseEnter: this.onMouseEnter,
        isCollapsed: this.isCollapsed,
        onToggleCollapse: this.onToggleCollapse
      };
    }
  }, {
    key: "renderDragLayer",
    value: // ––––––––––––––––––––––––––––––––––––
    // Render methods
    // ––––––––––––––––––––––––––––––––––––
    function renderDragLayer() {
      var _this$props15 = this.props,
          group = _this$props15.group,
          idProp = _this$props15.idProp;
      var dragItem = this.state.dragItem;
      var el = document.querySelector('.nestable-' + group + ' .nestable-item-' + dragItem[idProp]);
      var listStyles = {};

      if (el) {
        listStyles.width = el.clientWidth;
      }

      if (this.elCopyStyles) {
        listStyles = _objectSpread(_objectSpread({}, listStyles), this.elCopyStyles);
      }

      var options = this.getItemOptions();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "nestable-drag-layer"
      }, /*#__PURE__*/_react["default"].createElement("ol", {
        className: "nestable-list",
        style: listStyles
      }, /*#__PURE__*/_react["default"].createElement(_NestableItem["default"], {
        item: dragItem,
        options: options,
        isCopy: true
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props16 = this.props,
          group = _this$props16.group,
          className = _this$props16.className;
      var _this$state2 = this.state,
          items = _this$state2.items,
          dragItem = _this$state2.dragItem;
      var options = this.getItemOptions();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(className, 'nestable', 'nestable-' + group, {
          'is-drag-active': dragItem
        })
      }, /*#__PURE__*/_react["default"].createElement("ol", {
        className: "nestable-list nestable-group"
      }, items.map(function (item, i) {
        return /*#__PURE__*/_react["default"].createElement(_NestableItem["default"], {
          key: i,
          index: i,
          item: item,
          options: options
        });
      })), dragItem && this.renderDragLayer());
    }
  }]);

  return Nestable;
}(_react.Component);

_defineProperty(Nestable, "propTypes", {
  childrenProp: _propTypes["default"].string,
  className: _propTypes["default"].string,
  collapsed: _propTypes["default"].bool,
  confirmChange: _propTypes["default"].func,
  group: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  handler: _propTypes["default"].node,
  idProp: _propTypes["default"].string,
  items: _propTypes["default"].array,
  maxDepth: _propTypes["default"].number,
  onChange: _propTypes["default"].func,
  renderCollapseIcon: _propTypes["default"].func,
  renderItem: _propTypes["default"].func,
  threshold: _propTypes["default"].number
});

_defineProperty(Nestable, "defaultProps", {
  childrenProp: 'children',
  collapsed: false,
  confirmChange: function confirmChange() {
    return true;
  },
  group: Math.random().toString(36).slice(2),
  idProp: 'id',
  items: [],
  maxDepth: 10,
  onChange: function onChange() {},
  renderItem: function renderItem(_ref2) {
    var item = _ref2.item;
    return String(item);
  },
  threshold: 30
});

var _default = Nestable;
exports["default"] = _default;