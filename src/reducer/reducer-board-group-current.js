export default function (state = {}, action) {

  switch (action.type) {

    case 'CHANGE-GROUP':
      return Object.assign({}, state, {
        id: action.group,
        type: action.groupType
      });

    case 'BOARD-LIST':
      return Object.assign({}, action.group, {
        type: action.groupType
      });

    default:
      return state;
  }
}
