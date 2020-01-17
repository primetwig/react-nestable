import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Icon.css';

class Icon extends Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, className, ...props } = this.props;

    return (
      <i className={cn('nestable-icon', className)} {...props} />
    );
  }
}

Icon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Icon;