'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Nestable = require('../Nestable');

var _Nestable2 = _interopRequireDefault(_Nestable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    position: "relative",
    padding: "10px 15px",
    fontSize: "20px",
    border: "1px solid #f9fafa",
    background: "#f9fafa",
    cursor: "pointer"
};
var handlerStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "10px",
    height: "100%",
    background: "steelblue",
    cursor: "pointer"
};

var ComponentName = (function (_Component) {
    _inherits(ComponentName, _Component);

    function ComponentName() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ComponentName);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ComponentName.__proto__ || Object.getPrototypeOf(ComponentName)).call.apply(_ref, [this].concat(args))), _this), _this.collapse = function (collapseCase) {
            if (_this.refNestable) {
                switch (collapseCase) {
                    case 0:
                        _this.refNestable.collapse('NONE');
                        break;
                    case 1:
                        _this.refNestable.collapse('ALL');
                        break;
                    case 2:
                        _this.refNestable.collapse([1]);
                        break;
                }
            }
        }, _this.renderItem = function (_ref2) {
            var item = _ref2.item,
                collapseIcon = _ref2.collapseIcon,
                handler = _ref2.handler;

            return _react2.default.createElement(
                'div',
                { style: styles },
                handler,
                collapseIcon,
                item.text
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ComponentName, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var items = [{
                id: 0,
                text: 'Andy'
            }, {
                id: 1,
                text: 'Harry',
                children: [{
                    id: 2,
                    text: 'David'
                }]
            }, {
                id: 3,
                text: 'Lisa',
                children: [{
                    id: 4,
                    text: 'Richard'
                }]
            }];

            var handler = _react2.default.createElement('span', { style: handlerStyles });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Basic example'
                ),
                _react2.default.createElement(_Nestable2.default, {
                    group: '0',
                    items: items,
                    renderItem: this.renderItem,
                    ref: function ref(el) {
                        return _this2.refNestable = el;
                    }
                }),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: function onClick(e) {
                            return _this2.collapse(0);
                        } },
                    'Collapse none'
                ),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: function onClick(e) {
                            return _this2.collapse(1);
                        } },
                    'Collapse all'
                ),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: function onClick(e) {
                            return _this2.collapse(2);
                        } },
                    'Collapse Harry'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('hr', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Example with handler'
                ),
                _react2.default.createElement(_Nestable2.default, {
                    group: '1',
                    items: items,
                    renderItem: this.renderItem,
                    handler: handler
                })
            );
        }
    }]);

    return ComponentName;
})(_react.Component);

(0, _reactDom.render)(_react2.default.createElement(ComponentName, null), document.getElementById('app'));