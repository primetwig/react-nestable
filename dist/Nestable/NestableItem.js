'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestableItem = (function (_Component) {
    _inherits(NestableItem, _Component);

    function NestableItem() {
        _classCallCheck(this, NestableItem);

        return _possibleConstructorReturn(this, (NestableItem.__proto__ || Object.getPrototypeOf(NestableItem)).apply(this, arguments));
    }

    _createClass(NestableItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                item = _props.item,
                isCopy = _props.isCopy,
                options = _props.options;
            var dragItem = options.dragItem,
                collapsedGroups = options.collapsedGroups,
                renderItem = options.renderItem,
                handler = options.handler,
                childrenProp = options.childrenProp;
            var _onDragStart = options.onDragStart,
                _onMouseEnter = options.onMouseEnter,
                onToggleCollapse = options.onToggleCollapse;

            var isDragging = !isCopy && dragItem && dragItem.id === item.id;
            var hasChildren = item[childrenProp] && item[childrenProp].length > 0;
            var isCollapsed = collapsedGroups.indexOf(item.id) > -1;

            var Handler = undefined;

            var itemProps = {
                className: (0, _classnames2.default)("nestable-item" + (isCopy ? '-copy' : ''), "nestable-item" + (isCopy ? '-copy' : '') + '-' + item.id, {
                    'is-dragging': isDragging
                })
            };

            var rowProps = {};
            var handlerProps = {};
            if (!isCopy) {
                if (dragItem) {
                    rowProps = _extends({}, rowProps, {
                        onMouseEnter: function onMouseEnter(e) {
                            return _onMouseEnter(e, item);
                        }
                    });
                } else {
                    handlerProps = _extends({}, handlerProps, {
                        draggable: true,
                        onDragStart: function onDragStart(e) {
                            return _onDragStart(e, item);
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

            var collapseIcon = hasChildren ? _react2.default.createElement(_Icon2.default, {
                className: (0, _classnames2.default)("nestable-item-icon", isCollapsed ? "icon-plus-gray" : "icon-minus-gray"),
                onClick: function onClick(e) {
                    return onToggleCollapse(item);
                }
            }) : '';

            return _react2.default.createElement(
                'li',
                itemProps,
                _react2.default.createElement(
                    'div',
                    _extends({ className: 'nestable-item-name' }, rowProps),
                    renderItem({ item: item, collapseIcon: collapseIcon, handler: Handler })
                ),
                hasChildren && !isCollapsed && _react2.default.createElement(
                    'ol',
                    { className: 'nestable-list' },
                    item[childrenProp].map(function (item, i) {
                        return _react2.default.createElement(NestableItem, {
                            key: i,
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
})(_react.Component);

exports.default = NestableItem;