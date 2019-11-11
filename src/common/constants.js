export const serverAddress = 'http://localhost:3001';

const noticesLocalPath = 'notices';
const directoriesLocalPath = 'directories';

export const directoriesPath = `${serverAddress}/${directoriesLocalPath}`;
export const noticesPath = `${serverAddress}/${noticesLocalPath}`;

export const Routes = {
  noticePath: 'notices',
};

export const ENTER_KEY_CODE = 13;
export const ESCAPE_KEY_CODE = 27;

export const DragItemTypes = {
  NOTICE: 'notice',
};
