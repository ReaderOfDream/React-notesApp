import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = (props) => {
  const { errors } = props;
  return (
    <div className="alert alert-danger" role="alert">
      <span>
        Errors occurred:
        {errors.reduce((p, c) => { const temp = `${p}; ${c}`; return temp; })}
      </span>
    </div>
  );
};

ErrorNotification.defaultProps = {
  errors: [],
};

ErrorNotification.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorNotification;
