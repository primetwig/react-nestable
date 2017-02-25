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
```
every item must have unique `id` in order to distinguish elements
```
const items = [
    { id: 0, text: 'Andy' },
    {
      id: 1, text: 'Harry',
      children: [{ id: 2, text: 'David' }]
    },
    { id: 3, text: 'Lisa' }
];

const renderItem = ({ item }) => {
    return item.text;
};
```
```
<Nestable
    items={items}
    renderItem={renderItem}
/>
```

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | Array | `[]` | Array of items. Every item must be of shape `{ id: @uniq }`. |
| threshold | Int | `30` | Amount of pixels which mouse should move horizontally before increasing/decreasing level (nesting) of current element. |
| maxDepth | Int | `10` | Maximum available level of nesting. |
| collapsed | Boolean | `false` | Are groups collapsed by default. |
| group | String or Int | `0` | Different group numbers are required if you have more than one nestable component on a page. |
| handler | Component | | If you pass react component here, you may use it in your render method. |
| childrenProp | String | `"children"` | Optional name of property with children. |
| renderItem | function | `({ item }) => item.toString()` | Function for rendering every item. Has a single parameter with keys: `item` - item from your array, `collapseIcon` - icon for items with children (allows you to collapse group), `handler` - component which you have passed via the same property, but covered with some additional events. |
| onChange | function | `() => {}` | Callback which has two parameters: `items` - new array after position was changed, `item` - item which was moved. |

#### Public methods

| Method | Accepts | Description |
|--------|---------|-------------|
| collapse | String or Array | `"NONE"` - expand all groups; `"ALL"` - collapse all groups; `[]` - collapse all groups with ids from given array |

## Todo

- add touch
- cover with tests

PS: Please, make an issue or drop me a letter if you need any more functionality.

## License

ISC
