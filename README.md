## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Todo](#todo)
- [License](#license)

## Demo

[Demo](https://primetwig.github.io/react-nestable/dist/example/)


## Installation

```
npm install -save react-nestable
```

## Usage

```
import Nestable from 'react-nestable';

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import 'react-nestable/dist/styles/index.css';

// every item must have a unique `id`
// in order to distinguish elements
const items = [
  { id: 0, text: 'Andy' },
  {
    id: 1, text: 'Harry',
    children: [
      { id: 2, text: 'David' }
    ]
  },
  { id: 3, text: 'Lisa' }
];

const renderItem = ({ item }) => item.text;

const Example = () => (
  <Nestable
    items={items}
    renderItem={renderItem}
  />
);
```

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| childrenProp | string | `"children"` | Name of a property for children. |
| className | string | `undefined` | Extra class name which can be passed to a root element. |
| collapsed | boolean | `false` | Makes groups collapsed by default. |
| confirmChange | function | `() => true` | Callback which has a single parameter with keys: `dragItem` - item which is being dragged, `destinationParent` - item where dragItem is about to land (or `null` if moving to root). Let function return `false` if this movement should not happen. |
| disableCollapse | boolean | `false` | Disable toggling a collapsed state of items with children. If you need to set a specific initial state, then it is still possible to do so with the public method `collapse`. |
| disableDrag | boolean or function | `false` | Disable dragging. Pass boolean to apply to all items. Pass a callback to target individual items. It has a single parameter with keys: `item` - item from your array, `index` - number, index of the item, `depth` - number, depth of the item. |
| group | string or number | `random string` | Different group names may be passed if you have more than one nestable component on a page and want some extra styles for portal instances. |
| handler | node | `undefined` | If you pass it, it will get wrapped with drag handlers and you may use it in your render method. |
| idProp | string | `"id"` | Name of a property for id. |
| items | array | `[]` | Array of items. Every item must be of shape `{id: @uniq}` to distinguish elements. |
| maxDepth | number | `10` | Maximum available level of nesting. |
| onChange | function | `() => {}` | Callback which has a single parameter with keys: `items` - new array after position was changed, `dragItem` - item which has been moved, `targetPath` - array of numbers, those numbers are indices and they make path to a location, to where item has been moved. |
| onCollapseChange | function | `() => {}` | Callback which has a single parameter with one of two possible keys: `openIds` - array of ids which are open if `collapsed` is set to `ture`, or `closedIds` - array of ids which are closed if `collapsed` is set to `false`. **Note:** this callback is triggered not only when user explicitly opens or closes an item, but when implicit events happen as well, like when the only child of open item is moved out. |
| onDragEnd | function | `() => {}` | Callback which has no parameters. It is invoked when dragging ends via drop or cancel. |
| onDragStart | function | `() => {}` | Callback which has a single parameter with keys: `dragItem` - item which has been moved. |
| renderCollapseIcon | function | `() => <DefaultIcon />` | Function for rendering collapse icon. Has a single parameter with keys: `isCollapsed` - boolean, `true` if this group has children and is collapsed, `item` - item from your array. |
| renderItem | function | `({item}) => String(item)` | Function for rendering every item. Has a single parameter with keys: `item` - item from your array, `index` - number, index of the item, `depth` - number, depth of the item, `collapseIcon` - node, icon for items with children (allows you to collapse the group), `handler` - node, which you have passed via the same property, but wrapped with some additional events, `isDraggable` - boolean, tells if dragging is allowed for this item (see `disableDrag` prop for details). |
| threshold | number | `30` | Amount of pixels which mouse should move horizontally before increasing/decreasing level (nesting) of current element. |

#### Public methods

| Method | Accepts | Description |
|--------|---------|-------------|
| collapse | string or array | `"NONE"` - expand all groups; `"ALL"` - collapse all groups; `[]` - collapse all groups with ids from given array. |

## Todo

- add touch
- cover with tests

PS: Please, make an issue or create a PR if you need any more functionality.

## License

ISC
