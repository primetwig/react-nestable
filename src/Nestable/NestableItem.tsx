import React, { PureComponent } from 'react';
import cx from 'classnames';

import Icon from '../Icon';
import { NestableItemProps, NestableItemOptions, Item } from '../types';

class NestableItem extends PureComponent<NestableItemProps> {
  static defaultProps: Partial<NestableItemProps> = {
    depth: 0,
  };

  renderCollapseIcon: NestableItemOptions['renderCollapseIcon'] = ({ isCollapsed }) => (
    <Icon
      className="nestable-item-icon"
      isCollapsed={isCollapsed}
    />
  );

  onMouseEnter = (e: MouseEvent) => {
    const { item, options } = this.props;

    return options.onMouseEnter(e, item);
  };

  onDragStart = (e: MouseEvent) => {
    const { item, options } = this.props;

    return options.onDragStart(e, item);
  };

  render() {
    const { item, isCopy, options, index, depth } = this.props;
    const {
      dragItem,
      renderItem,
      handler,
      disableCollapse,
      disableDrag,
      idProp,
      childrenProp,
      checkIfCollapsed,
      renderCollapseIcon = this.renderCollapseIcon,
    } = options;

    const isCollapsed = checkIfCollapsed(item);
    const isDragging = !isCopy && dragItem && dragItem[idProp] === item[idProp];
    const hasChildren = item[childrenProp] && item[childrenProp].length > 0;
    let isDraggable = true;

    let rowProps = {};
    let handlerProps = {};
    let wrappedHandler;

    if (!isCopy) {
      if (dragItem) {
        rowProps = {
          ...rowProps,
          onMouseEnter: this.onMouseEnter,
        };
      } else {
        if (typeof disableDrag === 'function') {
          isDraggable = disableDrag({ item, index, depth });
        } else if (typeof disableDrag !== 'undefined') {
          isDraggable = !disableDrag;
        }

        if (isDraggable) {
          handlerProps = {
            ...handlerProps,
            draggable: true,
            onDragStart: this.onDragStart,
          };
        }
      }
    }

    if (handler) {
      wrappedHandler = <span className="nestable-item-handler" {...handlerProps}>{handler}</span>;
      // wrappedHandler = React.cloneElement(handler, handlerProps);
    } else {
      rowProps = {
        ...rowProps,
        ...handlerProps,
      };
    }

    const handleCollapseIconClick = disableCollapse
      ? undefined :
      () => options.onToggleCollapse(item);

    const collapseIcon = hasChildren
      ? (
        <span onClick={handleCollapseIconClick}>
          {renderCollapseIcon({ isCollapsed, item })}
        </span>
      )
      : null;

    const baseClassName = `nestable-item${isCopy ? '-copy' : ''}`;
    const itemProps = {
      className: cx(
          baseClassName,
          `${baseClassName}-${item[idProp]}`,
          {
            'is-dragging': isDragging,
            [`${baseClassName}--with-children`]: hasChildren,
            [`${baseClassName}--children-open`]: hasChildren && !isCollapsed,
            [`${baseClassName}--children-collapsed`]: hasChildren && isCollapsed,
            [`${baseClassName}--children-no-collapse`]: hasChildren && disableCollapse,
          },
      ),
    };

    const content = renderItem({
      collapseIcon,
      depth,
      handler: wrappedHandler,
      index,
      isDraggable,
      item,
    });

    if (!content) return null;

    return (
      <li {...itemProps}>
        <div className="nestable-item-name" {...rowProps}>
          {content}
        </div>

        {hasChildren && !isCollapsed && (
          <ol className="nestable-list">
            {(item[childrenProp] as Item[]).map((item, i) => {
              return (
                <NestableItem
                  key={i}
                  index={i}
                  depth={depth + 1}
                  item={item}
                  options={options}
                  isCopy={isCopy}
                />
              );
            })}
          </ol>
        )}
      </li>
    );
  }
}

export default NestableItem;
