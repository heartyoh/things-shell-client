export const fetchDataSourceList = () => async dispatch => {
  try {
    const url = `api/datasource`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch({
      type: 'DATASOURCE-LIST',
      list: responseBody
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'CLEAR-DATASOURCE-LIST'
    });
  }
}

export const createDataSource = (group) => async dispatch => {
  try {
    const url = `api/datasource`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(group)
    });
    const responseBody = await response.json();

    dispatch(fetchDataSourceList());
  } catch (error) {
    console.error(error);
  }
}

export const updateDataSource = (group) => async dispatch => {
  try {
    const url = `api/datasource/${group.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(group)
    });

    // const responseBody = await response.json();

    dispatch(fetchDataSourceList());
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}
