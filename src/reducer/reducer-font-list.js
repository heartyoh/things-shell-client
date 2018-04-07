export default function (state = [], action) {
  switch (action.type) {
    case 'FONT-LIST':
      return action.list;

    case 'CLEAR-FONT-LIST':
      return [];

    default:
      return state
  }
}
