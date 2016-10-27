This project was bootstrapped by [primetwig](mailto:primetwig@gmail.com).

## Table of Contents

- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

## Installation

`npm install -save react-nestable`

## Demo

[Demo](https://primetwig.github.io/react-nestable/dist/)

## Usage

```
import Nestable from 'react-nestable';
```
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
every item must have unique `id` in order to distinguish elements
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
| threshold | Int | `30` | Amount of pixels which mouse should move horisontaly before increasing/decreasing level (nesting) of current element. |
| maxDepth | Int | `10` | Maximum available level of nesting. |
| group | Int | `0` | Different group numbers are required if you have more than one nestable component on a page. |
| childrenProp | String | `"children"` | Optional name of property with children. |
| renderItem | function | `({ item }) => item.toString()` | Function for rendering every item. Has a single parameter with keys: `item` - item from your array, `collapseIcon` - icon of item which has children (you may toggle collapsing of children by clicking on this icon). |
| onChange | function | `() => {}` | Callback which has two parameters: `items` - new array after position was changed, `item` - item which was moved. |

## License

ISC

Any help is appreciated.
