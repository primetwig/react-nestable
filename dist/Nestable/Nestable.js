'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

require('./Nestable.css');

var _NestableItem = require('./NestableItem');

var _NestableItem2 = _interopRequireDefault(_NestableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nestable = function (_Component) {
  _inherits(Nestable, _Component);

  function Nestable(props) {
    _classCallCheck(this, Nestable);

    var _this = _possibleConstructorReturn(this, (Nestable.__proto__ || Object.getPrototypeOf(Nestable)).call(this, props));

    _this.collapse = function (itemIds) {
      var _this$props = _this.props,
          childrenProp = _this$props.childrenProp,
          collapsed = _this$props.collapsed;
      var items = _this.state.items;


      if (itemIds === 'NONE') {
        _this.setState({
          collapsedGroups: collapsed ? (0, _utils.getAllNonEmptyNodesIds)(items, childrenProp) : []
        });
      } else if (itemIds === 'ALL') {
        _this.setState({
          collapsedGroups: collapsed ? [] : (0, _utils.getAllNonEmptyNodesIds)(items, childrenProp)
        });
      } else if ((0, _utils.isArray)(itemIds)) {
        _this.setState({
          collapsedGroups: (0, _utils.getAllNonEmptyNodesIds)(items, childrenProp).filter(function (id) {
            return itemIds.indexOf(id) > -1 ^ collapsed;
          })
        });
      }
    };

    _this.startTrackMouse = function () {
      document.addEventListener('mousemove', _this.onMouseMove);
      document.addEventListener('mouseup', _this.onDragEnd);
      document.addEventListener('keydown', _this.onKeyDown);
    };

    _this.stopTrackMouse = function () {
      document.removeEventListener('mousemove', _this.onMouseMove);
      document.removeEventListener('mouseup', _this.onDragEnd);
      document.removeEventListener('keydown', _this.onKeyDown);
      _this.elCopyStyles = null;
    };

    _this.getItemDepth = function (item) {
      var childrenProp = _this.props.childrenProp;

      var level = 1;

      if (item[childrenProp].length > 0) {
        var childrenDepths = item[childrenProp].map(_this.getItemDepth);
        level += Math.max.apply(Math, _toConsumableArray(childrenDepths));
      }

      return level;
    };

    _this.isCollapsed = function (item) {
      var collapsed = _this.props.collapsed;
      var collapsedGroups = _this.state.collapsedGroups;


      return !!(collapsedGroups.indexOf(item.id) > -1 ^ collapsed);
    };

    _this.onDragStart = function (e, item) {
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
    };

    _this.onDragEnd = function (e, isCancel) {
      e && e.preventDefault();

      _this.stopTrackMouse();
      _this.el = null;

      isCancel ? _this.dragRevert() : _this.dragApply();
    };

    _this.onMouseMove = function (e) {
      var _this$props2 = _this.props,
          group = _this$props2.group,
          threshold = _this$props2.threshold;
      var dragItem = _this.state.dragItem;
      var clientX = e.clientX,
          clientY = e.clientY;

      var transformProps = (0, _utils.getTransformProps)(clientX, clientY);
      var elCopy = document.querySelector('.nestable-' + group + ' .nestable-drag-layer > .nestable-list');

      if (!_this.elCopyStyles) {
        var offset = (0, _utils.getOffsetRect)(_this.el);
        var scroll = (0, _utils.getTotalScroll)(_this.el);

        _this.elCopyStyles = _extends({
          marginTop: offset.top - clientY - scroll.top,
          marginLeft: offset.left - clientX - scroll.left
        }, transformProps);
      } else {
        _this.elCopyStyles = _extends({}, _this.elCopyStyles, transformProps);
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
    };

    _this.onMouseEnter = function (e, item) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      var _this$props3 = _this.props,
          collapsed = _this$props3.collapsed,
          childrenProp = _this$props3.childrenProp;
      var dragItem = _this.state.dragItem;

      if (dragItem.id === item.id) return;

      var pathFrom = _this.getPathById(dragItem.id);
      var pathTo = _this.getPathById(item.id);

      // if collapsed by default
      // and move last (by count) child
      // remove parent node from list of open nodes
      var collapseProps = {};
      if (collapsed && pathFrom.length > 1) {
        var parent = _this.getItemByPath(pathFrom.slice(0, -1));
        if (parent[childrenProp].length === 1) {
          collapseProps = _this.onToggleCollapse(parent, true);
        }
      }

      _this.moveItem({ dragItem: dragItem, pathFrom: pathFrom, pathTo: pathTo }, collapseProps);
    };

    _this.onToggleCollapse = function (item, isGetter) {
      var collapsed = _this.props.collapsed;
      var collapsedGroups = _this.state.collapsedGroups;

      var isCollapsed = _this.isCollapsed(item);

      var newState = {
        collapsedGroups: isCollapsed ^ collapsed ? collapsedGroups.filter(function (id) {
          return id !== item.id;
        }) : collapsedGroups.concat(item.id)
      };

      if (isGetter) {
        return newState;
      } else {
        _this.setState(newState);
      }
    };

    _this.onKeyDown = function (e) {
      if (e.which === 27) {
        // ESC
        _this.onDragEnd(null, true);
      }
    };

    _this.state = {
      items: [],
      itemsOld: null, // snap copy in case of canceling drag
      dragItem: null,
      isDirty: false,
      collapsedGroups: []
    };

    _this.el = null;
    _this.elCopyStyles = null;
    _this.mouse = {
      last: { x: 0 },
      shift: { x: 0 }
    };
    return _this;
  }

  _createClass(Nestable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          items = _props.items,
          childrenProp = _props.childrenProp;

      // make sure every item has property 'children'

      items = (0, _utils.listWithChildren)(items, childrenProp);

      this.setState({ items: items });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          itemsNew = _props2.items,
          childrenProp = _props2.childrenProp;

      var isPropsUpdated = (0, _reactAddonsShallowCompare2.default)({ props: prevProps, state: {} }, this.props, {});

      if (isPropsUpdated) {
        this.stopTrackMouse();

        var extra = {};

        if (prevProps.collapsed !== this.props.collapsed) {
          extra.collapsedGroups = [];
        }

        this.setState(_extends({
          items: (0, _utils.listWithChildren)(itemsNew, childrenProp),
          dragItem: null,
          isDirty: false
        }, extra));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTrackMouse();
    }

    // ––––––––––––––––––––––––––––––––––––
    // Public Methods
    // ––––––––––––––––––––––––––––––––––––


    // ––––––––––––––––––––––––––––––––––––
    // Methods
    // ––––––––––––––––––––––––––––––––––––

  }, {
    key: 'moveItem',
    value: function moveItem(_ref) {
      var dragItem = _ref.dragItem,
          pathFrom = _ref.pathFrom,
          pathTo = _ref.pathTo;
      var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _props3 = this.props,
          childrenProp = _props3.childrenProp,
          confirmChange = _props3.confirmChange;

      var dragItemSize = this.getItemDepth(dragItem);
      var items = this.state.items;

      // the remove action might affect the next position,
      // so update next coordinates accordingly

      var realPathTo = this.getRealNextPath(pathFrom, pathTo, dragItemSize);

      if (realPathTo.length === 0) return;

      // user can validate every movement
      var destinationPath = realPathTo.length > pathTo.length ? pathTo : pathTo.slice(0, -1);
      var destinationParent = this.getItemByPath(destinationPath);
      if (!confirmChange(dragItem, destinationParent)) return;

      var removePath = this.getSplicePath(pathFrom, {
        numToRemove: 1,
        childrenProp: childrenProp
      });

      var insertPath = this.getSplicePath(realPathTo, {
        numToRemove: 0,
        itemsToInsert: [dragItem],
        childrenProp: childrenProp
      });

      items = (0, _reactAddonsUpdate2.default)(items, removePath);
      items = (0, _reactAddonsUpdate2.default)(items, insertPath);

      this.setState(_extends({
        items: items,
        isDirty: true
      }, extraProps));
    }
  }, {
    key: 'tryIncreaseDepth',
    value: function tryIncreaseDepth(dragItem) {
      var _props4 = this.props,
          maxDepth = _props4.maxDepth,
          childrenProp = _props4.childrenProp,
          collapsed = _props4.collapsed;

      var pathFrom = this.getPathById(dragItem.id);
      var itemIndex = pathFrom[pathFrom.length - 1];
      var newDepth = pathFrom.length + this.getItemDepth(dragItem);

      // has previous sibling and isn't at max depth
      if (itemIndex > 0 && newDepth <= maxDepth) {
        var prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1));

        // previous sibling is not collapsed
        if (!prevSibling[childrenProp].length || !this.isCollapsed(prevSibling)) {
          var pathTo = pathFrom.slice(0, -1).concat(itemIndex - 1).concat(prevSibling[childrenProp].length);

          // if collapsed by default
          // and was no children here
          // open this node
          var collapseProps = {};
          if (collapsed && !prevSibling[childrenProp].length) {
            collapseProps = this.onToggleCollapse(prevSibling, true);
          }

          this.moveItem({ dragItem: dragItem, pathFrom: pathFrom, pathTo: pathTo }, collapseProps);
        }
      }
    }
  }, {
    key: 'tryDecreaseDepth',
    value: function tryDecreaseDepth(dragItem) {
      var _props5 = this.props,
          childrenProp = _props5.childrenProp,
          collapsed = _props5.collapsed;

      var pathFrom = this.getPathById(dragItem.id);
      var itemIndex = pathFrom[pathFrom.length - 1];

      // has parent
      if (pathFrom.length > 1) {
        var parent = this.getItemByPath(pathFrom.slice(0, -1));

        // is last (by order) item in array
        if (itemIndex + 1 === parent[childrenProp].length) {
          var pathTo = pathFrom.slice(0, -1);
          pathTo[pathTo.length - 1] += 1;

          // if collapsed by default
          // and is last (by count) item in array
          // remove this node from list of open nodes
          var collapseProps = {};
          if (collapsed && parent[childrenProp].length === 1) {
            collapseProps = this.onToggleCollapse(parent, true);
          }

          this.moveItem({ dragItem: dragItem, pathFrom: pathFrom, pathTo: pathTo }, collapseProps);
        }
      }
    }
  }, {
    key: 'dragApply',
    value: function dragApply() {
      var onChange = this.props.onChange;
      var _state = this.state,
          items = _state.items,
          isDirty = _state.isDirty,
          dragItem = _state.dragItem;


      this.setState({
        itemsOld: null,
        dragItem: null,
        isDirty: false
      });

      onChange && isDirty && onChange(items, dragItem);
    }
  }, {
    key: 'dragRevert',
    value: function dragRevert() {
      var itemsOld = this.state.itemsOld;


      this.setState({
        items: itemsOld,
        itemsOld: null,
        dragItem: null,
        isDirty: false
      });
    }

    // ––––––––––––––––––––––––––––––––––––
    // Getter methods
    // ––––––––––––––––––––––––––––––––––––

  }, {
    key: 'getPathById',
    value: function getPathById(id) {
      var _this2 = this;

      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.items;
      var childrenProp = this.props.childrenProp;

      var path = [];

      items.every(function (item, i) {
        if (item.id === id) {
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
    key: 'getItemByPath',
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
    key: 'getSplicePath',
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
    key: 'getRealNextPath',
    value: function getRealNextPath(prevPath, nextPath, dragItemSize) {
      var _props6 = this.props,
          childrenProp = _props6.childrenProp,
          maxDepth = _props6.maxDepth;

      var ppLastIndex = prevPath.length - 1;
      var npLastIndex = nextPath.length - 1;
      var newDepth = nextPath.length + dragItemSize - 1;

      if (prevPath.length < nextPath.length) {
        // move into depth
        var wasShifted = false;

        // if new depth exceeds max, try to put after item instead of into item
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
    key: 'getItemOptions',
    value: function getItemOptions() {
      var _props7 = this.props,
          renderItem = _props7.renderItem,
          renderCollapseIcon = _props7.renderCollapseIcon,
          handler = _props7.handler,
          childrenProp = _props7.childrenProp;
      var dragItem = this.state.dragItem;


      return {
        dragItem: dragItem,
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

    // ––––––––––––––––––––––––––––––––––––
    // Click handlers or event handlers
    // ––––––––––––––––––––––––––––––––––––

  }, {
    key: 'renderDragLayer',


    // ––––––––––––––––––––––––––––––––––––
    // Render methods
    // ––––––––––––––––––––––––––––––––––––
    value: function renderDragLayer() {
      var group = this.props.group;
      var dragItem = this.state.dragItem;

      var el = document.querySelector('.nestable-' + group + ' .nestable-item-' + dragItem.id);

      var listStyles = {};
      if (el) {
        listStyles.width = el.clientWidth;
      }
      if (this.elCopyStyles) {
        listStyles = _extends({}, listStyles, this.elCopyStyles);
      }

      var options = this.getItemOptions();

      return _react2.default.createElement(
        'div',
        { className: 'nestable-drag-layer' },
        _react2.default.createElement(
          'ol',
          { className: 'nestable-list', style: listStyles },
          _react2.default.createElement(_NestableItem2.default, {
            item: dragItem,
            options: options,
            isCopy: true
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props8 = this.props,
          group = _props8.group,
          className = _props8.className;
      var _state2 = this.state,
          items = _state2.items,
          dragItem = _state2.dragItem;

      var options = this.getItemOptions();

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'nestable', 'nestable-' + group, { 'is-drag-active': dragItem }) },
        _react2.default.createElement(
          'ol',
          { className: 'nestable-list nestable-group' },
          items.map(function (item, i) {
            return _react2.default.createElement(_NestableItem2.default, {
              key: i,
              index: i,
              item: item,
              options: options
            });
          })
        ),
        dragItem && this.renderDragLayer()
      );
    }
  }]);

  return Nestable;
}(_react.Component);

Nestable.propTypes = {
  className: _propTypes2.default.string,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.any.isRequired
  })),
  threshold: _propTypes2.default.number,
  maxDepth: _propTypes2.default.number,
  collapsed: _propTypes2.default.bool,
  group: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  childrenProp: _propTypes2.default.string,
  renderItem: _propTypes2.default.func,
  renderCollapseIcon: _propTypes2.default.func,
  handler: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  confirmChange: _propTypes2.default.func
};
Nestable.defaultProps = {
  items: [],
  threshold: 30,
  maxDepth: 10,
  collapsed: false,
  group: Math.random().toString(36).slice(2),
  childrenProp: 'children',
  renderItem: function renderItem(_ref2) {
    var item = _ref2.item;
    return item.toString();
  },
  onChange: function onChange() {},
  confirmChange: function confirmChange() {
    return true;
  }
};
exports.default = Nestable;