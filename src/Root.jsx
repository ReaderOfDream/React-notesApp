import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NotesDashboard from './components/NotesDashboard';
import AddNote from './containers/AddNote';
import EditNote from './containers/EditNote';
import './index.css';
import logo from './logo.svg';
import { Routes } from './common/constants';
import NotFound from './components/NotFound';
import { requestNotices } from './redux-modules/notices/actions';
import { requestDirectories } from './redux-modules/directories/actions';
import ErrorNotification from './components/Error';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidMount() {
    const { fetchDirectories, fetchNotices } = this.props;
    fetchDirectories();
    fetchNotices();
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { errors } = this.props;

    return error
      ? <h4>Ups, something went wrong</h4>
      : (
        <div className="App">
          <header className="App-header">
            <OwnerTitle>Popov Egor</OwnerTitle>
            <img src={logo} className="App-logo" alt="logo" />
            <AppTitle>Notices Manager</AppTitle>
          </header>
          {errors.length > 0
                        && <ErrorNotification errors={errors} />}
          <div>
            <Switch>
              <Route exact path="/" component={NotesDashboard} />
              <Route path={`/:directoryId/${Routes.noticePath}/add`} component={AddNote} />
              <Route path={`/:directoryId/${Routes.noticePath}/:id`} component={EditNote} />
              <Route path="/(search|\d+)/" component={NotesDashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      );
  }
}

const OwnerTitle = styled.h3`
  display: inline-block;
  margin-right: 50px;
  width: 250px;
`;

const AppTitle = styled.h3`
  display: inline-block;
  margin-left: 50px;
  width: 250px;
`;

function mapStateToProps(store) {
  return {
    errors: store.ui.errors,
    store,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDirectories: () => dispatch(requestDirectories()),
    fetchNotices: () => dispatch(requestNotices()),
  };
}

Root.defaultProps = {
  errors: [],
};

Root.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  fetchDirectories: PropTypes.func.isRequired,
  fetchNotices: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
