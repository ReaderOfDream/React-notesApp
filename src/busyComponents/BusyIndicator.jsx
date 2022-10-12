import React from 'react';
import { PropTypes } from 'prop-types';
import { getDisplayName } from '../common/utils';

const BusyIndicatorWrapper = (Inner) => {
  // eslint-disable-next-line react/prefer-stateless-function
  class BusyIndicator extends React.Component {
    render() {
      const { isBusy } = this.props;

      const style = {
        opacity: isBusy ? 0.5 : 1,
        pointerEvents: isBusy ? 'none' : 'auto',
        backgroundSize: isBusy ? 'auto' : '0 0',
        backgroundImage: 'url(\'/static/media/logo.5d5d9eef.svg\')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };

      return (
        <div style={style}>
          <Inner {...this.props} />
        </div>
      );
    }
  }
  BusyIndicator.displayName = `BusyLayer(${getDisplayName(Inner)})`;

  return BusyIndicator;
};

BusyIndicatorWrapper.propTypes = {
  isBusy: PropTypes.bool.isRequired,
};

export default BusyIndicatorWrapper;
