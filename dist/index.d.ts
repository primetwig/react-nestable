declare module 'react-nestable' {
    import * as React from 'react';

    export type Item = {
        id: string;
        text: string;
        children?: Item[];
        nestedIn?: string | null;
        link?: string | null;
        type?: number;
    };
    export default class Nestable extends React.Component<{
        items: Item[];
        handler?: React.ReactNode;
        renderItem: (arg: {
            item: Item;
            collapseIcon: React.ReactNode;
            index: number;
            handler: React.ReactNode;
        }) => React.ReactNode;
        maxDepth?: number;
        renderCollapseIcon?: (args: { isCollapsed: boolean }) => React.ReactNode;
        onChange?: (items: Item[]) => void;
        confirmChange?: (dragItem: Item, destinationParent: Item) => boolean;
    }> { }
}
