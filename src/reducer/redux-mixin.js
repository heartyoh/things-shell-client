import * as Redux from 'redux';
import PolymerRedux from 'polymer-redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export {
  fetchSettings,
  fetchBoardList,
  createBoard,
  updateBoard,
  fetchGroupList,
  createGroup,
  updateGroup,
  joinGroup,
  fetchPlayGroupList,
  createPlayGroup,
  updatePlayGroup,
  followRouteChange,
  setRoute
} from './actions';

export {
  createDataSource,
  updateDataSource,
  fetchDataSourceList
} from './actions-datasource';

export {
  createPublisher,
  updatePublisher,
  fetchPublisherList
} from './actions-publisher';

export {
  createFont,
  updateFont,
  fetchFontList
} from './actions-font';

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(thunk)
);

export const ReduxMixin = PolymerRedux(store);
