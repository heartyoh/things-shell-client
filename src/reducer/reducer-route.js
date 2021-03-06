function set(state, o) {
  return Object.assign({}, state, o)
}

export default function (state = {}, action) {
  switch (action.type) {

    case 'INIT-ROUTE':
      return set(state, {
        rootPattern: (new URL(action.path)).pathname
      });

    case 'SET-PAGE-AND-ID':
      let route = action.route;
      return set(state, {
        page: route.page || 'list-by-group',
        id: route.id
      });

    case 'SET-ROUTE-PATH':
      return action.route.id ? set(state, {
        path: `${action.route.page}/${action.route.id}`
      }) : set(state, {
        path: action.route.page
      });

    default:
      return state
  }
}
