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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestableItem = function (_Component) {
  _inherits(NestableItem, _Component);

  function NestableItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NestableItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NestableItem.__proto__ || Object.getPrototypeOf(NestableItem)).call.apply(_ref, [this].concat(args))), _this), _this.renderCollapseIcon = function (_ref2) {
      var isCollapsed = _ref2.isCollapsed;
      return _react2.default.createElement(_Icon2.default, {
        className: (0, _classnames2.default)('nestable-item-icon', {
          'icon-plus-gray': isCollapsed,
          'icon-minus-gray': !isCollapsed
        })
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NestableItem, [{
    key: 'render',
    value: function render() {
      var _cn;

      var _props = this.props,
          item = _props.item,
          isCopy = _props.isCopy,
          options = _props.options,
          index = _props.index;
      var dragItem = options.dragItem,
          renderItem = options.renderItem,
          handler = options.handler,
          childrenProp = options.childrenProp,
          _options$renderCollap = options.renderCollapseIcon,
          renderCollapseIcon = _options$renderCollap === undefined ? this.renderCollapseIcon : _options$renderCollap;


      var isCollapsed = options.isCollapsed(item);
      var isDragging = !isCopy && dragItem && dragItem.id === item.id;
      var hasChildren = item[childrenProp] && item[childrenProp].length > 0;

      var rowProps = {};
      var handlerProps = {};
      var Handler = void 0;

      if (!isCopy) {
        if (dragItem) {
          rowProps = _extends({}, rowProps, {
            onMouseEnter: function onMouseEnter(e) {
              return options.onMouseEnter(e, item);
            }
          });
        } else {
          handlerProps = _extends({}, handlerProps, {
            draggable: true,
            onDragStart: function onDragStart(e) {
              return options.onDragStart(e, item);
            }
          });
        }
      }

      if (handler) {
        Handler = _react2.default.createElement(
          'span',
          _extends({ className: 'nestable-item-handler' }, handlerProps),
          handler
        );
        //Handler = React.cloneElement(handler, handlerProps);
      } else {
        rowProps = _extends({}, rowProps, handlerProps);
      }

      var collapseIcon = hasChildren ? _react2.default.createElement(
        'span',
        { onClick: function onClick() {
            return options.onToggleCollapse(item);
          } },
        renderCollapseIcon({ isCollapsed: isCollapsed })
      ) : null;

      var baseClassName = 'nestable-item' + (isCopy ? '-copy' : '');
      var itemProps = {
        className: (0, _classnames2.default)(baseClassName, baseClassName + '-' + item.id, (_cn = {
          'is-dragging': isDragging
        }, _defineProperty(_cn, baseClassName + '--with-children', hasChildren), _defineProperty(_cn, baseClassName + '--children-open', hasChildren && !isCollapsed), _defineProperty(_cn, baseClassName + '--children-collapsed', hasChildren && isCollapsed), _cn))
      };

      var content = renderItem({ item: item, collapseIcon: collapseIcon, handler: Handler, index: index });

      if (!content) return null;

      return _react2.default.createElement(
        'li',
        itemProps,
        _react2.default.createElement(
          'div',
          _extends({ className: 'nestable-item-name' }, rowProps),
          content
        ),
        hasChildren && !isCollapsed && _react2.default.createElement(
          'ol',
          { className: 'nestable-list' },
          item[childrenProp].map(function (item, i) {
            return _react2.default.createElement(NestableItem, {
              key: i,
              index: i,
              item: item,
              options: options,
              isCopy: isCopy
            });
          })
        )
      );
    }
  }]);

  return NestableItem;
}(_react.Component);

NestableItem.propTypes = {
  item: _propTypes2.default.shape({
    id: _propTypes2.default.any.isRequired
  }),
  isCopy: _propTypes2.default.bool,
  options: _propTypes2.default.object,
  index: _propTypes2.default.number
};
exports.default = NestableItem;