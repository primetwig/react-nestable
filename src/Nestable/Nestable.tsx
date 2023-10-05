import React, { Component, CSSProperties, UpdateSpec, UpdateSpecPath } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import update from 'react-addons-update';
import cx from 'classnames';

import {
  isArray,
  closest,
  getOffsetRect,
  getTotalScroll,
  getTransformProps,
  listWithChildren,
  getAllNonEmptyNodesIds,
} from '../utils';
import { NestableProps, NestableState, NestableItemOptions, Item, Collapse } from '../types';

import NestableItem from './NestableItem';

class Nestable extends Component<NestableProps, NestableState> {
  el: Element | null = null;
  elCopyStyles: CSSProperties | null = null;
  mouse = {
    last: { x: 0 },
    shift: { x: 0 },
  };

  constructor(props: NestableProps) {
    super(props);
    this.state = {
      items: [],
      itemsOld: null,
      dragItem: null,
      isDirty: false,
      collapsedItems: [],
    };
  }

  static defaultProps: Partial<NestableProps> = {
    childrenProp: 'children',
    collapsed: false,
    confirmChange: () => true,
    disableCollapse: false,
    disableDrag: false,
    group: Math.random().toString(36).slice(2),
    idProp: 'id',
    items: [],
    maxDepth: 10,
    onChange: () => {},
    onCollapseChange: () => {},
    onDragEnd: () => {},
    onDragStart: () => {},
    renderItem: ({ item }) => String(item),
    threshold: 30,
  };

  componentDidMount() {
    let { items, childrenProp } = this.props;

    // make sure every item has property 'children'
    items = listWithChildren(items, childrenProp);

    this.setState({ items });
  }

  componentDidUpdate(prevProps: NestableProps){
    const { props: { items: itemsNew, childrenProp }, state } = this;
    const isPropsChanged = shallowCompare({ ...this, props: prevProps, state }, this.props, state);

    if (isPropsChanged) {
      this.stopTrackMouse();

      this.setState(prevState => {
        const newState: NestableState = {
          ...prevState,
          items: listWithChildren(itemsNew, childrenProp),
          dragItem: null,
          isDirty: false,
        };

        if (prevProps.collapsed !== this.props.collapsed) {
          newState.collapsedItems = [];
          this.onCollapseChange(newState.collapsedItems);
        }

        return newState;
      });
    }
  }

  componentWillUnmount() {
    this.stopTrackMouse();
  }

  // ––––––––––––––––––––––––––––––––––––
  // Public Methods
  // ––––––––––––––––––––––––––––––––––––
  collapse: Collapse = (itemIds) => {
    const { idProp, childrenProp, collapsed } = this.props;
    const { items } = this.state;

    if (itemIds === 'NONE') {
      this.setState({
        collapsedItems: collapsed
          ? getAllNonEmptyNodesIds(items, {idProp, childrenProp})
          : [],
      });

    } else if (itemIds === 'ALL') {
      this.setState({
        collapsedItems: collapsed
          ? []
          : getAllNonEmptyNodesIds(items, {idProp, childrenProp}),
      });

    } else if (isArray(itemIds)) {
      this.setState({
        collapsedItems: getAllNonEmptyNodesIds(items, {idProp, childrenProp})
          .filter(id => (itemIds.indexOf(id) > -1) !== collapsed),
      });
    }
  };

