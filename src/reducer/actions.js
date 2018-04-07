export const fetchSettings = (query) => async dispatch => {
  try {

    const url = `api/setting`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ query })
    });
    const responseBody = await response.json();

    // dispatch({
    //   type: 'REFRESH-SETTINGS',
    //   list: responseBody.list
    // });

  } catch (error) {

    console.error(error);
    // dispatch({
    //   type: 'CLEAR-BOARD-LIST'
    // });
  }
}

export const fetchBoardList = (by, id, route) => async dispatch => {
  try {
    var url;
    switch (by) {
      case 'group':
        url = `api/group/${id}`;
        break;
      case 'playgroup':
        url = `api/playgroup/${id}`;
        break;
      default: // 'recent'
        url = 'api/board'
    }

    const response = await fetch(url);
    const responseBody = await response.json();

    if (route) {
      dispatch(setRoute(route, id));
    } else {
      switch (by) {
        case 'group':
          dispatch(setRoute('list-by-group', id));
          break;
        case 'playgroup':
          dispatch(setRoute('list-by-playgroup', id));
          break;
        default:
          dispatch(setRoute('list-recent'));
      }
    }

    dispatch({
      type: 'BOARD-LIST',
      group: id !== undefined ? responseBody : null,
      list: id !== undefined ? responseBody.boards : responseBody,
      groupType: by
    });

  } catch (error) {
    console.error(error);
    dispatch({
      type: 'CLEAR-BOARD-LIST'
    });
  }
}

export const fetchBoard = (board) => async dispatch => {
  try {
    if (!board) {
      // 생성하는 경우.
      dispatch({
        type: 'NEW-BOARD'
      });
    } else {
      const url = `api/board/${board}`;
      const response = await fetch(url);
      const responseBody = await response.json();

      dispatch({
        type: 'REFRESH-BOARD',
        board: responseBody
      });
    }
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const createBoard = (board) => async dispatch => {
  try {
    const url = `api/board`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(board)
    });

    if (response.ok) {
      const responseBody = await response.json();
      dispatch({
        type: 'REFRESH-BOARD',
        board: responseBody
      });

      dispatch(setRoute('modeler', board.id));
    } else {
      console.error(await response.json());
    }
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const updateBoard = (board) => async dispatch => {
  try {
    const url = `api/board/${board.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(Object.assign({}, board, {
        group: board.group && board.group.id
      }))
    });
    const responseBody = await response.json();
    dispatch({
      type: 'REFRESH-BOARD',
      board: responseBody
    });
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const updateGroup = (group) => async dispatch => {
  try {
    const url = `api/group/${group.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(group)
    });

    dispatch(fetchGroupList());
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const fetchGroupList = () => async dispatch => {
  try {
    const url = `api/group`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch({
      type: 'GROUP-LIST',
      list: responseBody
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-GROUP-LIST'
    });
  }
}

export const createGroup = (group) => async dispatch => {
  try {
    const url = `api/group`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(group)
    });
    const responseBody = await response.json();

    dispatch(fetchGroupList());
    dispatch(fetchBoardList('group', responseBody.id));
  } catch (error) {
    console.error(error);
  }
}

export const joinGroup = (board, group) => async dispatch => {
  try {
    const url = `api/group/${group.id}/boards/${board}`;

    const response = await fetch(url, {
      method: 'PUT'
    });

    const responseBody = await response.json();

    dispatch(setRoute('list-by-group', group.id));

    dispatch({
      type: 'BOARD-LIST',
      group: group.id,
      list: responseBody.boards
    });
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const fetchPlayGroupList = () => async dispatch => {
  try {
    const url = `api/playgroup`;
    const response = await fetch(url)
    const responseBody = await response.json();
    dispatch({
      type: 'PLAYGROUP-LIST',
      list: responseBody
    });
  } catch (error) {
    dispatch({
      type: 'CLEAR-PLAYGROUP-LIST'
    });
  }
}

export const createPlayGroup = (group) => async dispatch => {
  try {
    const url = `api/playgroup`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(group)
    });
    const responseBody = await response.json();

    dispatch(fetchPlayGroupList());
    dispatch(fetchBoardList('playgroup', responseBody.id));
  } catch (error) {
    console.error(error);
  }
}

export const updatePlayGroup = (group) => async dispatch => {
  try {
    const url = `api/playgroup/${group.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(group)
    });

    // const responseBody = await response.json();

    dispatch(fetchPlayGroupList());
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

export const joinPlayGroup = (board, group) => async dispatch => {
  try {
    const url = `api/playgroup/${group.id}/boards/${board}`;

    const response = await fetch(url, {
      method: 'PUT'
    });

    const responseBody = await response.json();

    dispatch(setRoute('list-by-playgroup', group.id));

    dispatch({
      type: 'BOARD-LIST',
      group: group.id,
      list: responseBody.boards
    });

  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}

/* Route 변경시, 각 Route별로 필요한 state 설정 작업을 수행한다. */
export const followRouteChange = (page, id) => dispatch => {

  switch (page) {
    case 'list-by-group':
      dispatch({
        type: 'CHANGE-GROUP',
        group: id,
        groupType: 'group'
      });

      dispatch(fetchBoardList('group', id));
      break;

    case 'list-recent':
      dispatch({
        type: 'CHANGE-GROUP',
        groupType: 'recent'
      });

      dispatch(fetchBoardList('recent'));
      break;

    case 'list-by-playgroup':
      dispatch({
        type: 'CHANGE-GROUP',
        group: id,
        groupType: 'playgroup'
      });

      dispatch(fetchBoardList('playgroup', id));
      break;

    case 'modeler':
      dispatch(fetchBoard(id));
      break;

    case 'player':
      dispatch({
        type: 'CHANGE-GROUP',
        group: id
      });

      if (!id) {
        dispatch(setRoute('player'));
        return;
      } else {
        dispatch(fetchBoardList('playgroup', id, 'player'));
      }
      break;

    case 'viewer':
      dispatch(fetchBoard(id));
      break;

    case 'setting-font':
    case 'setting-datasource':
    case 'setting-publisher':
    case 'setting-security':
      break;

    default:
      if (!id) {
        dispatch(setRoute('list-recent'));
      }
      return;
  }

  dispatch({
    type: 'SET-PAGE-AND-ID',
    route: { page, id }
  })
}

export const setRoute = (page, id) => dispatch => {

  dispatch({
    type: 'SET-ROUTE-PATH',
    route: { page, id }
  })
}
