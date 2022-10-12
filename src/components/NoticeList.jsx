import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
import DraggableTarget from '../containers/DraggableTargetNotice';
import NoticeListItem from '../containers/NoticeListItem';

class NoticeList extends React.Component {
  wrapWithDraggable = (comp, notice) => {
    const { onPositionChanged } = this.props;
    return (
      <DraggableTarget
        id={notice.id}
        key={notice.id}
        position={notice.position}
        onPositionChanged={onPositionChanged}
      >
        {comp}
      </DraggableTarget>);
  }

  renderItem = (notice) => {
    const { canDrag } = this.props;
    return <NoticeListItem id={notice.id} canDrag={canDrag} key={notice.id} notice={notice} />;
  }

  renderItem2 = (notice) => {
    const { canDrag } = this.props;
    return canDrag
      ? this.wrapWithDraggable(this.renderItem(notice), notice)
      : this.renderItem(notice);
  }

  render() {
    const { notices } = this.props;
    const sortedNotices = notices.sort((a, b) => a.position > b.position);
    return (
      <Container>
        <List>
          {sortedNotices.map(notice => (
            <Item id={notice.id} key={notice.id}>
              {this.renderItem2(notice)}
            </Item>
          ))}
        </List>
      </Container>
    );
  }
}

const Container = styled.div`
padding: 15px;
`;

const List = styled.ul`
list-style-type: none;
padding: 0px;
`;

const Item = styled.li`
display: inline;
`;

NoticeList.defaultProps = {
  notices: [],
};

NoticeList.defaultProps = {
  onPositionChanged: null,
};

NoticeList.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.object),
  canDrag: PropTypes.bool.isRequired,
  onPositionChanged: PropTypes.func,
};

export default DragDropContext(HTML5Backend)(NoticeList);
