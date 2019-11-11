import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import TreeItemComponent from './TreeItemComponent';
import { DirectoriesList } from '../common/shared-styles';

export default class TreeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIdEditing: null,
      isOperationInProgress: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      isOperationInProgress
    } = prevState;

    const res = {
      isOperationInProgress: nextProps.isOperationInProgress
    }

    if (!nextProps.isOperationInProgress && isOperationInProgress) {
      res.itemIdEditing = null
    }

    return res;
  }

    createNode = (node) => {
      const { selectedDirectoryId, newDirectoryParentId, isOperationInProgress } = this.props;
      const { itemIdEditing } = this.state;
      const props = {
        root: this,
        createNode: this.createNode,
        selectedDirectoryId,
        onAddCompleted: this.onAddTreeItemCallback,
        onEditCompleted: this.onEditTreeItemCallback,
        onCanceled: this.onAddingCanceledCallback,
        newDirectoryParentId,
        isOperationInProgress,
        itemIdEditing,
      };

      return React.cloneElement(node, props);
    }

    onSelect = (id) => {
      this.props.onSelect(id); // eslint-disable-line react/destructuring-assignment
    }

    onAddTreeItemCallback = (name) => {
      const { newDirectoryParentId, onAdd } = this.props;
      onAdd(name, newDirectoryParentId);
    }

    onEditTreeItemCallback = (item) => {
      this.props.onEdit(item); // eslint-disable-line react/destructuring-assignment
    }

    onAddingCanceledCallback = () => {
      const { onchangeNewDirectoryParentId } = this.props;

      this.setState({
        itemIdEditing: null,
      });

      onchangeNewDirectoryParentId(null);
    }

    removeItem = (e, data) => {
      this.props.onDelete(data.id); // eslint-disable-line react/destructuring-assignment
    }

    addItem = (e, data) => {
      data.node.onCollapseClicked();
      this.props.onchangeNewDirectoryParentId(data.id); // eslint-disable-line 
    }

    editItem = (e, data) => {
      this.setState({
        itemIdEditing: data.id,
      });
    }

    createTreeItemComponent = item => (item && item.children ? (
      <TreeItemComponent item={item} key={item.id}>
        {item.children.map(this.createTreeItemComponent)}
      </TreeItemComponent>)
      : (<TreeItemComponent item={item} key={item.id} />))

    render() {
      const { items, newDirectoryParentId, rootDirectoryId } = this.props;
      const treeItems = items && items.length > 0
        ? items.map(this.createTreeItemComponent)
        : [];

      return (
        <div>
          <DirectoriesList>
            {treeItems.map(this.createNode)}
            {(newDirectoryParentId === rootDirectoryId)
                && this.createNode((<TreeItemComponent key={0} />))
            }
          </DirectoriesList>
          <ContextMenu id="contextMenu">
            <MenuItem onClick={this.addItem}>Add</MenuItem>
            <MenuItem onClick={this.editItem}>Edit</MenuItem>
            <MenuItem onClick={this.removeItem}>Remove</MenuItem>
          </ContextMenu>
        </div>);
    }
}

TreeComponent.defaultProps = {
  newDirectoryParentId: null,
  selectedDirectoryId: null,
};

TreeComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  newDirectoryParentId: PropTypes.number,
  onchangeNewDirectoryParentId: PropTypes.func.isRequired,
  selectedDirectoryId: PropTypes.number,
  rootDirectoryId: PropTypes.number.isRequired,
  isOperationInProgress: PropTypes.bool.isRequired,
};
