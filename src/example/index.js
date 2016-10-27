import React, { Component } from 'react';
import { render } from 'react-dom';
import Nestable from 'Nestable';

const styles = {
    padding:    "20px 15px",
    fontSize:   "20px",
    border:     "1px solid #f9fafa",
    background: "#f9fafa",
    cursor:     "pointer"
};

class ComponentName extends Component {
    renderItem = ({ item, collapseIcon }) => {
        return (
            <div style={styles}>
                {collapseIcon}
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
                text: 'Lisa'
            }
        ];

        return (
            <div>
                <h2>Basic example</h2>

                <Nestable
                    items={items}
                    renderItem={this.renderItem}
                />
            </div>
        );
    }
}

render(
    <ComponentName />,
    document.getElementById('app')
);