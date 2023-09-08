export const objectType = (obj: unknown) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
export const isDefined = (param: unknown) => typeof param !== "undefined";
export const isUndefined = (param: unknown) => typeof param === "undefined";
export const isFunction = (param: unknown) => typeof param === "function";
export const isNumber = (param: unknown) => typeof param === "number" && !isNaN(param);
export const isString = (param: unknown) => objectType(param) === "String";
export const isArray = (param: unknown) => objectType(param) === "Array";

// closest(e.target, '.field')
export const closest = (target: Element | null, selector: string) => {
  while (target) {
    if (target.matches && target.matches(selector)) return target;
    target = target.parentNode as Element;
  }
  return null;
};

export const getOffsetRect = (elem: Element) => {
  // (1)
  const box = elem.getBoundingClientRect();
  const body = document.body;
  const docElem = document.documentElement;

  // (2)
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  // (3)
  const clientTop = docElem.clientTop || body.clientTop || 0;
  const clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // (4)
  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

export const getTotalScroll = (elem: Element) => {
  let top = 0;
  let left = 0;

  while ((elem = elem.parentNode as Element)) {
    top += elem.scrollTop || 0;
    left += elem.scrollLeft || 0;
  }

  return { top, left };
};

export const getTransformProps = (x: number, y: number) => {
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

export const listWithChildren = <T extends Record<string, unknown>>(
  list: T[],
  childrenProp: string,
): T[] => {
  return list.map(item => {
    return {
      ...item,
      [childrenProp]: item[childrenProp]
        ? listWithChildren(item[childrenProp] as T[], childrenProp)
        : []
    };
  });
};

export const getAllNonEmptyNodesIds = <T extends Record<string, unknown>>(
  items: T[],
  { idProp, childrenProp }: { idProp: string, childrenProp: string },
) => {
  let childrenIds: unknown[] = [];
  let ids = items
    .filter(item => (item[childrenProp] as T[])?.length)
    .map(item => {
      childrenIds = childrenIds.concat(
        getAllNonEmptyNodesIds(
          item[childrenProp] as T[],
          { idProp, childrenProp }
        )
      );
      return item[idProp];
    });

  return ids.concat(childrenIds);
};
