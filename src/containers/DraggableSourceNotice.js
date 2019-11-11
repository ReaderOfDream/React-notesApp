import React from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { DragItemTypes } from '../common/constants';

const DraggableSourceNotice = (props) => {
  const { connectDragSource, isDragging, children } = props;

  const opt = {
    opacity: isDragging ? 0.5 : 1,
    fontSize: 25,
    fontWeight: 'bold',
    cursor: 'move',
  };

  const inner = (
    <div>
      {React.Children.only(children)}
    </div>
  );

  return (
    <div {...opt}>
      {connectDragSource(inner)}
    </div>
  );
};

const noticeSource = {
  beginDrag(props) {
    return {
      notice: props.notice,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

DraggableSourceNotice.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default DragSource(DragItemTypes.NOTICE, noticeSource, collect)(DraggableSourceNotice);
