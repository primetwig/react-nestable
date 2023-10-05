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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_addons_shallow_compare_1 = __importDefault(require("react-addons-shallow-compare"));
var react_addons_update_1 = __importDefault(require("react-addons-update"));
var classnames_1 = __importDefault(require("classnames"));
var utils_1 = require("../utils");
var NestableItem_1 = __importDefault(require("./NestableItem"));
var Nestable = /** @class */ (function (_super) {
    __extends(Nestable, _super);
    function Nestable(props) {
        var _this = _super.call(this, props) || this;
        _this.el = null;
        _this.elCopyStyles = null;
        _this.mouse = {
            last: { x: 0 },
            shift: { x: 0 },
        };
        // ––––––––––––––––––––––––––––––––––––
        // Public Methods
        // ––––––––––––––––––––––––––––––––––––
        _this.collapse = function (itemIds) {
            var _a = _this.props, idProp = _a.idProp, childrenProp = _a.childrenProp, collapsed = _a.collapsed;
            var items = _this.state.items;
            if (itemIds === 'NONE') {
                _this.setState({
                    collapsedItems: collapsed
                        ? (0, utils_1.getAllNonEmptyNodesIds)(items, { idProp: idProp, childrenProp: childrenProp })
                        : [],
                });
            }
            else if (itemIds === 'ALL') {
                _this.setState({
                    collapsedItems: collapsed
                        ? []
                        : (0, utils_1.getAllNonEmptyNodesIds)(items, { idProp: idProp, childrenProp: childrenProp }),
                });
            }
            else if ((0, utils_1.isArray)(itemIds)) {
                _this.setState({
                    collapsedItems: (0, utils_1.getAllNonEmptyNodesIds)(items, { idProp: idProp, childrenProp: childrenProp })
                        .filter(function (id) { return (itemIds.indexOf(id) > -1) !== collapsed; }),
                });
            }
        };
        // ––––––––––––––––––––––––––––––––––––
        // Methods
        // ––––––––––––––––––––––––––––––––––––
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
                level += Math.max.apply(Math, childrenDepths);
            }
            return level;
        };
        _this.checkIfCollapsed = function (item) {
            var _a = _this.props, collapsed = _a.collapsed, idProp = _a.idProp;
            var collapsedItems = _this.state.collapsedItems;
            return !!((collapsedItems.indexOf(item[idProp]) > -1) !== collapsed);
        };
        // ––––––––––––––––––––––––––––––––––––
        // Click handlers or event handlers
        // ––––––––––––––––––––––––––––––––––––
        _this.onDragStart = function (e, item) {
            var onDragStart = _this.props.onDragStart;
            e.preventDefault();
            e.stopPropagation();
            if (!(e.target instanceof Element))
                return;
            _this.el = (0, utils_1.closest)(e.target, '.nestable-item');
            _this.startTrackMouse();
            _this.onMouseMove(e);
            onDragStart({ dragItem: item });
            _this.setState({
                dragItem: item,
                itemsOld: _this.state.items,
            });
        };
        _this.onDragEnd = function (e, isCancel) {
            var onDragEnd = _this.props.onDragEnd;
            e === null || e === void 0 ? void 0 : e.preventDefault();
            _this.stopTrackMouse();
            _this.el = null;
            onDragEnd();
            isCancel
                ? _this.dragRevert()
                : _this.dragApply();
        };
        _this.onMouseMove = function (e) {
            var _a = _this.props, group = _a.group, threshold = _a.threshold;
            var dragItem = _this.state.dragItem;
            var clientX = e.clientX, clientY = e.clientY;
            var transformProps = (0, utils_1.getTransformProps)(clientX, clientY);
            var elCopy = document.querySelector(".nestable-".concat(group, " .nestable-drag-layer > .nestable-list"));
            if (!_this.elCopyStyles) {
                var offset = (0, utils_1.getOffsetRect)(_this.el);
                var scroll_1 = (0, utils_1.getTotalScroll)(_this.el);
                _this.elCopyStyles = __assign({ marginTop: offset.top - clientY - scroll_1.top, marginLeft: offset.left - clientX - scroll_1.left }, transformProps);
            }
            else {
                _this.elCopyStyles = __assign(__assign({}, _this.elCopyStyles), transformProps);
                Object.keys(transformProps).forEach(function (key) {
                    elCopy.style[key] = transformProps[key];
                });
                var diffX = clientX - _this.mouse.last.x;
                if ((diffX >= 0 && _this.mouse.shift.x >= 0) ||
                    (diffX <= 0 && _this.mouse.shift.x <= 0)) {
                    _this.mouse.shift.x += diffX;
                }
                else {
                    _this.mouse.shift.x = 0;
                }
                _this.mouse.last.x = clientX;
                if (Math.abs(_this.mouse.shift.x) > threshold) {
                    if (_this.mouse.shift.x > 0) {
                        _this.tryIncreaseDepth(dragItem);
                    }
                    else {
                        _this.tryDecreaseDepth(dragItem);
                    }
                    _this.mouse.shift.x = 0;
                }
            }
        };
        _this.onMouseEnter = function (e, item) {
            e.preventDefault();
            e.stopPropagation();
            var _a = _this.props, collapsed = _a.collapsed, idProp = _a.idProp, childrenProp = _a.childrenProp;
            var dragItem = _this.state.dragItem;
            if (dragItem[idProp] === item[idProp])
                return;
            var pathFrom = _this.getPathById(dragItem[idProp]);
            var pathTo = _this.getPathById(item[idProp]);
            // if collapsed by default
            // and move out the only child
            // remove parent node from list of open nodes
            var collapseProps = {};
            if (collapsed && pathFrom.length > 1) {
                var parent_1 = _this.getItemByPath(pathFrom.slice(0, -1));
                if (parent_1[childrenProp].length === 1) {
                    collapseProps = _this.onToggleCollapse(parent_1, true);
                }
            }
            _this.moveItem({ dragItem: dragItem, pathFrom: pathFrom, pathTo: pathTo }, collapseProps);
        };
        _this.onToggleCollapse = function (item, isGetter) {
            var _a = _this.props, collapsed = _a.collapsed, idProp = _a.idProp;
            var collapsedItems = _this.state.collapsedItems;
            var isCollapsed = _this.checkIfCollapsed(item);
            var newState = {
                collapsedItems: (isCollapsed !== collapsed)
                    ? collapsedItems.filter(function (id) { return id !== item[idProp]; })
                    : collapsedItems.concat(item[idProp]),
            };
            if (isGetter) {
                return newState;
            }
            else {
                _this.setState(newState);
                _this.onCollapseChange(newState.collapsedItems);
            }
        };
        _this.onCollapseChange = function (ids) {
            var _a = _this.props, collapsed = _a.collapsed, onCollapseChange = _a.onCollapseChange;
            onCollapseChange(collapsed ? { openIds: ids } : { closedIds: ids });
        };
        _this.onKeyDown = function (e) {
            if (e.which === 27) {
                // ESC
                _this.onDragEnd(null, true);
            }
        };
        _this.state = {
            items: [],
            itemsOld: null,
            dragItem: null,
            isDirty: false,
            collapsedItems: [],
        };
        return _this;
    }
    Nestable.prototype.componentDidMount = function () {
        var _a = this.props, items = _a.items, childrenProp = _a.childrenProp;
        // make sure every item has property 'children'
        items = (0, utils_1.listWithChildren)(items, childrenProp);
        this.setState({ items: items });
    };
    Nestable.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a = this, _b = _a.props, itemsNew = _b.items, childrenProp = _b.childrenProp, state = _a.state;
        var isPropsChanged = (0, react_addons_shallow_compare_1.default)(__assign(__assign({}, this), { props: prevProps, state: state }), this.props, state);
        if (isPropsChanged) {
            this.stopTrackMouse();
            this.setState(function (prevState) {
                var newState = __assign(__assign({}, prevState), { items: (0, utils_1.listWithChildren)(itemsNew, childrenProp), dragItem: null, isDirty: false });
                if (prevProps.collapsed !== _this.props.collapsed) {
                    newState.collapsedItems = [];
                    _this.onCollapseChange(newState.collapsedItems);
                }
                return newState;
            });
        }
    };
    Nestable.prototype.componentWillUnmount = function () {
        this.stopTrackMouse();
    };
    Nestable.prototype.moveItem = function (_a, extraProps) {
        var dragItem = _a.dragItem, pathFrom = _a.pathFrom, pathTo = _a.pathTo;
        if (extraProps === void 0) { extraProps = {}; }
        var _b = this.props, childrenProp = _b.childrenProp, confirmChange = _b.confirmChange;
        var dragItemSize = this.getItemDepth(dragItem);
        var items = this.state.items;
        // the remove action might affect the next position,
        // so update next coordinates accordingly
        var realPathTo = this.getRealNextPath(pathFrom, pathTo, dragItemSize);
        if (realPathTo.length === 0)
            return;
        // user can validate every movement
        var destinationPath = realPathTo.length > pathTo.length
            ? pathTo
            : pathTo.slice(0, -1);
        var destinationParent = this.getItemByPath(destinationPath);
        if (!confirmChange({ dragItem: dragItem, destinationParent: destinationParent }))
            return;
        var removePath = this.getSplicePath(pathFrom, {
            numToRemove: 1,
            childrenProp: childrenProp,
        });
        var insertPath = this.getSplicePath(realPathTo, {
            numToRemove: 0,
            itemsToInsert: [dragItem],
            childrenProp: childrenProp,
        });
        items = (0, react_addons_update_1.default)(items, removePath);
        items = (0, react_addons_update_1.default)(items, insertPath);
        this.setState(function (prevState) { return (__assign(__assign(__assign({}, prevState), { items: items, isDirty: true }), extraProps)); });
        if (extraProps.collapsedItems !== this.state.collapsedItems) {
            this.onCollapseChange(extraProps.collapsedItems);
        }
    };
    Nestable.prototype.tryIncreaseDepth = function (dragItem) {
        var _a = this.props, maxDepth = _a.maxDepth, idProp = _a.idProp, childrenProp = _a.childrenProp, collapsed = _a.collapsed;
        var pathFrom = this.getPathById(dragItem[idProp]);
        var itemIndex = pathFrom[pathFrom.length - 1];
        var newDepth = pathFrom.length + this.getItemDepth(dragItem);
        // has previous sibling and isn't at max depth
        if (itemIndex > 0 && newDepth <= maxDepth) {
            var prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1));
            // previous sibling is not collapsed
            if (!prevSibling[childrenProp].length || !this.checkIfCollapsed(prevSibling)) {
                var pathTo = pathFrom
                    .slice(0, -1)
                    .concat(itemIndex - 1)
                    .concat(prevSibling[childrenProp].length);
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
    };
    Nestable.prototype.tryDecreaseDepth = function (dragItem) {
        var _a = this.props, idProp = _a.idProp, childrenProp = _a.childrenProp, collapsed = _a.collapsed;
        var pathFrom = this.getPathById(dragItem[idProp]);
        var itemIndex = pathFrom[pathFrom.length - 1];
        // has parent
        if (pathFrom.length > 1) {
            var parent_2 = this.getItemByPath(pathFrom.slice(0, -1));
            // is last (by order) item in array
            if (itemIndex + 1 === parent_2[childrenProp].length) {
                var pathTo = pathFrom.slice(0, -1);
                pathTo[pathTo.length - 1] += 1;
                // if collapsed by default
                // and is last (by count) item in array
                // remove this node from list of open nodes
                var collapseProps = {};
                if (collapsed && parent_2[childrenProp].length === 1) {
                    collapseProps = this.onToggleCollapse(parent_2, true);
                }
                this.moveItem({ dragItem: dragItem, pathFrom: pathFrom, pathTo: pathTo }, collapseProps);
            }
        }
    };
    Nestable.prototype.dragApply = function () {
        var _a = this.props, onChange = _a.onChange, idProp = _a.idProp;
        var _b = this.state, items = _b.items, isDirty = _b.isDirty, dragItem = _b.dragItem;
        this.setState({
            itemsOld: null,
            dragItem: null,
            isDirty: false,
        });
        if (onChange && isDirty) {
            var targetPath = this.getPathById(dragItem[idProp], items);
            onChange({ items: items, dragItem: dragItem, targetPath: targetPath });
        }
    };
    Nestable.prototype.dragRevert = function () {
        var itemsOld = this.state.itemsOld;
        this.setState({
            items: itemsOld,
            itemsOld: null,
            dragItem: null,
            isDirty: false,
        });
    };
    // ––––––––––––––––––––––––––––––––––––
    // Getter methods
    // ––––––––––––––––––––––––––––––––––––
    Nestable.prototype.getPathById = function (id, items) {
        var _this = this;
        if (items === void 0) { items = this.state.items; }
        var _a = this.props, idProp = _a.idProp, childrenProp = _a.childrenProp;
        var path = [];
        items.every(function (item, i) {
            if (item[idProp] === id) {
                path.push(i);
            }
            else if (item[childrenProp]) {
                var childrenPath = _this.getPathById(id, item[childrenProp]);
                if (childrenPath.length) {
                    path = path.concat(i).concat(childrenPath);
                }
            }
            return path.length === 0;
        });
        return path;
    };
    Nestable.prototype.getItemByPath = function (path, items) {
        if (items === void 0) { items = this.state.items; }
        var childrenProp = this.props.childrenProp;
        var item = null;
        path.forEach(function (index) {
            var list = item ? item[childrenProp] : items;
            item = list[index];
        });
        return item;
    };
    Nestable.prototype.getSplicePath = function (path, options) {
        if (options === void 0) { options = {}; }
        var splicePath = {};
        var numToRemove = options.numToRemove || 0;
        var itemsToInsert = options.itemsToInsert || [];
        var lastIndex = path.length - 1;
        var currentPath = splicePath;
        path.forEach(function (index, i) {
            var _a;
            if (i === lastIndex) {
                currentPath.$splice = [__spreadArray([index, numToRemove], itemsToInsert, true)];
            }
            else {
                var nextPath = {};
                currentPath[index] = (_a = {}, _a[options.childrenProp] = nextPath, _a);
                currentPath = nextPath;
            }
        });
        return splicePath;
    };
    Nestable.prototype.getRealNextPath = function (prevPath, nextPath, dragItemSize) {
        var _a = this.props, childrenProp = _a.childrenProp, maxDepth = _a.maxDepth;
        var ppLastIndex = prevPath.length - 1;
        var npLastIndex = nextPath.length - 1;
        var newDepth = nextPath.length + dragItemSize - 1;
        if (prevPath.length < nextPath.length) {
            // move into depth
            var wasShifted_1 = false;
            // if new depth exceeds max, try to put after item instead of into item
            if (newDepth > maxDepth && nextPath.length) {
                return this.getRealNextPath(prevPath, nextPath.slice(0, -1), dragItemSize);
            }
            return nextPath.map(function (nextIndex, i) {
                if (wasShifted_1) {
                    return i === npLastIndex
                        ? nextIndex + 1
                        : nextIndex;
                }
                if (typeof prevPath[i] !== 'number') {
                    return nextIndex;
                }
                if (nextPath[i] > prevPath[i] && i === ppLastIndex) {
                    wasShifted_1 = true;
                    return nextIndex - 1;
                }
                return nextIndex;
            });
        }
        else if (prevPath.length === nextPath.length) {
            // if move bottom + move to item with children --> make it a first child instead of swap
            if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
                var target = this.getItemByPath(nextPath);
                if (newDepth < maxDepth &&
                    target[childrenProp] &&
                    target[childrenProp].length &&
                    !this.checkIfCollapsed(target)) {
                    return nextPath
                        .slice(0, -1)
                        .concat(nextPath[npLastIndex] - 1)
                        .concat(0);
                }
            }
        }
        return nextPath;
    };
    Nestable.prototype.getItemOptions = function () {
        var _a = this.props, renderItem = _a.renderItem, renderCollapseIcon = _a.renderCollapseIcon, handler = _a.handler, disableCollapse = _a.disableCollapse, disableDrag = _a.disableDrag, idProp = _a.idProp, childrenProp = _a.childrenProp;
        var dragItem = this.state.dragItem;
        return {
            dragItem: dragItem,
            idProp: idProp,
            childrenProp: childrenProp,
            disableCollapse: disableCollapse,
            disableDrag: disableDrag,
            renderItem: renderItem,
            renderCollapseIcon: renderCollapseIcon,
            handler: handler,
            checkIfCollapsed: this.checkIfCollapsed,
            onDragStart: this.onDragStart,
            onMouseEnter: this.onMouseEnter,
            onToggleCollapse: this.onToggleCollapse,
        };
    };
    // ––––––––––––––––––––––––––––––––––––
    // Render methods
    // ––––––––––––––––––––––––––––––––––––
    Nestable.prototype.renderDragLayer = function () {
        var _a = this.props, group = _a.group, idProp = _a.idProp;
        var dragItem = this.state.dragItem;
        var el = document.querySelector(".nestable-".concat(group, " .nestable-item-").concat(dragItem[idProp]));
        var listStyles = {};
        if (el) {
            listStyles.width = el.clientWidth;
        }
        if (this.elCopyStyles) {
            listStyles = __assign(__assign({}, listStyles), this.elCopyStyles);
        }
        var options = this.getItemOptions();
        return (react_1.default.createElement("div", { className: "nestable-drag-layer" },
            react_1.default.createElement("ol", { className: "nestable-list", style: listStyles },
                react_1.default.createElement(NestableItem_1.default, { item: dragItem, options: options, isCopy: true }))));
    };
    Nestable.prototype.render = function () {
        var _a = this.props, group = _a.group, className = _a.className, idProp = _a.idProp;
        var _b = this.state, items = _b.items, dragItem = _b.dragItem;
        var options = this.getItemOptions();
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(className, 'nestable', "nestable-".concat(group), { 'is-drag-active': dragItem }) },
            react_1.default.createElement("ol", { className: "nestable-list" }, items.map(function (item, i) {
                return (react_1.default.createElement(NestableItem_1.default, { key: item[idProp], index: i, item: item, options: options }));
            })),
            dragItem && this.renderDragLayer()));
    };
    Nestable.defaultProps = {
        childrenProp: 'children',
        collapsed: false,
        confirmChange: function () { return true; },
        disableCollapse: false,
        disableDrag: false,
        group: Math.random().toString(36).slice(2),
        idProp: 'id',
        items: [],
        maxDepth: 10,
        onChange: function () { },
        onCollapseChange: function () { },
        onDragEnd: function () { },
        onDragStart: function () { },
        renderItem: function (_a) {
            var item = _a.item;
            return String(item);
        },
        threshold: 30,
    };
    return Nestable;
}(react_1.Component));
exports.default = Nestable;
//# sourceMappingURL=Nestable.js.map