import React, { Component } from 'react';
import cn from 'classnames';

import './Icon.css';

class Icon extends Component {
    render() {
        const { children, className, ...props } = this.props;

        return (
            <i className={cn("icon", className)} {...props} />
        );
    }
}

export default Icon;