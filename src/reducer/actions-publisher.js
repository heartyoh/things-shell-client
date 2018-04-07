export const fetchPublisherList = () => async dispatch => {
  try {
    const url = `api/publisher`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch({
      type: 'PUBLISHER-LIST',
      list: responseBody
    });
  } catch (error) {
    console.error('publisher', error);
    dispatch({
      type: 'CLEAR-PUBLISHER-LIST'
    });
  }
}

export const createPublisher = (publisher) => async dispatch => {
  try {
    const url = `api/publisher`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(publisher)
    });
    const responseBody = await response.json();

    dispatch(fetchPublisherList());
  } catch (error) {
    console.error(error);
  }
}

export const updatePublisher = (publisher) => async dispatch => {
  try {
    const url = `api/publisher/${publisher.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(publisher)
    });

    // const responseBody = await response.json();

    dispatch(fetchPublisherList());
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}
