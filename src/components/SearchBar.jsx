import React from 'react';
import Autocomplete from 'react-autocomplete';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const MAXHINTLENGTH = 20;

class SearchBar extends React.Component {
    renderItem = (i, isHighlighted) => (
      <div
        key={`${i.type}_${i.name}`}
        style={{ background: isHighlighted ? 'lightgray' : 'white' }}
        className={i.type === 'tag' ? 'searchItemTag' : 'searchItemNote'}
      >
        {i.name.length > MAXHINTLENGTH ? (
          this.shortageText(i.name)
        ) : (
          i.name
        )}
      </div>)

    shouldItemRender = (item, value) => {
      if (value) {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      } return true;
    };

    shortageText = (text) => {
      const { searchText } = this.props;
      const index = text.toLowerCase().indexOf(searchText.toLowerCase());

      if (index > 0) {
        const x = text.slice(index, index + MAXHINTLENGTH);
        return x;
      }

      return text;
    }

    render() {
      const {
        items, toggle, onKeyUp, onChange, onSelected, searchText, onToggleChange,
      } = this.props;

      const opt = {};
      if (toggle) {
        opt.checked = 'checked';
      }

      const toolTipText = 'Check to search through tags and note\'s description, in other way search will be only through note\'s name';
      return (
        <div>
          <SearchTitle>search:</SearchTitle>
          <Autocomplete
            getItemValue={i => i.name}
            items={items}
            renderItem={this.renderItem}
            shouldItemRender={this.shouldItemRender}
            autoHighlight={false}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onSelect={onSelected}
            value={searchText}
          />

          <input
            {...opt}
            data-tip={toolTipText}
            data-for="searchMode"
            id="globalSearchCheckBox"
            type="checkbox"
            value={toggle}
            onChange={onToggleChange}
          />
          <label data-tip={toolTipText} data-for="searchMode" htmlFor="globalSearchCheckBox">Advanced mode</label>
          <ReactTooltip id="searchMode" type="dark" effect="solid" place="top" />
        </div>
      );
    }
}

const SearchTitle = styled.h4`
    display: inline;
`;

SearchBar.defaultProps = {
  searchText: '',
};

SearchBar.propTypes = {
  searchText: PropTypes.string,
  toggle: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleChange: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

export default SearchBar;
