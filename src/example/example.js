import React, { Component } from 'react';
import { render } from 'react-dom';
import Nestable from '../Nestable';

const styles = {
  position: "relative",
  padding: "10px 15px",
  fontSize: "20px",
  border: "1px solid #f9fafa",
  background: "#f9fafa",
  cursor: "pointer"
};
const handlerStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "10px",
  height: "100%",
  background: "steelblue",
  cursor: "pointer"
};

const items = [
  {
    id: 0,
    text: 'Andy'
  },
  {
    id: 1,
    text: 'Harry',
    children: [
      {
        id: 2,
        text: 'David'
      }
    ]
  },
  {
    id: 3,
    text: 'Lisa',
    children: [
      {
        id: 4,
        text: 'Richard'
      }
    ]
  }
];

const grocery = [
  {
    id: 0,
    text: 'Apples',
    type: 'fruits'
  },
  {
    id: 1,
    text: 'Fruit box',
    accepts: ['fruits'],
    children: [
      {
        id: 2,
        text: 'Bananas',
        type: 'fruits'
      }
    ]
  },
  {
    id: 3,
    text: 'Box',
    accepts: ['fruits', 'sweets'],
    children: [
      {
        id: 4,
        text: 'Candy',
        type: 'sweets'
      }
    ]
  }
];

class Example extends Component {
  state = {
    example: 1,
    defaultCollapsed: false
  };

  collapse = (collapseCase) => {
    if (this.refNestable) {
      switch (collapseCase) {
        case 0:
          this.refNestable.collapse('NONE');
          break;
        case 1:
          this.refNestable.collapse('ALL');
          break;
        case 2:
          this.refNestable.collapse([1]);
          break;
      }
    }
  };

  isCollapsed = () => {
    const form = document.forms[0] || null;

    return form && form.elements["collapsed"].checked;
  };

  renderItem = ({ item, collapseIcon, handler }) => {
    return (
      <div style={styles}>
        {handler}
        {collapseIcon}
        {item.text}
      </div>
    );
  };

  renderExampleOne = () => {
    const { defaultCollapsed } = this.state;
    const onDefaultCollapsed = () => this.setState({
      defaultCollapsed: !defaultCollapsed
    });

    return (
      <div>
        <h2>Basic example</h2>

        <Nestable
          items={items}
          collapsed={defaultCollapsed}
          renderItem={this.renderItem}
          ref={el => this.refNestable = el}
        />

        <br/>
        <button type="button" onClick={() => this.collapse(0)}>Expand all</button>
        <button type="button" onClick={() => this.collapse(1)}>Collapse all</button>
        <button type="button" onClick={() => this.collapse(2)}>Collapse Harry only</button>
        <form style={{ display: "inline-block" }}>
          <label>
            <input type="checkbox" name="collapsed" onChange={onDefaultCollapsed}/>
            Collapsed by default
          </label>
        </form>
      </div>
    );
  };

  renderExampleTwo = () => {
    return (
      <div>
        <h2>Example with handlers</h2>

        <Nestable
          items={items}
          renderItem={this.renderItem}
          handler={<span style={handlerStyles}/>}
        />
      </div>
    );
  };

  confirmChange = (dragItem, destinationParent) => {
    // move to root level
    if (!destinationParent) return true;

    return (destinationParent.accepts || []).indexOf(dragItem.type) > -1;
  };

  renderExampleThree = () => {
    return (
      <div>
        <h2>Example with confirmChange</h2>

        <Nestable
          items={grocery}
          renderItem={this.renderItem}
          confirmChange={this.confirmChange}
        />
      </div>
    );
  };

  render() {
    const { example } = this.state;
    const onExampleChange = e => this.setState({ example: +e.target.value });

    return (
      <div>
        <select onChange={onExampleChange} value={example}>
          <option value={1}>Basic example</option>
          <option value={2}>Example with handlers</option>
          <option value={3}>Example with confirmChange</option>
        </select>

        <hr/>

        {example === 1 && this.renderExampleOne()}
        {example === 2 && this.renderExampleTwo()}
        {example === 3 && this.renderExampleThree()}
      </div>
    );
  }
}

render(
  <Example />,
  document.getElementById('app')
);