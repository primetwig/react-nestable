import React, { Component } from 'react';
import { render } from 'react-dom';
import Nestable from '../Nestable';

const styles = {
    position:   "relative",
    padding:    "10px 15px",
    fontSize:   "20px",
    border:     "1px solid #f9fafa",
    background: "#f9fafa",
    cursor:     "pointer"
};
const handlerStyles = {
    position:   "absolute",
    top:        0,
    left:       0,
    width:      "10px",
    height:     "100%",
    background: "steelblue",
    cursor:     "pointer"
};

class ComponentName extends Component {
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

    renderItem = ({ item, collapseIcon, handler, index }) => {
        return (
            <div style={styles}>
                {handler}
                {collapseIcon}
                {index !== undefined ? `${index + 1}. ` : null}
                {item.text}
            </div>
        );
    };

    render() {
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

        const handler = <span style={handlerStyles} />;

        return (
            <div>
                <a href="https://github.com/primetwig/react-nestable">
                    <img
                        style={{position: 'fixed', top: 0, right: 0, border: 0}}
                        src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
                        alt="Fork me on GitHub"
                    />
                </a>
                <h1>React Nestable</h1>

                <hr/>
                <h2>Basic example</h2>

                <Nestable
                    group="0"
                    items={items}
                    collapsed={this.isCollapsed()}
                    renderItem={this.renderItem}
                    ref={el => this.refNestable = el}
                />

                <br/>
                <button type="button" onClick={e => this.collapse(0)}>Expand all</button>
                <button type="button" onClick={e => this.collapse(1)}>Collapse all</button>
                <button type="button" onClick={e => this.collapse(2)}>Collapse Harry only</button>
                <form style={{ display: "inline-block" }}>
                    <label>
                        <input type="checkbox" name="collapsed" onChange={e => this.setState({})} />
                        Collapsed by default
                    </label>
                </form>

                <br/><br/><hr/><br/>

                <h2>Example with handlers</h2>

                <Nestable
                    group="1"
                    items={items}
                    renderItem={this.renderItem}
                    handler={handler}
                />
            </div>
        );
    }
}

render(
    <ComponentName />,
    document.getElementById('app')
);