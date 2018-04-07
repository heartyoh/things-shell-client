import * as Redux from 'redux';

import route from './reducer-route';
import boardList from './reducer-board-list';
import boardGroupList from './reducer-board-group-list';
import boardPlayGroupList from './reducer-board-playgroup-list';
import boardGroupCurrent from './reducer-board-group-current';
import boardCurrent from './reducer-board-current';
import user from './reducer-user';
import resource from './reducer-resource';
import process from './reducer-process';
import component from './reducer-component';
import propertyEditor from './reducer-property-editor';
import drawer from './reducer-drawer';
import style from './reducer-style';
import datasourceList from './reducer-datasource-list';
import publisherList from './reducer-publisher-list';
import fontList from './reducer-font-list';

export default Redux.combineReducers({
  boardCurrent,
  boardGroupCurrent,
  boardGroupList,
  boardList,
  boardPlayGroupList,
  component,
  datasourceList,
  drawer,
  fontList,
  process,
  propertyEditor,
  publisherList,
  resource,
  route,
  style,
  user
});
