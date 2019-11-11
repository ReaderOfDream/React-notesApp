import Tooltip from 'rc-tooltip';
import React from 'react';
import PropTypes from 'prop-types';

const TooltipWrapper = (props) => {
  const { text, children } = props;
  return (
    <Tooltip
      placement="topRight"
      trigger={['hover']}
      overlay={<span className="tooltip">{text}</span>}
    >
      {React.Children.only(children)}
    </Tooltip>);
};

TooltipWrapper.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TooltipWrapper;
