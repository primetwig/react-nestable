import { ReactNode } from 'react';

// -------------------------
// Props and state
// -------------------------
export interface NestableProps {
  childrenProp?: string;
  className?: string;
  collapsed?: boolean;
  confirmChange?: ConfirmChange;
  disableCollapse?: boolean;
  disableDrag?: boolean | DisableDragFn;
  group?: number | string;
  handler?: ReactNode;
  idProp?: string;
  items?: Item[];
  maxDepth?: number;
  onChange?: OnChange;
  onCollapseChange?: OnCollapseChange;
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
  itemsOld: Item[] | null; // snap copy in case of canceling the dragging
}

export type Item = Record<string, any>;

export type ConfirmChange = (
  options: {
    dragItem: Item;
    destinationParent: Item | null;
  }
) => boolean;

export type DisableDragFn = (
  options: {
    item: Item;
    index: number;
    depth: number;
  }
) => boolean;

export type OnChange = (
  options: {
    items: Item[];
    dragItem: Item;
    targetPath: number[];
  }
) => void;

export type OnCollapseChange = (
  options:
    | { openIds?: NestableState['collapsedItems'] }
    | { closedIds?: NestableState['collapsedItems'] }
) => void;

export type OnDragStart = (
  options: {
    dragItem: Item;
  }
) => void;

export type OnDragEnd = VoidFunction;

export type RenderCollapseIcon = (
  options: {
    isCollapsed: boolean;
    item: Item;
  }
) => ReactNode;

export type RenderItem = (
  options: {
    item: Item;
    index: number;
    depth: number;
    isDraggable: boolean;
    collapseIcon: ReactNode;
    handler: ReactNode;
  }
) => ReactNode;

// -------------------------
// Public methods
// -------------------------
export type CollapseCondition = 'NONE' | 'ALL' | unknown[];

export type Collapse = (condition: CollapseCondition) => void;

// -------------------------
// NestableItem
// -------------------------
export interface NestableItemProps {
  item: Item;
  options: NestableItemOptions;
  isCopy?: boolean;
  index?: number;
  depth?: number;
}

export interface NestableItemOptions {
  dragItem: Item | null;
  idProp: NestableProps['idProp'];
  childrenProp: NestableProps['childrenProp'];
  disableCollapse: NestableProps['disableCollapse'];
  disableDrag: NestableProps['disableDrag'];
  renderItem: NestableProps['renderItem'];
  renderCollapseIcon: NestableProps['renderCollapseIcon'];
  handler: NestableProps['handler'];

  checkIfCollapsed: (item: Item) => boolean;
  onDragStart: (e: MouseEvent, item: Item) => void;
  onMouseEnter: (e: MouseEvent, item: Item) => void;
  onToggleCollapse: (item: Item, isGetter?: true) => void;
}

// -------------------------
// Icon
// -------------------------
export interface IconProps {
  children?: ReactNode;
  className?: string;
  isCollapsed?: boolean;
}
