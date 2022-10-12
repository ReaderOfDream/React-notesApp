import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from '../../node_modules/react-dnd';
import { DragItemTypes } from '../common/constants';

class DraggableTargetNotice extends React.Component {
  render() {
    const { connectDropTarget, isOver, children } = this.props;

    return connectDropTarget(
      <div style={{ display: 'inline-block' }} className={isOver ? 'noteItemDragTarget' : ''}>
        {React.Children.only(children)}
      </div>,
    );
  }
}

DraggableTargetNotice.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const noticeListTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.notice.position !== props.position) {
      const newNotice = Object.assign({}, item.notice);
      newNotice.position = props.position;
      props.onPositionChanged(newNotice);
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget(DragItemTypes.NOTICE, noticeListTarget, collect)(DraggableTargetNotice);
