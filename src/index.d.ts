declare module 'react-nestable' {
  import * as React from 'react';

  export type Item = Record<string, any>;

  export default class Nestable extends React.Component<{
    childrenProp?: string;
    className?: string;
    collapsed?: boolean;
    confirmChange?: (
      arg: {
        dragItem: Item;
        destinationParent: Item | null;
      }
    ) => boolean;
    group?: number | string;
    handler?: React.ReactNode;
    idProp?: string;
    items?: Item[];
    maxDepth?: number;
    onChange?: (
      arg: {
        items: Item[];
        dragItem: Item;
        targetPath: number[];
      }
    ) => void;
    renderCollapseIcon?: (
      arg: {
        isCollapsed: boolean
      }
    ) => React.ReactNode;
    renderItem?: (
      arg: {
        collapseIcon: React.ReactNode;
        depth: number;
        handler: React.ReactNode;
        index: number;
        item: Item;
      }
    ) => React.ReactNode;
    threshold?: number;
  }> {}
}
