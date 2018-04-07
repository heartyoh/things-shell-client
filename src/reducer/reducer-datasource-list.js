export default function (state = [], action) {
  switch (action.type) {
    case 'DATASOURCE-LIST':
      return action.list;

    case 'CLEAR-DATASOURCE-LIST':
      return [];

    default:
      return state
  }
}
