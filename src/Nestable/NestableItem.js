import React, { Component } from 'react';
import cn from 'classnames';

import Icon from '../Icon';

class NestableItem extends Component {
    render() {
        const { item, isCopy, options } = this.props;
        const { dragItem, collapsedGroups, renderItem, handler, childrenProp } = options;
        const { onDragStart, onMouseEnter, onToggleCollapse } = options;

        const isDragging = !isCopy && dragItem && dragItem.id === item.id;
        const hasChildren = item[childrenProp] && item[childrenProp].length > 0;
        const isCollapsed = collapsedGroups.indexOf(item.id) > -1;

        let Handler;

        let itemProps = {
            className:    cn(
                "nestable-item" + (isCopy ? '-copy' : ''),
                "nestable-item" + (isCopy ? '-copy' : '') + '-' + item.id,
                {
                    'is-dragging': isDragging
                }
            )
        };

        let rowProps = {};
        let handlerProps = {};
        if (!isCopy) {
            if (dragItem) {
                rowProps = {
                    ...rowProps,
                    onMouseEnter: (e) => onMouseEnter(e, item)
                };
            } else {
                handlerProps = {
                    ...handlerProps,
                    draggable:   true,
                    onDragStart: (e) => onDragStart(e, item)
                };
            }
        }

        if (handler) {
            Handler = <span className="nestable-item-handler" {...handlerProps}>{handler}</span>;
            //Handler = React.cloneElement(handler, handlerProps);
        } else {
            rowProps = {
                ...rowProps,
                ...handlerProps
            };
        }

        const collapseIcon = hasChildren ? (
            <Icon
                className={cn("nestable-item-icon", isCollapsed ? "icon-plus-gray" : "icon-minus-gray")}
                onClick={e => onToggleCollapse(item)}
            />
        ) : '';

        return (
            <li {...itemProps}>
                <div className="nestable-item-name" {...rowProps}>
                    {renderItem({ item, collapseIcon, handler: Handler })}
                </div>

                {hasChildren && !isCollapsed && (
                    <ol className="nestable-list">
                        {item[childrenProp].map((item, i) => {
                            return (
                                <NestableItem
                                    key={i}
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