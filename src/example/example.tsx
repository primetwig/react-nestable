import React, { ChangeEvent, CSSProperties, Component } from 'react';
import { createRoot } from 'react-dom/client';

import Nestable, { NestableProps } from '../index';
import '../styles/index.css';

const styles: CSSProperties = {
  position: "relative",
  padding: "10px 15px",
  fontSize: "20px",
  border: "1px solid #f9fafa",
  background: "#f9fafa",
  cursor: "pointer",
};

const handlerStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "10px",
  height: "100%",
  background: "steelblue",
  cursor: "pointer",
};

const names = [
  { id: 0, text: 'Andy' },
  {
    id: 1,
    text: 'Harry',
    children: [{ id: 2, text: 'David' }],
  },
  {
    id: 3,
    text: 'Lisa',
    children: [{ id: 4, text: 'Richard' }],
  },
];

const grocery = [
  { id: 0, text: 'Apples', type: 'fruits' },
  {
    id: 1,
    text: 'Fruit box',
    type: 'box',
    accepts: ['fruits'],
    children: [{ id: 2, text: 'Bananas', type: 'fruits' }],
  },
  {
    id: 3,
    text: 'Box',
    type: 'box',
    accepts: ['fruits', 'sweets'],
    children: [{ id: 4, text: 'Candy', type: 'sweets' }],
  },
];

class Example extends Component {
  refNestable: Nestable | undefined;

  state = {
    example: 0,
    defaultCollapsed: false,
    isCollapsingAllowed: true,
    isDraggingAllowed: true,
  };

  collapse = (collapseCase: 0 | 1 | 2) => {
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
    const form = document.querySelector('form');
    const checkbox = form?.querySelector<HTMLInputElement>('input[type=checkbox]');
    return checkbox?.checked;
  };

  toggleDefaultCollapsed = () => {
    const { defaultCollapsed } = this.state;
    this.setState({ defaultCollapsed: !defaultCollapsed });
  };

  toggleCollapsingAllowed = () => {
    const { isCollapsingAllowed } = this.state;
    this.setState({ isCollapsingAllowed: !isCollapsingAllowed });
  };

  toggleDraggingAllowed = () => {
    const { isDraggingAllowed } = this.state;
    this.setState({ isDraggingAllowed: !isDraggingAllowed });
  };

  renderItem: NestableProps['renderItem'] = ({ item, collapseIcon, handler }) => {
    const { isDraggingAllowed } = this.state;

    return (
      <div style={isDraggingAllowed ? styles : { ...styles, cursor: 'inherit' }}>
        {handler}
        {collapseIcon}
        {item.text}
      </div>
    );
  };

  renderExampleOne = (title: string) => {
    const { defaultCollapsed, isCollapsingAllowed, isDraggingAllowed } = this.state;

    return (
      <div>
        <h2>{title}</h2>
        <Nestable
          items={names}
          collapsed={defaultCollapsed}
          disableCollapse={!isCollapsingAllowed}
          disableDrag={!isDraggingAllowed}
          renderItem={this.renderItem}
          ref={el => this.refNestable = el}
        />

        <br/>
        <button type="button" onClick={() => this.collapse(0)}>Expand all</button>
        <button type="button" onClick={() => this.collapse(1)}>Collapse all</button>
        <button type="button" onClick={() => this.collapse(2)}>Collapse Harry only</button>
        <form style={{ display: "inline-block" }}>
          <label>
            <input type="checkbox" onChange={this.toggleDefaultCollapsed}/>
            Collapsed by default
          </label>
          <label>
            <input type="checkbox" onChange={this.toggleCollapsingAllowed}/>
            Is collapsing allowed
          </label>
          <label>
            <input type="checkbox" onChange={this.toggleDraggingAllowed}/>
            Is dragging allowed
          </label>
        </form>
      </div>
    );
  };

  renderExampleTwo = (title: string) => {
    return (
      <div>
        <h2>{title}</h2>
        <Nestable
          items={names}
          renderItem={this.renderItem}
          handler={<span style={handlerStyles} />}
        />
      </div>
    );
  };

  confirmChange: NestableProps['confirmChange'] = ({ dragItem, destinationParent }) => {
    // move to root level
    if (!destinationParent) return true;

    return (destinationParent.accepts || []).indexOf(dragItem.type) > -1;
  };

  renderExampleThree = (title: string) => {
    return (
      <div>
        <h2>{title}</h2>
        <Nestable
          items={grocery}
          renderItem={this.renderItem}
          confirmChange={this.confirmChange}
        />
      </div>
    );
  };

  getExamples = () => {
    return [
      { title: 'Basic example', renderer: this.renderExampleOne },
      { title: 'Example with handlers', renderer: this.renderExampleTwo },
      { title: 'Example with confirmChange', renderer: this.renderExampleThree },
    ]
  }

  onExampleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ example: +e.target.value });
  };

  render() {
    const { example } = this.state;
    const examples = this.getExamples();

    return (
      <div>
        <select onChange={this.onExampleChange} value={example}>
          {examples.map(({ title }, i) => (
            <option key={i} value={i}>{title}</option>
          ))}
        </select>

        <hr/>

        {examples[example].renderer(examples[example].title)}
      </div>
    );
  }
}

createRoot(document.getElementById('app')).render(<Example />);
