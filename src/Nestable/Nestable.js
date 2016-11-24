import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import update from 'react-addons-update';
import cn from 'classnames';

import { isArray, closest, getOffsetRect, listWithChildren } from '../utils';

import './Nestable.css';
import NestableItem from './NestableItem';

class Nestable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:           [],
            dragItem:        null,
            isDirty:         false,
            collapsedGroups: []
        };

        this.elCopyStyles = null;
        this.mouse = {
            last:  { x: 0 },
            shift: { x: 0 }
        };
    };

    static propTypes = {
        items:        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.any.isRequired
            })
        ),
        threshold:    PropTypes.number,
        maxDepth:     PropTypes.number,
        childrenProp: PropTypes.string,
        renderItem:   PropTypes.func,
        onChange:     PropTypes.func
    };
    static defaultProps = {
        items:        [],
        threshold:    30,
        maxDepth:     10,
        group:        0,
        childrenProp: 'children',
        renderItem:   ({ item }) => item.toString(),
        onChange:     () => {}
    };

    componentDidMount() {
        let { items } = this.props;

        // make sure every item has property 'children'
        items = listWithChildren(items);

        this.setState({ items });
    }

    componentWillReceiveProps(nextProps) {
        const { items: itemsNew } = nextProps;
        const isPropsUpdated = shallowCompare({ props: this.props, state: {} }, nextProps, {});

        if (isPropsUpdated) {
            this.stopTrackMouse();

            this.setState({
                items:    listWithChildren(itemsNew),
                dragItem: null,
                isDirty:  false
            });
        }
    }

    componentWillUnmount() {
        this.stopTrackMouse();
    }

    // ––––––––––––––––––––––––––––––––––––
    // Public Methods
    // ––––––––––––––––––––––––––––––––––––
    collapse = (itemIds) => {
        const { childrenProp } = this.props;
        const { items } = this.state;

        if (itemIds == 'NONE') {
            this.setState({
                collapsedGroups: []
            });

        } else if (itemIds == 'ALL') {
            this.setState({
                collapsedGroups: items.filter(item => item[childrenProp].length).map(item => item.id)
            });

        } else if ( isArray(itemIds) ) {
            const groups = items
                .filter(item => item[childrenProp].length && itemIds.indexOf(item.id))
                .map(item => item.id);

            this.setState({
                collapsedGroups: groups
            });
        }
    };

    // ––––––––––––––––––––––––––––––––––––
    // Methods
    // ––––––––––––––––––––––––––––––––––––
    startTrackMouse = () => {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onDragEnd);
    };

    stopTrackMouse = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onDragEnd);
        this.elCopyStyles = null;
    };

    moveItem({ dragItem, pathFrom, pathTo }) {
        const { childrenProp } = this.props;
        let { items } = this.state;

        // the remove action might affect the next position,
        // so update next coordinates accordingly
        const realPathTo = this.getRealNextPath(pathFrom, pathTo);


        const removePath = this.getSplicePath(pathFrom, {
            numToRemove: 1,
            childrenProp: childrenProp
        });

        const insertPath = this.getSplicePath(realPathTo, {
            numToRemove: 0,
            itemsToInsert: [dragItem],
            childrenProp: childrenProp
        });

        items = update(items, removePath);
        items = update(items, insertPath);

        this.setState({
            items,
            isDirty: true
        });
    }

    tryIncreaseDepth(dragItem) {
        const { maxDepth, childrenProp } = this.props;
        const { collapsedGroups } = this.state;
        const pathFrom = this.getPathById(dragItem.id);
        const itemIndex = pathFrom[pathFrom.length - 1];
        const newDepth = pathFrom.length + this.getItemDepth(dragItem);

        // has previous sibling and isn't at max depth
        if (itemIndex > 0 && newDepth <= maxDepth) {
            const prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1));

            // previous sibling is not collapsed
            if (collapsedGroups.indexOf(prevSibling.id) == -1) {
                const pathTo = pathFrom
                    .slice(0, -1)
                    .concat(itemIndex - 1)
                    .concat(prevSibling[childrenProp].length);

                this.moveItem({ dragItem, pathFrom, pathTo });
            }
        }
    }

    tryDecreaseDepth(dragItem) {
        const { childrenProp } = this.props;
        const pathFrom = this.getPathById(dragItem.id);
        const itemIndex = pathFrom[pathFrom.length - 1];

        // has parent
        if (pathFrom.length > 1) {
            const parent = this.getItemByPath(pathFrom.slice(0, -1));

            // is last item in array
            if (itemIndex + 1 == parent[childrenProp].length) {
                let pathTo = pathFrom.slice(0, -1);
                pathTo[pathTo.length - 1] += 1;

                this.moveItem({ dragItem, pathFrom, pathTo });
            }
        }
    }

    // ––––––––––––––––––––––––––––––––––––
    // Getter methods
    // ––––––––––––––––––––––––––––––––––––
    getTransformProps(x, y) {
        return {
            transform: 'translate('+ x +'px, '+ y +'px)'
        };
    }

    getPathById(id, items = this.state.items) {
        const { childrenProp } = this.props;
        let path = [];

        items.every((item, i) => {
            if (item.id === id) {
                path.push(i);
            } else if (item[childrenProp]) {
                const childrenPath = this.getPathById(id, item[childrenProp]);

                if (childrenPath.length) {
                    path = path.concat(i).concat(childrenPath);
                }
            }

            return path.length == 0;
        });

        return path;
    }

    getItemByPath(path, items = this.state.items) {
        const { childrenProp } = this.props;
        let item = null;

        path.forEach((index, i) => {
            const list = item ? item[childrenProp] : items;
            item = list[index];
        });

        return item;
    }

    /*getItemById(id, items = this.state.items) {
        const { childrenProp } = this.props;
        let item = null;

        items.forEach((index, i) => {
            const list = item ? item[childrenProp] : items;
            item = list[index];
        });

        return item;
    }*/

    getItemDepth = (item) => {
        const { childrenProp } = this.props;
        let level = 1;

        if (item[childrenProp].length > 0) {
            const childrenDepths = item[childrenProp].map(this.getItemDepth);
            level += Math.max(childrenDepths)
        }

        return level;
    };

    getSplicePath(path, options = {}) {
        const splicePath = {};
        const numToRemove = options.numToRemove || 0;
        const itemsToInsert = options.itemsToInsert || [];
        const lastIndex = path.length - 1;
        let currentPath = splicePath;

        path.forEach((index, i) => {
            if (i === lastIndex) {
                currentPath.$splice = [[index, numToRemove, ...itemsToInsert]];
            } else {
                const nextPath = {};
                currentPath[index] = { [options.childrenProp]: nextPath };
                currentPath = nextPath;
            }
        });

        return splicePath;
    }

    getRealNextPath(prevPath, nextPath) {
        const { childrenProp } = this.props;
        const { collapsedGroups } = this.state;
        const ppLastIndex = prevPath.length - 1;
        const npLastIndex = nextPath.length - 1;

        if (prevPath.length < nextPath.length) {
            // move into deep
            let wasShifted = false;

            return nextPath.map((nextIndex, i) => {
                if (wasShifted) {
                    return i == npLastIndex
                        ? nextIndex + 1
                        : nextIndex;
                }

                if (typeof prevPath[i] !== 'number') {
                    return nextIndex;
                }

                if (nextPath[i] > prevPath[i] && i == ppLastIndex) {
                    wasShifted = true;
                    return nextIndex - 1;
                }

                return nextIndex;
            });

        } else if (prevPath.length == nextPath.length) {
            // if move bottom + move to item with children => make it a first child instead of swap
            if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
                const target = this.getItemByPath(nextPath);

                if (target[childrenProp] && target[childrenProp].length && collapsedGroups.indexOf(target.id) == -1) {
                    return nextPath
                        .slice(0, -1)
                        .concat(nextPath[npLastIndex] - 1)
                        .concat(0);
                }
            }
        }

        return nextPath;
    }

    getItemOptions() {
        const { renderItem, handler, childrenProp } = this.props;
        const { dragItem, collapsedGroups } = this.state;

        return {
            dragItem,
            collapsedGroups,
            childrenProp,
            renderItem,
            handler,

            onDragStart:      this.onDragStart,
            onMouseEnter:     this.onMouseEnter,
            onToggleCollapse: this.onToggleCollapse
        };
    }

    // ––––––––––––––––––––––––––––––––––––
    // Click handlers or event handlers
    // ––––––––––––––––––––––––––––––––––––
    onDragStart = (e, item) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.startTrackMouse();
        this.onMouseMove(e);

        this.setState({
            dragItem: item
        });
    };

    onDragEnd = (e) => {
        e && e.preventDefault();

        const { onChange } = this.props;
        const { items, isDirty, dragItem } = this.state;

        this.stopTrackMouse();

        this.setState({
            dragItem: null,
            isDirty: false
        });

        onChange && isDirty && onChange(items, dragItem);
    };

    onMouseMove = (e) => {
        const { group, threshold } = this.props;
        const { dragItem } = this.state;
        const { target, clientX, clientY } = e;
        const el = closest(target, '.nestable-item');
        const elCopy = document.querySelector('.nestable-'+ group +' .nestable-drag-layer > .nestable-list');

        if (!this.elCopyStyles) {
            const offset = getOffsetRect(el);
            const scroll = {
                top:  document.body.scrollTop,
                left: document.body.scrollLeft
            };

            this.elCopyStyles = {
                marginTop:  offset.top - clientY - scroll.top,
                marginLeft: offset.left - clientX - scroll.left,
                transform:  this.getTransformProps(clientX, clientY).transform
            };

        } else {
            this.elCopyStyles.transform = this.getTransformProps(clientX, clientY).transform;
            elCopy.style.transform = this.elCopyStyles.transform;

            const diffX = clientX - this.mouse.last.x;
            if (
                (diffX >= 0 && this.mouse.shift.x >= 0) ||
                (diffX <= 0 && this.mouse.shift.x <= 0)
            ) {
                this.mouse.shift.x += diffX;
            } else {
                this.mouse.shift.x = 0;
            }
            this.mouse.last.x = clientX;

            if (Math.abs(this.mouse.shift.x) > threshold) {
                if (this.mouse.shift.x > 0) {
                    this.tryIncreaseDepth(dragItem);
                } else {
                    this.tryDecreaseDepth(dragItem);
                }

                this.mouse.shift.x = 0;
            }
        }
    };

    onMouseEnter = (e, item) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const { dragItem } = this.state;
        if (dragItem.id === item.id) return;

        const pathFrom = this.getPathById(dragItem.id);
        const pathTo = this.getPathById(item.id);

        this.moveItem({ dragItem, pathFrom, pathTo });
    };

    onToggleCollapse = (item) => {
        const { collapsedGroups } = this.state;
        const index = collapsedGroups.indexOf(item.id);

        if (index > -1) {
            this.setState({
                collapsedGroups: collapsedGroups.filter(id => id != item.id)
            });
        } else {
            this.setState({
                collapsedGroups: collapsedGroups.concat(item.id)
            });
        }
    };

    // ––––––––––––––––––––––––––––––––––––
    // Render methods
    // ––––––––––––––––––––––––––––––––––––
    renderDragLayer() {
        const { group } = this.props;
        const { dragItem } = this.state;
        const el = document.querySelector('.nestable-'+ group +' .nestable-item-' + dragItem.id);

        let listStyles = {
            width: el.clientWidth
        };
        if (this.elCopyStyles) {
            listStyles = {
                ...listStyles,
                ...this.elCopyStyles
            };
        }

        const options = this.getItemOptions();

        return (
            <div className="nestable-drag-layer">
                <ol className="nestable-list" style={listStyles}>
                    <NestableItem
                        item={dragItem}
                        options={options}
                        isCopy
                    />
                </ol>
            </div>
        );
    }

    render() {
        const { items, dragItem } = this.state;
        const { group } = this.props;
        const options = this.getItemOptions();

        return (
            <div className={cn("nestable", "nestable-" + group, { 'is-drag-active': dragItem })}>
                <ol className="nestable-list nestable-group">
                    {items.map((item, i) => {
                        return (
                            <NestableItem
                                key={i}
                                item={item}
                                options={options}
                            />
                        );
                    })}
                </ol>

                {dragItem && this.renderDragLayer()}
            </div>
        );
    }
}

export default Nestable;