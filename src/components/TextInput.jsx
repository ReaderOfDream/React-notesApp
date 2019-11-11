import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from '../common/constants';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    const { text: stateText } = this.state;
    const { text: propText, onInputCanceled, onInputCompleted } = this.props;

    if (e) {
      e.preventDefault();
    }

    if ((stateText === propText) || !stateText) {
      onInputCanceled();
      return;
    }

    onInputCompleted(stateText);
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onBlur();
    }
    if (e.keyCode === ESCAPE_KEY_CODE) {
      const { onInputCanceled } = this.props;
      onInputCanceled();
    }
  }

  render() {
    const { isOperationInProgress } = this.props;
    const { text } = this.state;
    const opt = isOperationInProgress ? { disabled: 'disabled' } : { };
    return (
      <input
        {...opt}
        autoFocus
        type="text"
        onBlur={this.onBlur}
        onChange={this.onChange}
        onKeyUp={this.handleKeyUp}
        value={text}
      />);
  }
}

TextInput.defaultProps = {
  text: '',
  isOperationInProgress: false,
};

TextInput.propTypes = {
  text: PropTypes.string,
  isOperationInProgress: PropTypes.bool,
  onInputCompleted: PropTypes.func.isRequired,
  onInputCanceled: PropTypes.func.isRequired,
};

export default TextInput;
