/// <reference types="react-addons-update" />
import React, { Component, CSSProperties } from 'react';
import { NestableProps, NestableState, NestableItemOptions, Item, Collapse } from '../types';
declare class Nestable extends Component<NestableProps, NestableState> {
    el: Element | null;
    elCopyStyles: CSSProperties | null;
    mouse: {
        last: {
            x: number;
        };
        shift: {
            x: number;
        };
    };
    constructor(props: NestableProps);
    static defaultProps: Partial<NestableProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: NestableProps): void;
    componentWillUnmount(): void;
    collapse: Collapse;
    startTrackMouse: () => void;
    stopTrackMouse: () => void;
    moveItem({ dragItem, pathFrom, pathTo }: {
        dragItem: Item;
        pathFrom: number[];
        pathTo: number[];
    }, extraProps?: Partial<NestableState>): void;
    tryIncreaseDepth(dragItem: Item): void;
    tryDecreaseDepth(dragItem: Item): void;
    dragApply(): void;
    dragRevert(): void;
    getPathById(id: unknown, items?: Item[]): number[];
    getItemByPath(path: number[], items?: Item[]): Item;
    getItemDepth: (item: Item) => number;
    getSplicePath(path: number[], options?: {
        numToRemove?: number;
        itemsToInsert?: Item[];
        childrenProp?: NestableProps['childrenProp'];
    }): React.UpdateSpecPath;
    getRealNextPath(prevPath: number[], nextPath: number[], dragItemSize: number): number[];
    getItemOptions(): NestableItemOptions;
    checkIfCollapsed: (item: Item) => boolean;
    onDragStart: (e: MouseEvent, item: Item) => void;
    onDragEnd: (e: MouseEvent | null, isCancel?: boolean) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseEnter: (e: MouseEvent, item: Item) => void;
    onToggleCollapse: (item: Item, isGetter?: true) => {
        collapsedItems: unknown[];
    };
    onCollapseChange: (ids: NestableState['collapsedItems']) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    renderDragLayer(): React.JSX.Element;
    render(): React.JSX.Element;
}
export default Nestable;
