import React, { PureComponent } from 'react';
import { NestableItemProps, NestableItemOptions } from '../types';
declare class NestableItem extends PureComponent<NestableItemProps> {
    static defaultProps: Partial<NestableItemProps>;
    renderCollapseIcon: NestableItemOptions['renderCollapseIcon'];
    onMouseEnter: (e: MouseEvent) => void;
    onDragStart: (e: MouseEvent) => void;
    render(): React.JSX.Element;
}
export default NestableItem;
