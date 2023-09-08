import { ReactNode } from 'react';
export interface NestableProps {
    childrenProp?: string;
    className?: string;
    collapsed?: boolean;
    confirmChange?: ConfirmChange;
    group?: number | string;
    handler?: ReactNode;
    idProp?: string;
    items?: Item[];
    maxDepth?: number;
    onChange?: OnChange;
    onDragEnd?: OnDragEnd;
    onDragStart?: OnDragStart;
    renderCollapseIcon?: RenderCollapseIcon;
    renderItem?: RenderItem;
    threshold?: number;
}
export interface NestableState {
    collapsedItems: unknown[];
    dragItem: Item | null;
    isDirty: boolean;
    items: Item[];
    itemsOld: Item[] | null;
}
export type Item = Record<string, any>;
export type ConfirmChange = (options: {
    dragItem: Item;
    destinationParent: Item | null;
}) => boolean;
export type OnChange = (options: {
    items: Item[];
    dragItem: Item;
    targetPath: number[];
}) => void;
export type OnDragStart = (options: {
    dragItem: Item;
}) => void;
export type OnDragEnd = VoidFunction;
export type RenderCollapseIcon = (options: {
    isCollapsed: boolean;
}) => ReactNode;
export type RenderItem = (options: {
    item: Item;
    index: number;
    depth: number;
    collapseIcon: ReactNode;
    handler: ReactNode;
}) => ReactNode;
export type CollapseCondition = 'NONE' | 'ALL' | unknown[];
export type Collapse = (condition: CollapseCondition) => void;
export interface NestableItemProps {
    item: Item;
    options: NestableItemOptions;
    isCopy?: boolean;
    index?: number;
    depth?: number;
}
export interface NestableItemOptions {
    dragItem: Item;
    idProp: NestableProps['idProp'];
    childrenProp: NestableProps['childrenProp'];
    renderItem: NestableProps['renderItem'];
    renderCollapseIcon: NestableProps['renderCollapseIcon'];
    handler: NestableProps['handler'];
    checkIfCollapsed: (item: Item) => boolean;
    onDragStart: (e: MouseEvent, item: Item) => void;
    onMouseEnter: (e: MouseEvent, item: Item) => void;
    onToggleCollapse: (item: Item, isGetter?: true) => void;
}
export interface IconProps {
    children?: ReactNode;
    className?: string;
    isCollapsed?: boolean;
}
