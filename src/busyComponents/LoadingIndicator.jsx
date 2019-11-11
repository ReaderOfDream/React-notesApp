import React from 'react';
import { PropTypes } from 'prop-types';
import { getDisplayName } from '../common/utils';

const LoadingIndicatorWrapper = (Inner) => {
  // eslint-disable-next-line react/prefer-stateless-function
  class LoadingIndicator extends React.Component {
    render() {
      const { isLoading } = this.props;
      return (
        isLoading
          ? 'Loading...'
          : <Inner {...this.props} />);
    }
  }
  LoadingIndicator.displayName = `LoadingLayer(${getDisplayName(Inner)})`;

  return LoadingIndicator;
};


LoadingIndicatorWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingIndicatorWrapper;
