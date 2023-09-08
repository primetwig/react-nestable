import React, { PureComponent } from 'react';
import cx from 'classnames';

import { IconProps } from '../types';

class Icon extends PureComponent<IconProps> {
  render() {
    const { children, className, isCollapsed, ...props } = this.props;
    const finalClassName = cx('nestable-icon', className, {
      'nestable-icon--plus-gray': isCollapsed,
      'nestable-icon--minus-gray': !isCollapsed,
    });

    return (
      <i className={finalClassName} {...props} />
    );
  }
}

export default Icon;
