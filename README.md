This project was bootstrapped by [primetwig](mailto:primetwig@gmail.com).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

## Installation

`npm install -save-dev react-nestable`

## Usage

```
import Nestable from 'react-nestable';

const items = [
    { id: 0, text: 'Andy' },
    { id: 1, text: 'Harry' },
    { id: 2, text: 'Lisa' }
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

... list of options will be here ...

## License

ISC

Any help is appreciated.
