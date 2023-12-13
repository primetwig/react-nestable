"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Icon_1 = __importDefault(require("../Icon"));
var NestableItem = /** @class */ (function (_super) {
    __extends(NestableItem, _super);
    function NestableItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCollapseIcon = function (_a) {
            var isCollapsed = _a.isCollapsed;
            return (react_1.default.createElement(Icon_1.default, { className: "nestable-item-icon", isCollapsed: isCollapsed }));
        };
        _this.onMouseEnter = function (e) {
            var _a = _this.props, item = _a.item, options = _a.options;
            return options.onMouseEnter(e, item);
        };
        _this.onDragStart = function (e) {
            var _a = _this.props, item = _a.item, options = _a.options;
            return options.onDragStart(e, item);
        };
        return _this;
    }
    NestableItem.prototype.render = function () {
        var _a;
        var _b = this.props, item = _b.item, isCopy = _b.isCopy, options = _b.options, index = _b.index, depth = _b.depth;
        var dragItem = options.dragItem, renderItem = options.renderItem, handler = options.handler, disableCollapse = options.disableCollapse, disableDrag = options.disableDrag, idProp = options.idProp, childrenProp = options.childrenProp, checkIfCollapsed = options.checkIfCollapsed, _c = options.renderCollapseIcon, renderCollapseIcon = _c === void 0 ? this.renderCollapseIcon : _c;
        var isCollapsed = checkIfCollapsed(item);
        var isDragging = !isCopy && dragItem && dragItem[idProp] === item[idProp];
        var hasChildren = item[childrenProp] && item[childrenProp].length > 0;
        var isDraggable = true;
        var rowProps = {};
        var handlerProps = {};
        var wrappedHandler;
        if (!isCopy) {
            if (dragItem) {
                rowProps = __assign(__assign({}, rowProps), { onMouseEnter: this.onMouseEnter });
            }
            else {
                if (typeof disableDrag === 'function') {
                    isDraggable = disableDrag({ item: item, index: index, depth: depth });
                }
                else if (typeof disableDrag !== 'undefined') {
                    isDraggable = !disableDrag;
                }
                if (isDraggable) {
                    handlerProps = __assign(__assign({}, handlerProps), { draggable: true, onDragStart: this.onDragStart });
                }
            }
        }
        if (handler) {
            wrappedHandler = react_1.default.createElement("span", __assign({ className: "nestable-item-handler" }, handlerProps), handler);
            // wrappedHandler = React.cloneElement(handler, handlerProps);
        }
        else {
            rowProps = __assign(__assign({}, rowProps), handlerProps);
        }
        var handleCollapseIconClick = disableCollapse
            ? undefined :
            function () { return options.onToggleCollapse(item); };
        var collapseIcon = hasChildren
            ? (react_1.default.createElement("span", { onClick: handleCollapseIconClick }, renderCollapseIcon({ isCollapsed: isCollapsed, item: item })))
            : null;
        var baseClassName = "nestable-item".concat(isCopy ? '-copy' : '');
        var itemProps = {
            className: (0, classnames_1.default)(baseClassName, "".concat(baseClassName, "-").concat(item[idProp]), (_a = {
                    'is-dragging': isDragging
                },
                _a["".concat(baseClassName, "--with-children")] = hasChildren,
                _a["".concat(baseClassName, "--children-open")] = hasChildren && !isCollapsed,
                _a["".concat(baseClassName, "--children-collapsed")] = hasChildren && isCollapsed,
                _a["".concat(baseClassName, "--children-no-collapse")] = hasChildren && disableCollapse,
                _a)),
        };
        var content = renderItem({
            collapseIcon: collapseIcon,
            depth: depth,
            handler: wrappedHandler,
            index: index,
            isDraggable: isDraggable,
            item: item,
        });
        if (!content)
            return null;
        return (react_1.default.createElement("li", __assign({}, itemProps),
            react_1.default.createElement("div", __assign({ className: "nestable-item-name" }, rowProps), content),
            hasChildren && !isCollapsed && (react_1.default.createElement("ol", { className: "nestable-list" }, item[childrenProp].map(function (item, i) {
                return (react_1.default.createElement(NestableItem, { key: i, index: i, depth: depth + 1, item: item, options: options, isCopy: isCopy }));
            })))));
    };
    NestableItem.defaultProps = {
        depth: 0,
    };
    return NestableItem;
}(react_1.PureComponent));
exports.default = NestableItem;
//# sourceMappingURL=NestableItem.js.map