  // ––––––––––––––––––––––––––––––––––––
  // Methods
  // ––––––––––––––––––––––––––––––––––––
  startTrackMouse = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onDragEnd);
    document.addEventListener('keydown', this.onKeyDown);
  };

  stopTrackMouse = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('keydown', this.onKeyDown);
    this.elCopyStyles = null;
  };

  moveItem(
    { dragItem, pathFrom, pathTo }: { dragItem: Item, pathFrom: number[], pathTo: number[] },
    extraProps: Partial<NestableState> = {},
  ) {
    const { childrenProp, confirmChange } = this.props;
    const dragItemSize = this.getItemDepth(dragItem);
    let { items } = this.state;

    // the remove action might affect the next position,
    // so update next coordinates accordingly
    const realPathTo = this.getRealNextPath(pathFrom, pathTo, dragItemSize);

    if (realPathTo.length === 0) return;

    // user can validate every movement
    const destinationPath = realPathTo.length > pathTo.length
      ? pathTo
      : pathTo.slice(0, -1);
    const destinationParent = this.getItemByPath(destinationPath);
    if (!confirmChange({dragItem, destinationParent})) return;

    const removePath = this.getSplicePath(pathFrom, {
      numToRemove: 1,
      childrenProp,
    });

    const insertPath = this.getSplicePath(realPathTo, {
      numToRemove: 0,
      itemsToInsert: [dragItem],
      childrenProp,
    });

    items = update(items, removePath);
    items = update(items, insertPath);

    this.setState(prevState => ({
      ...prevState,
      items,
      isDirty: true,
      ...extraProps
    }));

    if (extraProps.collapsedItems !== this.state.collapsedItems) {
      this.onCollapseChange(extraProps.collapsedItems);
    }
  }

  tryIncreaseDepth(dragItem: Item) {
    const { maxDepth, idProp, childrenProp, collapsed } = this.props;
    const pathFrom = this.getPathById(dragItem[idProp]);
    const itemIndex = pathFrom[pathFrom.length - 1];
    const newDepth = pathFrom.length + this.getItemDepth(dragItem);

    // has previous sibling and isn't at max depth
    if (itemIndex > 0 && newDepth <= maxDepth) {
      const prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1));

      // previous sibling is not collapsed
      if (!prevSibling[childrenProp].length || !this.checkIfCollapsed(prevSibling)) {
        const pathTo = pathFrom
          .slice(0, -1)
          .concat(itemIndex - 1)
          .concat(prevSibling[childrenProp].length);

        // if collapsed by default
        // and was no children here
        // open this node
        let collapseProps = {};
        if (collapsed && !prevSibling[childrenProp].length) {
          collapseProps = this.onToggleCollapse(prevSibling, true);
        }

        this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps);
      }
    }
  }

  tryDecreaseDepth(dragItem: Item) {
    const { idProp, childrenProp, collapsed } = this.props;
    const pathFrom = this.getPathById(dragItem[idProp]);
    const itemIndex = pathFrom[pathFrom.length - 1];

    // has parent
    if (pathFrom.length > 1) {
      const parent = this.getItemByPath(pathFrom.slice(0, -1));

      // is last (by order) item in array
      if (itemIndex + 1 === parent[childrenProp].length) {
        let pathTo = pathFrom.slice(0, -1);
        pathTo[pathTo.length - 1] += 1;

        // if collapsed by default
        // and is last (by count) item in array
        // remove this node from list of open nodes
        let collapseProps = {};
        if (collapsed && parent[childrenProp].length === 1) {
          collapseProps = this.onToggleCollapse(parent, true);
        }

        this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps);
      }
    }
  }

  dragApply() {
    const { onChange, idProp } = this.props;
    const { items, isDirty, dragItem } = this.state;

    this.setState({
      itemsOld: null,
      dragItem: null,
      isDirty: false,
    });

    if (onChange && isDirty) {
      const targetPath = this.getPathById(dragItem[idProp], items)
      onChange({items, dragItem, targetPath});
    }
  }

  dragRevert() {
    const { itemsOld } = this.state;

    this.setState({
      items: itemsOld,
      itemsOld: null,
      dragItem: null,
      isDirty: false,
    });
  }

  // ––––––––––––––––––––––––––––––––––––
  // Getter methods
  // ––––––––––––––––––––––––––––––––––––
  getPathById(id: unknown, items = this.state.items) {
    const { idProp, childrenProp } = this.props;
    let path: number[] = [];

    items.every((item, i) => {
      if (item[idProp] === id) {
        path.push(i);
      } else if (item[childrenProp]) {
        const childrenPath = this.getPathById(id, item[childrenProp]);

        if (childrenPath.length) {
          path = path.concat(i).concat(childrenPath);
        }
      }

      return path.length === 0;
    });

    return path;
  }

  getItemByPath(path: number[], items = this.state.items) {
    const { childrenProp } = this.props;
    let item: Item | null = null;

    path.forEach(index => {
      const list = item ? item[childrenProp] : items;
      item = list[index];
    });

    return item;
  }

  getItemDepth = (item: Item) => {
    const { childrenProp } = this.props;
    let level = 1;

    if (item[childrenProp].length > 0) {
      const childrenDepths = item[childrenProp].map(this.getItemDepth);
      level += Math.max(...childrenDepths);
    }

    return level;
  };

  getSplicePath(
    path: number[],
    options: {
      numToRemove?: number;
      itemsToInsert?: Item[];
      childrenProp?: NestableProps['childrenProp'];
    } = {},
  ) {
    const splicePath: UpdateSpecPath = {};
    const numToRemove = options.numToRemove || 0;
    const itemsToInsert = options.itemsToInsert || [];
    const lastIndex = path.length - 1;
    let currentPath = splicePath;

    path.forEach((index, i) => {
      if (i === lastIndex) {
        currentPath.$splice = [[index, numToRemove, ...itemsToInsert]] as UpdateSpec;
      } else {
        const nextPath = {};
        currentPath[index] = { [options.childrenProp]: nextPath };
        currentPath = nextPath;
      }
    });

    return splicePath;
  }

  getRealNextPath(prevPath: number[], nextPath: number[], dragItemSize: number): number[] {
    const { childrenProp, maxDepth } = this.props;
    const ppLastIndex = prevPath.length - 1;
    const npLastIndex = nextPath.length - 1;
    const newDepth = nextPath.length + dragItemSize - 1;

    if (prevPath.length < nextPath.length) {
      // move into depth
      let wasShifted = false;

      // if new depth exceeds max, try to put after item instead of into item
      if (newDepth > maxDepth && nextPath.length) {
        return this.getRealNextPath(prevPath, nextPath.slice(0, -1), dragItemSize);
      }

      return nextPath.map((nextIndex, i) => {
        if (wasShifted) {
          return i === npLastIndex
            ? nextIndex + 1
            : nextIndex;
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
        const target = this.getItemByPath(nextPath);

        if (
            newDepth < maxDepth &&
            target[childrenProp] &&
            target[childrenProp].length &&
            !this.checkIfCollapsed(target)
        ) {
          return nextPath
            .slice(0, -1)
            .concat(nextPath[npLastIndex] - 1)
            .concat(0);
        }
      }
    }

    return nextPath;
  }

  getItemOptions(): NestableItemOptions {
    const {
      renderItem,
      renderCollapseIcon,
      handler,
      disableCollapse,
      disableDrag,
      idProp,
      childrenProp,
    } = this.props;
    const { dragItem } = this.state;

    return {
      dragItem,
      idProp,
      childrenProp,
      disableCollapse,
      disableDrag,
      renderItem,
      renderCollapseIcon,
      handler,

      checkIfCollapsed: this.checkIfCollapsed,
      onDragStart: this.onDragStart,
      onMouseEnter: this.onMouseEnter,
      onToggleCollapse: this.onToggleCollapse,
    };
  }

  checkIfCollapsed = (item: Item) => {
    const { collapsed, idProp } = this.props;
    const { collapsedItems } = this.state;

    return !!((collapsedItems.indexOf(item[idProp]) > -1) !== collapsed);
  };

  // ––––––––––––––––––––––––––––––––––––
  // Click handlers or event handlers
  // ––––––––––––––––––––––––––––––––––––
  onDragStart = (e: MouseEvent, item: Item) => {
    const { onDragStart } = this.props;

    e.preventDefault();
    e.stopPropagation();

    if (!(e.target instanceof Element)) return;

    this.el = closest(e.target, '.nestable-item');

    this.startTrackMouse();
    this.onMouseMove(e);
    onDragStart({dragItem: item});

    this.setState({
      dragItem: item,
      itemsOld: this.state.items,
    });
  };

  onDragEnd = (e: MouseEvent | null, isCancel?: boolean) => {
    const { onDragEnd } = this.props;

    e?.preventDefault();

    this.stopTrackMouse();
    this.el = null;
    onDragEnd();

    isCancel
      ? this.dragRevert()
      : this.dragApply();
  };

  onMouseMove = (e: MouseEvent) => {
    const { group, threshold } = this.props;
    const { dragItem } = this.state;
    const { clientX, clientY } = e;
    const transformProps = getTransformProps(clientX, clientY);
    const elCopy = document.querySelector<HTMLElement>(`.nestable-${group} .nestable-drag-layer > .nestable-list`);

    if (!this.elCopyStyles) {
      const offset = getOffsetRect(this.el);
      const scroll = getTotalScroll(this.el);

      this.elCopyStyles = {
        marginTop: offset.top - clientY - scroll.top,
        marginLeft: offset.left - clientX - scroll.left,
        ...transformProps
      };

    } else {
      this.elCopyStyles = {
        ...this.elCopyStyles,
        ...transformProps
      };
      Object.keys(transformProps).forEach((key: keyof typeof transformProps) => {
        elCopy.style[key] = transformProps[key];
      });

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

  onMouseEnter = (e: MouseEvent, item: Item) => {
    e.preventDefault();
    e.stopPropagation();

    const { collapsed, idProp, childrenProp } = this.props;
    const { dragItem } = this.state;
    if (dragItem[idProp] === item[idProp]) return;

    const pathFrom = this.getPathById(dragItem[idProp]);
    const pathTo = this.getPathById(item[idProp]);

    // if collapsed by default
    // and move out the only child
    // remove parent node from list of open nodes
    let collapseProps = {};
    if (collapsed && pathFrom.length > 1) {
      const parent = this.getItemByPath(pathFrom.slice(0, -1));
      if (parent[childrenProp].length === 1) {
        collapseProps = this.onToggleCollapse(parent, true);
      }
    }

    this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps);
  };

  onToggleCollapse = (item: Item, isGetter?: true) => {
    const { collapsed, idProp } = this.props;
    const { collapsedItems } = this.state;
    const isCollapsed = this.checkIfCollapsed(item);

    const newState = {
      collapsedItems: (isCollapsed !== collapsed)
        ? collapsedItems.filter(id => id !== item[idProp])
        : collapsedItems.concat(item[idProp]),
    };

    if (isGetter) {
      return newState;
    } else {
      this.setState(newState);
      this.onCollapseChange(newState.collapsedItems);
    }
  };

  onCollapseChange = (ids: NestableState['collapsedItems']) => {
    const { collapsed, onCollapseChange } = this.props;

    onCollapseChange(collapsed ? { openIds: ids } : { closedIds: ids });
  };

  onKeyDown = (e: KeyboardEvent) => {
    if (e.which === 27) {
      // ESC
      this.onDragEnd(null, true);
    }
  };

  // ––––––––––––––––––––––––––––––––––––
  // Render methods
  // ––––––––––––––––––––––––––––––––––––
  renderDragLayer() {
    const { group, idProp } = this.props;
    const { dragItem } = this.state;
    const el = document.querySelector(`.nestable-${group} .nestable-item-${dragItem[idProp]}`);

    let listStyles: CSSProperties = {};
    if (el) {
      listStyles.width = el.clientWidth;
    }
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
    const { group, className, idProp } = this.props;
    const { items, dragItem } = this.state;
    const options = this.getItemOptions();

    return (
      <div className={cx(className, 'nestable', `nestable-${group}`, { 'is-drag-active': dragItem })}>
        <ol className="nestable-list">
          {items.map((item, i) => {
            return (
              <NestableItem
                key={item[idProp]}
                index={i}
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
