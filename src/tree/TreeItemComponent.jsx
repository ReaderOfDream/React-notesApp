import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import PropTypes from 'prop-types';
import TextInput from '../components/TextInput';
import { hasItemWithIdInTree } from '../common/utils';
import { DirectoriesList } from '../common/shared-styles';

export default class TreeItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.selectedDirectoryId || !props.item || !props.item.children) {
      return null;
    }

    if (props.selectedDirectoryId === props.item.id) {
      return null;
    }

    return {
      isOpened: state.isOpened
        || hasItemWithIdInTree(props.selectedDirectoryId, props.item, i => i.children, i => i.id),
    };
  }

    onSelect = (e) => {
      const { selectedDirectoryId, item, root } = this.props;
      const unSelect = selectedDirectoryId === item.id;
      root.onSelect(unSelect ? null : item.id);
      e.stopPropagation();
    }

    onCollapseClicked = (e) => {
      this.setState(prevState => ({
        isOpened: !prevState.isOpened,
      }));

      if (e) {
        e.stopPropagation();
      }
    }

    onInputCompleted = (name) => {
      const { item, onEditCompleted, onAddCompleted } = this.props;
      this.setState({
        isOpened: true,
      });

      return item && item.id
        ? onEditCompleted({ id: item.id, name, parentId: item.parentId })
        : onAddCompleted(name);
    }


    getEditingItem() {
      const { item, isOperationInProgress, onCanceled } = this.props;
      const name = item ? item.name : '';
      return (
        <TextInput
          text={name}
          isOperationInProgress={isOperationInProgress}
          onInputCompleted={this.onInputCompleted}
          onInputCanceled={onCanceled}
        />
      );
    }

    collectContextMenuData = props => ({
      id: props.itemId,
      node: this,
    })

    getBaseItem = () => {
      const {
        newDirectoryParentId, selectedDirectoryId, item: propsItem, children: propsChildren,
      } = this.props;
      let { isOpened } = this.state;
      const opt = { className: 'list-group-item' };
      if (propsItem && selectedDirectoryId === propsItem.id) {
        opt.className += ' selected';
      }

      isOpened = isOpened || newDirectoryParentId === propsItem.id;

      return (
        <div {...opt}>
          {propsChildren
                    && (
                    <i
                      onClick={this.onCollapseClicked}
                      className={isOpened ? 'fas fa-minus' : 'fas fa-plus'}
                    />
                    )
                }
          <span>{propsItem.name}</span>
        </div>);
    }

    isItemEditing() {
      const { item, itemIdEditing } = this.props;
      return !item || itemIdEditing === item.id;
    }

    renderItem = () => (this.isItemEditing()
      ? this.getEditingItem()
      : this.getBaseItem())

    wrapWithContextMenu(comp) {
      const { item } = this.props;
      return (
        <ContextMenuTrigger id="contextMenu" itemId={item.id} collect={this.collectContextMenuData}>
          {comp}
        </ContextMenuTrigger>);
    }

    renderContent() {
      const {
        newDirectoryParentId, item: propsItem, children: propsChildren, root, createNode,
      } = this.props;
      const { isOpened } = this.state;
      let children = [];

      const hasNewDirectory = newDirectoryParentId > 0
        && propsItem && newDirectoryParentId === propsItem.id;

      if (propsChildren && (isOpened || hasNewDirectory)) {
        children = children.concat(
          propsChildren.map((node, index) => root.createNode(node, index)),
        );
      }

      if (hasNewDirectory) {
        children.push(createNode(<TreeItemComponent key={0} />));
      }

      const item = this.renderItem();

      return (
        <div>
          {propsItem
            ? this.wrapWithContextMenu(item)
            : item
          }
          {(isOpened || children)
            && (
            <DirectoriesList>
              {children}
            </DirectoriesList>
            )}
        </div>
      );
    }

    render() {
      return (
        <li onClick={this.onSelect}>
          {this.renderContent()}
        </li>
      );
    }
}

/* eslint-disable */
TreeItemComponent.propTypes = {
  item: PropTypes.object,
  root: PropTypes.object,
  selectedDirectoryId: PropTypes.number,
  createNode: PropTypes.func,
  newDirectoryParentId: PropTypes.number,
  onEditCompleted: PropTypes.func,
  onAddCompleted: PropTypes.func,
  onCanceled: PropTypes.func,
  itemIdEditing: PropTypes.number,
  children: PropTypes.array,
  isOperationInProgress: PropTypes.bool,
};
/* eslint-enable */
