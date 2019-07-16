import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IHello } from 'app/shared/model/hello.model';

export const ACTION_TYPES = {
  FETCH_GREETING: 'hello/FETCH_GREETING'
};

const initialState = {
  loading: false,
  greeting: [],
  updateSuccess: false,
  updateFailure: false
};

export type HelloState = Readonly<typeof initialState>;

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GREETING):
      return {
        ...state,
        updateSuccess: false,
        updateFailure: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GREETING):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_GREETING):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false,
        greeting: action.payload.data
      };
    default:
      return state;
  }
};

// Action
export const getGreeting = () => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.FETCH_GREETING,
    payload: axios.get<IHello>('services/micronodb/api/hello/greeting')
  });
};
