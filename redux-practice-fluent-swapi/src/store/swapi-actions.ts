import { swapiActions } from './swapi-slice';
import { uiActions } from './ui-slice';

export const fetchPeopleData = (url: string) => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        dispatch(uiActions.setError(response.status.toString()));
        dispatch(uiActions.setLoading(false));
        return;
      }
      dispatch(uiActions.setLoading(true));
      const data = await response.json();
      dispatch(swapiActions.setSwapiPeople(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(uiActions.setError(error.message));
      }
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
};
