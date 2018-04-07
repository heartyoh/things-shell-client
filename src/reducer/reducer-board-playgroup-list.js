export default function (state = [], action) {
  switch (action.type) {
    case 'PLAYGROUP-LIST':
      return action.list;

    case 'CLEAR-PLAYGROUP-LIST':
      return [];

    default:
      return state
  }
}
