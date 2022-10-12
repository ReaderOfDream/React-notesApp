import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SearchBar from '../containers/SearchBar';
import NoticeList from '../containers/NoticeList';
import DirectoriesButtonPanel from '../containers/DirectoriesButtonPanel';
import SearchNotices from '../containers/SearchNotices';
import AddNoteLink from '../containers/AddNoteLink';
import DirectoriesTree from './DirectoriesTree';
import { getSelectedDirectoryId } from '../reducers/uiReducer';
import { getDirectories } from '../redux-modules/directories/selectors';

const NotesDashboard = ({ doesDirectoryExist, hasSelectedDirectory }) => {
  if (hasSelectedDirectory && !doesDirectoryExist) {
    return <Redirect to="/NotFound" />;
  }
  return (
    <Dashboard>
      <DirectoriesTitle>
        <Header>Directories</Header>
        <DirectoriesButtonPanel />
      </DirectoriesTitle>
      <DirectoriesPanel>
        <DirectoriesTree />
      </DirectoriesPanel>
      <NoticesTitle>
        <Header>Notices</Header>
        <AddNoteLink />
      </NoticesTitle>
      <NoticesPanel>
        <Switch>
          <Route path="/search" component={SearchNotices} />
          <Route path="/:directoryId" component={NoticeList} />
        </Switch>
      </NoticesPanel>
      <SearchBarPanel>
        <SearchBar />
      </SearchBarPanel>
    </Dashboard>);
};

const Header = styled.h3`
    display: inline-block;
`;

const Dashboard = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 30px auto;
    width: auto;
    padding: 10px;
`;

const DirectoriesTitle = styled.div`
    grid-column: 1;
    grid-row: 1;
`;

const NoticesTitle = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const DirectoriesPanel = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    padding: 5px;
`;

const NoticesPanel = styled.div`
    grid-column: 2;
    grid-row: 2;
`;

const SearchBarPanel = styled.div`
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    margin-right: 30px;
`;

function mapStateToProps(state) {
  const directories = getDirectories(state);
  const selectedDirectoryId = getSelectedDirectoryId(state);
  const hasSelectedDirectory = selectedDirectoryId > 0;

  return {
    hasSelectedDirectory,
    doesDirectoryExist: directories.length === 0
      || directories.findIndex(i => i.id === selectedDirectoryId) > -1,
  };
}

NotesDashboard.propTypes = {
  doesDirectoryExist: PropTypes.bool.isRequired,
  hasSelectedDirectory: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(NotesDashboard);
