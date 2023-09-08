export declare const objectType: (obj: unknown) => any;
export declare const isDefined: (param: unknown) => boolean;
export declare const isUndefined: (param: unknown) => boolean;
export declare const isFunction: (param: unknown) => boolean;
export declare const isNumber: (param: unknown) => boolean;
export declare const isString: (param: unknown) => boolean;
export declare const isArray: (param: unknown) => boolean;
export declare const closest: (target: Element | null, selector: string) => Element;
export declare const getOffsetRect: (elem: Element) => {
    top: number;
    left: number;
};
export declare const getTotalScroll: (elem: Element) => {
    top: number;
    left: number;
};
export declare const getTransformProps: (x: number, y: number) => {
    transform: string;
};
export declare const listWithChildren: <T extends Record<string, unknown>>(list: T[], childrenProp: string) => T[];
export declare const getAllNonEmptyNodesIds: <T extends Record<string, unknown>>(items: T[], { idProp, childrenProp }: {
    idProp: string;
    childrenProp: string;
}) => unknown[];
