export const closest = (target, selector) => {
    // closest(e.target, '.field')
    while (target) {
        if (target.matches && target.matches(selector)) return target;
        target = target.parentNode;
    }
    return null;
};

export const getOffsetRect = (elem) => {
    // (1)
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    // (4)
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
};

export const listWithChildren = (list) => {
    return list.map(item => {
        return {
            ...item,
            children: item.children
                          ? listWithChildren(item.children)
                          : []
        };
    });
};