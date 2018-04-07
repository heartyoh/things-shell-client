export const fetchFontList = () => async dispatch => {
  try {
    const url = `api/font`;
    const response = await fetch(url)
    const responseBody = await response.json();

    dispatch({
      type: 'FONT-LIST',
      list: responseBody
    });
  } catch (error) {
    console.error('font', error);
    dispatch({
      type: 'CLEAR-FONT-LIST'
    });
  }
}

export const createFont = (font) => async dispatch => {
  try {
    const url = `api/font`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(font)
    });
    const responseBody = await response.json();

    dispatch(fetchFontList());
  } catch (error) {
    console.error(error);
  }
}

export const updateFont = (font) => async dispatch => {
  try {
    const url = `api/font/${font.id}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(font)
    });

    // const responseBody = await response.json();

    dispatch(fetchFontList());
  } catch (error) {
    console.error(error);
    /* TODO error */
  }
}
