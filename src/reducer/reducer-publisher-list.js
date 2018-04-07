export default function (state = [], action) {
  switch (action.type) {
    case 'PUBLISHER-LIST':
      return action.list;

    case 'CLEAR-PUBLISHER-LIST':
      return [];

    default:
      return state
  }
}
